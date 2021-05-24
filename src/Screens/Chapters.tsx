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
import theme from '../Constants/theme';

type props = {
  navigation?: any;
  scene?: any;
};

const Chapters: FunctionComponent<props> = ({navigation, scene}) => {
  return (
    <SafeAreaView style={styles.parent}>
      <Text>Chapters</Text>
    </SafeAreaView>
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
export default Chapters;
