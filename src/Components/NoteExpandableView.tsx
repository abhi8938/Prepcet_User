import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Height, width} from '../Constants/size';
import React, {FunctionComponent, useEffect, useState} from 'react';

import IonicIcons from 'react-native-vector-icons/Ionicons';
import SkeletonLoader from './SkeletonLoader';
import getNotesStore from '../State/notesStore';
import theme from '../Constants/theme';

type props = {
  data: any;
  save: () => void;
  deleteItem: () => void;
  load: boolean;
};
export const Loader = () => (
  <View style={styles.contractedParent}>
    <SkeletonLoader
      width={theme.SIZES.large * 2.2}
      height={theme.SIZES.large * 2.2}
      borderRadius={8}
      bgColor={theme.COLORS.HEADER}
      overlayColor={'#fff'}
    />
    <View style={styles.innerContainer}>
      <SkeletonLoader
        width={width / 2}
        height={theme.SIZES.normal * 1.3}
        borderRadius={7}
        bgColor={theme.COLORS.HEADER}
        overlayColor={'#fff'}
      />
      <SkeletonLoader
        width={width / 3}
        height={theme.SIZES.normal * 1.3}
        borderRadius={7}
        bgColor={theme.COLORS.HEADER}
        overlayColor={'#fff'}
      />
      <View
        style={{
          flex: 1,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
        }}>
        <SkeletonLoader
          width={theme.SIZES.large * 1.3}
          height={theme.SIZES.large * 1.3}
          borderRadius={7}
          bgColor={theme.COLORS.HEADER}
          overlayColor={'#fff'}
        />
      </View>
    </View>
  </View>
);

const NoteExpandableView: FunctionComponent<props> = ({
  data,
  save,
  deleteItem,
  load,
}) => {
  const {noteInput, updateNoteInput} = getNotesStore();
  const [expand, setExpand] = useState(false);
  const [editNote, setEditNote] = useState(data.note && data.note.length === 0);
  const styleRef = useSharedValue({opacity: 0, height: 0});
  const animationStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(styleRef.value.height, {
        duration: 300,
      }),
      opacity: withTiming(styleRef.value.opacity, {
        duration: 300,
      }),
    };
  });
  useEffect(() => {
    if (expand === true) {
      styleRef.value = {
        height: Height * 0.18,
        opacity: 1,
      };
    } else {
      styleRef.value = {
        height: 0,
        opacity: 0,
      };
    }
  }, [expand]);
  useEffect(() => {
    console.log('load', load);
  }, [load]);
  return load === true ? (
    <Loader />
  ) : (
    <View
      style={{
        paddingHorizontal: theme.SIZES.small * 1.2,
        borderBottomColor: theme.COLORS.LIGHT_GREY,
        borderBottomWidth: 3,
        backgroundColor: theme.COLORS.DEFAULT,
      }}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          marginTop: theme.SIZES.normal,
        }}>
        <View
          style={{
            backgroundColor: data.color,
            width: theme.SIZES.large * 1.7,
            height: theme.SIZES.large * 1.7,
            borderRadius: 8,
          }}
        />
        <TouchableOpacity style={{marginLeft: 'auto'}} onPress={deleteItem}>
          <IonicIcons name={'trash'} size={25} color={'#656565'} />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          marginTop: theme.SIZES.small,
          fontSize: theme.SIZES.normal + 1,
          // fontFamily: ',
          letterSpacing: 0.6,
          lineHeight: 25,
        }}>
        {data.text}
      </Text>
      <TouchableOpacity
        style={{
          marginTop: theme.SIZES.normal,
          marginLeft: 'auto',
          borderRadius: 15,
          borderWidth: 2,
          borderColor: theme.COLORS.BORDER_COLOR,
          marginRight: theme.SIZES.small,
          paddingHorizontal: theme.SIZES.small / 2,
          paddingVertical: theme.SIZES.small * 0.2,
        }}
        onPress={() => setExpand(!expand)}>
        <Text>
          {expand === true
            ? 'Hide Note'
            : data.note && data.note.length < 1
            ? 'Add Note'
            : 'Show Note'}
        </Text>
      </TouchableOpacity>
      <Animated.View
        style={[
          {
            marginTop: theme.SIZES.small,
            width: '100%',
            paddingHorizontal: theme.SIZES.small / 2,
            alignItems: 'center',
            paddingVertical: theme.SIZES.small,
          },
          animationStyle,
        ]}>
        {editNote && (
          <>
            <TextInput
              style={{
                width: '100%',
                height: Height * 0.1,
                borderColor: theme.COLORS.LIGHT_GREY,
                borderWidth: 2,
                borderRadius: 5,
                paddingHorizontal: theme.SIZES.small - 1,
                paddingVertical: theme.SIZES.small - 1,
                fontSize: theme.SIZES.small + 4,
              }}
              onChangeText={(value) => updateNoteInput(value)}
              value={noteInput}
              placeholder={'Add Note...'}
              multiline={true}
              textAlignVertical={'top'}
            />
            <TouchableOpacity
              style={{
                marginTop: theme.SIZES.small / 1.1,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: theme.COLORS.BORDER_COLOR,
                paddingHorizontal: theme.SIZES.small / 2,
                paddingVertical: theme.SIZES.small * 0.2,
              }}
              onPress={() => {
                save();
                setEditNote(false);
              }}>
              <Text>Save</Text>
            </TouchableOpacity>
          </>
        )}
        {!editNote && (
          <>
            <Text>{data.note}</Text>
            <TouchableOpacity
              style={{
                marginTop: theme.SIZES.small,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: theme.COLORS.BORDER_COLOR,
                paddingHorizontal: theme.SIZES.small / 2,
                paddingVertical: theme.SIZES.small * 0.2,
              }}
              onPress={() => setEditNote(true)}>
              <Text>Edit Note</Text>
            </TouchableOpacity>
          </>
        )}
      </Animated.View>
    </View>
  );
};

export default NoteExpandableView;

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: theme.SIZES.small + 4,
    minHeight: '45%',
  },
  contractedParent: {
    flexDirection: 'row',
    maxHeight: theme.SIZES.ratio < 1.6 ? Height * 0.2 : Height * 0.22,
    paddingHorizontal: theme.SIZES.small,
    paddingVertical: theme.SIZES.small,
  },
});
