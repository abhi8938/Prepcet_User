import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
/**
 * TODO: Create Notification Screen
 * Show notifications
 * clear on click
 */
import React, {FunctionComponent, useEffect, useState} from 'react';

import CustomHeader from '../Common/CustomHeader';
import Header from '../Common/CustomHeader1';
import notification from '../Services/notification';
import {sample_notifications} from '../Constants/sample';
import theme from '../Constants/theme';

const service = new notification();

const render_notification = ({item}: any, onPress: () => void) => {
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={[notification_styles.parent, styles.shadow]}>
      <View style={notification_styles.inner_container}>
        <Text style={notification_styles.title}>
          {item.data !== undefined ? item.data.title : ''}
        </Text>
        <Text style={notification_styles.body}>
          {item.data !== undefined ? item.data.body : ''}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const notification_styles = StyleSheet.create({
  body: {
    width: '99%',
    paddingHorizontal: 5,
    fontSize: theme.SIZES.normal - 2,
    fontFamily: 'Comfortaa-SemiBold',
    color: theme.COLORS.BLACK,
    lineHeight: 24,
  },
  inner_container: {
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 11,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  parent: {
    marginVertical: theme.SIZES.small - 5,
    width: '99%',
    backgroundColor: theme.COLORS.DEFAULT,
    borderRadius: 11,
  },
  title: {
    marginBottom: 5,
    paddingHorizontal: 5,
    fontSize: theme.SIZES.normal + 2,
    fontFamily: 'Signika-Bold',
    color: theme.COLORS.DEFAULT,
  },
});

type props = {
  navigation?: any;
  notifications?: any;
  route?: any;
};
const Notification: FunctionComponent<props> = ({
  navigation,
  notifications = [1, 2, 3],
  route,
}) => {
  const [data, setData] = useState(notifications);
  const [load, setLoad] = useState(data);
  const getData = async () => {
    setLoad(true);
    //get notifications
    const notifications = await service.getNotifications();
    if (notifications !== null) setData(notifications);
    if (notifications === null) setData([]);
    console.log('notifications', notifications);
    setLoad(false);
  };
  useEffect(() => {
    getData();
    return () => {};
  }, []);

  return (
    <View style={styles.parent}>
      <StatusBar
        backgroundColor={theme.COLORS.DEFAULT}
        barStyle={'dark-content'}
      />
      <CustomHeader
        navigation={navigation}
        scene={route}
        title={'Notifications'}
        nav
      />
      <View style={[styles.firstChild, styles.shadow]}>
        {/* TODO: Create list of subjects - SubjectItem */}
        <FlatList
          ListEmptyComponent={
            <View style={styles.empty_container}>
              <Text style={styles.title}>No Notifications</Text>
            </View>
          }
          numColumns={1}
          style={styles.subjects_list}
          data={data}
          keyExtractor={(item: any) =>
            `KEY_${item.id !== undefined ? item.id : item}`
          }
          renderItem={({item}: any) =>
            render_notification({item}, () => {
              service.updateNotifications(item, false);
              let New = data.filter(
                (notification: any) =>
                  notification.messageId !== item.messageId,
              );
              setData(New);
            })
          }
        />
      </View>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  title: {
    fontSize: theme.SIZES.normal + 1,
    fontFamily: 'Comfortaa-Bold',
    fontWeight: '500',
    color: theme.COLORS.BLACK,
  },
  empty_container: {
    paddingHorizontal: theme.SIZES.small,
    paddingVertical: theme.SIZES.small,
    width: '95%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 11,
    flexDirection: 'column',
  },
  subjects_list: {
    borderRadius: 8,
    marginVertical: theme.SIZES.small + 2,
  },
  parent: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: theme.COLORS.DEFAULT,
    paddingTop: Platform.OS === 'ios' ? theme.SIZES.large * 1.42 : 0,
  },
  firstChild: {
    flex: 0.9,
    margin: theme.SIZES.small - 3,
    backgroundColor: '#ccc',
    padding: theme.SIZES.small - 2,
    borderRadius: 8,
  },
  secondChild: {
    flex: 2,
    margin: theme.SIZES.small - 3,
    backgroundColor: '#ccc',
    padding: theme.SIZES.small,
    marginBottom: theme.SIZES.normal,
  },
  sectionTitle: {
    fontSize: theme.SIZES.large - 2,
    fontFamily: 'Comfortaa-Bold',
    color: theme.COLORS.DEFAULT,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 3,
    shadowOpacity: 0.5,
    elevation: 2,
  },
});
