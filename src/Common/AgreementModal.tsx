import React, {Children, FunctionComponent, useState} from 'react';
/**
 * TODO: Create CustomModal
 *  TextInput for OTP/Email
 *  Touchable for resend OTP/Email
 *  Button for action
 *   - verify - OTP entered by user
 *   - send - send password reset email
 *  Show Alert below invalid input in red
 */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import Alert from '../Common/CustomAlert';
import Button from '../Common/CustomButton';
import {Height} from '../Constants/size';
import Modal from 'react-native-modal';
import {ScrollView} from 'react-native-gesture-handler';
import TextInput from '../Common/CustomTextInput';
import Title from './CustomTitle';
import services from '../Services/services';
import theme from '../Constants/theme';

type props = {
  style?: string;
  title?: string;
  show: boolean;
  onClose: () => void;
  loading?: boolean;
  text?: string;
  error_message?: string;
};
const AgreementModal: FunctionComponent<props> = ({
  style,
  title,
  show = false,
  onClose,
  loading = false,
  text = '',

  error_message = '',
}) => {
  const [load, setLoad] = useState(loading);
  const [value, setValue] = useState(text);
  const [error, setError] = useState(error_message);
  const handleClick = () => {
    //TODO: handle click - verify or send email
    onClose();
  };
  return (
    <Modal
      testID={'modal'}
      backdropOpacity={0.5}
      backdropColor={'#ccc'}
      isVisible={show}
      onSwipeComplete={onClose}
      animationInTiming={400}
      backdropTransitionInTiming={400}
      backdropTransitionOutTiming={400}
      animationOutTiming={500}
      swipeDirection={['down']}
      style={{justifyContent: 'flex-end', margin: 0}}>
      <View style={styles.parent}>
        <View style={styles.main}>
          <Title>Terms and Condition</Title>
          <View style={styles.span} />
          <ScrollView style={{flex: 1, flexDirection: 'column'}}>
            <Text style={styles.body}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};
export default AgreementModal;
const styles = StyleSheet.create({
  span: {
    width: '100%',
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.COLORS.HEADER,
    marginBottom: 8,
    marginTop: 5,
  },
  body: {
    marginBottom: theme.SIZES.normal,
    color: theme.COLORS.HEADER,
    fontSize: theme.SIZES.normal,
    fontFamily: 'Comfortaa-SemiBold',
  },
  row_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: theme.SIZES.small,
    marginBottom: theme.SIZES.small,
  },
  timer: {
    fontSize: theme.SIZES.normal + 1,
    fontFamily: 'Comfortaa-Bold',
    color: theme.COLORS.ICON,
  },
  parent: {
    flex: 1,
    backgroundColor: 'rgba(128,128,128,0.1)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  main: {
    padding: theme.SIZES.small,
    width: '97%',
    height: '82%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#fff',
    shadowColor: 'black',
    elevation: 5,
    shadowOffset: {width: 2, height: -5},
    shadowRadius: 8,
    shadowOpacity: 1.0,
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
