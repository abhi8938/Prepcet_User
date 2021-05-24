import {StyleSheet, Text, View} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import theme from '../../Constants/theme';

const HeaderLeft = (props: any) => {
  return (
    <View style={{marginHorizontal: theme.SIZES.small / 1.2}}>
      <Ionicons
        name={'ios-wallet-outline'}
        size={25}
        color={theme.COLORS.BORDER_COLOR}
      />
      <Text
        style={{
          fontSize: theme.SIZES.small,
          color: theme.COLORS.PRIMARY,
        }}>
        Rs.20
      </Text>
    </View>
  );
};

export default HeaderLeft;

const styles = StyleSheet.create({});
