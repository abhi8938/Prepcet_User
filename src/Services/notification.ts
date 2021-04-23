import notifee, {EventType} from '@notifee/react-native';

import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';
import {useDispatcher} from '../State/GlobalState';

export default class notification {
  async checkHasPermission() {
    const enabled = await messaging().hasPermission();
    if (enabled) {
      // user has permissions
      return;
    } else {
      console.log('NOT ENABLED notification Permission');
      // user doesn't have permission
      try {
        await messaging().requestPermission();
        Alert.alert('permission granted');
        // User has authorised
      } catch (error) {
        Alert.alert('not granted');
        // User has rejected permissions
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
    return null;
  };

  messageListener() {
    return messaging().onMessage(async (message: any) => {
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });

      console.log(`notification2`, message);
      //TODO:notificationHandler
      // Show Notification

      await notifee.displayNotification({
        title: message.data.title ? message.data.title : 'Test',
        body: message.data.body ? message.data.body : 'body',
        android: {
          channelId, // optional, defaults to 'ic_launcher'.
          pressAction: {
            id: 'default',
          },
        },
      });
      //TODO:  - save in asyncstorage
      this.updateNotifications(message, true);
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
    console.log('token', token);
    return token;
  };
}
