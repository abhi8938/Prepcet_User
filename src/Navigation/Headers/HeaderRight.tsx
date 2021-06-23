import {Platform, StyleSheet, Text, View} from 'react-native';

import HeaderLeft from './HeaderLeft';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import {TouchableRipple} from 'react-native-paper';
import theme from '../../Constants/theme';

const HeaderRight = (props: any) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingRight: 4,
        alignItems: 'center',
      }}>
      <TouchableRipple
        style={styles.touchable}
        rippleColor={`${theme.COLORS.PRIMARY}50`}
        onPress={() => props.navigation.navigate('SearchHome')}
        borderless={true}>
        <Ionicons
          name={'ios-search'}
          size={25}
          color={theme.COLORS.BORDER_COLOR}
        />
      </TouchableRipple>
      <TouchableRipple
        style={styles.touchable_wallet}
        rippleColor={`${theme.COLORS.PRIMARY}80`}
        onPress={() => props.navigation.navigate('Wallet')}
        borderless={true}>
        <View style={styles.parent}>
          <Ionicons
            name={'ios-wallet-outline'}
            size={30}
            color={theme.COLORS.BORDER_COLOR}
          />
          <Text style={styles.text}>₹20</Text>
        </View>
      </TouchableRipple>
    </View>
  );
};

export default HeaderRight;

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    color: theme.COLORS.PRIMARY,
    marginLeft: 5,
  },
  touchable_wallet: {
    marginHorizontal: theme.SIZES.small / 1.2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: `${theme.COLORS.PRIMARY}60`,
  },
  parent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 5,
    backgroundColor: `${theme.COLORS.PRIMARY}10`,
  },
  touchable: {
    marginHorizontal: 2,
    borderRadius: 10,
    paddingVertical: 3,
    paddingHorizontal: 3.2,
  },
});
