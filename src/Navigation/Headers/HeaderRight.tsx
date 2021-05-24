import {StyleSheet, Text, View} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import theme from '../../Constants/theme';

const HeaderRight = (props: any) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: theme.SIZES.small,
      }}>
      <Ionicons
        name={'ios-search'}
        size={25}
        color={theme.COLORS.BORDER_COLOR}
        style={{marginRight: 4}}
      />
      <Ionicons
        name={'md-notifications-outline'}
        size={25}
        color={theme.COLORS.BORDER_COLOR}
      />
    </View>
  );
};

export default HeaderRight;

const styles = StyleSheet.create({});
