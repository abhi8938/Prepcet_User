import {FlatList, ImageBackground, StyleSheet, Text, View} from 'react-native';

import React from 'react';
import {TouchableRipple} from 'react-native-paper';
import baseStyles from '../Components/common/styles';
import theme from '../Constants/theme';
import {width} from '../Constants/size';

let resouces_data = [
  {
    id: 1,
    name: 'Daily Quizzes',
    route: 'DailyQuiz',
  },
  {
    id: 2,
    name: 'Daily Lectures',
    route: 'DailyLecture',
  },
  {
    id: 3,
    name: 'Daily Words',
    route: 'DailyVocab',
  },
  {
    id: 4,
    name: 'Previous Year Papers',
    route: 'PreviousPapers',
  },
  {
    id: 5,
    name: 'Bookmarks',
    route: 'Bookmarks',
  },
  {
    id: 5,
    name: 'Doubts',
    route: 'Doubts',
  },
];

const Resources = () => {
  return (
    <ImageBackground
      source={require('../Assets/images/bg.png')}
      style={baseStyles.parent}
      resizeMode="cover"
      imageStyle={{opacity: 0.09}}></ImageBackground>
  );
};

export default Resources;

const styles = StyleSheet.create({});
