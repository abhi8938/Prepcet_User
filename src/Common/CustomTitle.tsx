import {
  Animated,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {
  Children,
  FunctionComponent,
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import theme from '../Constants/theme';

type props = {
  subtitle?: string;
  style?: string;
  children: any;
};
const CustomTitle: FunctionComponent<props> = ({subtitle, style, children}) => {
  const size = useRef(new Animated.Value(theme.SIZES.large * 1.8)).current;

  // const Opacity = size.interpolate({
  //   inputRange: [0, 0.8, 1],
  //   outputRange: [0, 0, 1],
  // });
  // const TranslationX = size.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [100, 0],
  // });

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', keyboarddidshow);
    Keyboard.addListener('keyboardDidHide', keyboarddidhide);
    return () => {
      Keyboard.removeListener('keyboardDidShow', keyboarddidshow);
      Keyboard.removeListener('keyboardDidHide', keyboarddidhide);
    };
  }, []);

  const keyboarddidshow = useCallback((event) => {
    Animated.timing(size, {
      duration: 280,
      toValue: theme.SIZES.large * 1.5,
      useNativeDriver: false,
    }).start();
  }, []);

  const keyboarddidhide = useCallback((event) => {
    Animated.timing(size, {
      duration: 280,
      toValue: theme.SIZES.large * 1.8,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <View style={[styles.parent]}>
      <Animated.Text
        style={[
          styles.main,
          {
            fontSize: size,
          },
        ]}>
        {children}
      </Animated.Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
};
export default CustomTitle;
const styles = StyleSheet.create({
  parent: {},
  main: {
    fontFamily: 'Signika-Medium',
    color: theme.COLORS.HEADER,
  },
  subtitle: {},
});
