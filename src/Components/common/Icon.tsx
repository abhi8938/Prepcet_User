import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {FunctionComponent} from 'react';

import BrandName from './BrandName';
import Icons from '../../Assets/Icons';
import baseStyles from './styles';
import theme from '../../Constants/theme';

type props = {
  type: string;
  size: number;
  style?: any;
  onPress?: () => void;
};

const Icon: FunctionComponent<props> = ({type, style, size, onPress}) => {
  const {Icon}: any = Icons.find((item) => item.label === type);
  return (
    <Pressable
      style={[styles.parent, style]}
      android_ripple={{
        borderless: false,
        color: theme.COLORS.WHITE,
        radius: 25,
      }}
      onPress={onPress && onPress}>
      <Icon
        width={theme.SIZES.large * size}
        height={theme.SIZES.large * size}
      />
    </Pressable>
  );
};

export default Icon;

const styles = StyleSheet.create({
  parent: {
    padding: theme.SIZES.small / 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
});
