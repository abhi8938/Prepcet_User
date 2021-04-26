import 'react-native-gesture-handler';

import {Alert, StyleSheet, Text, View} from 'react-native';
import {Height, width} from './Constants/size';
import React, {FunctionComponent, useEffect, useState} from 'react';

import AlertModal from './Components/modals/AlertModal';
import AppScreens from './Navigation';
import {GlobalState} from './State/GlobalState';
import {NavigationContainer} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import notification from './Services/notification';

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage);
});
Alert;
const service = new notification();
const App = ({}) => {
  // const {alert, handleAlert} = useAuthState();
  const check = async () => {
    await service.checkHasPermission();
  };
  useEffect(() => {
    check();
    const unsubscribe = service.messageListener();
    const unsubscribe_notification = service.notificationEvent();
    return () => {
      unsubscribe_notification;
      unsubscribe;
    };
  }, []);

  return (
    <GlobalState>
      <AlertModal />
      <NavigationContainer>
        <AppScreens />
      </NavigationContainer>
    </GlobalState>
  );
};

function HeadlessCheck({isHeadless}: any) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }
  return <App />;
}

export default HeadlessCheck;

const styles = StyleSheet.create({});
