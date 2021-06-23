import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, {FunctionComponent} from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableRipple} from 'react-native-paper';
import theme from '../Constants/theme';
import {width} from '../Constants/size';

type props = {
  onPress: () => void;
  item: any;
  coverWidth?: number;
};

const VideoCover: FunctionComponent<props> = ({item, onPress, coverWidth}) => {
  return (
    <TouchableRipple
      style={[
        styles.touchable,
        {
          marginRight: coverWidth ? theme.SIZES.small : 0,
          borderRadius: coverWidth ? 8 : 0,
        },
      ]}
      centered={false}
      rippleColor={`${theme.COLORS.WHITE}50`}
      onPress={() => console.log('pressed')}
      borderless={true}>
      <ImageBackground
        source={{
          uri: item.cover
            ? item.cover
            : 'https://www.gktoday.in/wp-content/uploads/2021/05/eric-carle.png',
        }}
        style={[
          styles.parent,
          {
            width: coverWidth ? coverWidth : width,
            borderRadius: coverWidth ? 8 : 0,
          },
        ]}
        resizeMode="cover"
        imageStyle={{opacity: 0.5}}>
        <Ionicons
          name={'ios-play-circle'}
          size={60}
          color={theme.COLORS.LIGHT_GREY}
          style={styles.play}
        />
        <View style={styles.bottomContainer}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.duration}>{item.duration}</Text>
        </View>
      </ImageBackground>
    </TouchableRipple>
  );
};

export default VideoCover;

const styles = StyleSheet.create({
  play: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{translateX: -28}, {translateY: -35}],
  },
  parent: {
    aspectRatio: 1.9,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#ccc',
  },
  touchable: {},
  title: {
    fontSize: theme.SIZES.large - 2,
    fontFamily: 'Signika-Medium',
    color: theme.COLORS.DEFAULT,
    width: '90%',
  },
  duration: {
    fontSize: theme.SIZES.large - 3,
    fontFamily: 'Signika-Medium',
    color: theme.COLORS.LIGHT_GREY,
    alignSelf: 'flex-end',
    width: '20%',
  },
  bottomContainer: {
    backgroundColor: `${theme.COLORS.BLACK}90`,
    alignSelf: 'stretch',
    paddingHorizontal: theme.SIZES.small,
    paddingVertical: theme.SIZES.small / 2,
  },
});
