import {StyleSheet, Text, View} from 'react-native';

import React from 'react';
import Swiper from 'react-native-swiper';
import theme from '../../Constants/theme';

type props = {
  height: number;
  children?: any;
};
const SwiperComponent = ({height, children}: props) => {
  return (
    <View
      style={{
        display: 'flex',
        height: height,
        borderBottomWidth: 0.7,
        borderBottomColor: `${theme.COLORS.HEADER}50`,
      }}>
      <Swiper
        style={styles.wrapper}
        autoplay={true}
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.activeDot} />}
        autoplayTimeout={5}
        loop>
        {children}
      </Swiper>
    </View>
  );
};

export default SwiperComponent;

const styles = StyleSheet.create({
  activeDot: {
    backgroundColor: theme.COLORS.PRIMARY,
    width: 18,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  dot: {
    backgroundColor: `${theme.COLORS.PRIMARY}50`,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  wrapper: {},
});
