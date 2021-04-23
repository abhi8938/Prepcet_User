import {
  FlatList,
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Height, width} from '../Constants/size';
import NoteExpandableView, {Loader} from './NoteExpandableView';
import React, {FunctionComponent, useEffect, useState} from 'react';

import CustomHeader from '../Common/CustomHeader';
import IonicIcons from 'react-native-vector-icons/Ionicons';
import TopNav from './common/TopNavResources';
import getNotesStore from '../State/notesStore';
import theme from '../Constants/theme';
import {useGlobalState} from '../State/GlobalState';

type props = {
  navigation: any;
  route: any;
};

const EmptyComp = ({message}: any) => (
  <View
    style={{
      marginTop: theme.SIZES.large * 0.9,
      paddingBottom: theme.SIZES.large * 0.9,
      alignSelf: 'center',
    }}>
    <Text style={styles.messageStyle}>{message}</Text>
  </View>
);

const NotesDescScreen: FunctionComponent<props> = ({navigation, route}) => {
  const {subjectIndex, paperIndex, paperId} = route.params;
  const {load, getAnnotations, deleteAnn, addNote} = getNotesStore();
  //@ts-ignore
  const {notes, subject} = useGlobalState();
  useEffect(() => {
    getAnnotations(paperId);
  }, []);

  const bookmarks = notes?.ann?.filter((x: any) => x?.type == 'BOOKMARK');
  const highlight = notes?.ann?.filter((x: any) => x?.type == 'HIGHLIGHT');
  // const underline = notes?.ann?.filter((x: any) => x?.type == 'UNDERLINE');

  return (
    <ImageBackground
      source={require('../../assets/images/bg.png')}
      style={styles.parent}
      resizeMode="cover"
      imageStyle={{opacity: 0.03}}>
      <CustomHeader
        navigation={navigation}
        scene={route}
        title={'My Notes'}
        back
        logo
      />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: theme.SIZES.small,
          paddingBottom: theme.SIZES.large,
          paddingTop: theme.SIZES.small,
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 22,
            width: '100%',
            marginBottom: theme.SIZES.normal - 5,
          }}>
          {subject[subjectIndex].name}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: theme.SIZES.small,
          }}>
          <IonicIcons name={'bookmark'} size={25} color={'#656565'} />
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 19,
              color: '#656565',
              marginLeft: theme.SIZES.small / 2,
            }}>
            Bookmarks
          </Text>
        </View>
        <View
          style={{
            marginTop: theme.SIZES.small,
            minHeight: Height * 0.2,
          }}>
          {bookmarks && bookmarks.length !== 0 ? (
            bookmarks?.map((data: any, index: number) => {
              return load === true ? (
                <Loader />
              ) : (
                <View
                  key={`${data.pageCfi}-key`}
                  style={{
                    flexDirection: 'row',
                    borderBottomColor: theme.COLORS.LIGHT_GREY,
                    borderBottomWidth: 2,
                    alignItems: 'center',
                    height: Height * 0.05,
                    paddingHorizontal: theme.SIZES.small / 1.2,
                    backgroundColor: theme.COLORS.DEFAULT,
                  }}>
                  <Text
                    style={{
                      fontSize: theme.SIZES.normal + 2,
                    }}>
                    {data.pageNumber
                      ? `Page No. - ${data.pageNumber}`
                      : `${data.text.substring(0, 25)}...`}
                  </Text>
                  <TouchableOpacity
                    style={{marginLeft: 'auto'}}
                    onPress={() => deleteAnn(data._Id)}>
                    <IonicIcons name={'trash'} size={22} color={'#656565'} />
                  </TouchableOpacity>
                </View>
              );
            })
          ) : (
            <EmptyComp message={'No Bookmarks'} />
          )}
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: theme.SIZES.large,
          }}>
          <IonicIcons name={'bookmark-outline'} size={25} color={'#656565'} />
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 19,
              color: '#656565',
              marginLeft: theme.SIZES.small / 2,
            }}>
            Highlight
          </Text>
        </View>
        {highlight && highlight.length !== 0 ? (
          highlight?.map((data: any, index: number) => (
            <NoteExpandableView
              key={`${data.pageCfi}-key`}
              load={load}
              data={data}
              save={() => addNote(data._id)}
              deleteItem={() => deleteAnn(data._id)}
            />
          ))
        ) : (
          <EmptyComp message={'No Highlights'} />
        )}
      </ScrollView>
    </ImageBackground>
  );
};

export default NotesDescScreen;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: theme.COLORS.WHITE,
  },
  messageStyle: {
    marginTop: theme.SIZES.large * 1.5,
    fontWeight: 'bold',
    color: theme.COLORS.HEADER,
    fontSize: theme.SIZES.large * 1.2,
  },
});
