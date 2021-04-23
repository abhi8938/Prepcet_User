import Animated, {
  useAnimatedProps,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {Height, width} from './../Constants/size';

import theme from '../Constants/theme';

const useHomeAnimation = () => {
  const newScrollHandler = (
    translationY: any,
    translateX: any,
    scale: any,
  ) =>
    useAnimatedScrollHandler({
      onScroll: (e) => {
        const y = e.contentOffset.y;
        if (y > translationY.value) {
          if (y > Height / 10) {
            let final = (width/2)-width*0.125
            let initial = width*0.17 + theme.SIZES.small/2
            console.log(final,initial)
            translateX.value = final-initial;
            scale.value = 1;

          }
        } else if (translationY.value > y) {
          if (y < Height / 10) {
            translateX.value = 0;
            scale.value = 1.3;

          }
        }
        translationY.value = e.contentOffset.y;
      },
    });
  const animationStyle = (translateX: any) =>
    useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateX: withSpring(translateX.value, {
              damping: 20,
              stiffness: 50,
            }),
          },
        ],
      };
    });
;

const fontScaleStyle = ( scale: any) =>
useAnimatedStyle(() => {
  return {
    transform: [
      {
        scale:withTiming(scale.value,{
          duration:300
        })
      },
    ],
  };
});
;

  return {newScrollHandler, animationStyle, fontScaleStyle};
};

export default useHomeAnimation;
