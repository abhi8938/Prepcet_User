import 'react-native-gesture-handler';

import React, {useEffect} from 'react';
import {applyMiddleware, combineReducers, createStore} from 'redux';

import {Alert} from 'react-native';
import AlertModal from './Components/modals/AlertModal';
import AppScreens from './Navigation';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import mainReducer from './Store/reducers/main';
import messaging from '@react-native-firebase/messaging';
import notification from './Services/notification';
import userReducer from './Store/reducers/user';

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage);
});
Alert;
const rootReducer = combineReducers({
  user: userReducer,
  main: mainReducer,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
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
    <Provider store={store}>
      <AlertModal />
      <AppScreens />
    </Provider>
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
