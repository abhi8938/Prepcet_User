import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {FunctionComponent} from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableRipple} from 'react-native-paper';
import baseStyles from './styles';
import theme from '../../Constants/theme';
import {width} from '../../Constants/size';

type props = {
  name: string;
  icon: string;
  nogap?: boolean;
  onPress: any;
  last?: boolean;
  first?: boolean;
};
const VerticallistItem: FunctionComponent<props> = ({
  name,
  icon,
  nogap,
  onPress,
  last,
  first,
}) => {
  return (
    <TouchableRipple
      style={[
        styles.touchable,
        last && {
          borderBottomWidth: 0,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
        },
        nogap &&
          !first && {
            marginVertical: 0,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          },
        nogap &&
          first && {
            marginVertical: 0,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          },
      ]}
      centered={false}
      rippleColor={`${theme.COLORS.PRIMARY}50`}
      onPress={onPress}>
      <View style={styles.listItemParent}>
        <View style={styles.firstContainer}>
          {icon && (
            <View style={styles.iconContainer}>
              <Ionicons name={icon} size={23} color={theme.COLORS.DEFAULT} />
            </View>
          )}
          <Text style={styles.listText}>{name}</Text>
        </View>
        <Ionicons
          name={'arrow-forward-circle-outline'}
          size={25}
          color={theme.COLORS.BORDER_COLOR}
        />
      </View>
    </TouchableRipple>
  );
};

export default VerticallistItem;

const styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: theme.COLORS.PRIMARY,
    borderRadius: 5,
    paddingHorizontal: 4,
    paddingVertical: 3.5,
    marginRight: theme.SIZES.large,
  },
  firstContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemParent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  touchable: {
    width: width * 0.97,
    paddingHorizontal: theme.SIZES.small,
    paddingVertical: theme.SIZES.small,
    marginVertical: theme.SIZES.small / 1.5,
    backgroundColor: `#FAF9F6`,
    borderBottomWidth: 1.5,
    borderBottomColor: '#00000050',
    borderTopLeftRadius: 8,

    borderTopRightRadius: 8,
    shadowColor: theme.COLORS.BLACK,
    elevation: 5,
  },
  listText: {
    fontSize: theme.SIZES.large,
    fontFamily: 'Signika-Medium',
    color: theme.COLORS.HEADER,
  },
});
