import {
  FlatList,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Height, width} from '../Constants/size';
import React, {FunctionComponent, useEffect, useState} from 'react';

import {DrawerItem} from '@react-navigation/drawer';
import EmptyScreen from './EmptyScreen';
import IonicIcons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import bg from '../../assets/images/bg.png';
import theme from '../Constants/theme';

type prop = {
  ondelete: () => void;
  item: any;
};
const NotificationView: FunctionComponent<prop> = ({item, ondelete}) => {
  console.log('notification item', item);
  return (
    <View style={styles.notificationParent}>
      <IonicIcons
        name={'notifications-circle-outline'}
        size={theme.SIZES.large * 1.4}
        color={'#656565'}
      />
      <View style={{marginLeft: theme.SIZES.small, width: '79%'}}>
        <Text style={styles.notificationTitle}>{item.data.title}</Text>
        <Text style={styles.notificationDesc}>{item.data.body}</Text>
      </View>
      <TouchableOpacity style={{marginLeft: 'auto'}} onPress={ondelete}>
        <IonicIcons
          name={'trash'}
          size={theme.SIZES.large + 2}
          color={'#585757'}
        />
      </TouchableOpacity>
    </View>
  );
};

type props = {
  navigation: any;
  route?: any;
};
const NotificationScreen: FunctionComponent<props> = ({navigation, route}) => {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.COLORS.WHITE}}>
      <ImageBackground
        source={bg}
        style={styles.parent}
        resizeMode="cover"
        imageStyle={{opacity: 0.05}}>
        <FlatList
          keyExtractor={(item: any) =>
            `KEY_${item.id !== undefined ? item.id : item}`
          }
          style={{borderRadius: 8, marginVertical: theme.SIZES.small + 2}}
          data={[]} //connect to state
          ListEmptyComponent={<EmptyScreen icon={'ios-notifications'} />}
          renderItem={({item, index}: {item: any; index: number}) => (
            <NotificationView
              item={item}
              ondelete={() => console.log(`delete`, index)}
            />
          )}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: theme.COLORS.DEFAULT,
  },
  notificationParent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: theme.SIZES.small,
    borderBottomColor: theme.COLORS.LIGHT_GREY,
    borderBottomWidth: 2,
    paddingVertical: theme.SIZES.small / 2,
  },
  notificationTitle: {
    fontSize: theme.SIZES.normal,
    color: theme.COLORS.BLACK,
    fontFamily: 'Signika-SemiBold',
  },
  notificationDesc: {
    marginTop: theme.SIZES.small / 6,
    width: '80%',
    fontSize: theme.SIZES.normal,
    color: theme.COLORS.BLACK,
    fontFamily: 'Signika-Regular',
  },
});

export default NotificationScreen;
