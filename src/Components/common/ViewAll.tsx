import {StyleSheet, Text, View} from 'react-native';

import React from 'react';
import {TouchableRipple} from 'react-native-paper';
import theme from '../../Constants/theme';

const ViewAll = ({onPress}: any) => {
  return (
    <TouchableRipple
      style={styles.ViewAllTouchable}
      centered={false}
      rippleColor={`${theme.COLORS.HEADER}30`}
      onPress={() => onPress()}
      borderless={true}>
      <Text style={styles.buttonText}>View All</Text>
    </TouchableRipple>
  );
};

export default ViewAll;

const styles = StyleSheet.create({
  ViewAllTouchable: {
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: `${theme.COLORS.HEADER}50`,
    borderRadius: 6,
  },

  buttonText: {
    fontSize: theme.SIZES.large - 2,
    fontFamily: 'ComicNeue-Bold',
    color: theme.COLORS.HEADER,
  },
});
