import React, {FunctionComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import baseStyles from './styles';
import theme from '../../Constants/theme';

type props = {};

const BrandName: FunctionComponent<props> = ({}) => {
  return (
    <View>
      <Text style={[baseStyles.heading, styles.prep]}>
        Prep<Text style={styles.uni}>CET</Text>
      </Text>
    </View>
  );
};

export default BrandName;

const styles = StyleSheet.create({
  prep: {
    color: theme.COLORS.ORANGE,
    fontFamily: 'ComicNeue-Bold',
  },
  uni: {
    color: theme.COLORS.GREEN,
  },
});
