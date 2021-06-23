import {Alert, StyleSheet, Text, View} from 'react-native';
import {Height, width} from '../Constants/size';
import React, {useEffect, useRef} from 'react';
import Video, {LoadError, OnBufferData} from 'react-native-video';

type props = {
  uri: string;
};
const VideoComponent = ({uri}: props) => {
  const player: any = useRef(null);
  useEffect(() => {
    console.log('video', player.current);
  }, [player.current]);
  const onBuffer = (data: OnBufferData) => {
    console.log('buffer', data.isBuffering);
  };
  const onError = (error: any) => {
    console.log('videoError', JSON.stringify(error));
  };
  return (
    <Video
      source={require('../../broadchurch.mp4')} // Can be a URL or a local file.
      ref={player} // Store reference
      onBuffer={onBuffer} // Callback when remote video is buffering
      onError={onError} // Callback when video cannot be loaded
      onEnd={() => {
        player.current.seek(0);
      }}
      style={{flex: 1, height: Height, width: width}}
    />
  );
};

export default VideoComponent;

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
