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
import theme from '../../Constants/theme';

type props = {
  title: string;
  icon_name?: string;
  user_image?: boolean;
  logo?: boolean;
  iconOnPress: () => void;
};

const TopNavbar: FunctionComponent<props> = ({
  title,
  user_image,
  logo,
  iconOnPress,
  icon_name = 'chevron-back-outline',
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: theme.SIZES.small * 0.1,
        height: Height * 0.07,
      }}>
      <TouchableOpacity onPress={iconOnPress}>
        <Icon
          name={icon_name}
          size={35}
          style={{marginHorizontal: theme.SIZES.small * 0.2}}
        />
      </TouchableOpacity>
      {user_image && (
        <Icon
          name={'person-circle-outline'}
          size={35}
          style={{marginRight: theme.SIZES.small / 2}}
        />
      )}
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>{title}</Text>
      {logo && (
        <Image
          source={require('../../Assets/images/PrepUni.png')}
          resizeMode="contain"
          style={{
            height: Height * 0.06,
            marginLeft: 'auto',
            marginRight: theme.SIZES.small,
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({});
export default TopNavbar;
