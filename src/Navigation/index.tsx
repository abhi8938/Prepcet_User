import {Header, createStackNavigator} from '@react-navigation/stack';
import {Platform, StyleSheet, Text, View} from 'react-native';

import AccountScreen from '../Screens/AccountScreen';
import AllTestScreen from '../Screens/AllTestScreen';
import BrandName from '../Components/common/BrandName';
import Chapter from '../Screens/Chapter';
import Chapters from '../Screens/Chapters';
import CurrentAffairs from '../Screens/CurrentAffairs';
import DoubtScreen from '../Screens/DoubtScreen';
import DoubtsHome from '../Screens/DoubtsHome';
import Entrance from '../Screens/Entrance';
import HeaderLeft from './Headers/HeaderLeft';
import HeaderRight from './Headers/HeaderRight';
import Home from '../Screens/Home';
import HomeSearch from '../Screens/HomeSearch';
import Icon from '../Components/common/Icon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MyDoubtsScreen from '../Screens/MyDoubtsScreen';
import MyResults from '../Screens/MyResults';
import {NavigationContainer} from '@react-navigation/native';
import Notification from '../Screens/NotificationScreen';
import Pacakges from '../Screens/Pacakges';
import Profile from '../Screens/Profile';
import QRscreen from '../Screens/QRscreen';
import React from 'react';
import ResultScreen from '../Screens/ResultScreen';
import SearchDoubt from '../Screens/SearchDoubt';
import SignIn from '../Screens/SignIn';
import SignUp from '../Screens/SignUp';
import Subject from '../Screens/Subject';
import Subjects from '../Screens/Subjects';
import Support from '../Screens/Support';
import TestListScreen from '../Screens/TestListScreen';
import TestScreen from '../Screens/TestScreen';
import WalletScreen from '../Screens/WalletScreen';
import baseStyles from '../Components/common/styles';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import theme from '../Constants/theme';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function MainStack() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color}) => {
          let iconName = '';

          if (route.name === 'Home') {
            iconName = focused ? 'md-home' : 'home-outline';
          } else if (route.name === 'Tests') {
            iconName = focused ? 'ios-book' : 'ios-book-outline';
          } else if (route.name === 'Queries') {
            iconName = focused ? 'reader' : 'reader-outline';
          } else if (route.name === 'Account') {
            iconName = focused ? 'md-settings' : 'md-settings-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={25} color={color} />;
        },
      })}
      barStyle={{
        backgroundColor: theme.COLORS.WHITE,
      }}
      activeColor={theme.COLORS.PRIMARY}
      inactiveColor={theme.COLORS.BORDER_COLOR}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Tests" component={TestStack} />
      <Tab.Screen name="Queries" component={DoubtStack} />
      <Tab.Screen name="Account" component={AccountStack} />
    </Tab.Navigator>
  );
}

function TestStack() {
  return (
    <Stack.Navigator
      initialRouteName="AllTests"
      screenOptions={{
        title: 'Mock Tests',
        headerStyle: styles.headerStyle,
        headerTintColor: styles.headerTintColor,
        headerTitleStyle: styles.headerTitleStyle,
        headerRight: (props) => <HeaderRight {...props} />,
        headerLeft: (props) => <HeaderLeft {...props} />,
      }}>
      <Stack.Screen name="AllTests" component={AllTestScreen} />
      <Stack.Screen name="TestScreen" component={TestScreen} />
      <Stack.Screen name="Result" component={ResultScreen} />
    </Stack.Navigator>
  );
}

function AccountStack() {
  return (
    <Stack.Navigator
      initialRouteName="MyAccount"
      screenOptions={{
        title: 'Account',
        headerStyle: styles.headerStyle,
        headerTintColor: styles.headerTintColor,
        headerTitleStyle: styles.headerTitleStyle,
        headerRight: (props) => <HeaderRight {...props} />,
        headerLeft: (props) => <HeaderLeft {...props} />,
      }}>
      <Stack.Screen name="MyAccount" component={AccountScreen} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Refer and Earn" component={QRscreen} />
      <Stack.Screen name="Support" component={Support} />
      <Stack.Screen name="CurrentAffairs" component={CurrentAffairs} />
      <Stack.Screen name="MyResults" component={MyResults} />
      <Stack.Screen name="Search" component={SearchDoubt} />
    </Stack.Navigator>
  );
}

function DoubtStack() {
  return (
    <Stack.Navigator
      initialRouteName={'DoubtsHome'}
      screenOptions={{
        title: 'Queries',
        headerStyle: styles.headerStyle,
        headerTintColor: styles.headerTintColor,
        headerTitleStyle: styles.headerTitleStyle,
        headerRight: (props) => <HeaderRight {...props} />,
        headerLeft: (props) => <HeaderLeft {...props} />,
      }}>
      <Stack.Screen name="Search" component={SearchDoubt} />
      <Stack.Screen name="DoubtsHome" component={DoubtsHome} />
      <Stack.Screen name="DoubtScreen" component={DoubtScreen} />
      <Stack.Screen name="MyDoubts" component={MyDoubtsScreen} />
    </Stack.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: styles.headerStyle,
        headerTintColor: styles.headerTintColor,
        headerTitleStyle: styles.headerTitleStyle,
        headerRight: (props) => <HeaderRight {...props} />,
        headerLeft: (props) => <HeaderLeft {...props} />,
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={({route}) => ({
          headerTitle: (props) => <BrandName />,
        })}
        initialParams={{name: 'PrepCET'}}
      />
      <Stack.Screen name="SearchHome" component={HomeSearch} />
      <Stack.Screen name="Subjects" component={Subjects} />
      <Stack.Screen name="Subject" component={Subject} />
      <Stack.Screen name="Chapters" component={Chapters} />
      <Stack.Screen name="Chapter" component={Chapter} />
      <Stack.Screen name="TestScreen" component={TestScreen} />
      <Stack.Screen name="Result" component={ResultScreen} />
      <Stack.Screen name="TestList" component={TestListScreen} />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator mode="card" initialRouteName="Signin">
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
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Entrance" headerMode="none">
        <Stack.Screen name="Main" component={MainStack} />
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="Entrance" component={Entrance} />
        <Stack.Screen name="Wallet" component={WalletScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = {
  headerStyle: {
    backgroundColor: '#fff',
    height: Platform.OS === 'ios' ? 100 : 55,
  },
  headerTintColor: theme.COLORS.BORDER,
  headerTitleStyle: {
    fontSize: theme.SIZES.large * 1.4,
    fontFamily: 'Signika-Medium',
    color: theme.COLORS.HEADER,
    marginHorizontal: theme.SIZES.small,
    marginVertical: theme.SIZES.small / 2,
  },
};
