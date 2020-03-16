import React, {useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  Picker,
} from 'react-native';
import {Colors} from '../../Theme';
import {Icons} from '../../Shared';
import Video from 'react-native-video';
import ImageIcon from '../ImageIcon';

const {width} = Dimensions.get('window');
const playerHeight = width / (16 / 9);

const secondsToHms = d => {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  var hDisplay = h > 0 ? h + 'h' : '';
  var mDisplay = m > 0 ? m + 'm' : '';
  var sDisplay = s > 0 ? s + 's' : '';
  return hDisplay + mDisplay + sDisplay;
};

const VideoPlayer = React.forwardRef(
  (
    {
      video,
      onBuffer,
      onProgress,
      isPaused,
      onEnd,
      onBackPress,
      onForwardPress,
      currentTime,
      onPlayPause,
    },
    ref,
  ) => {
    const qualities = [144, 240, 360, 480, 720];

    const [quality, setQuality] = useState(480);

    return (
      <View style={{width: '100%', backgroundColor: Colors.WHITE}}>
        <View
          style={{
            width: width,
            height: playerHeight,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Video
            source={{uri: video.videoUrl}}
            ref={ref}
            onBuffer={onBuffer}
            onError={e => console.log(e, 'error')}
            style={{
              width: '100%',
              height: '100%',
            }}
            onProgress={onProgress}
            paused={isPaused}
            selectedVideoTrack={{
              type: 'resolution',
              value: quality,
            }}
            onEnd={onEnd}
            resizeMode="stretch"
            // controls
            poster={video.posterUrl}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              paddingHorizontal: 20,
              position: 'absolute',
            }}>
            <TouchableOpacity onPress={onBackPress}>
              <ImageIcon source={Icons.backward} size={45} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onForwardPress}>
              <ImageIcon source={Icons.forward} size={45} />
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
              {secondsToHms(currentTime)}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            paddingHorizontal: 20,
            paddingVertical: 20,
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={onPlayPause}
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
          <View style={{width: '60%', alignItems: 'flex-end'}}>
            <Text
              style={{
                fontSize: 8,
                fontWeight: 'bold',
                alignSelf: 'center'
              }}>
              Quality
            </Text>
            <Picker
              style={{
                width: '60%',
                color: '#344953',
                justifyContent: 'center',
              }}
              selectedValue={quality}
              onValueChange={(itemValue, itemPosition) =>
                setQuality(itemValue)
              }>
              {qualities.map(item => (
                <Picker.Item label={`${item}p`} value={item} key={item} />
              ))}
            </Picker>
          </View>
        </View>
      </View>
    );
  },
);

export default VideoPlayer;
