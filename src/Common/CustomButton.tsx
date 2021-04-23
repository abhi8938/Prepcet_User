import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FunctionComponent} from 'react';

import Icon from 'react-native-vector-icons/Foundation';
import theme from '../Constants/theme';

const reset = (onPress: () => void) => (
  <Icon
    name="refresh"
    size={28}
    color={theme.COLORS.HEADER}
    style={{marginLeft: theme.SIZES.small - 4}}
    onPress={() => onPress()}
  />
);
type props = {
  style?: any;
  title: string;
  onPress: () => any;
  disable: boolean;
  label?: string;
  loading?: boolean;
  size?: 'LARGE' | 'SMALL' | 'MEDIUM';
  onReset?: () => void;
  animate?: boolean;
};
const CustomButton: FunctionComponent<props> = ({
  style = {},
  title,
  onPress,
  disable = false,
  label = 'Please wait...',
  loading = false,
  size = 'LARGE',
  onReset,
  animate,
}) => {
  const custom_font_size =
    size === 'LARGE'
      ? theme.SIZES.normal + 2
      : size === 'MEDIUM'
      ? theme.SIZES.normal
      : theme.SIZES.small + 2;

  const handleClick = () => {
    onPress();
  };

  return (
    <View style={styles.parent}>
      <TouchableOpacity
        style={[styles.button, style]}
        disabled={disable}
        onPress={() => handleClick()}>
        {loading === true ? (
          <ActivityIndicator size={30} color="#000000" />
        ) : (
          <Text style={[styles.text, {fontSize: custom_font_size}]}>
            {title}
          </Text>
        )}
      </TouchableOpacity>
      {onReset !== undefined ? (
        reset(disable === true ? () => {} : () => onReset())
      ) : animate ? (
        <Text style={[styles.label]}>{label}</Text>
      ) : null}
    </View>
  );
};
export default CustomButton;
const styles = StyleSheet.create({
  parent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: theme.COLORS.BLOCK,
    marginRight: theme.SIZES.small - 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: theme.SIZES.small,
  },
  text: {
    fontFamily: 'Comfortaa-Bold',
    color: theme.COLORS.ICON,
  },
  label: {
    marginLeft: theme.SIZES.small - 5,
    fontSize: theme.SIZES.normal + 1,
    fontFamily: 'Comfortaa-Bold',
  },
});
