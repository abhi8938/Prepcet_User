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
import ExpandableView from '../Components/common/SyllabusView';
import ResourceHeader from '../Common/ResourceHeader';
import bg from '../../assets/images/bg.png';
import resourcesStore from '../State/resourcesStore';
import theme from '../Constants/theme';
import {useGlobalState} from '../State/GlobalState';

type props = {
  navigation?: any;
  scene?: any;
};
const SyllabusScreen: FunctionComponent<props> = ({navigation, scene}) => {
  const iconOnPress = () => navigation.toggleDrawer();
  const {course} = resourcesStore();
  const subjects = useGlobalState().subject;
  return (
    <ImageBackground
      source={bg}
      style={styles.parent}
      resizeMode="cover"
      imageStyle={{opacity: 0.03}}>
      <CustomHeader
        navigation={navigation}
        scene={scene}
        title={'Resources'}
        nav
        logo
      />
      <View style={{paddingHorizontal: theme.SIZES.small / 2}}>
        <ResourceHeader title={'Syllabus'} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: Height * 0.5}}>
          <View style={{marginTop: theme.SIZES.small}}>
            {subjects.map((item: any, index: number) => (
              <ExpandableView
                key={index}
                semData={item}
                onPress={() =>
                  navigation.navigate('SubjectOverview', {
                    subjectData: item,
                  })
                }
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: theme.COLORS.WHITE,
    paddingHorizontal: theme.SIZES.small / 2,
  },
  textInput: {
    width: '90%',
    paddingHorizontal: theme.SIZES.small,
  },
});
export default SyllabusScreen;
