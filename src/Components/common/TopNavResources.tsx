import {Height, width} from '../../Constants/size';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FunctionComponent, useState} from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import Touchable from './Touchable';
import theme from '../../Constants/theme';

type props = {
  title: string;
  iconOnPress: () => void;
};

const TopNavbarResources: FunctionComponent<props> = ({title, iconOnPress}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: theme.SIZES.large,
        height: Height * 0.08,
      }}>
      <TouchableOpacity onPress={iconOnPress}>
        <View
          style={{
            height: 5,
            width: 25,
            borderRadius: 5,
            backgroundColor: theme.COLORS.PLACEHOLDER,
          }}></View>
        <View
          style={{
            height: 5,
            width: 38,
            borderRadius: 5,
            marginVertical: theme.SIZES.small * 0.7,
            backgroundColor: theme.COLORS.PLACEHOLDER,
          }}></View>
        <View
          style={{
            height: 5,
            width: 30,
            borderRadius: 5,
            backgroundColor: theme.COLORS.PLACEHOLDER,
          }}></View>
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 22,
          fontWeight: 'bold',
          marginLeft: theme.SIZES.large,
          color: '#616161',
        }}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({});
export default TopNavbarResources;
