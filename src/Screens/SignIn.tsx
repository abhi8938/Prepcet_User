//TODO:
// Make the slider paginated view (done)
// Align the Slider and rest of view perfectly (done)
// give margins between views (done)
// attach listeners on signup and forgot password

import {
  Alert,
  BackHandler,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  Login,
  UpdatePassword,
  VerifyCode,
  handleAlert,
  handleControls,
  handleFVU,
  handleLogin,
  loginWithFacebook,
  resetModal,
  sendCodeMail,
  sendCodePhone,
  signInGoogle,
} from '../Store/actions/user';
import React, {FunctionComponent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import AuthHeader from '../Components/common/AuthHeader';
import ErrorScreen from '../Components/common/ErrorScreen';
import FVUModal from '../Components/modals/FVU';
import GradientButton from '../Components/GradientButton';
import {Height} from '../Constants/size';
import NetInfo from '@react-native-community/netinfo';
import OrSection from '../Components/OrSection';
import {SafeAreaView} from 'react-native-safe-area-context';
import Snackbar from 'react-native-snackbar';
import SocialAuth from '../Components/SocialAuth';
import TextField from '../Components/common/TextField';
import Touchable from '../Components/common/Touchable';
import {WEB_CLIENT_ID} from '../Constants/urls';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import theme from '../Constants/theme';

type props = {
  navigation: any;
  scene: any;
};

const SignIn: FunctionComponent<props> = ({navigation, scene}) => {
  const [load, setLoad] = useState({
    vemail: false,
    vcontact: false,
    update: false,
    resend: false,
    signin: false,
    google: false,
    facebook: false,
    disable: false,
  });
  const [social, setSocial]: any = useState('NONE');

  const handleLoad = (
    key:
      | 'vemail'
      | 'vcontact'
      | 'update'
      | 'resend'
      | 'signin'
      | 'google'
      | 'facebook'
      | 'disable',
    value: boolean,
  ) => {
    let x: any = {...load};
    x[key] = value;
    if (key === 'vemail' || key === 'vcontact') {
      x['resend'] = value;
    }
    for (let k in x) {
      if (k !== 'disable' && x[k] === true) {
        x['disable'] = true;
        break;
      }
    }
    setLoad(x);
  };
  const login = useSelector((state: any) => state.user.login);
  const [error, setError] = useState(null);
  const controls = useSelector((state: any) => state.user.controls);
  const FVU = useSelector((state: any) => state.user.FVU);
  const user = useSelector((state: any) => state.user.user);
  const dispatch = useDispatch();
  const handle_alert = (typeOf: string, message: string) => {
    dispatch(handleAlert(typeOf, message));
  };
  const handleInput = (key: any, key1: any, value: any) => {
    dispatch(handleLogin(key, key1, value));
  };
  const control = (key: any, value: any) => {
    dispatch(handleControls(key, value));
  };
  const handle_fvu = (key: any, key1: any, value: any) => {
    dispatch(handleFVU(key, key1, value));
  };
  const reset_modal = () => {
    dispatch(resetModal());
  };
  const send_code_mail = async (email: string) => {
    try {
      handleLoad('vemail', true);
      await dispatch(sendCodeMail(email, 'EMAIL-RESET'));
      handleLoad('vemail', false);
    } catch (err) {
      handleLoad('vemail', false);
      setError(err.message);
      Snackbar.show({
        text: err.message,
        duration: Snackbar.LENGTH_SHORT,
        textColor: theme.COLORS.ERROR,
      });
    }
  };
  const send_code_phone = async (contact: string) => {
    try {
      handleLoad('vcontact', true);
      await dispatch(sendCodePhone(contact, 'CONTACT-RESET'));
      handleLoad('vcontact', false);
    } catch (err) {
      handleLoad('vcontact', false);
      setError(err.message);
      Snackbar.show({
        text: err.message,
        duration: Snackbar.LENGTH_SHORT,
        textColor: theme.COLORS.ERROR,
      });
    }
  };
  const update_password = async (password: string) => {
    try {
      if (password.length === 0) {
        handle_fvu('password', 'error_message', 'Password is empty');
        Vibration.vibrate();
        throw new Error('Password is empty');
      }
      if (FVU.password.error_message.length !== 0) {
        Vibration.vibrate();
        throw new Error(FVU.password.error_message);
      }
      if (FVU.password_again.error_message.length !== 0) {
        Vibration.vibrate();
        throw new Error(FVU.password_again.error_message);
      }
      handleLoad('update', true);
      await dispatch(UpdatePassword(password, FVU.email.text.toLowerCase()));
      handleLoad('update', false);
    } catch (error) {
      setError(error.message);
      handleLoad('update', false);
      Snackbar.show({
        text: error.message,
        duration: Snackbar.LENGTH_SHORT,
        textColor: theme.COLORS.ERROR,
      });
    }
  };
  const verify_code = () => {
    dispatch(VerifyCode());
  };
  const handle_controls = (key: any, value: any) => {
    dispatch(handleControls(key, value));
  };
  const signin = async () => {
    try {
      if (login.id.text.length === 0 || login.password.text.length === 0)
        throw new Error(
          `${
            login.id.text.length === 0 ? 'Email / Contact' : 'password'
          } is empty`,
        );
      if (
        login.id.error_message.length !== 0 &&
        login.password.error_message.length !== 0
      )
        throw new Error(
          `${
            login.id.error_message.length === 0
              ? login.id.error_message
              : login.password.error_message
          }`,
        );
      let loginData = {
        id: login.id.text.toLowerCase(),
        password: login.password.text,
      };
      console.log('loginData', loginData);
      handleLoad('signin', true);
      await dispatch(Login(navigation, loginData));
      handleLoad('signin', false);
    } catch (err) {
      setError(err.message);
      handleLoad('signin', false);
      handle_alert('ERROR', err.message);
    }
  };
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
  const [netFail, setNetFail] = useState(false);

  const configureGoogleSign = () => {
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
      offlineAccess: false,
    });
  };
  //* NET FAIL
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setNetFail(!state.isConnected);
    });
    return unsubscribe;
  }, []);
  //* BACK HANDLER
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);
  //* DYNAMIC LINKS
  useEffect(() => {
    const unsubscribe = dynamicLinks().onLink((link) => {
      if (link) {
        console.log('referal', link.url.split('/')[3]);
      }
      setTimeout(() => {
        Snackbar.show({
          text: 'Referal Applied!',
          duration: Snackbar.LENGTH_SHORT,
        });
      }, 10);
      navigation.navigate('Signup', {referal: link.url.split('/')[3]});
    });
    dynamicLinks()
      .getInitialLink()
      .then((link) => {
        if (link) {
          console.log('referal', link.url.split('/')[3]);
          setTimeout(() => {
            Snackbar.show({
              text: 'Referal Applied!',
              duration: Snackbar.LENGTH_SHORT,
            });
          }, 10);
          navigation.navigate('Signup', {referal: link.url.split('/')[3]});
        }
      });
    return () => unsubscribe();
  }, []);

  //*google signin
  useEffect(() => {
    configureGoogleSign();
  }, []);

  const google_signin = async () => {
    try {
      handleLoad('google', true);
      await dispatch(signInGoogle(navigation));
      handleLoad('google', false);
    } catch (err) {
      handleLoad('google', false);
      handle_alert('ERROR', err.message);
    }
  };
  const facebook_signin = async () => {
    try {
      handleLoad('facebook', true);
      await dispatch(loginWithFacebook(navigation));
      handleLoad('facebook', false);
    } catch (err) {
      handleLoad('facebook', false);
      handle_alert('ERROR', err.message);
    }
  };

  return (
    <SafeAreaView
      style={[styles.parent, {backgroundColor: theme.COLORS.WHITE}]}>
      <ImageBackground
        source={require('../Assets/images/bg.png')}
        style={styles.parent}
        resizeMode="cover"
        imageStyle={{opacity: 0.05}}>
        <ErrorScreen show={netFail} navigation={navigation} scene={scene} />
        <View style={styles.parent}>
          <StatusBar
            backgroundColor={theme.COLORS.DEFAULT}
            barStyle={'dark-content'}
          />
          <AuthHeader pageTitle={'Sign In'} back={false} />
          <KeyboardAvoidingView
            style={{height: Height * 0.55}}
            enabled={true}
            behavior={Platform.OS === 'ios' ? 'position' : 'position'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 19}>
            <View style={styles.groupView}>
              <TextField
                inputProps={{
                  placeholder: 'Email / Contact',
                  value: login.id.text,
                  onChangeText: (text) => {
                    handleInput('id', 'text', text);
                  },
                  onBlur: () => handleInput('id', 'active', false),
                  onFocus: () => handleInput('id', 'active', true),
                }}
                error={login.id.error_message}
              />
              <TextField
                inputProps={{
                  placeholder: 'Password',
                  value: login.password.text,
                  onChangeText: (text) => {
                    handleInput('password', 'text', text);
                  },
                  onBlur: () => handleInput('password', 'active', false),
                  onFocus: () => handleInput('password', 'active', true),
                }}
                secureText={{
                  onToggle: () =>
                    handleInput('password', 'show', !login.password.show),
                  hidden: login.password.show,
                }}
                error={login.password.error_message}
              />
            </View>
            <TouchableOpacity
              disabled={load.signin}
              style={styles.forgotContainer}
              onPress={() => {
                control('FVU', 'EMAIL');
              }}>
              <Text style={[styles.link, styles.text]}>Forgot password ?</Text>
            </TouchableOpacity>
            <View style={[styles.groupView, {alignItems: 'center'}]}>
              <GradientButton
                loading={load.signin}
                loadingText={'...'}
                touchableProps={{
                  onPress: signin,
                  disabled: load.disable,
                }}
                title={'Sign In'}
                size={1.7}
              />
            </View>
          </KeyboardAvoidingView>
          <OrSection title={'Sign In'} />
          <SocialAuth
            onFacebook={() => {
              // setSocial('FACEBOOK');
              facebook_signin();
            }}
            onGoogle={() => {
              google_signin();
            }}
            load={load}
            type={'SIGNIN'}
          />
          <View
            style={[
              styles.rowContainer,
              styles.groupView,
              {
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 5,
                justifyContent: 'center',
              },
            ]}>
            <Text style={styles.text}>Don't have an account ? </Text>
            <TouchableOpacity
              disabled={load.disable}
              onPress={() => navigation.navigate('Signup')}>
              <Text
                style={[
                  styles.link,
                  {
                    fontSize: theme.SIZES.normal + 5,
                    marginLeft: theme.SIZES.small / 2,
                  },
                ]}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
          <FVUModal
            reset={reset_modal}
            load={load}
            onRequest={() => handle_controls('FVU', 'NONE')}
            type={controls.FVU}
            otp={{
              type: FVU.input_otp.type,
              text: FVU.input_otp.text,
              onChangeText: (otp) => handle_fvu('input_otp', 'text', otp),
              verifyOTP: () => verify_code(),
              onBlur: () => handle_fvu('input_otp', 'active', false),
              onFocus: () => handle_fvu('input_otp', 'active', true),
              resendOTP: () => {
                if (FVU.input_otp.type === 'EMAIL-RESET') {
                  if (FVU.email.text.length === 0) {
                    return handleInput(
                      'email',
                      'error_message',
                      'email is required',
                    );
                  }
                  if (FVU.email.error_message.length !== 0) {
                    return;
                  }
                  send_code_mail(FVU.email.text);
                } else if (FVU.input_otp.type === 'CONTACT-RESET') {
                  if (FVU.contact.text.length === 0) {
                    return handleInput(
                      'contact',
                      'error_message',
                      'mobile number is required to send PIN',
                    );
                  }
                  if (FVU.contact.error_message.length !== 0) {
                    return;
                  }
                  send_code_phone(FVU.contact.text);
                }
              },
              error: FVU.input_otp.error_message,
            }}
            email={{
              text: FVU.email.text,
              onChangeText: (email) => handle_fvu('email', 'text', email),
              onBlur: () => handle_fvu('email', 'active', false),
              sendOTP: (type) => {
                if (type === 'EMAIL') {
                  if (FVU.email.text.length === 0) {
                    return handle_fvu(
                      'email',
                      'error_message',
                      'email is required',
                    );
                  }
                  if (FVU.email.error_message.length !== 0) {
                    return;
                  }
                  handle_fvu('input_otp', 'type', 'EMAIL-RESET');
                  send_code_mail(FVU.email.text);
                } else if (type === 'PHONE') {
                  if (FVU.contact.text.length === 0) {
                    return handle_fvu(
                      'contact',
                      'error_message',
                      'mobile number is required to send otp',
                    );
                  }
                  if (FVU.contact.error_message.length !== 0) {
                    return;
                  }
                  handle_fvu('code', 'type', 'CONTACT-RESET');
                  send_code_phone(FVU.contact.text);
                }
              },
              onFocus: () => handle_fvu('email', 'active', true),
              error: FVU.email.error_message,
            }}
            contact={{
              text: FVU.contact.text,
              onChangeText: (email) => handle_fvu('contact', 'text', email),
              onBlur: () => handle_fvu('contact', 'active', false),
              onFocus: () => handle_fvu('contact', 'active', true),
              error: FVU.contact.error_message,
            }}
            passwords={{
              handleFvu: handle_fvu,
              password: {
                text: FVU.password.text,
                onChangeText: (password) =>
                  handle_fvu('password', 'text', password),
                onBlur: () => handle_fvu('password', 'active', false),
                onFocus: () => handle_fvu('password', 'active', true),
                error: FVU.password.error_message,
                show: FVU.password.show,
              },
              passwordAgain: {
                text: FVU.password_again.text,
                onChangeText: (password) =>
                  handle_fvu('password_again', 'text', password),
                onBlur: () => handle_fvu('password_again', 'active', false),
                onFocus: () => handle_fvu('password_again', 'active', true),
                error: FVU.password_again.error_message,
                show: FVU.password_again.show,
              },
              updatePassword: () => update_password(FVU.password.text),
            }}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  rowContainer: {
    width: '95%',
    alignItems: 'flex-end',
  },
  forgotContainer: {
    marginTop: theme.SIZES.small,
    alignSelf: 'flex-end',
    paddingHorizontal: theme.SIZES.small,
  },
  groupView: {
    paddingVertical: theme.SIZES.large * 2,
    paddingHorizontal: theme.SIZES.small,
  },
  link: {
    fontSize: theme.SIZES.normal - 2,
    fontFamily: 'Signika-Medium',
    color: theme.COLORS.Links,
    textDecorationLine: 'underline',
    textDecorationColor: theme.COLORS.Links,
  },
  text: {
    fontSize: theme.SIZES.normal + 2,
    fontFamily: 'Signika-Regular',
  },
  SecondChild: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    width: '100%',
  },
});
