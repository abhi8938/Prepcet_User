// TODO: -- Create Subscription
//  Package name - Trial or Paid
//  Expiration Time ( fake it now) - Months-days
//  Start date of subscription
//  Paper_Products for that subscription
//  Semesters (can be array or single string)
// * Renew Button ( Only be active when the expiration time is less than 15 days)

import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Height, width} from '../Constants/size';
import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {FunctionComponent, useEffect, useState} from 'react';

import Button from '../Common/CustomButton';
import CustomHeader from '../Common/CustomHeader';
import Header from '../Common/CustomHeader1';
import Touchable from '../Components/common/Touchable';
import {subscription_data} from '../Constants/sample';
import theme from '../Constants/theme';

type props = {
  navigation: any;
  scene: any;
};

const Key_values = ({label, value}: any) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>{label}</Text>
      </View>
      <View>
        {typeof value === 'object' ? (
          value.map((item: any, index: number) => (
            <Text key={`${item}-${index + 1}`} style={styles.title}>
              {item}
            </Text>
          ))
        ) : (
          <Text style={styles.title}>{value}</Text>
        )}
      </View>
    </View>
  );
};
const Subscription: FunctionComponent<props> = ({navigation, scene}) => {
  const [Load, setLoad] = useState(false);

  const renew = () => {
    setLoad(!Load);
  };

  const card_values = useSharedValue({
    translateX: -width,
    opacity: 0,
  });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(card_values.value.translateX, {
            duration: 900,
          }),
        },
      ],
      opacity: withTiming(card_values.value.opacity, {
        duration: 1000,
      }),
    };
  });
  useEffect(() => {
    card_values.value = {
      translateX: 0,
      opacity: 1,
    };
  });
  return (
    <View style={styles.parent}>
      <CustomHeader
        navigation={navigation}
        scene={scene}
        title={'Subscription'}
        nav
      />
      <Animated.View style={[styles.card, styles.shadow, animatedStyles]}>
        <Key_values label={'Package Name'} value={subscription_data.package} />
        <Key_values label={'Started at'} value={subscription_data.created_at} />
        <Key_values
          label={'Expiration Time'}
          value={new Date(subscription_data.expiration_time).toUTCString()}
        />
        <Key_values label={'Semester'} value={subscription_data.semester} />
        <Key_values label={'Papers'} value={subscription_data.paper_products} />
      </Animated.View>
      <Touchable
        touchableProps={{
          onPress: () => {},
          disabled: false,
        }}
        filled={true}
        loading={false}
        title={'Renew'}
        size={'LARGE'}
      />
    </View>
  );
};

export default Subscription;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: theme.COLORS.DEFAULT,
    // paddingTop: Platform.OS === 'ios' ? theme.SIZES.large * 1.42 : 0,
  },
  card: {
    width: width / 1.12,
    marginTop: theme.SIZES.normal,
    marginBottom: theme.SIZES.large * 2,
    // marginRight: theme.SIZES.large,
    padding: theme.SIZES.normal,
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: '#a9a9a9',
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 3,
    shadowOpacity: 0.4,
    elevation: 5,
  },
  container: {
    marginVertical: theme.SIZES.small,
  },
  label: {
    fontSize: theme.SIZES.normal + 1,
    fontWeight: 'bold',
    fontFamily: 'Signika-Medium',
  },

  title: {
    fontSize: theme.SIZES.normal,
    // fontWeight: '400',
    marginTop: theme.SIZES.small / 2,
    fontFamily: 'Comfortaa-Medium',
  },
});
