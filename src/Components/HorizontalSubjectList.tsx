import {FlatList, Platform, StyleSheet, Text, View} from 'react-native';
import React, {FunctionComponent} from 'react';

import BoxComponent from './common/BoxComponent';
import IonIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableRipple} from 'react-native-paper';
import theme from '../Constants/theme';
import {width} from '../Constants/size';

type props = {
  name: string;
  bg: string;
  children?: any;
  navigation?: any;
  subject: string;
};

const HorizontalSubjectList: FunctionComponent<props> = ({
  name,
  bg,
  children,
  navigation,
  subject,
}) => {
  return (
    <View style={styles.subjectContainer}>
      <Text style={[styles.horizontalListTitle, {color: `${bg}`}]}>{name}</Text>
      <View style={[styles.mainContainer]}>
        <BoxComponent
          bg={bg}
          onPress={() => navigation.navigate('Chapters', {subject})}
          title={'Lectures'}
          icon={'md-videocam'}
        />
        <BoxComponent
          bg={bg}
          onPress={() => navigation.navigate('TestList', {subject})}
          title={'Mock Tests'}
          icon={'disc'}
        />
        <BoxComponent
          bg={bg}
          onPress={() => navigation.navigate('DailyQuiz', {subject})}
          title={'Prep Quizzes'}
          icon={'alarm'}
        />
        <BoxComponent
          bg={bg}
          onPress={() => navigation.navigate('Documents', {subject})}
          title={'My Documents'}
          icon={'document'}
        />
      </View>
      {children}
    </View>
  );
};

export default HorizontalSubjectList;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: theme.SIZES.normal,
    paddingHorizontal: theme.SIZES.small / 2,
    alignItems: 'center',
  },
  subjectContainer: {
    // paddingVertical: theme.SIZES.large,
    paddingTop: theme.SIZES.large,
    paddingRight: 2,
    borderBottomColor: `${theme.COLORS.HEADER}`,
    borderBottomWidth: 0.5,
  },
  horizontalListTitle: {
    fontSize: theme.SIZES.large * 1.4,
    fontFamily: 'ComicNeue-Bold',
    alignSelf: 'flex-start',
    color: theme.COLORS.HEADER,
    marginLeft: theme.SIZES.small + 5,
    marginBottom: theme.SIZES.small / 2,
  },
});
