import {Height, width} from '../../Constants/size';
import React, {FunctionComponent, useEffect, useState} from 'react';
import {SET_ALERT, handleAlert} from '../../Store/actions/user';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import BaseModal from '../common/BaseModal';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import {TextInput} from 'react-native-gesture-handler';
import Touchable from '../common/Touchable';
import {TouchableRipple} from 'react-native-paper';
import baseStyles from '../common/styles';
import theme from '../../Constants/theme';

type props = {
  show: boolean;
  onRequest: () => void;
  type: 'WALLET' | 'CREDIT';
  balance: String;
};
const AddWallet: FunctionComponent<props> = ({
  show,
  onRequest,
  type,
  balance,
}) => {
  const [amount, setAmount] = useState('');
  const bg = type === 'CREDIT' ? '#F9C74F' : '#F49D37';

  return (
    <Modal
      style={styles.modal}
      backdropOpacity={0.1}
      backdropColor={theme.COLORS.BORDER_TEXT}
      isVisible={show}
      animationInTiming={400}
      backdropTransitionInTiming={400}
      backdropTransitionOutTiming={400}
      onBackdropPress={() => onRequest()}
      animationOutTiming={500}
      onSwipeComplete={() => onRequest()}
      swipeDirection={['down']}>
      <View style={styles.main}>
        <View style={styles.header}>
          <Text style={[styles.headerText, {color: bg}]}>
            {type === 'CREDIT' ? 'Redeem Credits' : 'Add Money'}
          </Text>
          <TouchableRipple
            style={styles.iconTouchable}
            centered={false}
            rippleColor={`${bg}30`}
            onPress={() => onRequest()}
            borderless={true}>
            <Icon name={'close'} size={37} color={bg} />
          </TouchableRipple>
        </View>
        <View style={styles.innerContainer}>
          <View style={styles.balanceContainer}>
            <Text style={styles.availableText}>
              Available {type === 'CREDIT' ? 'Credits' : 'Balance'} -
            </Text>
            <View style={[styles.balanceCard, {backgroundColor: `${bg}30`}]}>
              <Text style={[styles.balance]}>
                {type === 'WALLET' ? '₹ ' : '⦿ '}
                {balance}
              </Text>
            </View>
          </View>
          <TextInput
            placeholderTextColor={`${bg}`}
            placeholder={'0000'}
            value={amount}
            onChangeText={(text) => setAmount(text)}
            keyboardType={'number-pad'}
            maxLength={4}
            style={[styles.textInput, {backgroundColor: `${bg}30`, color: bg}]}
          />
          <TouchableRipple
            style={[styles.touchable, {backgroundColor: bg}]}
            centered={false}
            rippleColor={`${theme.COLORS.HEADER}30`}
            onPress={() => console.log('pressed')}
            borderless={true}>
            <Text style={styles.buttonText}>
              {type === 'CREDIT' ? 'Redeem Credits' : 'Add Money'}
            </Text>
          </TouchableRipple>
        </View>
      </View>
    </Modal>
  );
};

export default AddWallet;

const styles = StyleSheet.create({
  balanceCard: {
    backgroundColor: `${theme.COLORS.HEADER}50`,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  iconTouchable: {
    borderRadius: 6,
    paddingHorizontal: theme.SIZES.small / 3,
    paddingVertical: theme.SIZES.small / 4,
  },

  touchable: {
    alignSelf: 'center',
    paddingHorizontal: theme.SIZES.small + 2,
    paddingVertical: theme.SIZES.small + 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 6,
    marginBottom: theme.SIZES.small,
    elevation: 2,
    shadowColor: theme.COLORS.BORDER_TEXT,
    shadowOffset: {width: 2, height: 1},
    shadowRadius: 5,
    shadowOpacity: 0.3,
  },
  buttonText: {
    fontSize: theme.SIZES.large + 2,
    fontFamily: 'ComicNeue-Bold',
    color: theme.COLORS.DEFAULT,
  },
  textInput: {
    backgroundColor: `${theme.COLORS.HEADER}30`,
    borderRadius: 6,
    paddingHorizontal: theme.SIZES.small,
    paddingVertical: theme.SIZES.small / 4,
    alignSelf: 'center',
    color: theme.COLORS.HEADER,
    fontSize: theme.SIZES.large * 1.9,
    fontFamily: 'ComicNeue-Bold',
    marginBottom: theme.SIZES.large,
  },
  balance: {
    color: theme.COLORS.HEADER,
    fontSize: theme.SIZES.large * 1.2,
    fontFamily: 'ComicNeue-Bold',
  },
  availableText: {
    color: theme.COLORS.HEADER,
    fontSize: theme.SIZES.large + 4,
    fontFamily: 'ComicNeue-Bold',
    marginRight: theme.SIZES.large,
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.SIZES.large,
  },
  innerContainer: {
    paddingHorizontal: theme.SIZES.small,
    paddingVertical: theme.SIZES.small,
  },
  headerText: {
    fontSize: theme.SIZES.normal * 1.4,
    fontFamily: 'Signika-Medium',
    color: theme.COLORS.HEADER,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.SIZES.normal,
    borderBottomWidth: 0.5,
    paddingBottom: theme.SIZES.small / 2,
    borderBottomColor: `${theme.COLORS.HEADER}50`,
  },
  main: {
    flex: 1,
    backgroundColor: theme.COLORS.WHITE,
    borderRadius: 8,
    paddingVertical: theme.SIZES.small,
  },
  modal: {
    margin: 0,
    flex: 1,
    backgroundColor: '#ccc',
    marginTop: Height * 0.4,
  },
  head: {
    paddingTop: theme.SIZES.large,
    paddingBottom: theme.SIZES.normal,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerChild: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.SIZES.small,
  },
  textHead: {
    fontSize: theme.SIZES.large + 8,
    fontFamily: 'ComicNeue-Bold',
    color: theme.COLORS.PRICE_COLOR,
  },
  message: {
    fontSize: theme.SIZES.normal + 2,
    fontFamily: 'Signika-Regular',
    width: '95%',
    textAlign: 'center',
    color: theme.COLORS.PRICE_COLOR,
    marginBottom: theme.SIZES.normal,
  },
  buttonStyle: {
    marginTop: theme.SIZES.small,
    borderRadius: theme.SIZES.large,
    paddingVertical: theme.SIZES.small * 0.4,
    paddingHorizontal: theme.SIZES.large,
    borderWidth: 0.5,
    backgroundColor: `${theme.COLORS.PRIMARY}10`,
  },
  buttonErrorStyle: {
    borderColor: theme.COLORS.PRIMARY,
  },
  buttonSuccessStyle: {
    borderColor: theme.COLORS.GREEN,
  },
  buttonErrorText: {
    fontSize: theme.SIZES.small + 4,
    color: theme.COLORS.PRIMARY,
  },
  buttonSuccessText: {
    fontSize: theme.SIZES.small,
    color: theme.COLORS.GREEN,
  },
});
