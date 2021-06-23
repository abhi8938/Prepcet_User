import {Image, Platform, StyleSheet, Text, View} from 'react-native';

import React from 'react';
import {TouchableRipple} from 'react-native-paper';
import {URL} from '../Constants/urls';
import theme from '../Constants/theme';
import {width} from '../Constants/size';

type props = {
  item: any;
  onPress: () => void;
};
const CategoryItem = ({item, onPress}: props) => {
  return (
    <TouchableRipple
      style={[styles.parent]}
      centered={true}
      rippleColor={`${theme.COLORS.HEADER}30`}
      onPress={() => onPress()}
      borderless={Platform.OS === 'ios' ? false : true}>
      <View style={styles.innerContainer}>
        <Image
          source={{uri: `${URL}/extras/files/${item.cover}`}}
          style={styles.image}
        />
        <Text style={styles.title}>{item.name}</Text>
      </View>
    </TouchableRipple>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  innerContainer: {
    flexDirection: 'column',
    display: 'flex',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  parent: {
    paddingVertical: theme.SIZES.small / 2,
    paddingHorizontal: theme.SIZES.small,
    marginHorizontal: theme.SIZES.small / 1.2,
    marginBottom: theme.SIZES.large,
    borderRadius: 6,
    elevation: 5,
    backgroundColor: theme.COLORS.DEFAULT,
    shadowColor: theme.COLORS.BORDER_TEXT,
    shadowOffset: {width: 2, height: 1},
    shadowRadius: 5,
    shadowOpacity: 0.3,
  },
  image: {
    width: width * 0.2,
    aspectRatio: 1,
  },
  title: {
    fontSize: theme.SIZES.normal + 2,
    fontFamily: 'Signika-Medium',
    color: theme.COLORS.HEADER,
    textAlign: 'center',
  },
});
