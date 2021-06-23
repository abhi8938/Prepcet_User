import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, {FunctionComponent} from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Link from './common/Link';
import {TouchableRipple} from 'react-native-paper';
import theme from '../Constants/theme';
import {width} from '../Constants/size';

type props = {
  onPress: () => void;
  cover: string;
  title: string;
};

const AffairCardComponent: FunctionComponent<props> = ({
  title,
  cover,
  onPress,
}) => {
  return (
    <TouchableRipple
      style={styles.touchable}
      centered={false}
      rippleColor={`${theme.COLORS.WHITE}50`}
      onPress={() => console.log('pressed')}
      borderless={true}>
      <ImageBackground
        source={{uri: cover}}
        style={styles.parent}
        resizeMode="cover"
        imageStyle={{opacity: 0.5}}>
        <View style={styles.bottomContainer}>
          <Text style={styles.title}>{title.substring(0, 100)}</Text>
          <Link
            title={'Read'}
            onPress={onPress}
            style={{
              color: theme.COLORS.DEFAULT,
              textDecorationColor: theme.COLORS.DEFAULT,
              marginTop: -15,
            }}
          />
        </View>
      </ImageBackground>
    </TouchableRipple>
  );
};

export default AffairCardComponent;

const styles = StyleSheet.create({
  parent: {
    width: width * 0.95,
    aspectRatio: 1.7,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: theme.COLORS.HEADER,
    borderRadius: 8,
  },
  touchable: {
    alignSelf: 'center',
    marginVertical: theme.SIZES.small,
    borderRadius: 8,
  },
  title: {
    fontSize: theme.SIZES.normal + 2,
    fontFamily: 'Signika-SemiBold',
    color: theme.COLORS.DEFAULT,
    letterSpacing: 0.8,
  },

  bottomContainer: {
    backgroundColor: `${theme.COLORS.BLACK}50`,
    paddingHorizontal: theme.SIZES.small,
    paddingVertical: theme.SIZES.small / 2,
  },
});
