import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableRipple} from 'react-native-paper';
import theme from '../../Constants/theme';
import {useSelector} from 'react-redux';

const HeaderLeft = (props: any) => {
  const notifications: any = useSelector(
    (state: any) => state.main.notifications,
  );
  return (
    <View>
      <TouchableRipple
        style={styles.touchable}
        rippleColor={`${theme.COLORS.PRIMARY}50`}
        onPress={() => props.navigation.navigate('Notification')}
        borderless={true}>
        <Ionicons
          name={'md-notifications-outline'}
          size={25}
          color={theme.COLORS.BORDER_COLOR}
        />
      </TouchableRipple>
      {notifications.length > 0 && (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{notifications.length}</Text>
        </View>
      )}
    </View>
  );
};

export default HeaderLeft;

const styles = StyleSheet.create({
  badgeContainer: {
    backgroundColor: theme.COLORS.ERROR,
    position: 'absolute',
    zIndex: 1,
    elevation: 3,
    borderRadius: 50,
    right: -2,
    top: -4,
    width: 17,
    height: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 11,
    color: theme.COLORS.WHITE,
    fontFamily: 'Signika-Bold',
  },
  text: {
    fontSize: 12,
    color: theme.COLORS.PRIMARY,
  },
  touchable: {
    marginHorizontal: 2,
    borderRadius: 10,
    paddingVertical: 3,
    paddingHorizontal: 3.2,
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
});
