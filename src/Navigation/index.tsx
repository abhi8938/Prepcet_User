import {Header, createStackNavigator} from '@react-navigation/stack';

import CustomDrawer from '../Common/CustomDrawer';
import CustomHeader from '../Common/CustomHeader';
import DatesheetScreen from '../Screens/DatesheetScreen';
import Details from '../Screens/Details';
import Entrance from '../Screens/Entrance';
import ExaminationCenter from '../Screens/ExaminationCenter';
import Home from '../Screens/Home';
import NotesDescScreen from '../Components/NotesDescScreen';
import NotesScreen from '../Screens/NotesScreen';
import Notification from '../Screens/NotificationScreen';
import PackageScreen from '../Screens/PackageScreen';
import Profile from '../Screens/Profile';
import React from 'react';
import Reader from '../Screens/Reader';
import SearchScreen from '../Screens/SearchScreen';
import SignIn from '../Screens/SignIn';
import SignUp from '../Screens/SignUp';
import Subscription from '../Screens/Subscription';
import Support from '../Screens/Support';
import SyllabusScreen from '../Screens/SyllabusScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import PaperList from '../Screens/PaperList';
import SubjectOverviewScreen from '../Screens/SubjectOverviewScreen';
import QRscreen from '../Screens/QRscreen';

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

function MainStack() {
  return (
    <Drawer.Navigator
      openByDefault={false}
      drawerContent={(props) => <CustomDrawer {...props} />}
      initialRouteName="Home"
      drawerType={'slide'}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Syllabus" component={SyllabusScreen} />
      {/* <Drawer.Screen name="Subscription" component={Subscription} /> */}
      <Drawer.Screen name="Center" component={ExaminationCenter} />
      <Drawer.Screen name="Datesheet" component={DatesheetScreen} />
      <Drawer.Screen name="Notes" component={NotesScreen} />
      <Drawer.Screen name="Refer and Earn" component={QRscreen} />
      <Drawer.Screen name="Support" component={Support} />
    </Drawer.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator mode="card" initialRouteName="Signin" headerMode="screen">
      <Stack.Screen
        name="Signin"
        component={SignIn}
        options={{
          header: ({navigation, scene}) => null,
        }}
      />
      <Stack.Screen
        name="Signup"
        component={SignUp}
        options={{
          header: ({navigation, scene}) => null,
        }}
      />
    </Stack.Navigator>
  );
}

const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName="Entrance" headerMode="none">
      <Stack.Screen name="Main" component={MainStack} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Packages" component={PackageScreen} />
      <Stack.Screen name="Auth" component={AuthStack} />
      <Stack.Screen name="Reader" component={Reader} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Entrance" component={Entrance} />
      <Stack.Screen name="Notesdesc" component={NotesDescScreen} />
      <Stack.Screen name="PaperList" component={PaperList} />
      <Stack.Screen name="SubjectOverview" component={SubjectOverviewScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
};

export default Navigation;
