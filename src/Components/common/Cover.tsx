import {Height, width} from '../../Constants/size';
import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import React, {FunctionComponent} from 'react';

import baseStyles from './styles';
import theme from '../../Constants/theme';

type props = {
  uri: any;
};

const Cover: FunctionComponent<props> = ({uri}) => {
  return (
    <View style={[styles.parent]}>
      <Image source={{uri: uri}} style={[styles.image]} />
    </View>
  );
};

export default Cover;

const styles = StyleSheet.create({
  parent: {
    width: width * 0.99,
    alignSelf: 'center',
    backgroundColor: '#ccc',
  },
  image: {
    height: 'auto',
    width: '100%',
    borderRadius: 5,
    aspectRatio: 1.8,
  },
});
