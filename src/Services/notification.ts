import notifee, {EventType} from '@notifee/react-native';

import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';
import services from './services';
import {set_notifications} from '../Store/actions/main';

const service = new services();
export default class notification {
  async checkHasPermission() {
    const enabled = await messaging().hasPermission();

    if (
      enabled === messaging.AuthorizationStatus.AUTHORIZED ||
      enabled === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      // user has permissions
      return;
    } else if (enabled === messaging.AuthorizationStatus.NOT_DETERMINED) {
      // user doesn't have permission
      const permissionGranted = await messaging().requestPermission({
        sound: true,
        alert: true,
        badge: true,
        provisional: true,
      });
      if (
        permissionGranted === messaging.AuthorizationStatus.AUTHORIZED ||
        permissionGranted === messaging.AuthorizationStatus.PROVISIONAL
      ) {
        Alert.alert('Permission Granted');
        return;
      } else if (permissionGranted === messaging.AuthorizationStatus.DENIED) {
        Alert.alert(
          'Permission Denied',
          'Please allow prepCET to recieve notifications',
          [
            {
              text: 'Okay',
              onPress: () => this.checkHasPermission(),
            },
            {
              text: 'cancel',
              onPress: () => console.log('permission denied'),
            },
          ],
        );
      }
    }
  }
  getNotifications = async () => {
    const notifications = await AsyncStorage.getItem('Notifications');
    if (notifications) return JSON.parse(notifications);
    return null;
  };

  updateNotifications = async (message: any, add: boolean) => {
    const prev: any = await AsyncStorage.getItem('Notifications');
    let New: Array<any> = [];
    if (prev) {
      New = JSON.parse(prev);
      if (add === true) {
        New.push(message);
      } else if (add === false) {
        New = JSON.parse(prev).filter(
          (notification: any) => notification.messageId !== message.messageId,
        );
      }
    } else {
      New = [message];
    }
    console.log('notifications', New);
    await AsyncStorage.setItem('Notifications', JSON.stringify(New));
    return New;
  };

  messageListener(dispatch: any) {
    return messaging().onMessage(async (message: any) => {
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });

      console.log(`notification2`, message);
      //TODO:notificationHandler
      // Show Notification

      await notifee.displayNotification({
        title: message.data.title
          ? message.data.title
          : message.notification.title,
        body: message.data.body ? message.data.body : message.notification.body,
        android: {
          channelId, // optional, defaults to 'ic_launcher'.
          pressAction: {
            id: 'default',
          },
        },
      });
      //TODO:  - save in asyncstorage
      const notifications = await this.updateNotifications(message, true);
      dispatch(set_notifications(notifications));
    });
  }

  onTokenRefresh() {
    return messaging().onTokenRefresh(async (token) => {
      await service.update_student({device_token: token});
    });
  }

  notificationEvent = () => {
    return notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          break;
      }
    });
  };
  getToken = async () => {
    const token = await messaging().getToken();
    return token;
  };
}
