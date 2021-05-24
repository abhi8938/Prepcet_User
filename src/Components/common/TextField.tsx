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

import GradientButton from '../GradientButton';
import IconAnt from 'react-native-vector-icons/AntDesign';
import Icon_vec from 'react-native-vector-icons/Ionicons';
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
  verify?: {
    onPress: () => void;
    verified: boolean;
    load: boolean;
  };
};

const TextField: FunctionComponent<props> = ({
  inputProps,
  error,
  secureText,
  icon,
  label,
  style,
  verify,
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
    <View
      style={{
        maxWidth: 700,
        alignSelf: 'center',
        marginBottom: 5,
      }}>
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
            name={secureText.hidden === false ? 'eye' : 'eye-off'}
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
      {verify && (
        <View style={styles.verifyButton}>
          {verify.verified === false ? (
            inputProps.value.length !== 0 && (
              <GradientButton
                loading={verify.load}
                loadingText={'...'}
                touchableProps={{
                  onPress: verify.onPress,
                  disabled: verify.load,
                }}
                title={'verify'}
                size={1.1}
              />
            )
          ) : (
            <IconAnt
              style={styles.check}
              name={'checkcircle'}
              size={theme.SIZES.large + 1}
              color={theme.COLORS.SECONDARY}
            />
          )}
        </View>
      )}
    </View>
  );
};

export default TextField;

const styles = StyleSheet.create({
  verifyButton: {
    position: 'absolute',
    zIndex: 1,
    elevation: 2,
    right: -2,
    top: 14,
  },
  parent: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: `${theme.COLORS.BORDER_TEXT}50`,
    marginVertical: theme.SIZES.small * 0.5,
    paddingTop: theme.SIZES.small * 0.7,
    paddingBottom: theme.SIZES.small * 0.5,
    borderRadius: 8,
    paddingHorizontal: theme.SIZES.small * 0.8,
  },
  textField: {
    width: '100%',
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
  check: {
    zIndex: 1,
    elevation: 2,
    marginHorizontal: theme.SIZES.small,
    marginTop: theme.SIZES.small / 3.5,
  },
});
