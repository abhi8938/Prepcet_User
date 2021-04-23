import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {FunctionComponent, useState} from 'react';

import Modal from 'react-native-modal';
import theme from '../../Constants/theme';

type props = {
  children: any;
  style?: any;
  show: boolean;
  toggle: () => void;
};
const BaseModal: FunctionComponent<props> = ({
  children,
  show,
  toggle,
  style,
}) => {
  return (
    <Modal
      testID={'modal'}
      backdropOpacity={0.5}
      backdropColor={theme.COLORS.BLACK}
      isVisible={show}
      animationInTiming={400}
      backdropTransitionInTiming={400}
      backdropTransitionOutTiming={400}
      // onBackdropPress={() => toggle()}
      animationOutTiming={500}>
      <View style={[styles.centeredView, style]}>{children}</View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default BaseModal;
