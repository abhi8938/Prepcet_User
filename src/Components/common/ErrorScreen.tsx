import {
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Height, width} from '../../Constants/size';
import React, {FunctionComponent, useEffect} from 'react';

import CustomHeader from '../../Common/CustomHeader';
import theme from '../../Constants/theme';

// import connectionError from './images/404Error.png';

type props = {
  show: boolean;
  navigation: any;
  scene: any;
};

const ErrorScreen: FunctionComponent<props> = ({show, navigation, scene}) => {
  return (
    <Modal animationType="none" transparent={false} visible={show}>
      <CustomHeader navigation={navigation} scene={scene} />
      <View>
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
            Whopps!{' '}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              marginTop: theme.SIZES.small * 0.4,
            }}>
            No Internet connection found.
          </Text>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>
            Please check your internet settings.
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
      </View>
      <View style={{marginTop: 'auto', marginBottom: 'auto'}}>
        <ActivityIndicator size="large" color={theme.COLORS.PRIMARY} />
      </View>
    </Modal>
  );
};

export default ErrorScreen;
