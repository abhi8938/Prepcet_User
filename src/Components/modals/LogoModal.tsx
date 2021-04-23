import {
  Alert,
  Image,
  Modal,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  useAnimatedProps,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import React, {FunctionComponent, useEffect, useState} from 'react';

import theme from '../../Constants/theme';
import {width} from '../../Constants/size';

type props = {
  show: boolean;
};
const LogoModal: FunctionComponent<props> = ({show}) => {
  const size = useSharedValue({
    width: width / 2.5,
  });

  useEffect(() => {
    if (show) {
      size.value = {
        width: width / 1.2,
      };
    }
  });
  const animations = useAnimatedStyle(() => {
    return {
      width: withTiming(size.value.width, {
        duration: 900,
      }),
    };
  });
  return (
    <Modal visible={show} animationType="none" transparent={false}>
      <View style={styles.parent}>
        <Animated.Image
          style={[
            {
              backgroundColor: theme.COLORS.DEFAULT,
              resizeMode: 'contain',
            },
            animations,
          ]}
          source={require('../../Assets/images/prepuni_logo.jpg')}
        />
      </View>
    </Modal>
  );
};

export default LogoModal;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.COLORS.DEFAULT,
  },
  text: {
    fontSize: theme.SIZES.normal,
    fontFamily: 'Comfortaa-SemiBold',
  },
  prepuni: {
    width: width,
    height: 'auto',
    resizeMode: 'cover',
    backgroundColor: '#ccc',
  },
});
