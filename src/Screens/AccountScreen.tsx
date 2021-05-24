import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FunctionComponent, useState} from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import baseStyles from '../Components/common/styles';
import theme from '../Constants/theme';

type props = {
  navigation?: any;
  scene?: any;
};

const AccountScreen: FunctionComponent<props> = ({navigation, scene}) => {
  return (
    <ImageBackground
      source={require('../Assets/images/bg.png')}
      style={baseStyles.parent}
      resizeMode="cover"
      imageStyle={{opacity: 0.09}}>
      <Text> Account Screen</Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  messageStyle: {
    marginTop: theme.SIZES.large * 1.5,
    fontWeight: 'bold',
    color: theme.COLORS.HEADER,
    fontSize: theme.SIZES.large * 1.2,
  },
});
export default AccountScreen;