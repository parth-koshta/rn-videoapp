import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {Header, ImageIcon, CustomInput, CommentsList} from '../../Components';
import {AuthContext} from '../AuthNavigator/utils';
import Video from 'react-native-video';
import {Colors} from '../../Theme';
import {Icons} from '../../Shared';
import database from '@react-native-firebase/database';
import styles from './styles';
import auth from '@react-native-firebase/auth';

const {width} = Dimensions.get('window');

export default class HomeScreen extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      isPaused: false,
      users: {},
      userName: '',
      email: '',
      uid: '',
      video: {},
      isBuffering: false,
      commentText: '',
      videoId: '',
    };
    this.playerHeight = width / (16 / 9);
  }

  componentDidMount() {
    this.getAllUsers();
    this.getAllVideos();
  }

  getAllUsers = () => {
    database()
      .ref('/users')
      .on('value', querySnapShot => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        this.getUser(data);
        this.setState({
          users: data,
        });
      });
  };

  getAllVideos = () => {
    database()
      .ref('/videos')
      .on('value', querySnapShot => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};

        let videoId = Object.keys(data)[0];
        this.setState({
          video: data[videoId],
          videoId,
        });
      });
  };

  progress(e) {
    this.setState({
      currentTime: parseInt(e.currentTime),
    });
  }

  togglePlay = () => {
    this.setState({
      isPaused: !this.state.isPaused,
    });
  };

  seek = action => {
    if (action === 'forward') {
      this.player.seek(this.state.currentTime + 10);
    } else {
      this.player.seek(this.state.currentTime - 10);
    }
  };

  onEnd = () => {
    this.player.seek(0);
    this.setState({
      isPaused: true,
      currentTime: 0,
    });
  };

  getUser = users => {
    Object.keys(users).forEach(userId => {
      if (userId === this.context.uid) {
        let res = users[userId];
        this.setState({
          userName: res.userName,
          email: res.email,
          uid: userId,
        });
      }
    });
  };

  postComment = () => {
    const {uid, userName, commentText} = this.state;
    database()
      .ref(`videos/${this.state.videoId}/comments`)
      .push({
        userId: uid,
        userName: userName,
        comment: commentText,
        time: new Date(),
      })
      .then(res => {
        if (res.key) {
          this.setState({
            commentText: '',
          });
        }
      })
      .catch(e => alert(e));
  };

  onBuffer = e => {
    if (e.isBuffering) {
      this.setState({
        isBuffering: true,
      });
    } else {
      this.setState({
        isBuffering: false,
      });
    }
  };

  setFormField = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  

  render() {
    // console.log(this.state);
    const {currentTime, isPaused, video, commentText} = this.state;
    return (
      <AuthContext.Consumer>
        {props => {
          return (
            <View style={styles.container}>
              <Header name={this.state.userName} />
              {Object.keys(this.state.video).length ? (
                <View style={{width: '100%', backgroundColor: Colors.WHITE}}>
                  <View
                    style={{
                      width: width,
                      height: this.playerHeight,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Video
                      source={{uri: video.videoUrl}} // Can be a URL or a local file.
                      ref={ref => {
                        this.player = ref;
                      }}
                      onBuffer={e => this.onBuffer(e)} // Callback when remote video is buffering
                      onError={e => console.log(e, 'error')} // Callback when video cannot be loaded
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                      onProgress={e => this.progress(e)}
                      paused={isPaused}
                      selectedVideoTrack={{
                        type: 'resolution',
                        value: 420,
                      }}
                      onEnd={e => this.onEnd()}
                      resizeMode="stretch"
                      // controls
                      poster={video.posterUrl}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                        paddingHorizontal: 10,
                        position: 'absolute',
                      }}>
                      <TouchableOpacity
                        onPress={this.seek.bind(this, 'backward')}>
                        <ImageIcon source={Icons.backward} />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={this.seek.bind(this, 'forward')}>
                        <ImageIcon source={Icons.forward} />
                      </TouchableOpacity>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                        paddingHorizontal: 10,
                        position: 'absolute',
                        bottom: 20,
                      }}>
                      <Text style={{color: Colors.WHITE}}>{video.name}</Text>

                      <Text style={{color: Colors.WHITE}}>
                        {currentTime}/{video.duration} sec
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '100%',
                      paddingHorizontal: 10,
                      paddingVertical: 20,
                    }}>
                    <TouchableOpacity
                      onPress={this.togglePlay.bind(this)}
                      hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
                      <Image
                        source={isPaused ? Icons.play : Icons.pause}
                        style={{
                          height: 20,
                          width: 20,
                        }}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View style={{alignSelf: 'center', marginTop: '20%'}}>
                  <ActivityIndicator size="large" />
                </View>
              )}
              <View style={{padding: 10}}>
                <Text style={{fontSize: 10}}>Comments</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    paddingHorizontal: 10,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <CustomInput
                    value={commentText}
                    accessoryViewId={'commentText'}
                    noLabel
                    autoCapitalize="none"
                    onChangeText={text =>
                      this.setFormField('commentText', text)
                    }
                    inputStyle={{
                      backgroundColor: 'transparent',
                      borderWidth: 0,
                      borderBottomWidth: 1,
                      borderBottomColor: Colors.BLACK,
                      color: Colors.BLACK,
                    }}
                    style={{
                      padding: 0,
                      marginVertical: 0,
                    }}
                    placeholder="Write comment..."
                  />
                  <TouchableOpacity
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={this.postComment.bind(this)}>
                    <ImageIcon source={Icons.send} />
                  </TouchableOpacity>
                </View>
                <View>
                  {video.comments && Object.keys(video.comments).length && (
                    <CommentsList comments={video.comments} />
                  )}
                </View>
              </View>
            </View>
          );
        }}
      </AuthContext.Consumer>
    );
  }
}
