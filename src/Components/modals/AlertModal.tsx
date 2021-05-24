import {Height, width} from '../../Constants/size';
import React, {FunctionComponent, useEffect} from 'react';
import {SET_ALERT, handleAlert} from '../../Store/actions/user';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import BaseModal from '../common/BaseModal';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Touchable from '../common/Touchable';
import baseStyles from '../common/styles';
import theme from '../../Constants/theme';

const AlertModal: FunctionComponent = () => {
  const alert = useSelector((state: any) => state.user.alert);
  const dispatch = useDispatch();
  const toggle = () => {
    dispatch(handleAlert('NONE', ''));
  };

  // useEffect(() => {
  //   console.log('alert', alert);
  // }, [alert]);

  const controls = {show: alert.typeOf === 'ERROR', toggle};
  return (
    <BaseModal {...controls}>
      <View style={styles.parent}>
        <View
          style={
            alert.typeOf === 'ERROR'
              ? [styles.head, {backgroundColor: theme.COLORS.DEFAULT}]
              : [styles.head, {backgroundColor: theme.COLORS.DEFAULT}]
          }>
          <Icon
            size={theme.SIZES.large * 2}
            name={alert.typeOf === 'ERROR' ? 'times-circle' : 'check-circle'}
            color={theme.COLORS.ERROR}
          />
        </View>
        <View style={styles.innerChild}>
          <Text style={styles.message}>{alert.message}</Text>
          <TouchableOpacity
            onPress={controls.toggle}
            style={
              alert.typeOf === 'ERROR'
                ? [styles.buttonErrorStyle, styles.buttonStyle]
                : [styles.buttonSuccessStyle, styles.buttonStyle]
            }>
            <Text
              style={
                alert.typeOf === 'ERROR'
                  ? styles.buttonErrorText
                  : styles.buttonSuccessText
              }>
              {'Okay'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </BaseModal>
  );
};

export default AlertModal;

const styles = StyleSheet.create({
  parent: {
    width: width * 0.8,
    borderRadius: 5,
    backgroundColor: '#fff',
    paddingBottom: theme.SIZES.normal,
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
