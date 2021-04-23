import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FunctionComponent, useState} from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import TopNavbar from '../Components/common/TopNavbar';
import theme from '../Constants/theme';

type props = {
  title?: string;
  message?: string;
  icon?: string;
  style?: any;
};

const EmptyScreen: FunctionComponent<props> = ({
  title = 'Notification',
  message = 'No Notifications to Display',
  icon,
  style,
}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: theme.SIZES.large * 9,
      }}>
      {icon && <Icon name={icon} size={50} color={theme.COLORS.PRIMARY} />}
      <Text style={styles.messageStyle}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  messageStyle: {
    marginTop: theme.SIZES.large * 1.5,
    fontWeight: 'bold',
    color: theme.COLORS.HEADER,
    fontSize: theme.SIZES.large * 1.2,
  },
});
export default EmptyScreen;
