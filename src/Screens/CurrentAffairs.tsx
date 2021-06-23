import {
  Animated,
  Image,
  ImageBackground,
  PanResponder,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Height, width} from '../Constants/size';
import React, {
  FunctionComponent,
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {getAffairs} from '../Store/actions/main';
import theme from '../Constants/theme';

type props = {
  navigation?: any;
  scene?: any;
};

const CurrentAffairs: FunctionComponent<props> = ({navigation, scene}) => {
  const [load, setLoad] = useState(true);
  const [error, setError] = useState('');
  const [isRefreshing, setRefreshing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = useRef(new Animated.ValueXY());
  const swipedCardPosition = useRef(new Animated.ValueXY({x: 0, y: -Height}));
  const pan: any = createRef();

  const affairs: Array<any> = useSelector(
    (state: any) => state.main.current_affairs,
  );

  const dispatch = useDispatch();

  const get_data = useCallback(async () => {
    setRefreshing(true);
    setError('');
    try {
      //* fetch affairs
      await dispatch(getAffairs());
    } catch (err) {
      setError(err.message ? err.message : err);
    }
    setRefreshing(false);
  }, [dispatch, setLoad, setError]);

  const onRefresh = useCallback(() => {
    get_data();
  }, []);

  useEffect(() => {
    pan.current = PanResponder.create({
      onMoveShouldSetPanResponder: (e, gestureState) => true,
      onPanResponderMove: (e, gestureState) => {
        if (gestureState.dy > 0 && currentIndex > 0) {
          swipedCardPosition.current.setValue({
            x: 0,
            y: -Height + gestureState.dy,
          });
        }
        position.current.setValue({x: gestureState.dx, y: gestureState.dy});
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (currentIndex > 0 && gestureState.dy > 50 && gestureState.vy > 0.7) {
          Animated.timing(swipedCardPosition.current, {
            toValue: {x: 0, y: 0},
            duration: 400,
            useNativeDriver: false,
          }).start(() => {
            setCurrentIndex((index: any) => index - 1);
            position.current.setValue({x: 0, y: -Height});
          });
        } else if (-gestureState.dy > 50 && -gestureState.vy > 0.7) {
          Animated.timing(position.current, {
            toValue: {x: 0, y: Height},
            duration: 400,
            useNativeDriver: false,
          }).start(() => {
            setCurrentIndex((index: number) => index + 1);
            position.current.setValue({x: 0, y: 0});
          });
        } else {
          Animated.parallel([
            Animated.spring(position.current, {
              toValue: {x: 0, y: 0},
              useNativeDriver: false,
            }),
            Animated.spring(position.current, {
              toValue: {x: 0, y: -Height},
              useNativeDriver: false,
            }),
          ]).start();
        }
      },
    });
  }, []);

  useEffect(() => {
    console.log('pan', pan.current);
  }, [pan.current]);

  const AffairItem = ({item, index}: any) => {
    if (index === currentIndex - 1) {
      return (
        <Animated.View
          key={item._id}
          style={swipedCardPosition.current.getLayout()}
          {...pan.panHandlers}>
          <View style={styles.itemParent}>
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: item.uri
                    ? item.uri
                    : 'https://www.gktoday.in/wp-content/uploads/2021/05/eric-carle.png',
                }}
                style={styles.image}
              />
            </View>
            <View style={styles.bodyContainer}>
              <Text style={styles.bodyText}>{item.body}</Text>
            </View>
          </View>
        </Animated.View>
      );
    } else if (index < currentIndex) return null;

    if (index === currentIndex) {
      return (
        <Animated.View
          key={item._id}
          style={position.current.getLayout()}
          {...pan.panHandlers}>
          <View style={styles.itemParent}>
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: item.uri
                    ? item.uri
                    : 'https://www.gktoday.in/wp-content/uploads/2021/05/eric-carle.png',
                }}
                style={styles.image}
              />
            </View>
            <View style={styles.bodyContainer}>
              <Text style={styles.bodyText}>{item.body}</Text>
            </View>
          </View>
        </Animated.View>
      );
    } else {
      return (
        <Animated.View key={item._id}>
          <View style={styles.itemParent}>
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: item.uri
                    ? item.uri
                    : 'https://www.gktoday.in/wp-content/uploads/2021/05/eric-carle.png',
                }}
                style={styles.image}
              />
            </View>
            <View style={styles.bodyContainer}>
              <Text style={styles.bodyText}>{item.body}</Text>
            </View>
          </View>
        </Animated.View>
      );
    }
  };

  return (
    <ImageBackground
      source={require('../Assets/images/bg.png')}
      style={styles.parent}
      resizeMode="cover"
      imageStyle={{opacity: 0.05}}>
      {affairs.map((item, index) => {
        return <AffairItem index={index} key={item._id} item={item} />;
      })}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: theme.COLORS.DEFAULT,
  },
  bodyText: {
    fontSize: theme.SIZES.large,
    fontFamily: 'ComicNeue-Regular',
    color: theme.COLORS.HEADER,
  },
  itemParent: {
    flex: 1,
    position: 'absolute',
    height: Height,
    width: width,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: theme.SIZES.normal,
    paddingHorizontal: 2,
  },
  image: {
    height: 'auto',
    width: '100%',
    aspectRatio: 1.8,
    backgroundColor: theme.COLORS.BLOCK,
  },
  bodyContainer: {
    flex: 3,
    paddingVertical: theme.SIZES.normal,
    paddingHorizontal: theme.SIZES.small,
  },
  messageStyle: {
    marginTop: theme.SIZES.large * 1.5,
    fontWeight: 'bold',
    color: theme.COLORS.HEADER,
    fontSize: theme.SIZES.large * 1.2,
  },
});

export default CurrentAffairs;
