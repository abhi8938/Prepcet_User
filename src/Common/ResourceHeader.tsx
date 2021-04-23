import {Height, width} from '../Constants/size';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FunctionComponent, useEffect, useState} from 'react';

import theme from '../Constants/theme';

type props = {
  title: any;
};

const ResourceHeader: FunctionComponent<props> = ({title}) => {
  return (
    <View
      style={{
        backgroundColor: theme.COLORS.PRIMARY,
        height: Height * 0.075,
        width: '100%',
        borderRadius: 5,
        justifyContent: 'center',
        paddingHorizontal: theme.SIZES.small,
        marginTop: theme.SIZES.small,
      }}>
      <Text
        style={{
          fontSize: 20,
          color: theme.COLORS.WHITE,
          fontWeight: 'bold',
        }}>
        {title}
      </Text>
    </View>
  );
};

export default ResourceHeader;
