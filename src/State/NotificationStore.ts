import {useDispatcher, useGlobalState} from './GlobalState';

import Notification from '../Screens/Notification';
import notification from '../Services/notification';
import {useState} from 'react';

const service = new notification();

const notificationStore = () => {
  const dispatcher = useDispatcher();
  const notificaitonData = [
    {
      title: 'Welcome to PrepUni',
      description: 'Your Account has been created',
    },
    {
      title: 'Welcome to PrepUni',
      description: 'Your Account has been created',
    },
    {
      title: 'Welcome to PrepUni',
      description: 'Your Account has been created',
    },
  ];
  const globalState: any = useGlobalState();
  const [notification, setNotification] = useState([...notificaitonData]);
  const [load, setLoad] = useState(false);
  const deleteNotification = (index: number) => {
    let data = JSON.parse(JSON.stringify(globalState.notifications));
    data.splice(index, 1);
    service.updateNotifications(globalState.notifications[index], false);
    dispatcher({type: 'SET-NOTIFICATIONS', payload: data});
  };
  const getData = async () => {
    setLoad(true);
    //get notifications
    const notifications = await service.getNotifications();
    if (notifications !== null)
      dispatcher({type: 'SET-NOTIFICATIONS', payload: notifications});
    if (notifications === null)
      dispatcher({type: 'SET-NOTIFICATIONS', payload: []});
    console.log('notifications', notifications);
    setLoad(false);
  };
  return {notification, deleteNotification, getData};
};

export default notificationStore;
