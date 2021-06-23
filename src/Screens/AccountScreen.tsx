import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FunctionComponent, useState} from 'react';
import {
  facebook_logout,
  handleAlert,
  logout,
  signOutGoogle,
} from '../Store/actions/user';
import {useDispatch, useSelector} from 'react-redux';

import {ACCOUNT_LIST} from '../Constants/sample';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import Verticallist from '../Components/common/VerticallistItem';
import VerticallistItem from '../Components/common/VerticallistItem';
import baseStyles from '../Components/common/styles';
import theme from '../Constants/theme';
import {width} from '../Constants/size';

type props = {
  navigation?: any;
  scene?: any;
};

const AccountScreen: FunctionComponent<props> = ({navigation, scene}) => {
  const dispatch = useDispatch();
  const handle_alert = (typeOf: string, message: string) => {
    dispatch(handleAlert(typeOf, message));
  };
  const user = useSelector((state: any) => state.user.user);
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('TOKEN');
      await AsyncStorage.removeItem('CATEGORY');
      user.signin_method === 'GOOGLE' && (await signOutGoogle());
      user.signin_method === 'FACEBOOK' && (await facebook_logout());
      return navigation.replace('Auth');
    } catch (error) {
      handle_alert('ERROR', error.message ? error.message : error);
    }
  };
  return (
    <ImageBackground
      source={require('../Assets/images/bg.png')}
      style={[baseStyles.parent, styles.parent]}
      resizeMode="cover"
      imageStyle={{opacity: 0.05}}>
      <ScrollView>
        <View
          style={{
            flex: 1,
            width: width,
            alignItems: 'center',
            paddingVertical: theme.SIZES.large,
          }}>
          {ACCOUNT_LIST.map((item, index) => (
            <VerticallistItem
              key={`${item.name}_${item.id}`}
              name={item.name}
              icon={item.icon}
              onPress={() =>
                item.name === 'Logout'
                  ? logout()
                  : navigation.navigate(item.route)
              }
              nogap
              first={item.first}
              last={item.last}
            />
          ))}
        </View>
        <Text style={styles.copyrightText}>© DigitalLuxeServices</Text>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  parent: {
    paddingVertical: theme.SIZES.normal,
  },
  messageStyle: {
    marginTop: theme.SIZES.large * 1.5,
    fontWeight: 'bold',
    color: theme.COLORS.HEADER,
    fontSize: theme.SIZES.large * 1.2,
  },
  copyrightText: {
    color: theme.COLORS.HEADER,
    fontSize: theme.SIZES.large,
    alignSelf: 'center',
    fontFamily: 'ComicNeue-Bold',
  },
});
export default AccountScreen;
