import {
  Alert,
  Dimensions,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  useAnimatedProps,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {Height, width} from '../Constants/size';
import React, {FunctionComponent, useEffect, useState} from 'react';
import {getUser, handleAlert} from '../Store/actions/user';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import theme from '../Constants/theme';
import {useDispatch} from 'react-redux';

type props = {
  navigation: any;
  route: any;
};

const Entrance: FunctionComponent<props> = ({navigation, route}) => {
  const dispatch = useDispatch();
  const size = useSharedValue({
    width: width / 2.5,
    // height: Height / ,
  });
  const handle_alert = (typeOf: string, message: string) => {
    dispatch(handleAlert(typeOf, message));
  };

  const validateOtp = async () => {
    const checkExpiry = (code: any) => {
      var selectedDate = new Date(code.created_at);
      var now = new Date();
      now.setHours(0, 0, 0, 0);
      selectedDate.setDate(selectedDate.getDate() + 1);
      if (selectedDate < now) {
        return true;
      }
      return false;
    };
    const verifyOtp: any = await AsyncStorage.getItem('VERIFY');
    if (verifyOtp) {
      if (checkExpiry(JSON.parse(verifyOtp)))
        await AsyncStorage.removeItem('VERIFY');
    }

    const resendOtp: any = await AsyncStorage.getItem('RESEND');
    if (resendOtp) {
      if (checkExpiry(JSON.parse(resendOtp)))
        await AsyncStorage.removeItem('RESEND');
    }
    return;
  };

  const isUser = async () => {
    const token = await AsyncStorage.getItem('TOKEN');
    if (token !== null) {
      try {
        await dispatch(getUser());
      } catch (err) {
        handle_alert('ERROR', err.message);
      }

      return 'Main';
    } else {
      return 'Auth';
    }
  };
  useEffect(() => {
    size.value = {
      width: width / 1.2,
    };
    validateOtp();
    setTimeout(
      () => {
        isUser()
          .then((route) => {
            Platform.OS === 'android' && SplashScreen.hide();
            navigation.replace(route);
          })
          .catch((error) => {
            Platform.OS === 'android' && SplashScreen.hide();
            navigation.replace('Auth');
          });
      },
      Platform.OS === 'android' ? 0 : 1100,
    );
  }, []);
  const animations = useAnimatedStyle(() => {
    return {
      width: withTiming(size.value.width, {
        duration: Platform.OS === 'android' ? 0 : 1000,
      }),
    };
  });
  return (
    <>
      {Platform.OS !== 'android' && (
        <SafeAreaView style={styles.parent}>
          <Animated.Image
            style={[
              {
                backgroundColor: theme.COLORS.DEFAULT,
                resizeMode: 'contain',
              },
              animations,
            ]}
            source={require('../Assets/images/prepuni_logo.jpg')}
          />
        </SafeAreaView>
      )}
    </>
  );
};

export default Entrance;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.COLORS.DEFAULT,
  },
  text: {
    fontSize: theme.SIZES.normal,
    fontFamily: 'Comfortaa-SemiBold',
  },
  prepuni: {
    width: width,
    height: 'auto',
    resizeMode: 'cover',
    backgroundColor: '#ccc',
  },
});
