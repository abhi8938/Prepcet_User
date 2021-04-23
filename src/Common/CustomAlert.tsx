import React, {FunctionComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import theme from '../Constants/theme';

type props = {
  style?: string;
  title: string;
};
const CustomAlertString: FunctionComponent<props> = ({style, title}) => {
  return (
    <View style={styles.parent}>
      {title.length > 0 ? <Text style={styles.title}>{title}</Text> : null}
    </View>
  );
};
export default CustomAlertString;

const styles = StyleSheet.create({
  parent: {
    width: '55%',
  },
  title: {
    fontSize: theme.SIZES.normal + 2,
    fontFamily: 'Comfortaa-Bold',
    color: theme.COLORS.ERROR,
  },
});
