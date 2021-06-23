import {
  ActivityIndicator,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Height, width} from '../../Constants/size';
import React, {FunctionComponent, useEffect} from 'react';

import GradientButton from '../GradientButton';
import theme from '../../Constants/theme';

// import connectionError from './images/404Error.png';

type props = {
  onPress: () => void;
  message: string;
};

const RetryScreen: FunctionComponent<props> = ({onPress, message}) => {
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          alignItems: 'center',
          width: '100%',
          paddingHorizontal: theme.SIZES.normal,
        }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            marginTop: theme.SIZES.large * 1.5,
            color: theme.COLORS.GREEN,
          }}>
          Whoops!{' '}
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            marginTop: theme.SIZES.small * 0.4,
          }}>
          {message}
        </Text>
      </View>
      <Image
        style={{
          height: Height * 0.5,
          width: '100%',
          marginTop: theme.SIZES.large * 1.5,
        }}
        source={require('../../Assets/images/prepuni_logo.jpg')}
        resizeMode={'contain'}
      />
      <View
        style={{marginTop: 'auto', marginBottom: 'auto', alignSelf: 'center'}}>
        <GradientButton
          title={'Retry'}
          size={2}
          touchableProps={{
            onPress: onPress,
            disabled: false,
          }}
          loading={false}
        />
      </View>
    </View>
  );
};

export default RetryScreen;
