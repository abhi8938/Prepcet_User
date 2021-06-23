import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {FunctionComponent} from 'react';

import IonIcon from 'react-native-vector-icons/Ionicons';
import {TouchableRipple} from 'react-native-paper';
import theme from '../../Constants/theme';
import {width} from '../../Constants/size';

type props = {
  onPress: () => void;
  title: string;
  icon?: string;
  bg: string;
};
const BoxComponent: FunctionComponent<props> = ({onPress, title, icon, bg}) => {
  return (
    <TouchableRipple
      style={[styles.startButton1, {backgroundColor: `${bg}99`}]}
      centered={true}
      rippleColor={theme.COLORS.DEFAULT}
      onPress={() => onPress()}
      borderless={Platform.OS === 'ios' ? false : true}>
      <View style={[styles.startButtonContainer1]}>
        {icon && (
          <IonIcon
            style={{marginBottom: 4}}
            name={icon}
            size={30}
            color={theme.COLORS.DEFAULT}
          />
        )}
        <Text
          style={[
            styles.startButtonText1,
            {fontSize: icon ? theme.SIZES.normal - 1 : theme.SIZES.normal + 2},
          ]}>
          {title}
        </Text>
      </View>
    </TouchableRipple>
  );
};

export default BoxComponent;

const styles = StyleSheet.create({
  startButtonContainer1: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButton1: {
    minWidth: width * 0.25,
    paddingVertical: theme.SIZES.small,
    paddingHorizontal: theme.SIZES.small,
    marginHorizontal: theme.SIZES.small / 1.2,
    marginBottom: theme.SIZES.small + 2,
    borderRadius: 6,
  },
  startButtonText1: {
    fontFamily: 'Signika-Medium',
    color: theme.COLORS.DEFAULT,
    textAlign: 'center',
  },
});
