import {Height, width} from '../../Constants/size';
import {Modal, StyleSheet, Text, View} from 'react-native';
import React, {FunctionComponent, useState} from 'react';

import BaseModal from '../common/BaseModal';
import Touchable from '../common/Touchable';
import baseStyles from '../common/styles';
import theme from '../../Constants/theme';

type props = {
  agreement: {title: string; body: Array<any>};
  controls: {show: boolean; toggle: () => void};
};

const AgreementModal: FunctionComponent<props> = ({controls, agreement}) => {
  return (
    <BaseModal {...controls}>
      <View style={[styles.parent, baseStyles.card]}>
        <Text style={styles.heading}>{agreement.title}</Text>
        {agreement.body.map((item, index) => (
          <Text style={styles.body} key={index}>
            {item}
          </Text>
        ))}
        <Touchable
          style={{
            alignSelf: 'flex-end',
            position: 'absolute',
            bottom: 5,
            right: 5,
          }}
          touchableProps={{
            onPress: () => controls.toggle(),
            disabled: false,
          }}
          loading={false}
          filled={true}
          title={'OK'}
          size={'MEDIUM'}
        />
      </View>
    </BaseModal>
  );
};

export default AgreementModal;

const styles = StyleSheet.create({
  parent: {
    paddingHorizontal: theme.SIZES.normal,
    paddingVertical: theme.SIZES.small,
    marginTop: 30,
    alignItems: 'flex-start',
    alignSelf: 'center',
    backgroundColor: theme.COLORS.LIGHT_GREY,
    width: width * 0.9,
    height: Height * 0.65,
    borderRadius: theme.SIZES.small,
  },
  heading: {
    fontFamily: 'Signika-Medium',
    fontSize: theme.SIZES.large + 5,
    color: theme.COLORS.HEADER,
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
    letterSpacing: 1,
    marginBottom: theme.SIZES.small,
  },
  body: {
    fontFamily: 'Signika-Medium',
    fontSize: theme.SIZES.normal,
    color: theme.COLORS.HEADER,
    letterSpacing: 1,
  },
});
