import React, {FunctionComponent, ReactChildren} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import theme from '../../Constants/theme';

type props = {
  style: any;
  card: boolean;
  children: JSX.Element;
};

const GroupContainer: FunctionComponent<props> = ({style, card, children}) => {
  return (
    <View
      style={[
        styles.parent,
        card === true ? styles.card : styles.outline,
        style,
      ]}>
      {children}
    </View>
  );
};

export default GroupContainer;

const styles = StyleSheet.create({
  parent: {
    flexDirection: 'column',
    paddingHorizontal: theme.SIZES.small / 0.9,
    paddingVertical: theme.SIZES.normal / 1.5,
    margin: theme.SIZES.small + 2,
    borderRadius: 10,
    elevation: 2,
  },
  card: {
    backgroundColor: '#F0F0F0',
    shadowColor: 'black',
    elevation: 2,
    shadowOffset: {width: 2, height: 5},
    shadowRadius: 4,
    shadowOpacity: 0.2,
  },
  outline: {
    borderWidth: 2,
    borderColor: theme.COLORS.HEADER,
  },
});
