import {StyleSheet, Text, View} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import {TouchableRipple} from 'react-native-paper';
import baseStyles from './common/styles';
import theme from '../Constants/theme';

type props = {
  title: string;
  onPress: () => void;
  colors: {first: string; second: string};
};
const ComboComponent = ({title, onPress, colors}: props) => {
  return (
    <TouchableRipple
      rippleColor={`${theme.COLORS.DEFAULT}50`}
      style={[styles.touch, baseStyles.shadow_minimal]}
      onPress={() => onPress()}>
      <LinearGradient
        colors={[`#fdc830`, `#f37335`]}
        style={[styles.linearGradient]}>
        <Text style={[styles.text]}>{title}</Text>
      </LinearGradient>
    </TouchableRipple>
  );
};

export default ComboComponent;

const styles = StyleSheet.create({
  touch: {
    marginHorizontal: theme.SIZES.normal,
    borderRadius: 8,
    marginTop: theme.SIZES.small,
  },
  linearGradient: {
    paddingHorizontal: theme.SIZES.normal,
    paddingVertical: theme.SIZES.small,
    borderRadius: 10,
    alignItems: 'center',
  },
  text: {
    color: theme.COLORS.WHITE,
    fontFamily: 'Signika-SemiBold',
    fontSize: theme.SIZES.large + 3,
  },
});
