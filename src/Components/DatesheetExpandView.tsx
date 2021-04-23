import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Height, width} from '../Constants/size';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FunctionComponent, useEffect, useState} from 'react';

import ExaminationCenter from '../Screens/ExaminationCenter';
import IonicIcons from 'react-native-vector-icons/Ionicons';
import theme from '../Constants/theme';

type props = {
  datesheet: any;
  index: number;
};

const ExpandableView: FunctionComponent<props> = ({datesheet, index}) => {
  const [show, setShow] = useState(false);
  const back = () => {
    setShow(false);
  };
  const [expand, setExpand] = useState(false);
  const styleRef = useSharedValue({opacity: 0, height: 0});
  const animationStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(styleRef.value.height, {
        duration: 250,
      }),
      opacity: withTiming(styleRef.value.opacity, {
        duration: 250,
      }),
    };
  });
  useEffect(() => {
    if (expand === true) {
      styleRef.value = {
        height: Height * 0.2,
        opacity: 1,
      };
    } else {
      styleRef.value = {
        height: 0,
        opacity: 0,
      };
    }
  }, [expand]);
  return (
    <>
      <TouchableOpacity
        onPress={() => setExpand(!expand)}
        style={{
          paddingHorizontal: theme.SIZES.normal,
        }}>
        <View
          style={styles.parent}>
          <Text style={{fontSize:theme.SIZES.normal,fontFamily:'Poppins-Regular'}}>{datesheet.subjects[index].date}</Text>
          <IonicIcons
            style={{marginLeft: 'auto'}}
            name={'chevron-down-outline'}
            size={30}
          />
        </View>
      </TouchableOpacity>
      {expand && (
        <Animated.View
          style={[
            {
              marginTop: theme.SIZES.small,
              width: '100%',
              paddingHorizontal: theme.SIZES.small * 0.8,
            },
            animationStyle,
          ]}>
          <>
            <TouchableOpacity
              style={styles.child}
              onPress={() => {setShow(true);setExpand(false)}}>
              <View style={{flexDirection: 'row', width: '100%'}}>
                <Text style={{fontSize: theme.SIZES.small*1.2, fontWeight: 'bold',fontFamily:'Poppins-Regular'}}>Code -</Text>
                <Text style={{marginLeft: 'auto', fontSize: theme.SIZES.small*1.3,}}>
                  {datesheet.subjects[index].code}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: theme.SIZES.small,
                }}>
                <Text style={{fontSize: theme.SIZES.small*1.2, fontWeight: 'bold',fontFamily:'Poppins-Regular'}}>Name - </Text>
                <Text style={{fontSize: theme.SIZES.small*1.3, marginLeft: 'auto'}}>
                  {datesheet.subjects[index].name}
                </Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: theme.SIZES.small*1.2, fontWeight: 'bold',fontFamily:'Poppins-Regular'}}>Time - </Text>
                <Text
                  style={{
                    fontSize: theme.SIZES.small*1.3,
                    marginLeft: 'auto',
                  }}>{`${datesheet.subjects[index].time_start} to ${datesheet.subjects[index].time_end}`}</Text>
              </View>
            </TouchableOpacity>
          </>
        </Animated.View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  parent:{
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: theme.COLORS.LIGHT_GREY,
    borderBottomWidth: 3,
    height: Height * 0.065,
  },
  child:{
    borderWidth: 1,
    borderColor: theme.COLORS.BLACK,
    borderRadius: 10,
    paddingHorizontal: theme.SIZES.small / 2,
    paddingVertical: theme.SIZES.small,
  }
  
});
export default ExpandableView;
