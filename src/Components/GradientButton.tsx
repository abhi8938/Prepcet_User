import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {FunctionComponent} from 'react';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';

import ActionLoader from './common/ActionLoader';
import LinearGradient from 'react-native-linear-gradient';
import baseStyles from './common/styles';
import theme from '../Constants/theme';

type props = {
  loading: boolean;
  touchableProps: {onPress: () => void; disabled: boolean};
  title: string;
  size: number;
  loadingText?: string;
  style?: any;
};
const GradientButton: FunctionComponent<props> = ({
  title,
  touchableProps,
  size = 1,
  loadingText,
  loading,
  style,
}) => {
  return (
    <TouchableHighlight
      underlayColor={theme.COLORS.PRIMARY}
      style={[styles.touch, baseStyles.shadow_minimal]}
      activeOpacity={0.9}
      {...touchableProps}>
      <LinearGradient
        colors={['#F6CE65', '#FAB378', '#FDA085']}
        style={[styles.linearGradient, style]}>
        {loading === false ? (
          <Text style={[styles.text, {fontSize: theme.SIZES.small * size}]}>
            {title}
          </Text>
        ) : (
          <ActivityIndicator
            style={{
              marginHorizontal: theme.SIZES.small / 2,
              marginVertical: theme.SIZES.small / 3,
            }}
            size={10 * size}
            color={theme.COLORS.WHITE}
          />
        )}
      </LinearGradient>
    </TouchableHighlight>
  );
};

export default GradientButton;

const styles = StyleSheet.create({
  touch: {
    marginHorizontal: theme.SIZES.normal,
    borderRadius: 10,
  },
  linearGradient: {
    paddingHorizontal: theme.SIZES.small,
    paddingVertical: theme.SIZES.small / 2,
    borderRadius: 10,
  },
  text: {
    color: theme.COLORS.WHITE,
    fontFamily: 'Signika-SemiBold',
  },
});
