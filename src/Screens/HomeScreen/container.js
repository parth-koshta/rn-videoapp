import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image, Dimensions} from 'react-native';
import {Header, ImageIcon} from '../../Components';
import {AuthContext} from '../AuthNavigator/utils';
import Video from 'react-native-video';
import {Colors} from '../../Theme';
import {Icons} from '../../Shared';

const {width} = Dimensions.get('window');

export default class HomeScreen extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      isPaused: false,
    };
    this.user = this.context;
    this.duration = 46;
    this.playerHeight = width / (16 / 9);
  }

  progress(e) {
    // console.log('Time' + parseInt(e.currentTime))
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

  render() {
    const {currentTime, isPaused} = this.state;
    return (
      <AuthContext.Consumer>
        {props => {
          return (
            <View style={{width: '100%', flex: 1}}>
              <Header />
              <View style={{width: '100%', backgroundColor: Colors.WHITE}}>
                <View
                  style={{
                    width: width,
                    height: this.playerHeight,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Video
                    source={{uri: 'https://vjs.zencdn.net/v/oceans.mp4'}} // Can be a URL or a local file.
                    ref={ref => {
                      this.player = ref;
                    }} // Store reference
                    // onBuffer={this.onBuffer} // Callback when remote video is buffering
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
                    poster="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQQ_jOZAOI-qX7rjkdGjdKe5hqvqVDKaCWuGahAx0JZS5wACAWU"
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
                    <TouchableOpacity onPress={this.seek.bind(this, 'forward')}>
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
                    <Text style={{color: Colors.WHITE}}>Ocean</Text>

                    <Text style={{color: Colors.WHITE}}>
                      {currentTime}/{this.duration} sec
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
            </View>
          );
        }}
      </AuthContext.Consumer>
    );
  }
}
