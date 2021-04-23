// TODO: Customize Epub Reader NotesIcon
//* - Text Selection - Open when Text Selected
//* - Highlight - color selection
//* - Notes - highlight text - add notes - show highlight color card for notes indication on line end
//* - Dictionary - English to english / hindi

//* - Reader Configurations - show when configuration icon is tapped
//* - Brightness control slider
//* - Font Size Toggle
//* - Night Mode Color Selection - #FFFFFF , #D3C59E , #5A5A5C , #333333

//* - Show on text selection end - show on gear clicked
//* - NotesIcon should always be inside the view port
//* - Animate when open and closes
//* - Customizable color theme selection - switch according to night mode colors
//? Webview can't get pageX and pageY Coordinates in Ebub Reader when text selected

import {Height, width} from '../../../Constants/size';
import React, {FunctionComponent, useEffect, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import theme from '../../../Constants/theme';

type props = {};
const NotesIcon: FunctionComponent<props> = ({}) => {
  // const fadeAnim = useSharedValue(0);

  useEffect(() => {
    console.log('location');
  }, []);

  return (
    <View
      style={[
        // animationStyle(),
        styles.parent,
        styles.shadow,
        {
          //   top: parseFloat(location.y) + 30,
          //   left: parseFloat(location.x) - width / 3.6,
          position: 'absolute',
        },
      ]}>
      <Text>NotesIcon</Text>
    </View>
  );
};

export default NotesIcon;

const styles = StyleSheet.create({
  parent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.SIZES.small,
    paddingVertical: theme.SIZES.small,
    width: width / 2,
    height: Height / 5,
    backgroundColor: '#ccc',
    // elevation: 10,
    // zIndex: 5,
    borderRadius: 10,
  },
  shadow: {
    shadowOffset: {
      width: 0.0,
      height: -5.0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 45,
  },
});

// const animationStyle = () =>
//   useAnimatedStyle(() => {
//     return {
//       opacity: withTiming(fadeAnim.value, {
//         duration: 200,
//       }),
//     };
//   });
// useEffect(() => {
//   setTimeout(() => {
//     if (shown == true) {
//       show();
//     } else {
//       hide();
//     }
//   }, 1000);
//   return () => {};
// }, []);

// propsDidUpdate(() => {
//   if (shown === true) {
//     show();
//   } else {
//     hide();
//   }
// }, [shown]);

// const show = () => {
//   fadeAnim.value = 1;
// };

// const hide = () => {
//   fadeAnim.value = 0;
// };
