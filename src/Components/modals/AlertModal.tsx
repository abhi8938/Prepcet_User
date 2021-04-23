import {Height, width} from '../../Constants/size';
import React, {FunctionComponent, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatcher, useGlobalState} from '../../State/GlobalState';

import BaseModal from '../common/BaseModal';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Touchable from '../common/Touchable';
import baseStyles from '../common/styles';
import theme from '../../Constants/theme';

const AlertModal: FunctionComponent = () => {
  const dispatcher = useDispatcher();
  //@ts-ignore
  const globalState: any = useGlobalState();
  const {type, message, show} = globalState.alert;
  const toggle = () => {
    dispatcher({
      type: 'SET-ALERT',
      payload: {type, message, show: false},
    });
  };

  const controls = {show, toggle};
  return (
    <BaseModal {...controls}>
      <View style={styles.parent}>
        <View
          style={
            type === 'ERROR'
              ? [styles.head, {backgroundColor: theme.COLORS.ERROR}]
              : [styles.head, {backgroundColor: theme.COLORS.GREEN}]
          }>
          <Icon
            size={theme.SIZES.large * 2}
            name={type === 'ERROR' ? 'times-circle' : 'check-circle'}
            color={theme.COLORS.WHITE}
          />
        </View>
        <View style={styles.innerChild}>
          <Text style={styles.textHead}>{type}</Text>
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity
            onPress={controls.toggle}
            style={
              type === 'ERROR'
                ? [styles.buttonErrorStyle, styles.buttonStyle]
                : [styles.buttonSuccessStyle, styles.buttonStyle]
            }>
            <Text
              style={
                type === 'ERROR'
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
    minHeight: Height * 0.32,
    width: width * 0.8,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  head: {
    height: '28%',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerChild: {
    flex: 1,
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
    fontSize: theme.SIZES.normal + 5,
    fontFamily: 'ComicNeue-Regular',
    width: '95%',
    textAlign: 'center',
    marginTop: theme.SIZES.small,
  },
  buttonStyle: {
    marginTop: theme.SIZES.small,
    borderRadius: theme.SIZES.large,
    paddingVertical: theme.SIZES.small * 0.4,
    paddingHorizontal: theme.SIZES.large,
    borderWidth: 2,
  },
  buttonErrorStyle: {
    borderColor: theme.COLORS.ERROR,
  },
  buttonSuccessStyle: {
    borderColor: theme.COLORS.GREEN,
  },
  buttonErrorText: {
    fontSize: theme.SIZES.small + 4,
    color: theme.COLORS.ERROR,
  },
  buttonSuccessText: {
    fontSize: theme.SIZES.small,
    color: theme.COLORS.GREEN,
  },
});
