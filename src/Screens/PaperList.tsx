import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FunctionComponent, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomHeader from '../Common/CustomHeader';
import IonicIcons from 'react-native-vector-icons/Ionicons';
import {URL} from '../Constants/urls';
import bg from '../../assets/images/bg.png';
import theme from '../Constants/theme';
import {useGlobalState} from '../State/GlobalState';
import RNFetchBlob from 'rn-fetch-blob';
import * as Progress from 'react-native-progress';

type props = {
  navigation: any;
  route: any;
  scene: any;
};

const PaperList: FunctionComponent<props> = ({navigation, route, scene}) => {
  const globalState: any = useGlobalState();
  const [progress, setProgress] = useState(-1);
  const onSave = async (link: string) => {
    const token: any = await AsyncStorage.getItem('TOKEN');
    RNFetchBlob.config({
      path: RNFetchBlob.fs.dirs.MainBundleDir + '/' + link,
      fileCache: true,
    })
      .fetch('GET', 'https://digitalluxe.ca/api/paper/files/' + link, {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      })
      .progress((received, total) => {
        setProgress(received / total);
      })
      .then((res) => {
        setProgress(-1);
        console.log('The file saved to ', res.path());
      })
      .catch((error) => console.log('download error', error));
  };
  const {id, edit} = route.params;
  const paperView = ({item, index}: {item: any; index: number}) => {
    return (
      <View
        style={{
          width: '99%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          marginTop: theme.SIZES.large * 2.5,
        }}>
        <TouchableOpacity
          style={
            edit
              ? [
                  styles.paperViewParent,
                  {paddingHorizontal: theme.SIZES.normal * 0.9},
                ]
              : styles.paperViewParent
          }
          onPress={
            !edit
              ? () =>
                  navigation.navigate('Notesdesc', {
                    subjectIndex: id,
                    paperIndex: id,
                    paperId: item._id,
                  })
              : async () => {
                  const token = await AsyncStorage.getItem('TOKEN');
                  navigation.navigate('Reader', {
                    uri: `${URL}/paper/files/${item.link}`,
                    token,
                  });
                }
          }>
          <View style={styles.paperView}>
            <Text style={styles.subjectName}>
              {item.name ? item.name : 'Examination Paper'}
            </Text>
            <Text style={styles.yearValue}>{item.year}</Text>
          </View>
        </TouchableOpacity>
        {edit && (
          <>
            {progress === -1 && (
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => onSave(item.link)}>
                <IonicIcons
                  name={'download-outline'}
                  size={28}
                  color={'#00000070'}
                />
              </TouchableOpacity>
            )}
            {progress !== -1 && (
              <View style={styles.editButton}>
                <Progress.Circle
                  progress={progress}
                  size={28}
                  color={theme.COLORS.ACTIVE}
                  showsText={true}
                  textStyle={{fontSize: 8}}
                  thickness={1.5}
                />
              </View>
            )}
            <TouchableOpacity
              style={styles.editButton}
              onPress={() =>
                navigation.navigate('Notesdesc', {
                  subjectIndex: id,
                  paperIndex: id,
                  paperId: item._id,
                })
              }>
              <Image source={require('../../assets/images/notesIcon.png')} />
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  };

  return (
    <ImageBackground
      source={bg}
      style={styles.parent}
      resizeMode="cover"
      imageStyle={{opacity: 0.05}}>
      <CustomHeader
        navigation={navigation}
        scene={scene}
        title={globalState.subject[id].name}
        back
      />
      <Text
        style={
          styles.marksText
        }>{`Maximum Marks: ${globalState.subject[id].maximum_marks}`}</Text>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={globalState.subject[id].papers}
        renderItem={paperView}
        style={{width: '100%'}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listView}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  parent: {flex: 1, backgroundColor: theme.COLORS.WHITE},
  marksText: {
    fontSize: theme.SIZES.large * 0.85,
    textAlign: 'right',
    paddingRight: theme.SIZES.small,
    color: theme.COLORS.HEADER,
    fontWeight: 'bold',
  },
  listView: {
    paddingHorizontal: theme.SIZES.small,
    paddingBottom: theme.SIZES.large,
    alignItems: 'center',
  },
  paperViewParent: {
    paddingHorizontal: theme.SIZES.normal * 2,
    paddingVertical: theme.SIZES.small * 0.7,
    borderRadius: theme.SIZES.small,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    borderWidth: 0.4,
    borderColor: theme.COLORS.HEADER,
  },
  paperView: {
    alignItems: 'center',
  },
  subjectName: {
    color: theme.COLORS.PRIMARY,
    fontSize: theme.SIZES.normal * 1.1,
  },
  yearValue: {
    marginTop: 2,
    color: theme.COLORS.PRIMARY,
    fontSize: theme.SIZES.normal * 1.1,
  },
  editButton: {
    borderRadius: theme.SIZES.small * 0.7,
    padding: theme.SIZES.small / 2,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default PaperList;
