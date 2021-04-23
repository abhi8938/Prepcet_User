import {Height, width} from '../Constants/size';
/**
 * TODO: Create CustomModal
 *  TextInput for OTP/Email
 *  Touchable for resend OTP/Email
 *  Button for action
 *   - verify - OTP entered by user
 *   - send - send password reset email
 *  Show Alert below invalid input in red
 */
// TODO:Not Working timer
// useEffect(() => {
//   const x = time;
//   const Timer = setInterval(() => {
//     // if (x === 30) return setTime(0);
//     setTime(x + 1);
//   }, 1000);
// }, []);
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';
import React, {Children, FunctionComponent, useEffect, useState} from 'react';

import Alert from '../Common/CustomAlert';
import Button from '../Common/CustomButton';
import Modal from 'react-native-modal';
import TextInput from '../Common/CustomTextInput';
import theme from '../Constants/theme';

type props = {
  style?: string;
  title?: string;
  show: boolean;
  handleVerify: (input_code: string) => void;
  handleSend: (input_mail: string) => void;
  handleUpdate?: (password: string) => void;
  handleClose: () => void;
  error_message?: string;
  sendAgain: (email?: string) => void;
  mode: string; //'RESET' | 'VERIFY' | 'PASSWORD'
};
const CustomModal: FunctionComponent<props> = ({
  style,
  title,
  show = false,
  handleVerify,
  handleSend,
  handleUpdate,
  handleClose,
  sendAgain,
  mode,
  error_message = '',
}) => {
  const [load, setLoad] = useState(false);
  const [otp, setOtp] = useState('');
  const [time, setTime] = useState(0);
  const [password, setPassword] = useState({text: '', show: false});
  const [password_again, setPasswordAgain] = useState({text: '', show: false});
  const [email, setEmail] = useState('');
  const [inputError, setInputError] = useState('');

  const RenderInputs = () => {
    // Enter Otp for verification / Enter email to send reset otp / Enter New Password / Re - Enter Password
    switch (mode) {
      case 'RESET':
        return (
          <TextInput
            error={''}
            placeHolder={'email id'}
            disable={load}
            value={email}
            onChange={(text) => setEmail(text)}
            onBlur={() =>
              setInputError(
                /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email) //email regex validations
                  ? ''
                  : 'Invalid Email',
              )
            }
          />
        );

      case 'PASSWORD':
        return (
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-evenly',
            }}>
            <TextInput
              show={password.show}
              handleShow={() =>
                setPassword({text: password.text, show: !password.show})
              }
              error={''}
              placeHolder={'password'}
              disable={load}
              value={password.text}
              onChange={(text) =>
                setPassword({text: text, show: password.show})
              }
              onBlur={() =>
                setInputError(
                  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(
                    password.text,
                  ) //email regex validations
                    ? ''
                    : 'Must contain at least one digit, one lower case,one upper case and 8 character long minimum',
                )
              }
            />
            <TextInput
              show={password_again.show}
              handleShow={() =>
                setPasswordAgain({
                  text: password_again.text,
                  show: !password_again.show,
                })
              }
              error={''}
              placeHolder={'re-enter password'}
              disable={load}
              value={password_again.text}
              onChange={(text) =>
                setPasswordAgain({text: text, show: password_again.show})
              }
              onBlur={() =>
                setInputError(
                  password_again.text !== password.text
                    ? 'Password not matched'
                    : '',
                )
              }
            />
          </View>
        );

      default:
        return (
          <TextInput
            error={''}
            style={{
              height: theme.SIZES.large * 2,
            }}
            placeHolder={'Enter OTP'}
            disable={load}
            value={otp}
            onChange={(text) => setOtp(text)}
          />
        );
    }
  };
  const RenderButtons = () => {
    // Send OTP / Update New Password
    // show snackbar mail sent successfully / password updated
    switch (mode) {
      case 'RESET':
        return (
          <Button
            loading={load}
            size={'MEDIUM'}
            disable={load}
            title={'Send'}
            onPress={async () => {
              if (inputError.length > 0 || email.length === 0)
                return setInputError('Email is not valid');
              setLoad(true);
              await handleSend(email);
              setLoad(false);
            }}
          />
        );
      case 'PASSWORD':
        return (
          <Button
            loading={load}
            size={'MEDIUM'}
            disable={load}
            title={'Update'}
            onPress={async () => {
              if (password.text.length === 0)
                return setInputError('Password is Required');
              if (inputError.length > 0) return Vibration.vibrate();
              setLoad(true);
              handleUpdate && (await handleUpdate(password.text));
              setPassword({text: '', show: false});
              setPasswordAgain({text: '', show: false});
              setLoad(false);
            }}
          />
        );
      default:
        return (
          <Button
            loading={load}
            size={'MEDIUM'}
            disable={load}
            title={'Verify'}
            onPress={() => {
              handleVerify(otp);
              setOtp('');
            }}
          />
        );
    }
  };
  const RenderError = () => {
    // response from sendCode / updatePassword / Code Verification
    return <Alert title={inputError.length > 0 ? inputError : error_message} />;
  };
  const RenderResend = () => {
    if (mode === 'PASSWORD' || mode === 'RESET') return null;
    return (
      <TouchableOpacity
        disabled={load}
        onPress={async () => {
          setLoad(true);
          await sendAgain(email.length !== 0 ? email : undefined);
          setLoad(false);
        }}>
        <Text style={styles.link}>
          {mode === 'RESET' ? 'resend email ?' : 'resend otp ?'}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <Modal
      testID={'modal'}
      backdropOpacity={0.3}
      backdropColor={'#d4d4d4'}
      isVisible={show}
      animationInTiming={400}
      backdropTransitionInTiming={400}
      backdropTransitionOutTiming={400}
      animationOutTiming={500}
      style={{justifyContent: 'flex-end', margin: 0}}>
      <View style={styles.parent}>
        <KeyboardAvoidingView enabled>
          <View style={styles.main}>
            <Text style={styles.title}>{title}</Text>
            {RenderInputs()}
            <View style={styles.row_container}>
              {RenderError()}
              {RenderResend()}
            </View>
            <View style={styles.row_container}>
              {RenderButtons()}
              <Button
                loading={false}
                size={'MEDIUM'}
                disable={load}
                title={'Cancel'}
                onPress={() => handleClose()}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};
export default CustomModal;
const styles = StyleSheet.create({
  row_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: theme.SIZES.small,
    marginVertical: theme.SIZES.small,
  },
  timer: {
    fontSize: theme.SIZES.normal + 1,
    fontFamily: 'Comfortaa-Bold',
    color: theme.COLORS.ICON,
  },
  parent: {
    flex: 1,
    backgroundColor: 'rgba(128,128,128,0.2)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  main: {
    padding: theme.SIZES.small,
    paddingVertical: theme.SIZES.normal,
    width: width - 10,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: '#fff',
    shadowColor: '#000',
    elevation: 5,
    shadowOffset: {width: 2, height: -5},
    shadowRadius: 8,
    shadowOpacity: 0.4,
  },
  title: {
    marginBottom: theme.SIZES.normal,
    color: theme.COLORS.HEADER,
    fontSize: theme.SIZES.large,
    fontFamily: 'Comfortaa-Bold',
  },
  link: {
    // backgroundColor: theme.COLORS.ACTIVE,
    fontSize: theme.SIZES.normal + 1,
    fontFamily: 'Comfortaa-Bold',
    color: theme.COLORS.Links,
  },
});
