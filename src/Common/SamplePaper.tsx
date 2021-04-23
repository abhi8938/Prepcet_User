//* TODO:
//**-  As the user scrolls, animate the Height/ Padding etc of the whole card
//**-  Animate card when the user interacts with it like changing the backgoundColor/Increase/Decrease the Image/Text

import {
  Alert,
  FlatList,
  Image,
  Platform,
  PlatformAndroidStatic,
  PlatformIOSStatic,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated, {
  Easing,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {Height, width} from '../Constants/size';
import React, {FunctionComponent} from 'react';

// Sample Data
import Data from './Data';
import Navigation from '../Screens/Reader/Navigation';
import theme from '../Constants/theme';

type props = {
  navigation: any;
  scene?: any;
};
const SamplePaper: FunctionComponent<props> = ({navigation, scene}: any) => {
  const RenderedItem = ({item}: any) => {
    const size = useSharedValue({
      width: 100,
      height: 150,
      // fontSize: 16,
    });

    const animatable = useAnimatedStyle(() => {
      return {
        width: withSpring(size.value.width, {
          damping: 15,
          stiffness: 50,
        }),
        height: withSpring(size.value.height, {
          damping: 20,
          mass: 2,
          stiffness: 50,
        }),
        // fontSize: withSpring(size.value.fontSize, {
        //   damping: 15,
        //   stiffness: 50,
        // }),
      };
    });

    return (
      <TouchableWithoutFeedback
        onPress={() =>
          // Alert.alert('Message', 'Content will be available soon')
          navigation.navigate('Reader')
        }>
        <Animated.View
          // onTouchStart={() => {
          //   // console.log('touch start: font size', size.value);
          //   size.value = {
          //     width: 90,
          //     height: 120,
          //     // fontSize: 14,
          //   };
          // }}
          // // onTouchEnd={() => console.log('touch end')}
          // onTouchMove={() => {
          //   // console.log('touch move: font size', size.value);
          //   size.value = {
          //     width: 100,
          //     height: 150,
          //     // fontSize: 16,
          //   };
          // }}
          style={[styles.paperContainer]}>
          <Animated.Image
            source={{uri: item.image}}
            style={[animatable, {marginVertical: 6}]}
            resizeMode={'cover'}
          />
          <Animated.Text style={[{fontWeight: 'bold'}]}>
            {item.title}
          </Animated.Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  };

  const platformIos = Platform as PlatformIOSStatic;

  return (
    <View style={styles.parent}>
      <FlatList
        data={Data}
        numColumns={platformIos.isPad ? 3 : 2}
        ListHeaderComponent={() => (
          <Text style={styles.heading}>Sample Papers </Text>
        )}
        renderItem={({item}) => <RenderedItem item={item} />}
        keyExtractor={(item, index) => item.title}
      />
    </View>
  );
};

export default SamplePaper;

const styles = StyleSheet.create({
  parent: {
    flexDirection: 'column',
    borderWidth: 8,
    // paddingHorizontal: theme.SIZES.small / 0.9,
    // paddingVertical: theme.SIZES.normal / 1.5,
    // margin: width * 0.02,
    borderColor: 'white',
    // elevation: 2,
    backgroundColor: 'white',
  },
  heading: {
    paddingHorizontal: theme.SIZES.large,
    paddingVertical: theme.SIZES.normal / 1.5,
    fontSize: theme.SIZES.large,
    fontFamily: 'Signika-Medium',
    color: theme.COLORS.HEADER,
  },
  paperContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    margin: 5,
    borderWidth: 5,
    borderRadius: 10,
    elevation: 1,
    // borderColor: 'transparent',
    borderColor: theme.COLORS.BORDER_COLOR,
  },
  poster: {
    width: 100,
    height: 150,
    marginBottom: 10,
  },
});
