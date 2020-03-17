import React, {Component, Fragment} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from 'react-native';
import {
  Header,
  ImageIcon,
  CustomInput,
  CommentsList,
  VideoPlayer,
} from '../../Components';
import {AuthContext} from '../AuthNavigator/utils';

import {Colors} from '../../Theme';
import {Icons} from '../../Shared';
import database from '@react-native-firebase/database';
import styles from './styles';

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
    const {currentTime, isPaused, video, commentText} = this.state;
    return (
      <View style={styles.fullFlex}>
        <AuthContext.Consumer>
          {props => {
            return (
              <View style={styles.container}>
                <Header name={this.state.userName} />
                {Object.keys(this.state.video).length ? (
                  <Fragment>
                    <VideoPlayer
                      ref={ref => {
                        this.player = ref;
                      }}
                      video={video}
                      onBuffer={this.onBuffer.bind(this)}
                      onProgress={this.progress.bind(this)}
                      isPaused={isPaused}
                      onEnd={this.onEnd.bind(this)}
                      onBackPress={this.seek.bind(this, 'backward')}
                      onForwardPress={this.seek.bind(this, 'forward')}
                      currentTime={currentTime}
                      onPlayPause={this.togglePlay.bind(this)}
                    />

                    <View style={styles.commentsWrapper}>
                      <Text style={styles.fontSmall}>Comments</Text>
                      <View style={styles.inputWrapper}>
                        <CustomInput
                          value={commentText}
                          accessoryViewId={'commentText'}
                          noLabel
                          autoCapitalize="none"
                          onChangeText={text =>
                            this.setFormField('commentText', text)
                          }
                          inputStyle={styles.input}
                          style={styles.inputStyleProp}
                          placeholder="Write comment..."
                        />
                        <TouchableOpacity
                          style={styles.allCenter}
                          onPress={this.postComment.bind(this)}>
                          <ImageIcon source={Icons.send} />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.fullFlex}>
                        {video.comments &&
                          Object.keys(video.comments).length && (
                            <CommentsList comments={video.comments} />
                          )}
                      </View>
                    </View>
                  </Fragment>
                ) : (
                  <View style={styles.indicatorWrapper}>
                    <ActivityIndicator size="large" />
                  </View>
                )}
              </View>
            );
          }}
        </AuthContext.Consumer>
      </View>
    );
  }
}
