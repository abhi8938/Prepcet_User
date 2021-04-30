import {
  Alert,
  BackHandler,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';
import Animated, {useSharedValue} from 'react-native-reanimated';
import React, {FunctionComponent, useEffect, useState} from 'react';

import AlertModal from '../Components/modals/AlertModal';
import Anima from '../Animations/home';
import BroadcastBox from '../Components/BroadcastBox';
import ErrorScreen from '../Components/common/ErrorScreen';
import Header from '../Common/CustomHeader';
import NetInfo from '@react-native-community/netinfo';
import PaperListItem from '../Components/PaperListItem';
import Subscription from '../Components/modals/Subscription';
import baseStyles from '../Components/common/styles';
import theme from '../Constants/theme';
import useAuthState from '../State/AuthState';
import {useGlobalState} from '../State/GlobalState';
import useMainState from '../State/MainState';

const Home: FunctionComponent = ({navigation, scene}: any) => {
  const {animationStyle, newScrollHandler, fontScaleStyle} = Anima();
  const translateX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const scale = useSharedValue(1.3);
  const {load, setLoad, dismissBroadcast} = useMainState();

  const [netFail, setNetFail] = useState(false);
  const [showSubscription, setShowSubscription] = useState(false);
  const {getSubjects, getSubscription, getResources} = useAuthState();
  const globalState: any = useGlobalState();
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
    getSubjects(globalState.user.program._id).then(() => setLoad(false));
    getResources()
      .then((res) => console.log('resources_resp', res))
      .catch((e) => console.log('resources_erro', e));

    const unsubscribe = NetInfo.addEventListener((state) => {
      setNetFail(!state.isConnected);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (globalState.user.status === 'INACTIVE') {
      setShowSubscription(true);
    }
  }, [globalState.user.status]);

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
    <>
      <ErrorScreen show={netFail} navigation={navigation} scene={scene} />
      <Subscription
        show={showSubscription}
        type={'EXPIRED'}
        navigation={navigation}
        message={'Subscription Expired'}
      />

      <ImageBackground
        source={require('../Assets/images/bg.png')}
        style={styles.parent}
        resizeMode="cover"
        imageStyle={{opacity: 0.09}}>
        <StatusBar
          backgroundColor={theme.COLORS.DEFAULT}
          barStyle={'dark-content'}
        />
        <Header
          animations={{
            header: animationStyle(translateX),
            textSize: fontScaleStyle(scale),
          }}
          navigation={navigation}
          scene={scene}
          title={'PrepUni'}
          nav
          bell
          search
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
          }}
          onScroll={newScrollHandler(translationY, translateX, scale)}>
          <BroadcastBox
            load={load}
            title={globalState.broadcast.title}
            message={globalState.broadcast.body}
            show={globalState.broadcast.show}
            onDismiss={() => dismissBroadcast()}
            onPress={() => {}}
          />
          <Text style={baseStyles.heading}>My Courses</Text>
          {
            //@ts-ignore
            globalState.subject.map((item, index) => (
              <PaperListItem
                load={load}
                key={index}
                subject={item}
                onRead={() =>
                  navigation.navigate('PaperList', {id: index, edit: true})
                }
              />
            ))
          }
        </Animated.ScrollView>
        <AlertModal />
      </ImageBackground>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
