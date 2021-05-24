import {StyleSheet, Text, View} from 'react-native';

import React from 'react';
import theme from '../Constants/theme';

const OrSection = ({title}: any) => {
  return (
    <View style={styles.parent}>
      <View style={styles.line} />
      <Text style={styles.or}>OR {title} with</Text>
      <View style={styles.line} />
    </View>
  );
};

export default OrSection;

const styles = StyleSheet.create({
  parent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.SIZES.large,
  },
  or: {
    fontSize: theme.SIZES.normal,
    fontFamily: 'Signika-Regular',
    color: theme.COLORS.HEADER,
    alignSelf: 'center',
    paddingHorizontal: 3,
  },
  line: {
    height: 3,
    flex: 1,
    backgroundColor: '#ccc',
  },
});
