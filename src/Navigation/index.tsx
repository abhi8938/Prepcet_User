import {Header, createStackNavigator} from '@react-navigation/stack';
import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';

import AccountScreen from '../Screens/AccountScreen';
import AllTestScreen from '../Screens/AllTestScreen';
import BookmarkScreen from '../Screens/BookmarkScreen';
import BrandName from '../Components/common/BrandName';
import Category from '../Screens/Category';
import Chapter from '../Screens/Chapter';
import Chapters from '../Screens/Chapters';
import CurrentAffairs from '../Screens/CurrentAffairs';
import DailyLectureScreen from '../Screens/DailyLectureScreen';
import DailyQuizScreen from '../Screens/DailyQuizScreen';
import DailyVocabScreen from '../Screens/DailyVocabScreen';
import DocumentScreen from '../Screens/DocumentScreen';
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
import Orders from '../Screens/Orders';
import PreviouPaperScreen from '../Screens/PreviouPaperScreen';
import Profile from '../Screens/Profile';
import QRscreen from '../Screens/QRscreen';
import Resources from '../Screens/Resources';
import ResultScreen from '../Screens/ResultScreen';
import SearchDoubt from '../Screens/SearchDoubt';
import SignIn from '../Screens/SignIn';
import SignUp from '../Screens/SignUp';
import Subject from '../Screens/Subject';
import Subjects from '../Screens/Subjects';
import Support from '../Screens/Support';
import TestBrief from '../Screens/TestBrief';
import TestListScreen from '../Screens/TestListScreen';
import TestScreen from '../Screens/TestScreen';
import WalletScreen from '../Screens/WalletScreen';
import baseStyles from '../Components/common/styles';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import theme from '../Constants/theme';
import {useSelector} from 'react-redux';

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
        headerStyle: styles.headerStyle,
        headerTintColor: styles.headerTintColor,
        headerTitleStyle: styles.headerTitleStyle,
        headerTitleContainerStyle: {
          alignItems: 'center',
          paddingRight: Platform.OS === 'ios' ? 0 : 20,
        },
        headerLeftContainerStyle: styles.headerLeft,
      }}>
      <Stack.Screen
        name="AllTests"
        options={({route, navigation}) => ({
          title: 'Mock Tests',

          headerRight: (props) => (
            <HeaderRight {...props} navigation={navigation} />
          ),
          headerLeft: (props) => (
            <HeaderLeft {...props} navigation={navigation} />
          ),
          headerTitleContainerStyle: {
            alignItems: 'center',
            paddingRight: Platform.OS === 'ios' ? 10 : 20,
          },
        })}
        component={AllTestScreen}
      />
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
        headerLeftContainerStyle: styles.headerLeft,
        headerTitleContainerStyle: {
          alignItems: 'center',
          paddingRight: Platform.OS === 'ios' ? 0 : 20,
        },
        headerTitleStyle: styles.headerTitleStyle,
      }}>
      <Stack.Screen
        name="MyAccount"
        options={({route, navigation}) => ({
          headerRight: (props) => (
            <HeaderRight {...props} navigation={navigation} />
          ),
          headerLeft: (props) => (
            <HeaderLeft {...props} navigation={navigation} />
          ),
          headerTitleContainerStyle: {
            alignItems: 'center',
            paddingRight: Platform.OS === 'ios' ? 0 : 20,
          },
        })}
        component={AccountScreen}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Your Profile',
        }}
      />
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen name="QRscreen" component={QRscreen} />
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
        headerLeftContainerStyle: styles.headerLeft,
        headerTitleStyle: styles.headerTitleStyle,
        headerTitleContainerStyle: {
          alignItems: 'center',
          paddingRight: Platform.OS === 'ios' ? 0 : 20,
        },
      }}>
      <Stack.Screen name="Search" component={SearchDoubt} />
      <Stack.Screen
        name="DoubtsHome"
        options={({route, navigation}) => ({
          headerRight: (props) => (
            <HeaderRight {...props} navigation={navigation} />
          ),
          headerLeft: (props) => (
            <HeaderLeft {...props} navigation={navigation} />
          ),
          headerTitleContainerStyle: {
            alignItems: 'center',
            paddingRight: Platform.OS === 'ios' ? 0 : 20,
          },
        })}
        component={DoubtsHome}
      />
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
        headerLeftContainerStyle: styles.headerLeft,
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={({route, navigation}) => ({
          headerTitle: (props) => <BrandName />,
          headerRight: (props) => (
            <HeaderRight {...props} navigation={navigation} />
          ),
          headerLeft: (props) => (
            <HeaderLeft {...props} navigation={navigation} />
          ),
          headerTitleContainerStyle: {
            alignItems: 'center',
            paddingRight: Platform.OS === 'ios' ? 0 : 20,
          },
        })}
      />
      <Stack.Screen
        name="SearchHome"
        options={({route, navigation}) => ({
          headerShown: true,
          headerTintColor: theme.COLORS.HEADER,
          title: 'Search',
        })}
        component={HomeSearch}
      />
      {/* <Stack.Screen name="Subjects" component={Subjects} /> */}
      {/* <Stack.Screen name="Subject" component={Subject} /> */}
      <Stack.Screen name="Chapters" component={Chapters} />
      <Stack.Screen name="Chapter" component={Chapter} />
      <Stack.Screen name="TestScreen" component={TestScreen} />
      <Stack.Screen name="Result" component={ResultScreen} />
      <Stack.Screen name="TestList" component={TestListScreen} />
      <Stack.Screen name="Resources" component={Resources} />
      <Stack.Screen name="DailyQuiz" component={DailyQuizScreen} />
      <Stack.Screen name="DailyLecture" component={DailyLectureScreen} />
      <Stack.Screen name="DailyVocab" component={DailyVocabScreen} />
      <Stack.Screen name="PreviousPapers" component={PreviouPaperScreen} />
      <Stack.Screen name="Bookmarks" component={BookmarkScreen} />
      <Stack.Screen name="Documents" component={DocumentScreen} />
      <Stack.Screen name="TestBrief" component={TestBrief} />
      <Stack.Screen name="CurrentAffairs" component={CurrentAffairs} />
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
  const state = useSelector((state: any) => state);
  useEffect(() => {
    console.log('state', state);
  }, [state]);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Entrance"
        screenOptions={{
          headerStyle: {elevation: 1},
        }}>
        <Stack.Screen
          name="Main"
          options={{headerShown: false}}
          component={MainStack}
        />
        <Stack.Screen
          name="Auth"
          options={{headerShown: false}}
          component={AuthStack}
        />
        <Stack.Screen
          name="Notification"
          options={({route, navigation}) => ({
            headerShown: true,
            headerBackTitle: 'Home',
            headerTintColor: theme.COLORS.HEADER,
            title: 'Notifications',
          })}
          component={Notification}
        />
        <Stack.Screen
          name="Entrance"
          options={{headerShown: false}}
          component={Entrance}
        />
        <Stack.Screen
          name="Wallet"
          options={({route, navigation}) => ({
            headerShown: true,
            headerBackTitle: 'Home',
            headerTintColor: theme.COLORS.HEADER,
            title: 'PrepCoin',
          })}
          component={WalletScreen}
        />
        <Stack.Screen
          name="Category"
          options={({route, navigation}) => ({
            headerShown: true,
            headerBackTitle: 'Home',
            headerTintColor: theme.COLORS.HEADER,
            title: 'Select Category',
            headerRight: (props) =>
              Platform.OS === 'android' ? <BrandName /> : null,
          })}
          component={Category}
        />
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
  headerTintColor: theme.COLORS.BORDER_TEXT,
  headerTitleStyle: {
    fontSize: theme.SIZES.large * 1.3,
    fontFamily: 'Signika-Medium',
    color: theme.COLORS.HEADER,
    marginHorizontal: theme.SIZES.small,
  },
  headerLeft: {
    paddingLeft: 5,
  },
};
