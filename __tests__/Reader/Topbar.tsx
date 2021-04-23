//* - Top Bar - back - Table of content icon
//* - (DropDown - (Night Mode - Brigtness controller Slider - FontSize( Medium / large))
//* - Bookmark page

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FunctionComponent, useEffect, useRef} from 'react';

import Icon from 'react-native-vector-icons/EvilIcons';
import Icon1 from 'react-native-vector-icons/Ionicons';
import theme from '../../Constants/theme';

//FUNCTION TO CHECK FOE PROPS UPDATE
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
  title: string;
  onNavPress: any;
  onBackPress: any;
  onBookMark: any;
  onSettings: any;
  onSearch: any;
};
const Topbar: FunctionComponent<props> = ({
  bg,
  shown,
  title,
  onNavPress,
  onBackPress,
  onBookMark,
  onSettings,
  onSearch,
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
    if (shown === true) {
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
      style={[styles.header, animationStyle(), {backgroundColor: bg}]}>
      <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
        <Icon name="chevron-left" size={44} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={onNavPress}>
        <Icon name="navicon" size={34} />
      </TouchableOpacity>
      {/* <Text style={styles.title}>{title}</Text> */}
      <TouchableOpacity style={styles.backButton} onPress={onBookMark}>
        <Icon name="heart" size={34} />
      </TouchableOpacity>
      <TouchableOpacity
        disabled={!shown}
        style={styles.backButton}
        // onPressOut={(event) => console.log('clicked', event.nativeEvent)}
        onPress={(event) => onSettings(event)}>
        <Icon name="gear" size={32} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={onSearch}>
        <Icon1 name="ios-search-outline" size={30} />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Topbar;

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '400',
    flex: 5,
    color: '#000',
    ...Platform.select({
      ios: {
        fontFamily: 'Comfortaa-Medium',
      },
      android: {
        fontFamily: 'Comfortaa-Medium',
      },
    }),
  },
  header: {
    ...Platform.select({
      ios: {
        paddingTop: 40,
      },
      android: {
        paddingTop: 24,
      },
    }),
    top: 0,
    ...Platform.select({
      ios: {
        height: 94,
      },
      android: {
        height: 78,
      },
    }),
    paddingHorizontal: 5,
    right: 0,
    left: 0,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  backButton: {
    width: 34,
    height: 34,
    marginVertical: 20,
    marginHorizontal: 3,
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  backButtonImage: {
    width: 30,
    height: 30,
  },
});
