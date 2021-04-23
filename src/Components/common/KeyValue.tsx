import React, {FunctionComponent} from 'react';
import {StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native';

import baseStyles from './styles';
import theme from '../../Constants/theme';

type props = {
  itemKey: string;
  value: string;
  style?: ViewStyle;
  keyStyle?: TextStyle;
  valueStyle?: TextStyle;
};

const KeyValue: FunctionComponent<props> = ({
  itemKey,
  value,
  style,
  keyStyle,
  valueStyle,
}) => {
  return (
    <View style={[styles.parent, style]}>
      <Text style={[styles.key, keyStyle]}>{itemKey} - </Text>
      <Text style={[styles.value, valueStyle]}>{`${value}`}</Text>
    </View>
  );
};

export default KeyValue;

const styles = StyleSheet.create({
  parent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.SIZES.small / 2.5,
  },
  key: {
    fontSize: theme.SIZES.normal + 4,
    fontFamily: 'Signika-SemiBold',
    marginRight: theme.SIZES.small / 2,
    color: theme.COLORS.HEADER,
    textAlign: 'center',
    lineHeight: 22,
    letterSpacing: 1,
  },
  value: {
    fontSize: theme.SIZES.small + 5,
    fontFamily: 'Signika-Regular',
    color: theme.COLORS.BLACK,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: '69%',
    letterSpacing: 1,
  },
});
