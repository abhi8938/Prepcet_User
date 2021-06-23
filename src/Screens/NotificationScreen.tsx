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
import {getNotifications, set_notifications} from '../Store/actions/main';
import {useDispatch, useSelector} from 'react-redux';

import AntIcon from 'react-native-vector-icons/AntDesign';
import {DrawerItem} from '@react-navigation/drawer';
import EmptyScreen from './EmptyScreen';
import OctiIcon from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableRipple} from 'react-native-paper';
import bg from '../../assets/images/bg.png';
import {handleAlert} from '../Store/actions/user';
import services from '../Services/notification';
import theme from '../Constants/theme';

type prop = {
  ondelete: () => void;
  item: any;
};
const NotificationView: FunctionComponent<prop> = ({item, ondelete}) => {
  const sentTime =
    Platform.OS === 'ios'
      ? new Date(parseInt(item.sentTime) * 1000).toLocaleString('en-IN')
      : new Date(item.sentTime).toLocaleString('en-IN');
  return (
    <TouchableRipple
      rippleColor={`${theme.COLORS.PRIMARY}50`}
      borderless={true}
      onPress={ondelete}>
      <View style={styles.notificationParent}>
        <AntIcon
          name={'notification'}
          size={theme.SIZES.large * 1.5}
          color={`${theme.COLORS.PRIMARY}50`}
        />
        <View style={{marginLeft: theme.SIZES.small, flex: 2}}>
          <Text style={styles.notificationTitle}>
            {item.notification.title}
          </Text>
          <Text style={styles.notificationDesc}>{item.notification.body}</Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            flex: 1,
            alignItems: 'center',
          }}>
          <Text style={styles.dateString}>
            {sentTime.split(', ')[0].split('/')[0]}
            {'/'}
            {sentTime.split(', ')[0].split('/')[1]}
            {'/'}
            {sentTime.split(', ')[0].split('/')[2]}
          </Text>
          <Text style={styles.dateString}>
            {sentTime.split(', ')[1].split(':')[0] +
              ':' +
              sentTime.split(', ')[1].split(':')[1] +
              ' ' +
              sentTime.split(', ')[1].split(':')[2].split(' ')[1]}
          </Text>
        </View>
      </View>
    </TouchableRipple>
  );
};

type props = {
  navigation: any;
  route?: any;
};
const service = new services();
const NotificationScreen: FunctionComponent<props> = ({navigation, route}) => {
  const notifications: any = useSelector(
    (state: any) => state.main.notifications,
  );
  const dispatch = useDispatch();
  const handle_alert = (typeOf: string, message: string) => {
    dispatch(handleAlert(typeOf, message));
  };

  const onDelete = async (message: any) => {
    try {
      //* fetch Offers
      await service.updateNotifications(message, false);
      await dispatch(getNotifications());
    } catch (err) {
      handle_alert('ERROR', err.message ? err.message : err);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: theme.COLORS.WHITE}}>
      <ImageBackground
        source={bg}
        style={styles.parent}
        resizeMode="cover"
        imageStyle={{opacity: 0.05}}>
        <FlatList
          keyExtractor={(item: any) => `KEY_${item.messageId}`}
          style={{borderRadius: 8, marginVertical: theme.SIZES.small + 2}}
          data={notifications}
          ListEmptyComponent={<EmptyScreen icon={'ios-notifications'} />}
          renderItem={({item, index}: {item: any; index: number}) => (
            <NotificationView item={item} ondelete={() => onDelete(item)} />
          )}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  dateString: {
    fontSize: theme.SIZES.small + 2,
    color: theme.COLORS.HEADER,
    fontFamily: 'Signika-Medium',
    letterSpacing: 0.7,
    alignSelf: 'flex-end',
    marginVertical: 2.5,
  },
  parent: {
    flex: 1,
    backgroundColor: theme.COLORS.DEFAULT,
  },
  notificationParent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    paddingHorizontal: theme.SIZES.small,
    borderBottomColor: `${theme.COLORS.HEADER}50`,
    borderBottomWidth: 2,
    paddingVertical: theme.SIZES.small,
    backgroundColor: `${theme.COLORS.WHITE}90`,
  },
  notificationTitle: {
    fontSize: theme.SIZES.normal + 1,
    color: theme.COLORS.HEADER,
    fontFamily: 'Signika-SemiBold',
    letterSpacing: 0.9,
  },
  notificationDesc: {
    marginTop: 4,
    // width: '70%',
    fontSize: theme.SIZES.normal - 2,
    color: theme.COLORS.BORDER_COLOR,
    fontFamily: 'Signika-Regular',
    letterSpacing: 0.5,
  },
  touchable: {
    left: 0,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 5.2,
  },
});

export default NotificationScreen;
