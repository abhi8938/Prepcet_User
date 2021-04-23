import {Height, width} from '../Constants/size';
import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FunctionComponent, useEffect, useState} from 'react';

import CustomHeader from '../Common/CustomHeader';
import baseStyles from '../Components/common/styles';
import bg from '../../assets/images/bg.png';
import theme from '../Constants/theme';

type props = {
  navigation: any;
  route: any;
};

const SyllabusOverviewScreen: FunctionComponent<props> = ({
  navigation,
  route,
}) => {
  const {subjectData} = route.params;
  useEffect(() => {
    console.log('sub_data', subjectData);
  }, [subjectData]);
  return (
    <ImageBackground
      source={bg}
      style={styles.parent}
      resizeMode="cover"
      imageStyle={{opacity: 0.05}}>
      <CustomHeader
        navigation={navigation}
        scene={route}
        title={'Syllabus'}
        back
        logo
      />
      <View style={styles.subjectView}>
        <Text
          style={
            styles.nameText
          }>{`${subjectData.code} ${subjectData.name}`}</Text>
        <Text
          style={styles.marksText}>{`${subjectData.maximum_marks} marks`}</Text>
      </View>
      <View style={styles.unitView}>
        <ScrollView
          contentContainerStyle={{paddingBottom: theme.SIZES.large}}
          showsVerticalScrollIndicator={false}>
          {subjectData &&
            subjectData.syllabus &&
            subjectData.syllabus.units.map((item: any, index: number) => (
              <View key={index} style={{marginBottom: theme.SIZES.large * 1.8}}>
                <Text style={styles.unitText}>{`Unit: ${index + 1}`}</Text>
                <Text
                  style={[
                    baseStyles.text,
                    {
                      fontSize: theme.SIZES.normal + 1,
                      fontFamily: 'ComicNeue-Bold',
                    },
                  ]}>
                  {item}
                </Text>
              </View>
            ))}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  parent: {flex: 1, backgroundColor: '#fff'},
  textInput: {
    width: '90%',
    paddingHorizontal: theme.SIZES.small,
  },
  subjectView: {
    alignSelf: 'center',
    marginTop: theme.SIZES.small / 2,
    backgroundColor: theme.COLORS.PRIMARY,
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.SIZES.small / 2,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingTop: theme.SIZES.small,
  },
  unitView: {
    height: '80%',
    width: '95%',
    alignSelf: 'center',
    borderColor: theme.COLORS.PRIMARY,
    borderWidth: 4,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    paddingHorizontal: theme.SIZES.small,
    paddingTop: theme.SIZES.small,
  },
  nameText: {fontSize: theme.SIZES.normal, fontFamily: 'Poppins-Bold'},
  marksText: {
    fontSize: theme.SIZES.small,
    fontFamily: 'Poppins-Bold',
    marginLeft: 'auto',
    marginRight: theme.SIZES.small / 2,
  },
  unitText: {
    fontFamily: 'Signika-Medium',
    fontSize: theme.SIZES.large * 1.3,
    color: theme.COLORS.HEADER,
    marginBottom: theme.SIZES.normal,
  },
  topicText: {
    fontWeight: 'bold',
    fontSize: theme.SIZES.normal,
    marginTop: theme.SIZES.small / 2,
  },
});

export default SyllabusOverviewScreen;
