// TODO: Customize Epub Reader ConfigComp
//* - Reader Configurations - show when configuration icon is tapped
//* - Brightness control slider
//* - Font Size Toggle
//* - Night Mode Color Selection - #FFFFFF , #D3C59E , #5A5A5C , #333333

//* - Show on text selection end - show on gear clicked
//* - ConfigComp should always be inside the view port
//* - Animate when open and closes
//* - Customizable color theme selection - switch according to night mode colors
//? Webview can't get pageX and pageY Coordinates in Ebub Reader when text selected

import {ColorList, FlowComponent, SliderComponent} from './common';
import {Height, width} from '../../../Constants/size';
import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ann_data, config} from '../services';

import {TouchableHighlight} from 'react-native';
import theme from '../../../Constants/theme';

// import {
//   useAnimatedStyle,
//   useSharedValue,
//   withTiming,
// } from 'react-native-reanimated';

type props = {
  config: config;
  updateConfig: (key: string, value: any, key1: string) => void;
  handleclose: () => void;
  location: any;
};
const ConfigComp: FunctionComponent<props> = ({
  config,
  updateConfig,
  handleclose,
  location,
}) => {
  // const fadeAnim = useSharedValue(0);

  useEffect(() => {
    console.log('config_loc', location);
  }, [location]);
  return (
    <View
      style={[
        // animationStyle(),
        styles.parent,
        styles.shadow,
        {
          top: 60.95 + 20, //parseFloat(`${location.offsetY}`)
          left: 270.12 - width / 2, //parseFloat(`${location.offsetX}`)
          position: 'absolute',
        },
      ]}>
      <SliderComponent
        min_max={{
          min: 10,
          max: 100,
        }}
        step={10}
        labels={{
          min: '0',
          max: '100',
        }}
        value={config.brightness}
        onChange={(value) =>
          updateConfig(theme.DropMenuKeys.handlecon, value, 'brightness')
        }
      />
      <ColorList
        type={'CONFIG'}
        list={theme.READER_THEMES}
        selected={{
          background: config.background,
          color: config.color,
          label: 'Silver',
        }}
        onSelect={(value) =>
          updateConfig(theme.DropMenuKeys.handlecon, value, 'background')
        }
      />
      <SliderComponent
        min_max={{
          min: 14,
          max: 25,
        }}
        step={1}
        labels={{min: 'A', max: 'A'}}
        value={config.size}
        onChange={(value) =>
          updateConfig(theme.DropMenuKeys.handlecon, value, 'size')
        }
      />
      <FlowComponent
        value={config.flow}
        onChange={(event, value) =>
          updateConfig(theme.DropMenuKeys.handlecon, value, 'flow')
        }
        disabled={false}
      />
    </View>
  );
};
//

export default ConfigComp;

const styles = StyleSheet.create({
  colorItem: {},
  colorItemText: {},
  parent: {
    paddingHorizontal: theme.SIZES.small,
    paddingVertical: theme.SIZES.small,
    width: width / 1.3,
    height: Height / 3,
    maxWidth: 250,
    maxHeight: 400,
    backgroundColor: '#ccc',
    elevation: 10,
    zIndex: 5,
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
