import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Height, width} from '../../Constants/size';
import React, {FunctionComponent, useRef, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

import Icon_vec from 'react-native-vector-icons/Octicons';
import baseStyles from './styles';
import theme from '../../Constants/theme';

type props = {
  inputProps: {
    placeholder: string;
    onChangeText: (text: string) => void;
    value: string;
    onBlur: (e: any) => void;
    onFocus: (e: any) => void;
    style?: any;
    multiline?: boolean;
    keyboardType?: string;
    maxLength?: number;
    editable?: boolean;
    ref?: any;
  };
  error: string;
  secureText?: {onToggle: () => void; hidden: boolean};
  icon?: {icon: string; onPress?: () => void};
  label?: string;
  style?: any;
};

const TextField: FunctionComponent<props> = ({
  inputProps,
  error,
  secureText,
  icon,
  label,
  style,
}) => {
  const Bcolo = useSharedValue(0);
  const animationBColor = useDerivedValue(() => {
    return interpolateColor(
      Bcolo.value,
      [0, 1],
      [theme.COLORS.PRICE_COLOR, theme.COLORS.PRIMARY],
    );
  });

  //@ts-ignore
  const BStyle = useAnimatedStyle(() => {
    return {borderBottomColor: animationBColor.value};
  });
  //@ts-ignore

  const startAnimation = () => {
    Bcolo.value = withTiming(1, {duration: 300});
  };
  return (
    <>
      <Animated.View style={[styles.parent, style, BStyle]}>
        {/* {icon && <Icon type={icon.icon} onPress={icon.onPress} size={2} />} */}
        <TextInput
          placeholderTextColor={theme.COLORS.PLACEHOLDER}
          style={[
            styles.textField,
            {
              color:
                Bcolo.value === 0 ? theme.COLORS.BLACK : theme.COLORS.PRIMARY,
            },
            inputProps.style,
          ]}
          {...inputProps}
          onFocus={(e) => {
            startAnimation();
            inputProps.onFocus(e);
          }}
          onBlur={(e) => {
            Bcolo.value = withTiming(0, {duration: 200});
            inputProps.onBlur(e);
          }}
          secureTextEntry={
            secureText && secureText.hidden === false ? true : false
          }
        />
        {secureText && (
          <Icon_vec
            style={styles.eye}
            name={secureText.hidden === false ? 'eye' : 'eye-closed'}
            size={theme.SIZES.large + 1}
            color={
              secureText.hidden
                ? theme.COLORS.BORDER_COLOR
                : theme.COLORS.HEADER
            }
            onPress={() => secureText.onToggle && secureText.onToggle()}
          />
        )}
      </Animated.View>
      <View style={styles.errorContainer}>
        {error.length !== 0 && <Text style={styles.error}>{error}</Text>}
      </View>
    </>
  );
};

export default TextField;

const styles = StyleSheet.create({
  parent: {
    flexDirection: 'row',
    borderBottomWidth: theme.SIZES.small * 0.15,
    marginVertical: theme.SIZES.small * 0.5,
    paddingTop: theme.SIZES.small * 0.5,
    paddingBottom: theme.SIZES.small * 0.2,
    paddingHorizontal: theme.SIZES.small * 0.3,
  },
  textField: {
    width: '90%',
    minHeight: theme.SIZES.large,
    paddingVertical: theme.SIZES.small / 5,
    fontFamily: 'Signika-Regular',
    paddingLeft: 0,
    fontSize: theme.SIZES.normal + 2,
    letterSpacing: 1,
  },
  eye: {
    position: 'absolute',
    zIndex: 1,
    elevation: 2,
    right: theme.SIZES.large / 2.5,
    top: '40%',
  },
  errorContainer: {
    marginLeft: theme.SIZES.small / 3,
    paddingRight: theme.SIZES.small / 2,
  },
  error: {
    fontSize: theme.SIZES.normal / 1.4,
    color: theme.COLORS.ERROR,
    fontFamily: 'Signika-Regular',
  },
});
