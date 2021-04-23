// TODO
// *- Last session - card
//  * - Start from where you left - tagline
//  * - Paper - poster - left side - image
//  * - page no. - text
//  * - Question number -text
//  * - study time - in minutes - text
//  * - your notes - expandable  - expandable - questions/topics
//  * - loading components
//  *  - User Experience
//  * - we need transition/animations on all the user interaction/actions
//  * - Animate the Header when the user scrolls down or up
//  * - Increase or decrese the size of all the components inside Header OR Center the Header title
//  * - When the user interacts with the session card, we can change the Height/Padding/Margin/Color/FontSize/BgColor of that section of the card.

import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
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
import React, {FunctionComponent, useEffect, useRef, useState} from 'react';

import Icon from 'react-native-vector-icons/AntDesign';
import theme from '../Constants/theme';

const KeyValue = ({label, title}: any) => (
  <Text style={styles.label}>
    {label}
    <Text style={styles.title}>{title}</Text>
  </Text>
);

const ExpCard = ({handlePress, ...props}: any) => {
  // TODO: Add animation on height of expanded component
  //* fit content inside expandable view
  //* Transition on notes when mounts on screen
  const val = useSharedValue(0);
  const opac = useSharedValue(0);

  const animationStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opac.value, {
        duration: 800,
      }),
      height: withTiming(val.value, {
        duration: 600,
        easing: Easing.linear,
      }),
    };
  });

  useEffect(() => {
    if (props.expanded === true) {
      val.value = Height / 6;
      opac.value = 1;
    } else if (props.expanded === false) {
      val.value = 0;
      opac.value = 0;
    }
  }, [props.expanded]);

  return (
    <View style={exp_styles.parent}>
      <TouchableHighlight
        underlayColor={'rgba(0,0,0,0.1)'}
        style={exp_styles.touchable}
        onPress={() => handlePress()}>
        <Text style={exp_styles.label}>{props.Question}</Text>
      </TouchableHighlight>
      <Animated.View>
        {/* {props.expanded && props.expanded !== false ? ( */}
        <Animated.Text style={[styles.title, animationStyle]}>
          {props.notes}
        </Animated.Text>
        {/* ) : null} */}
      </Animated.View>
    </View>
  );
};
const ExpComponent = ({}: any) => {
  const [data, setData] = useState([
    {
      Question: 'What is cfg in automata?',
      notes:
        'A context-free grammar (CFG) consisting of a finite set of grammar rules is a quadruple (N, T, P, S) where. N is a set of non-terminal symbols. T is a set of terminals where N ∩ T = NULL.',
      expanded: false,
    },
    {
      Question: 'Disadvantages of decision trees?',
      notes:
        'They are unstable, meaning that a small change in the data can lead to a large change in the structure of the optimal decision tree.\n They are often relatively inaccurate. Many other predictors perform better with similar data.',
      expanded: false,
    },
  ]);

  const handlePress = (i: number) => {
    //   manipulate the data
    const newData = data.map((value, index) => {
      if (index == i) {
        value.expanded = !value.expanded;
      } else {
        value.expanded = false;
      }
      return value;
    });
    setData(newData);
  };

  const Arrow = () => (
    <Icon
      name="caretdown"
      size={22}
      color={theme.COLORS.HEADER}
      style={exp_styles.first_child_icon}
    />
  );

  const rotate = useSharedValue('0');

  // FIXME:
  // Add transition on rotate.value
  const rotateStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${rotate.value}deg`,
        },
      ],
    };
  });

  const height = useSharedValue('0%');

  const heightStyles = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  });

  return (
    <View style={exp_styles.parent}>
      {/* header of the expandale list  */}

      <TouchableHighlight
        underlayColor={'rgba(0,0,0,0.1)'}
        style={[{borderRadius: 7}]}
        onPress={() => {
          if (rotate.value == '0') {
            rotate.value = '180';
            height.value = 'auto';
          } else {
            rotate.value = '0';
            height.value = '0%';
          }
        }}>
        <Animated.View style={exp_styles.first_child}>
          <Text style={[exp_styles.first_child_text]}>Your Notes</Text>
          <Animated.View style={[rotateStyle]}>
            <Arrow />
          </Animated.View>
        </Animated.View>
      </TouchableHighlight>
      <Animated.View style={[exp_styles.second_child, heightStyles]}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => `${item.notes}`}
          renderItem={({item, index}) => (
            <ExpCard {...item} handlePress={() => handlePress(index)} />
          )}
        />
      </Animated.View>
    </View>
  );
};

const exp_styles = StyleSheet.create({
  parent: {
    flexDirection: 'column',
    paddingHorizontal: theme.SIZES.small / 0.9,
    paddingVertical: theme.SIZES.normal / 1.5,
    borderRadius: 10,
    borderColor: 'white',
    elevation: 2,
    backgroundColor: 'white',
  },
  first_child: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.SIZES.small - 3,
    paddingHorizontal: theme.SIZES.small - 2,
  },
  first_child_text: {
    fontSize: theme.SIZES.normal + 4,
    fontFamily: 'Signika-Medium',
    color: theme.COLORS.HEADER,
  },
  first_child_icon: {},
  second_child: {},
  touchable: {
    backgroundColor: 'white',
    borderRadius: 7,
    paddingVertical: theme.SIZES.small * 0.2,
    paddingHorizontal: theme.SIZES.small * 0.5,
  },
  label: {
    fontSize: theme.SIZES.normal * 1.1,
    fontWeight: 'bold',
  },
});
type props = {
  navigation?: any;
  scene?: any;
};
const SessionCard: FunctionComponent<props> = ({navigation, scene}: any) => (
  <View style={styles.parent}>
    <View style={{flexDirection: 'column'}}>
      <Text style={styles.first_child_heading}>Last Session Report</Text>
      <Text style={styles.second_child_heading}>Start from where you left</Text>
    </View>
    <View style={styles.second_child}>
      <Image
        style={styles.poster}
        source={{
          uri:
            'https://i.pinimg.com/originals/58/dc/26/58dc26d70ec2bd146bd7491351d714a9.jpg',
        }}
      />
      <View style={styles.column}>
        <KeyValue label={'Sample Paper - '} title={'#31'} />
        <KeyValue label={'Page - '} title={'175'} />
        <KeyValue label={'Question - '} title={'5'} />
        <KeyValue label={'Session Duration - '} title={'90 minutes'} />
      </View>
    </View>
    <ExpComponent />
  </View>
);

export default SessionCard;

const styles = StyleSheet.create({
  parent: {
    flexDirection: 'column',
    borderWidth: 8,
    paddingHorizontal: theme.SIZES.small / 0.9,
    paddingVertical: theme.SIZES.normal / 1.5,
    margin: width * 0.02,
    borderRadius: 10,
    borderColor: 'white',
    elevation: 2,
    backgroundColor: 'white',
  },
  first_child_heading: {
    fontSize: theme.SIZES.large,
    fontFamily: 'Signika-Medium',
    color: theme.COLORS.HEADER,
  },
  second_child: {
    flexDirection: 'row',
  },
  second_child_heading: {
    fontSize: theme.SIZES.small + 2,
    paddingVertical: 4,
    color: theme.COLORS.HEADER,
    // fontFamily: 'Sans Serif',
  },
  poster: {
    // width: width / 5,
    height: Height / 5,
    backgroundColor: '#fff',
    resizeMode: 'contain',
    flex: 0.4,
  },
  label: {
    fontSize: theme.SIZES.normal,
    fontWeight: 'bold',
  },
  title: {
    fontSize: theme.SIZES.normal,
    fontWeight: '400',
    marginTop: theme.SIZES.small / 2,
  },
  column: {
    flex: 0.6,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: theme.SIZES.normal,
    // backgroundColor:'red',
    paddingVertical: 15,
    alignItems: 'flex-start',
  },
});
