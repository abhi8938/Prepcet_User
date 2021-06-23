import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import React from 'react';
import theme from '../../Constants/theme';

type props = {
  onPress: () => void;
  title: string;
  style: any;
};
const Link = ({style, onPress, title}: props) => {
  return (
    <TouchableOpacity style={styles.parent}>
      <Text style={[styles.link, style]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Link;

const styles = StyleSheet.create({
  parent: {
    padding: 3,
  },
  link: {
    alignSelf: 'flex-end',
    fontSize: theme.SIZES.large,
    fontFamily: 'ComicNeue-Bold',
    color: theme.COLORS.Links,
    textDecorationColor: theme.COLORS.Links,
    textDecorationLine: 'underline',
  },
});
