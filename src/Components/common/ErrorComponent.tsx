import {Image, StyleSheet, Text, View} from 'react-native';
import React, {FunctionComponent} from 'react';

import Touchable from './Touchable';
import baseStyles from './styles';

type props = {
  type: 'INTERNET' | 'SERVER';
};

const ErrorComponent: FunctionComponent<props> = ({type}) => {
  const source =
    type === 'INTERNET'
      ? require('../../Assets/images/journalist.png')
      : require('../../Assets/images/teacher.png');
  return (
    <View style={styles.parent}>
      <Text style={baseStyles.body}>
        <Text style={styles.topText}>
          {type === 'INTERNET' ? 'INTERNET' : 'SERVER'}
        </Text>
        <Text style={styles.bodyText}>
          {type === 'INTERNET' ? 'INTERNET' : 'SERVER'}
        </Text>
      </Text>
      <Image source={{uri: source}} style={styles.image} />
      <Touchable
        touchableProps={{
          onPress: () => console.log('retry'),
          disabled: false,
        }}
        loading={false}
        size={'LARGE'}
        title={'Retry'}
      />
    </View>
  );
};

export default ErrorComponent;

const styles = StyleSheet.create({
  parent: {},
  image: {},
  topText: {},
  bodyText: {},
});
