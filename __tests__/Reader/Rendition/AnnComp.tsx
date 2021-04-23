// TODO: Customize Epub Reader AnnComp
//* - Text Selection - Open when Text Selected
//* - Highlight - color selection
//* - Notes - highlight text - add notes

// NOTPRIORITY
//* - Dictionary - English to english / hindi

//* - Reader Configurations - show when configuration icon is tapped
//* - Brightness control slider
//* - Font Size Toggle
//* - Night Mode Color Selection - #FFFFFF , #D3C59E , #5A5A5C , #333333

//* - Show on text selection end - show on gear clicked
//* - Animate when open and closes / upperhalf or bottom half
//? Webview can't get pageX and pageY Coordinates in Ebub Reader when text selected
// showing two places bottom half or upper half

import {Height, width} from '../../../Constants/size';
import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {ann_data, config} from '../services';

import {ColorList} from './common';
import Icon from 'react-native-vector-icons/EvilIcons';
import theme from '../../../Constants/theme';

type props = {
  ann: ann_data;
  updateAnn: (key: string, value: any, key1: string) => void;
  handleclose: () => void;
  onDelete: (ann: ann_data) => void;
  data: string;
};

const AnnComp: FunctionComponent<props> = ({
  ann,
  updateAnn,
  handleclose,
  onDelete,
  data,
}) => {
  const RenderFirst = () => {
    return (
      <View
        style={[
          styles.first_container,
          {
            borderLeftColor: ann.color
              ? ann.color
              : theme.HIGHLIGHT_COLORS[4].color,
          },
        ]}>
        <Text style={styles.first_text}>
          {data.substring(0, 100)}
          <Text style={styles.spreads}>.....</Text>
        </Text>
      </View>
    );
  };
  const RenderNotes = () => {
    return (
      <View style={styles.notes_container}>
        <Text
          style={[
            styles.subHeading,
            {
              marginBottom: theme.SIZES.small,
              marginHorizontal: theme.SIZES.small / 2,
            },
          ]}>
          Notes :
        </Text>
        <TextInput
          placeholder={'Enter Notes Here'}
          style={styles.textInput}
          value={ann.note}
          multiline
          numberOfLines={7}
          onChangeText={(text) =>
            updateAnn(theme.DropMenuKeys.handleann, text, 'note')
          }
        />
      </View>
    );
  };
  const RenderBottom = () => {
    return (
      <View style={styles.actionBar}>
        <TouchableHighlight
          style={styles.buttons}
          onPress={(event) => handleclose()}>
          <Text style={styles.buttons_text}>Cancel</Text>
        </TouchableHighlight>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={(event) => onDelete(ann)}>
          <Icon
            name="trash"
            size={theme.SIZES.large * 2}
            color={theme.COLORS.HEADER}
          />
        </TouchableOpacity>
        <TouchableHighlight
          style={styles.buttons}
          onPress={(event) => handleclose()}>
          <Text style={styles.buttons_text}>Done</Text>
        </TouchableHighlight>
      </View>
    );
  };

  return (
    <View
      style={[
        // animationStyle(),
        styles.parent,
        {
          top: 30, //parseFloat(`${location.offsetY}`)
          left: 0, //parseFloat(`${location.offsetX}`)
          position: 'absolute',
        },
      ]}>
      <View style={styles.top_container}>
        {RenderFirst()}
        <ColorList
          type={'ANN'}
          list={theme.HIGHLIGHT_COLORS}
          selected={{
            color: ann.color ? ann.color : theme.HIGHLIGHT_COLORS[0].color,
            label: theme.HIGHLIGHT_COLORS[0].label,
          }}
          onSelect={(selected) =>
            updateAnn(theme.DropMenuKeys.handleann, selected.color, 'color')
          }
        />
      </View>
      <View style={styles.bottom_container}>
        {RenderNotes()}
        {RenderBottom()}
      </View>
    </View>
  );
};

export default AnnComp;

const styles = StyleSheet.create({
  buttons_text: {
    fontSize: theme.SIZES.normal + 2,
    fontFamily: 'Signika-Medium',
    color: theme.COLORS.HEADER,
  },
  buttons: {},
  top_container: {
    paddingHorizontal: theme.SIZES.small,
    paddingVertical: theme.SIZES.small,
    backgroundColor: '#ccc',
    width: width * 0.9,
    elevation: 10,
    zIndex: 5,
    borderRadius: 10,
  },
  bottom_container: {
    paddingHorizontal: theme.SIZES.small,
    paddingVertical: theme.SIZES.small,
    backgroundColor: '#ccc',
    width: width * 0.9,
    elevation: 10,
    zIndex: 5,
    borderRadius: 10,
  },
  textInput: {
    backgroundColor: theme.COLORS.BLOCK,
    borderRadius: 6,
    paddingHorizontal: theme.SIZES.small,
    paddingVertical: theme.SIZES.small,
    marginBottom: theme.SIZES.small,
    fontSize: theme.SIZES.normal,
    fontFamily: 'Signika-Medium',
    color: theme.COLORS.HEADER,
    textAlignVertical: 'top',
    minHeight: theme.SIZES.large * 5,
  },
  subHeading: {
    fontSize: theme.SIZES.normal + 3,
    fontFamily: 'Signika-Medium',
    color: theme.COLORS.HEADER,
  },
  notes_container: {
    borderRadius: 6,
    marginBottom: theme.SIZES.small / 1.5,
  },
  first_text: {
    fontSize: theme.SIZES.normal,
    fontFamily: 'Signika-Medium',
    color: theme.COLORS.HEADER,
  },
  first_container: {
    borderLeftWidth: 10,
    borderRadius: 6,
    paddingHorizontal: theme.SIZES.small,
    paddingVertical: theme.SIZES.small,
    marginBottom: theme.SIZES.small / 1.2,
    backgroundColor: theme.COLORS.BLOCK,
  },
  deleteButton: {
    width: theme.SIZES.large * 2,
    height: theme.SIZES.large * 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderTopColor: theme.COLORS.BLOCK,
    borderTopWidth: 1,
    paddingHorizontal: theme.SIZES.small,
    paddingVertical: theme.SIZES.small / 2,
  },
  parent: {
    // flex: ,
    width: width,
    height: Height * 0.9,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.SIZES.normal,
  },
  shadow: {
    shadowOffset: {
      width: 0.0,
      height: -5.0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 45,
  },
  spreads: {
    fontSize: theme.SIZES.normal,
    fontFamily: 'Signika-Medium',
    color: theme.COLORS.HEADER,
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
