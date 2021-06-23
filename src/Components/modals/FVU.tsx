import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Height, width} from '../../Constants/size';
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import AuthHeader from '../common/AuthHeader';
import GradientButton from '../GradientButton';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import {SafeAreaView} from 'react-native-safe-area-context';
import TextField from '../../Components/common/TextField';
import Touchable from '../common/Touchable';
import {TouchableOpacity} from 'react-native-gesture-handler';
import baseStyles from '../common/styles';
import image from '../../Assets/images/forgot_password.png';
import password_image from '../../Assets/images/update_password.png';
import theme from '../../Constants/theme';
import verify_image from '../../Assets/images/verify_code.png';

//@ts-ignore

type props = {
  reset: () => void;
  load: any;
  onRequest: () => void;
  type: 'EMAIL' | 'OTP' | 'PASSWORD' | 'NONE' | string;
  email?: {
    text: string;
    onChangeText: (text: string) => void;
    sendOTP: (type: string) => void;
    onBlur: () => void;
    onFocus: () => void;
    error: string;
  };
  contact?: {
    text: string;
    onChangeText: (text: string) => void;
    onBlur: () => void;
    onFocus: () => void;
    error: string;
  };
  otp: {
    text: string;
    onChangeText: (text: string) => void;
    verifyOTP: () => void;
    resendOTP: () => void;
    type: 'EMAIL-VERIFY' | 'CONTACT-VERIFY' | string;
    onBlur: () => void;
    onFocus: () => void;
    error: string;
  };
  passwords?: {
    password: {
      text: string;
      onChangeText: (text: string) => void;
      onBlur: () => void;
      onFocus: () => void;
      error: string;
      show: boolean;
    };
    passwordAgain: {
      text: string;
      onChangeText: (text: string) => void;
      onBlur: () => void;
      onFocus: () => void;
      error: string;
      show: boolean;
    };
    handleFvu: (key: any, key1: any, value: any) => void;
    updatePassword: () => void;
  };
};

const RenderOTP = ({load, otp}: any) => {
  const otpRef = useRef(null);
  const [timer, setTimer] = useState(60);
  const [resend, setResend] = useState(false);
  // const countDown = () => {
  //   if (timer > 0) {
  //     setTimer(timer - 1);
  //   } else {
  //     setResend(true);
  //   }
  // };
  // useEffect(() => {
  //   setTimeout(countDown, 1000);
  // }, [timer]);
  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => setTimer(timer - 1), 1000);
    } else {
      setResend(true);
    }
  }, [timer]);

  useEffect(() => {
    if (load.resend === false) {
      setResend(false);
      setTimer(60);
    }
  }, [load.resend]);

  useEffect(() => {
    otpRef.current?.focus();
  }, [otpRef.current]);

  return (
    <View style={styles.parent}>
      <Image
        style={styles.image}
        resizeMode="contain"
        resizeMethod="auto"
        source={verify_image}
      />
      <View style={styles.otpResendContainer}>
        <Text
          style={[
            {fontFamily: baseStyles.text.fontFamily},
            {color: theme.COLORS.BORDER_COLOR},
          ]}>
          Didn't Recieve Code?{' '}
        </Text>
        <View
          style={{
            paddingVertical: theme.SIZES.small,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text
            style={[
              {fontFamily: baseStyles.text.fontFamily},
              {color: theme.COLORS.BORDER_COLOR},
            ]}>
            Resend Code in -{' '}
          </Text>
          {!resend && (
            <Text style={{marginLeft: 20, fontSize: 15}}>
              {timer > 9 ? `0:${timer}` : `0:0${timer}`}
            </Text>
          )}
          {resend &&
            (load.resend === true ? (
              <ActivityIndicator
                style={{
                  marginVertical: theme.SIZES.small / 1.5,
                  marginLeft: theme.SIZES.normal,
                }}
                size={Platform.OS === 'ios' ? 40 : 30}
                color={theme.COLORS.PRIMARY}
              />
            ) : (
              <TouchableOpacity
                onPress={() => {
                  otp.resendOTP();
                }}
                disabled={load.resend}>
                <Text
                  style={[
                    baseStyles.text,
                    {
                      color: theme.COLORS.PRIMARY,
                      fontSize: theme.SIZES.normal + 2,
                    },
                  ]}>
                  Resend
                </Text>
              </TouchableOpacity>
            ))}
        </View>
      </View>
      <TextField
        style={styles.inputBox}
        inputProps={{
          ref: otpRef,
          placeholder: 'OTP',
          onChangeText: otp.onChangeText,
          value: otp.text,
          onBlur: otp.onBlur,
          onFocus: otp.onFocus,
          keyboardType: 'numeric',
          maxLength: 6,
        }}
        error={otp.error}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: theme.SIZES.normal * 1.5,
        }}>
        <GradientButton
          loading={false}
          loadingText={'...'}
          touchableProps={{
            onPress: () => {
              otp.verifyOTP();
            },
            disabled: load.disable,
          }}
          title={'verify'}
          size={1.7}
        />
      </View>
    </View>
  );
};

const FVU: FunctionComponent<props> = ({
  onRequest,
  type,
  email,
  contact,
  otp,
  passwords,
  load,
  reset,
}) => {
  const emailRef = useRef(null);
  useEffect(() => {
    emailRef.current?.focus();
  }, [emailRef.current]);

  const renderEmail = () => {
    return (
      email && (
        <View style={styles.parent}>
          <Image
            style={styles.image}
            resizeMode="contain"
            resizeMethod="auto"
            source={image}
          />
          <TextField
            style={styles.inputBox}
            inputProps={{
              ref: emailRef,
              placeholder: 'Email',
              onChangeText: email.onChangeText,
              value: email.text,
              onBlur: email.onBlur,
              onFocus: email.onFocus,
            }}
            error={email.error}
          />
          {contact && (
            <TextField
              style={styles.inputBox}
              inputProps={{
                placeholder: 'Mobile Number',
                value: contact.text,
                onChangeText: contact.onChangeText,
                onBlur: contact.onBlur,
                onFocus: contact.onFocus,
              }}
              error={contact.error}
            />
          )}

          <View style={styles.rowContainer}>
            <GradientButton
              loading={load.vemail}
              loadingText={'...'}
              touchableProps={{
                onPress: () => {
                  email.sendOTP('EMAIL');
                },
                disabled: load.disable,
              }}
              title={'email'}
              size={1.7}
            />

            <Text
              style={[
                baseStyles.text,
                {marginHorizontal: theme.SIZES.small / 2, marginTop: 5},
              ]}>
              OR
            </Text>
            <GradientButton
              loading={load.vcontact}
              loadingText={'...'}
              touchableProps={{
                onPress: () => {
                  email.sendOTP('PHONE');
                },
                disabled: load.disable,
              }}
              title={'sms'}
              size={1.7}
            />
          </View>
        </View>
      )
    );
  };

  const renderPassword = () => {
    return (
      passwords && (
        <View style={[styles.parent]}>
          <Image
            style={styles.image}
            resizeMode="contain"
            resizeMethod="auto"
            source={password_image}
          />

          <TextField
            secureText={{
              onToggle: () =>
                passwords.handleFvu(
                  'password',
                  'show',
                  !passwords.password.show,
                ),
              hidden: passwords.password.show,
            }}
            style={styles.inputBox}
            inputProps={{
              placeholder: 'Password',
              onChangeText: passwords.password.onChangeText,
              value: passwords.password.text,
              onBlur: passwords.password.onBlur,
              onFocus: passwords.password.onFocus,
            }}
            error={passwords.password.error}
          />
          <TextField
            secureText={{
              onToggle: () =>
                passwords.handleFvu(
                  'password_again',
                  'show',
                  !passwords.passwordAgain.show,
                ),
              hidden: passwords.passwordAgain.show,
            }}
            style={styles.inputBox}
            inputProps={{
              placeholder: 'confirm Password',
              onChangeText: passwords.passwordAgain.onChangeText,
              value: passwords.passwordAgain.text,
              onBlur: passwords.passwordAgain.onBlur,
              onFocus: passwords.passwordAgain.onFocus,
            }}
            error={passwords.passwordAgain.error}
          />
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: theme.SIZES.normal,
            }}>
            <GradientButton
              loading={load.update}
              loadingText={'...'}
              touchableProps={{
                onPress: passwords.updatePassword,
                disabled: load.disable,
              }}
              title={'update'}
              size={1.7}
            />
          </View>
        </View>
      )
    );
  };

  return (
    <Modal
      style={styles.modal}
      backdropOpacity={0.1}
      backdropColor={theme.COLORS.BORDER_TEXT}
      isVisible={type === 'NONE' ? false : true}
      animationInTiming={400}
      backdropTransitionInTiming={400}
      backdropTransitionOutTiming={400}
      onBackdropPress={() => onRequest()}
      animationOutTiming={500}
      onSwipeComplete={() => onRequest()}
      swipeDirection={['down']}>
      <View style={styles.main}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {type === 'EMAIL'
              ? 'Forgot Password'
              : type === 'OTP'
              ? 'Verify Code'
              : 'Update Password'}
          </Text>
          <Icon
            name={'close'}
            size={37}
            onPress={() => {
              reset();
              onRequest();
            }}
          />
        </View>
        {type === 'EMAIL' ? renderEmail() : null}
        {type === 'OTP' ? <RenderOTP load={load} otp={otp} /> : null}
        {type === 'UPDATE' ? renderPassword() : null}
      </View>
    </Modal>
  );
};

export default FVU;

const styles = StyleSheet.create({
  otpResendContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    margin: 0,
    flex: 1,
    backgroundColor: '#ccc',
    marginTop: theme.SIZES.large * 5,
  },
  headerText: {
    fontSize: theme.SIZES.normal * 1.4,
    fontFamily: 'Signika-Medium',
    color: theme.COLORS.BORDER_TEXT,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.SIZES.normal,
  },
  main: {
    flex: 1,
    backgroundColor: theme.COLORS.WHITE,
    borderRadius: 8,
    paddingVertical: theme.SIZES.small,
  },
  parent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: theme.SIZES.normal,
    backgroundColor: theme.COLORS.WHITE,
  },
  inputBox: {
    width: '100%',
    marginTop: theme.SIZES.normal * 1.5,
  },
  text: {
    fontSize: 17,
  },

  image: {
    width: width * 0.35,
    height: width * 0.45,
    aspectRatio: 1,
    marginTop: theme.SIZES.large * 2,
    alignSelf: 'center',
  },
  rowContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.SIZES.normal,
    paddingHorizontal: theme.SIZES.small,
    textAlign: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.SIZES.small / 1.2,
    paddingVertical: theme.SIZES.small / 2,
    marginTop: theme.SIZES.small / 2,
    marginHorizontal: theme.SIZES.small,
    borderRadius: 9,
    elevation: 3,
    backgroundColor: theme.COLORS.ACTIVE,
    textAlign: 'center',
  },
  check: {
    zIndex: 1,
    elevation: 2,
    marginHorizontal: theme.SIZES.small,
  },
});
