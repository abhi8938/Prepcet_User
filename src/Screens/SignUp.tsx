import {
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Linking,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  Vibration,
  View,
} from 'react-native';
import React, {FunctionComponent, useEffect, useState} from 'react';
import {
  Register,
  VerifyCode,
  handleAlert,
  handleControls,
  handleFVU,
  handleRegister,
  loginWithFacebook,
  resetModal,
  resetRegister,
  sendCodeMail,
  sendCodePhone,
  setReferralCode,
  signInGoogle,
} from '../Store/actions/user';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';

import AuthHeader from '../Components/common/AuthHeader';
import {CheckBox} from 'react-native-elements';
import FVUModal from '../Components/modals/FVU';
import GradientButton from '../Components/GradientButton';
import Icon from '../Components/common/Icon';
import LinearGradient from 'react-native-linear-gradient';
import OrSection from '../Components/OrSection';
import SocialAuth from '../Components/SocialAuth';
import TextField from '../Components/common/TextField';
import Touchable from '../Components/common/Touchable';
import User from '../Store/models/user';
import VerificationInput from '../Components/common/VerificationInput';
import baseStyles from '../Components/common/styles';
import theme from '../Constants/theme';

type props = {
  navigation: any;
  route: any;
};

const FirstPage = ({
  register,
  handle_register,
  load,
  controls,
  control,
  policies,
  reset_register,
  sendCode,
  handle_FVU,
  sendCodePhone,
  sign_up,
  google_signup,
  facebook_signup,
}: any) => {
  const openLink = (url: string) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log('Open url error');
      }
    });
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.viewContainer}
      contentContainerStyle={{paddingBottom: theme.SIZES.large + 5}}>
      <TextField
        inputProps={{
          placeholder: 'First Name',
          value: register.first_name.text,
          onChangeText: (text) => handle_register('first_name', 'text', text),
          onBlur: () => handle_register('first_name', 'active', false),
          onFocus: () => handle_register('first_name', 'active', true),
        }}
        error={register.first_name.error_message}
      />
      <TextField
        inputProps={{
          placeholder: 'Last Name',
          value: register.last_name.text,
          onChangeText: (text) => handle_register('last_name', 'text', text),
          onBlur: () => handle_register('last_name', 'active', false),
          onFocus: () => handle_register('last_name', 'active', true),
        }}
        error={register.last_name.error_message}
      />
      <TextField
        inputProps={{
          placeholder: 'Email',
          value: register.email.text,
          onChangeText: (text) => {
            handle_register('email', 'text', text);
          },
          onBlur: () => handle_register('email', 'active', false),
          onFocus: () => handle_register('email', 'active', true),
          editable: !register.email.verified,
        }}
        error={register.email.error_message}
        verify={{
          onPress: () => {
            if (register.email.text.length === 0) {
              return handle_register(
                'email',
                'error_message',
                'email is required',
              );
            }
            if (register.email.error_message.length !== 0) {
              return;
            }
            handle_FVU('input_otp', 'type', 'EMAIL-VERIFY');
            sendCode(register.email.text);
          },
          load: load.vemail,
          verified: register.email.verified,
        }}
      />
      <TextField
        inputProps={{
          placeholder: 'Mobile Number (Optional)',
          value: register.contact.text,
          onChangeText: (text) => {
            handle_register('contact', 'text', text);
          },
          onBlur: () => handle_register('contact', 'active', false),
          onFocus: () => handle_register('contact', 'active', true),
          editable: !register.contact.verified,
          maxLength: 10,
        }}
        verify={{
          onPress: () => {
            if (register.email.text.length === 0) {
              return handle_register(
                'contact',
                'error_message',
                'email is required',
              );
            }
            if (register.email.error_message.length !== 0) {
              return;
            }
            handle_FVU('input_otp', 'type', 'CONTACT-VERIFY');
            sendCodePhone(register.contact.text);
          },
          load: load.vcontact,
          verified: register.contact.verified,
        }}
        error={register.contact.error_message}
      />

      <TextField
        inputProps={{
          placeholder: 'Password',
          value: register.password.text,
          onChangeText: (text) => {
            handle_register('password', 'text', text);
          },
          onBlur: () => handle_register('password', 'active', false),
          onFocus: () => handle_register('password', 'active', true),
        }}
        secureText={{
          onToggle: () =>
            handle_register('password', 'show', !register.password.show),
          hidden: register.password.show,
        }}
        error={register.password.error_message}
      />
      <TextField
        inputProps={{
          placeholder: 'Re-enter Password',
          value: register.password_again.text,
          onChangeText: (text) => {
            handle_register('password_again', 'text', text);
          },
          onBlur: () => handle_register('password_again', 'active', false),
          onFocus: () => handle_register('password_again', 'active', true),
        }}
        secureText={{
          onToggle: () =>
            handle_register(
              'password_again',
              'show',
              !register.password_again.show,
            ),
          hidden: register.password_again.show,
        }}
        error={register.password_again.error_message}
      />
      {/* <View style={styles.checkBoxes}> */}
      <View style={styles.NameContainer}>
        <CheckBox
          checkedColor={theme.COLORS.ACTIVE}
          containerStyle={styles.headCheckBox}
          disabled={false}
          checked={controls.agree}
          onPress={() => control('agree', !controls.agree)}
        />
        <Text style={styles.head_text}>
          <Text
            style={{
              color: theme.COLORS.HEADER,
            }}>
            I hereby,{' '}
          </Text>
          <Text
            onPress={() =>
              openLink('https://digitalluxe.in/documents/terms_conditions.pdf')
            }
            style={{
              textDecorationLine: 'underline',
              textDecorationColor: theme.COLORS.PRIMARY,
            }}>
            Read and Accept All Conditions and Policies
          </Text>
          <Text style={{color: theme.COLORS.HEADER}}>
            {' '}
            presented by PrepUni.
          </Text>
        </Text>
      </View>
      <View
        style={[styles.buttonContainer, {paddingVertical: theme.SIZES.small}]}>
        <GradientButton
          loading={load.signup}
          loadingText={'...'}
          touchableProps={{
            onPress: sign_up,
            disabled: load.disable,
          }}
          title={'Sign Up'}
          size={1.7}
        />
        <TouchableOpacity
          onPress={() => reset_register()}
          disabled={load.disable}>
          <LinearGradient
            colors={['#F6CE65', '#FAB378', '#FDA085']}
            style={styles.reset}>
            <Icon type={'RESET'} size={0.9} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <OrSection title={'Sign Up'} />
      <SocialAuth
        onFacebook={() => google_signup()}
        onGoogle={() => facebook_signup()}
        load={load}
        type={'REGISTER'}
      />
    </ScrollView>
  );
};

const SignUp: FunctionComponent<props> = ({navigation, route}) => {
  const register = useSelector((state: any) => state.user.register);
  const [load, setLoad] = useState({
    signup: false,
    vemail: false,
    vcontact: false,
    disable: false,
    resend: false,
    google: false,
    facebook: false,
  });

  const [error, setError] = useState(null);

  const handleLoad = (
    key:
      | 'vemail'
      | 'vcontact'
      | 'signup'
      | 'disable'
      | 'resend'
      | 'google'
      | 'facebook',
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
  const controls = useSelector((state: any) => state.user.controls);
  const FVU = useSelector((state: any) => state.user.FVU);
  const policies = useSelector((state: any) => state.user.policies);
  const dispatch = useDispatch();
  const handleInput = (key: any, key1: any, value: any) => {
    dispatch(handleRegister(key, key1, value));
  };
  const control = (key: any, value: any) => {
    dispatch(handleControls(key, value));
  };
  const handle_fvu = (key: any, key1: any, value: any) => {
    dispatch(handleFVU(key, key1, value));
  };

  const reset_register = () => {
    dispatch(resetRegister());
  };
  const handle_alert = (typeOf: string, message: string) => {
    dispatch(handleAlert(typeOf, message));
  };
  const send_code_mail = async (email: string) => {
    try {
      handleLoad('vemail', true);
      await dispatch(sendCodeMail(email, 'EMAIL-VERIFY'));
      handleLoad('vemail', false);
    } catch (err) {
      handleLoad('vemail', false);
      setError(err.message);
      handle_alert('ERROR', err.message);
    }
  };
  const send_code_phone = async (contact: string) => {
    try {
      handleLoad('vcontact', true);
      await dispatch(sendCodePhone(contact, 'CONTACT-VERIFY'));
      handleLoad('vcontact', false);
    } catch (err) {
      handleLoad('vcontact', false);
      setError(err.message);
      handle_alert('ERROR', err.message);
    }
  };

  const set_referal = (value: string) => {
    dispatch(setReferralCode(value));
  };
  const verify_code = () => {
    dispatch(VerifyCode());
  };
  const handle_controls = (key: any, value: any) => {
    dispatch(handleControls(key, value));
  };
  const reset_modal = () => {
    dispatch(resetModal());
  };
  const signup = async () => {
    try {
      let error_signup = false;
      //*Validate Data Register
      for (let key in register) {
        if (register[key].error_message.length !== 0) {
          Vibration.vibrate();
          error_signup = true;
          throw new Error(register[key].error_message);
        }

        if (key !== 'contact' && register[key].text.length === 0) {
          dispatch(handleRegister(key, 'error_message', `${key} is required`));
          Vibration.vibrate();
          error_signup = true;
          break;
        }
        if (key === 'email' && register[key].verified === false) {
          Vibration.vibrate();
          error_signup = true;
          throw new Error('Please Verify ' + key);
        }
        if (
          key === 'contact' &&
          register[key].text.length !== 0 &&
          register[key].verified === false
        ) {
          Vibration.vibrate();
          error_signup = true;
          throw new Error('Please Verify ' + key);
        }
        if (controls.agree === false) {
          Vibration.vibrate();
          error_signup = true;
          throw new Error('Please Agree to our terms and conditions');
        }
      }
      if (error_signup === true) return;

      let userData = new User(
        `${register.first_name.text} ${register.last_name.text}`,
        register.email.text.toLowerCase(),
        register.password.text,
        'EMAIL',
        register.contact.text,
      );
      handleLoad('signup', true);
      await dispatch(Register(navigation, userData));
      handleLoad('signup', false);
    } catch (err) {
      handleLoad('signup', false);
      setError(err.message);
      handle_alert('ERROR', err.message);
    }
  };
  useEffect(() => {
    if (route.params?.referal) {
      console.log('params', route.params.referal);
      set_referal(route.params.referal);
    }
  }, [route.params]);
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
      style={{
        flex: 1,
        backgroundColor: theme.COLORS.WHITE,
      }}>
      <ImageBackground
        source={require('../Assets/images/bg.png')}
        style={{
          flex: 1,
        }}
        resizeMode="cover"
        imageStyle={{opacity: 0.03}}>
        <StatusBar
          backgroundColor={theme.COLORS.DEFAULT}
          barStyle={'dark-content'}
        />
        <AuthHeader back={true} pageTitle={'Sign In'} navigation={navigation} />

        <KeyboardAvoidingView
          enabled={true}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}
          contentContainerStyle={{
            backgroundColor: theme.COLORS.DEFAULT,
          }}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 5 : 0}>
          <FirstPage
            register={register}
            handle_register={handleInput}
            controls={controls}
            load={load}
            control={control}
            policies={policies}
            reset_register={reset_register}
            sendCode={(email: string) => send_code_mail(email)}
            sendCodePhone={(phone: string) => send_code_phone(phone)}
            handle_FVU={handle_fvu}
            sign_up={signup}
            google_signup={google_signin}
            facebook_signup={facebook_signin}
          />
        </KeyboardAvoidingView>
        <FVUModal
          reset={reset_modal}
          load={load}
          onRequest={() => handle_controls('FVU', 'NONE')}
          type={controls.FVU}
          otp={{
            resendOTP: () => {
              if (FVU.input_otp.type === 'EMAIL-VERIFY') {
                if (register.email.text.length === 0) {
                  return handleInput(
                    'email',
                    'error_message',
                    'email is required',
                  );
                }
                if (register.email.error_message.length !== 0) {
                  return;
                }
                send_code_mail(register.email.text);
              } else if (FVU.input_otp.type === 'CONTACT-VERIFY') {
                if (register.contact.text.length === 0) {
                  return handleInput(
                    'contact',
                    'error_message',
                    'mobile number is required to send otp',
                  );
                }
                if (register.contact.error_message.length !== 0) {
                  return;
                }
                send_code_phone(register.contact.text);
              }
            },
            type: FVU.input_otp.type,
            text: FVU.input_otp.text,
            onChangeText: (otp: string) => handle_fvu('input_otp', 'text', otp),
            verifyOTP: () => verify_code(),
            onBlur: () => handle_fvu('input_otp', 'active', false),
            onFocus: () => handle_fvu('input_otp', 'active', true),
            error: FVU.input_otp.error_message,
          }}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  reset: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.SIZES.small / 1.1,
    paddingVertical: theme.SIZES.small / 1.1,
    marginVertical: theme.SIZES.small,
    marginHorizontal: theme.SIZES.small,
    borderRadius: 50,
    elevation: 3,
    backgroundColor: theme.COLORS.PRIMARY,
  },
  collegeContainer: {
    width: '96.5%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: theme.SIZES.large,
  },
  genderContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: '90%',
    alignSelf: 'center',
    borderWidth: 0.5,
    paddingHorizontal: theme.SIZES.small,
    paddingTop: theme.SIZES.small / 2,
    marginTop: theme.SIZES.large,
    borderRadius: 15,
    backgroundColor: '#F5F5F5',
  },
  // parent: {
  //   flex: 1,
  //   backgroundColor: theme.COLORS.DEFAULT,
  // },
  viewContainer: {
    flex: 1,
    paddingHorizontal: theme.SIZES.small,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  buttonContainer: {
    bottom: theme.SIZES.large,
    marginLeft: 'auto',
    marginRight: 'auto',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: theme.SIZES.large,
  },
  togglePress: {
    backgroundColor: theme.COLORS.DEFAULT,
    flexBasis: '40%',
    borderWidth: 0.5,
    borderColor: theme.COLORS.BLACK,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.SIZES.small,
    paddingVertical: theme.SIZES.small / 1.6,
    marginVertical: theme.SIZES.small,
    marginHorizontal: theme.SIZES.small,
    borderRadius: 9,
    elevation: 3,
    textAlign: 'center',
  },
  toggleActive: {
    borderColor: theme.COLORS.ACTIVE,
    color: theme.COLORS.DEFAULT,
    backgroundColor: theme.COLORS.PRIMARY,
  },
  toggleText: {
    color: theme.COLORS.BLACK,
    fontFamily: baseStyles.text.fontFamily,
    fontSize: theme.SIZES.small + 3,
  },
  checkBoxes: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: theme.SIZES.small,
  },
  linkContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginLeft: 15,
  },
  link: {
    marginStart: theme.SIZES.small * 0.6,
    color: theme.COLORS.Links,
    fontSize: theme.SIZES.normal * 0.85,
    fontFamily: 'Signika-SemiBold',
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
  },
  NameChild: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: theme.SIZES.small - 9,
  },
  NameContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: theme.SIZES.large,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headCheckBox: {
    padding: 0,
    marginLeft: 6,
  },
  head_text: {
    fontSize: theme.SIZES.normal * 1.1,
    fontFamily: 'Signika-SemiBold',
    width: '80%',
    maxWidth: 600,
    letterSpacing: 1,
    color: theme.COLORS.ACTIVE,
  },
});
