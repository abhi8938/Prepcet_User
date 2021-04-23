// TODO: Customize Epub Reader Dropmenu
//* - Text Selection - Open when Text Selected
//* - Highlight - color selection
//* - Notes - highlight text - add notes - show highlight color card for notes indication on line end
//* - Dictionary - English to english / hindi

//* - Reader Configurations - show when configuration icon is tapped
//* - Brightness control slider
//* - Font Size Toggle
//* - Night Mode Color Selection - #FFFFFF , #D3C59E , #5A5A5C , #333333

//* - Show on text selection end - show on gear clicked
//* - Dropmenu should always be inside the view port
//* - Animate when open and closes
//* - Customizable color theme selection - switch according to night mode colors
//? Webview can't get pageX and pageY Coordinates in Ebub Reader when text selected

import {Height, width} from '../../Constants/size';
import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ann_data, annotations, config, propsDidUpdate} from './services';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import AnnComp from './Rendition/AnnComp';
import ConfigComp from './Rendition/ConfigComp';
import theme from '../../Constants/theme';

type props = {
  type: string;
  ann: ann_data;
  location: {offsetX: number; offsetY: number};
  updateAnn: (ann: ann_data) => void;
  updateConfig: (config: config) => void;
  config: config;
  handleClose: () => void;
  onDelete: (ann: ann_data) => void;
  selected: {data: string; epubcfi: string};
};

const Dropmenu: FunctionComponent<props> = ({
  type,
  location,
  onDelete,
  updateAnn,
  updateConfig,
  config,
  handleClose,
  ann,
  selected,
}) => {
  // const fadeAnim = useSharedValue(0);
  const [annotation, setAnnotation] = useState(ann);
  const [configuration, setConfig] = useState(config);

  const handleConfig = (key: string, value: any) => {
    let x: any = {
      size: configuration.size,
      background: configuration.background,
      brightness: configuration.brightness,
      flow: configuration.flow,
      font: configuration.font,
      color: configuration.color,
    };
    if (key === 'background') {
      (x[key] = value.background), (x['color'] = value.color);
    } else {
      x[key] = value;
    }
    setConfig(x);
    updateConfig(x);
  };
  const handleAnn = (key: string, value: any) => {
    if (annotation !== null) {
      let x: any = {
        type: annotation.type,
        pageCfi: annotation.pageCfi,
        epubCfi: annotation.epubCfi,
        color: annotation.color,
        text: annotation.text,
        note: annotation.note,
      };
      x[key] = value;
      x['type'] = theme.ITEM_NAMES.highlight;
      x['epubCfi'] = selected.epubcfi;
      x['text'] = selected.data;
      setAnnotation(x);
      updateAnn(x);
    }
  };

  const handleAllmethods = (key: string, value: any, key_1?: string) => {
    switch (key) {
      case theme.DropMenuKeys.delete:
        onDelete(value);
        break;
      case theme.DropMenuKeys.handleclose:
        handleClose();
        break;
      // case theme.DropMenuKeys.updateann:
      //   updateAnn(value);
      //   break;
      // case theme.DropMenuKeys.updateconfig:
      //   updateConfig(value);
      //   break;
      case theme.DropMenuKeys.handleann:
        handleAnn(key_1 ? key_1 : '', value);
        break;
      case theme.DropMenuKeys.handlecon:
        handleConfig(key_1 ? key_1 : '', value);
        break;
      default:
        break;
    }
  };

  switch (type) {
    case 'CONFIG':
      return (
        <ConfigComp
          location={location}
          config={configuration}
          updateConfig={handleAllmethods}
          handleclose={() =>
            handleAllmethods(theme.DropMenuKeys.handleclose, '')
          }
        />
      );
    case 'ANN':
      return (
        <AnnComp
          data={selected.data}
          onDelete={(ann) => handleAllmethods(theme.DropMenuKeys.delete, ann)}
          ann={annotation}
          updateAnn={handleAllmethods}
          handleclose={() =>
            handleAllmethods(theme.DropMenuKeys.handleclose, '')
          }
        />
      );

    default:
      return null;
  }
};

export default Dropmenu;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
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
