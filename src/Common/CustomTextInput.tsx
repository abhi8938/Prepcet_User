import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import {Height, width} from '../Constants/size';
import React, {Children, FunctionComponent} from 'react';
import {event, onChange} from 'react-native-reanimated';

import Icon from 'react-native-vector-icons/Octicons';
import theme from '../Constants/theme';

type props = {
  style?: any;
  placeHolder?: string;
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => any;
  onBlur?: () => any;
  disable: boolean;
  error: string;
  show?: boolean;
  handleShow?: () => void;
};
const eye = (onPress: () => void, name: string) => (
  <Icon
    style={styles.eye}
    name={name}
    size={theme.SIZES.large}
    color={theme.COLORS.HEADER}
    onPress={() => onPress()}
  />
);
const CustomTextInput: FunctionComponent<props> = ({
  style = {},
  placeHolder,
  value,
  onChange,
  onFocus,
  onBlur,
  disable = false,
  error = '',
  show,
  handleShow,
}) => {
  const renderIcon = () => {
    if (show && show === true)
      return eye(() => handleShow && handleShow(), 'eye-closed');
    return eye(() => handleShow && handleShow(), 'eye');
  };

  return (
    <View style={[styles.parent]}>
      <TextInput
        secureTextEntry={show !== undefined && show === false}
        underlineColorAndroid={'rgba(0,0,0,0)'}
        autoCorrect={false}
        onBlur={onBlur ? onBlur : () => {}}
        onFocus={onFocus ? onFocus : () => {}}
        value={value}
        onChangeText={(text) => onChange(text)}
        style={[styles.input, style]}
        placeholder={placeHolder ? placeHolder : 'Enter Text'}
      />
      {placeHolder === 'password' || placeHolder === 're-enter password'
        ? renderIcon()
        : null}
      {error.length > 0 ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};
export default CustomTextInput;
const styles = StyleSheet.create({
  eye: {
    position: 'absolute',
    zIndex: 1,
    elevation: 2,
    right: theme.SIZES.small + 1,
    top: theme.SIZES.small + 1,
  },
  error: {
    marginTop: theme.SIZES.small - 5,
    fontSize: theme.SIZES.normal - 2,
    marginHorizontal: theme.SIZES.small,
    fontFamily: 'Comfortaa-Bold',
    lineHeight: 22,
    color: theme.COLORS.ERROR,
    alignSelf: 'flex-start',
    width: '97%',
  },
  parent: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    // marginHorizontal: theme.SIZES.small / 4,
    marginVertical: 5,
    marginBottom: theme.SIZES.small,
  },
  input: {
    width: '98%',
    height: theme.SIZES.large * 2.3,
    backgroundColor: '#cccccc',
    padding: theme.SIZES.small,
    borderRadius: 7,
    fontSize: theme.SIZES.normal + 4,
    fontFamily: 'Comfortaa-Medium',
  },
});
