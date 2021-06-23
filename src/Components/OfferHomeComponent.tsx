import {
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {FunctionComponent} from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableRipple} from 'react-native-paper';
import theme from '../Constants/theme';
import {width} from '../Constants/size';

type props = {
  onPress: () => void;
  title: string;
  code: string;
  offer: string;
};

const OfferHomeComponent: FunctionComponent<props> = ({
  title,
  onPress,
  code,
  offer,
}) => {
  return (
    <TouchableRipple
      style={styles.touchable}
      rippleColor={`${theme.COLORS.HEADER}20`}
      onPress={() => console.log('pressed')}
      borderless={false}>
      <View style={styles.parent}>
        <Image
          source={require('../Assets/images/PrepCET.png')}
          style={styles.image}
        />
        <View style={styles.bottomContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.duration}>
            <Text
              style={{
                color: theme.COLORS.SECONDARY,
                fontSize: theme.SIZES.large + 5,
                textDecorationColor: theme.COLORS.SECONDARY,
              }}>
              Code:{' '}
            </Text>
            {code}
          </Text>
        </View>
      </View>
    </TouchableRipple>
  );
};

export default OfferHomeComponent;

const styles = StyleSheet.create({
  image: {
    width: 100,
    aspectRatio: 1,
  },
  parent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.95,
    minHeight: 150,
    paddingHorizontal: theme.SIZES.small,
    borderRadius: 5,
  },
  touchable: {
    alignSelf: 'center',
    marginVertical: theme.SIZES.small,
    backgroundColor: theme.COLORS.DEFAULT,
    elevation: 5,
    borderRadius: 5,
    shadowColor: theme.COLORS.HEADER,
    shadowOffset: {width: 2, height: 1},
    shadowRadius: 2,
    shadowOpacity: 0.3,
  },
  title: {
    fontSize: theme.SIZES.large - 2,
    fontFamily: 'Comfortaa-Medium',
    color: theme.COLORS.HEADER,
    marginBottom: theme.SIZES.small / 2,
    textAlign: 'center',
  },
  duration: {
    fontSize: theme.SIZES.large + 10,
    fontFamily: 'ComicNeue-Bold',
    color: theme.COLORS.PRIMARY,
  },
  bottomContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.SIZES.small,
    paddingVertical: theme.SIZES.small / 2,
    width: '70%',
  },
});
