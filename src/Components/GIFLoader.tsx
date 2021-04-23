import {StyleSheet, ImageStyle, Image} from 'react-native';
import React, {FunctionComponent} from 'react';
import {Height, width} from '../Constants/size';

type props = {
  style?: ImageStyle;
};

const GIFLoader: FunctionComponent<props> = ({style}) => {
  return (
    <Image
      style={[styles.parent, style]}
      source={require('../../assets/images/spinner.gif')}
      resizeMode={'contain'}
    />
  );
};

export default GIFLoader;

const styles = StyleSheet.create({
  parent: {
    height: Height * 0.08,
    width: width * 0.3,
  },
});
