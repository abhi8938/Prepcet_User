import React, {FunctionComponent, useEffect} from 'react';
import {View, Image, Modal} from 'react-native';
import {Height} from '../Constants/size';
import theme from '../Constants/theme';

type props = {
  show: boolean;
  onBack?: () => void;
};

const Loading: FunctionComponent<props> = ({show, onBack}) => {
  return (
    <Modal visible={show} onResponderEnd={onBack && onBack} transparent={true}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: '#ffffff90',
          alignItems: 'center',
        }}>
        <Image
          source={require('../../assets/images/spinner.gif')}
          style={{
            height: Height * 0.16,
            width: '35%',
          }}
          resizeMode={'contain'}
        />
        <Image
          source={require('../Assets/images/PrepUni.png')}
          style={{
            marginTop: theme.SIZES.small,
            height: Height * 0.04,
            width: '35%',
          }}
          resizeMode={'contain'}
        />
      </View>
    </Modal>
  );
};
export default Loading;
