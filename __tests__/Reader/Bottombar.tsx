//* - Show page number and pages left - in bottom bar - slider / indicator

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {FunctionComponent, useEffect, useRef} from 'react';

import Slider from '@react-native-community/slider';

//FUNCTION TO CHECK FOR PROPS UPDATE
const propsDidUpdate = (callback: any, deps: any) => {
  const hasMount = useRef(false);

  useEffect(() => {
    if (hasMount.current) {
      callback();
    } else {
      hasMount.current = true;
    }
  }, deps);
};

type props = {
  bg: string;
  shown: boolean;
  value: any;
  disabled: boolean;
  onSlidingComplete: any;
};
const Bottombar: FunctionComponent<props> = ({
  bg,
  shown,
  value,
  disabled,
  onSlidingComplete,
}) => {
  const fadeAnim = useSharedValue(0);
  const barsshown = useSharedValue(true);

  useEffect(() => {
    setTimeout(() => {
      if (shown == true) {
        show();
      } else {
        hide();
      }
    }, 1000);
    return () => {};
  }, []);

  propsDidUpdate(() => {
    if (shown) {
      show();
    } else {
      hide();
    }
  }, [shown]);

  const animationStyle = () =>
    useAnimatedStyle(() => {
      return {
        opacity: withTiming(fadeAnim.value, {
          duration: 200,
        }),
      };
    });

  const show = () => {
    fadeAnim.value = 1;
    barsshown.value = true;
  };

  const hide = () => {
    fadeAnim.value = 0;
    barsshown.value = false;
  };

  return (
    <Animated.View
      style={[styles.footer, animationStyle(), {backgroundColor: bg}]}>
      <Slider
        style={styles.slider}
        disabled={disabled}
        value={value}
        onSlidingComplete={onSlidingComplete}
      />
    </Animated.View>
  );
};

export default Bottombar;

const styles = StyleSheet.create({
  footer: {
    paddingTop: 0,
    bottom: 0,
    ...Platform.select({
      ios: {
        height: 64,
      },
      android: {
        height: 54,
      },
    }),
    right: 0,
    left: 0,

    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  slider: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
    marginLeft: 50,
    marginRight: 50,
  },
});
