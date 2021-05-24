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

const DoubtScreen: FunctionComponent<props> = ({navigation, scene}) => {
  return (
    <View style={baseStyles.parent}>
      <Text>DoubtScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageStyle: {
    marginTop: theme.SIZES.large * 1.5,
    fontWeight: 'bold',
    color: theme.COLORS.HEADER,
    fontSize: theme.SIZES.large * 1.2,
  },
});
export default DoubtScreen;
