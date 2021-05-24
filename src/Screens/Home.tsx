import {
  Alert,
  BackHandler,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {useSharedValue} from 'react-native-reanimated';
import React, {FunctionComponent, useEffect, useState} from 'react';

import AlertModal from '../Components/modals/AlertModal';
import ErrorScreen from '../Components/common/ErrorScreen';
import theme from '../Constants/theme';

const Home: FunctionComponent = ({navigation, scene}: any) => {
  const translateX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const scale = useSharedValue(1.3);

  const [netFail, setNetFail] = useState(false);
  const backAction = () => {
    Alert.alert('Hold on!', 'Are you sure you want to go back?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'YES', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  };

  useEffect(() => {
    let backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    const focus = navigation.addListener('focus', () => {
      backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
    });
    const blur = navigation.addListener('blur', () => backHandler.remove());
    return () => {
      blur();
      focus();
    };
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: theme.COLORS.WHITE}}>
      <ErrorScreen show={netFail} navigation={navigation} scene={scene} />
      <ImageBackground
        source={require('../Assets/images/bg.png')}
        style={styles.parent}
        resizeMode="cover"
        imageStyle={{opacity: 0.09}}>
        <StatusBar
          backgroundColor={theme.COLORS.DEFAULT}
          barStyle={'dark-content'}
        />

        <Animated.ScrollView
          contentContainerStyle={{
            height: 'auto',
            paddingBottom: theme.SIZES.small,
          }}
          scrollEventThrottle={24}
          style={{
            flex: 1,
            paddingVertical: theme.SIZES.small / 2,
          }}>
          <Text>Home PrepCet</Text>
        </Animated.ScrollView>
        <AlertModal />
      </ImageBackground>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
