import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {FunctionComponent} from 'react';

import baseStyles from './styles';
import theme from '../../Constants/theme';

type props = {
  title: string;
  size: 'small' | 'large' | number;
  color?: string;
  style?: any;
};

const ActionLoader: FunctionComponent<props> = ({
  title,
  size,
  color,
  style,
}) => {
  return (
    <View style={[styles.parent, style]}>
      <ActivityIndicator
        size={'large'}
        color={color ? color : theme.COLORS.HEADER}
      />
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default ActionLoader;

const styles = StyleSheet.create({
  parent: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: theme.SIZES.small * 0.3,
    marginRight: theme.SIZES.small,
    borderRadius: theme.SIZES.small,
  },
  text: {
    fontFamily: 'Signika-Regular',
    fontSize: theme.SIZES.small,
    marginLeft: theme.SIZES.small,
  },
});
