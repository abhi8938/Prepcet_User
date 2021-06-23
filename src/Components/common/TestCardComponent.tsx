import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {FunctionComponent} from 'react';

import IonIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableRipple} from 'react-native-paper';
import baseStyles from './styles';
import theme from '../../Constants/theme';
import {width} from '../../Constants/size';

const TestComponent1 = ({item, onPress}: any) => {
  return (
    <View style={styles.parent1}>
      <Text style={styles.testName}>{item.name}</Text>
      <View style={styles.innerContainer1}>
        <View style={styles.mainContainer}>
          <View style={styles.featuresContainer}>
            <Text style={styles.featureLabel}>Upload Date</Text>
            <Text style={styles.featureValue}>
              {new Date(item.created_at).toDateString()}
            </Text>
          </View>
          <View style={styles.featuresContainer}>
            <Text style={styles.featureLabel}>Expiration Date</Text>
            <Text style={styles.featureValue}>
              {new Date(item.expiration).toDateString()}
            </Text>
          </View>
          <View style={styles.featuresContainer}>
            <Text style={styles.featureLabel}>Attempts</Text>
            <Text style={styles.featureValue}>{item.attempts}</Text>
          </View>
          <View style={styles.featuresContainer}>
            <Text style={styles.featureLabel}>Maximum Marks</Text>
            <Text style={styles.featureValue}>{item.total_marks}</Text>
          </View>
        </View>
        <TouchableRipple
          style={styles.startButton1}
          centered={true}
          rippleColor={`${theme.COLORS.DEFAULT}80`}
          onPress={() => onPress()}
          borderless={Platform.OS === 'ios' ? false : true}>
          <View style={styles.startButtonContainer1}>
            <IonIcon
              name={'timer-sand'}
              size={20}
              color={theme.COLORS.DEFAULT}
            />
            <Text style={styles.startButtonText1}>Start</Text>
          </View>
        </TouchableRipple>
      </View>
    </View>
  );
};
const TestComponent2 = ({item, onPress}: any) => {
  return (
    <View style={styles.parent2}>
      <View style={{alignItems: 'center'}}>
        <View>
          <Text style={styles.durationTitle}>Duration</Text>
          <LinearGradient
            colors={['#F6CE6570', '#FAB37870', '#FDA08570']}
            style={[styles.linearGradient]}>
            <Text style={styles.durationText}>
              {item.duration}
              <Text style={{fontSize: theme.SIZES.normal}}>M</Text>
            </Text>
          </LinearGradient>
        </View>
        <TouchableRipple
          style={styles.startButton}
          centered={true}
          rippleColor={`${theme.COLORS.PRIMARY}80`}
          onPress={() => onPress()}
          borderless={Platform.OS === 'ios' ? false : true}>
          <View style={styles.startButtonContainer}>
            <Text style={styles.startButtonText}>
              Start {`${item.type}`.toLowerCase()}
            </Text>
          </View>
        </TouchableRipple>
      </View>
      <View style={styles.innerContainer}>
        <Text style={styles.testName}>{item.name}</Text>
        <View style={styles.featuresContainer}>
          <Text style={styles.featureLabel}>Upload Date</Text>
          <Text style={styles.featureValue}>
            {new Date(item.created_at).toDateString()}
          </Text>
        </View>
        <View style={styles.featuresContainer}>
          <Text style={styles.featureLabel}>Expiration Date</Text>
          <Text style={styles.featureValue}>
            {new Date(item.expiration).toDateString()}
          </Text>
        </View>

        <View style={styles.featuresContainer}>
          <Text style={styles.featureLabel}>Attempts</Text>
          <Text style={styles.featureValue}>{item.attempts}</Text>
        </View>
        <View style={styles.featuresContainer}>
          <Text style={styles.featureLabel}>Maximum Marks</Text>
          <Text style={styles.featureValue}>{item.total_marks}</Text>
        </View>
        <View style={styles.featuresContainer}>
          <Text style={styles.featureLabel}>Total Questions</Text>
          <Text style={styles.featureValue}>{item.questions.length}</Text>
        </View>
      </View>
    </View>
  );
};

type props = {
  type: '1' | '2';
  item: any;
  onPress: () => void;
};
const TestCardComponent: FunctionComponent<props> = ({type, item, onPress}) => {
  if (type === '1') {
    return <TestComponent1 item={item} onPress={onPress} />;
  } else {
    return <TestComponent2 item={item} onPress={onPress} />;
  }
};

export default TestCardComponent;

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'space-evenly',
  },
  innerContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  startButtonContainer1: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: theme.SIZES.small - 2,
    paddingHorizontal: theme.SIZES.small - 2,
  },
  startButton1: {
    marginHorizontal: theme.SIZES.small / 1.2,
    borderRadius: 6,
    backgroundColor: theme.COLORS.PRIMARY,
    shadowColor: theme.COLORS.BORDER_TEXT,
    elevation: 2,
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 5,

    shadowOpacity: 0.3,
  },
  startButtonText1: {
    fontFamily: 'Signika-Medium',
    fontSize: theme.SIZES.normal,
    marginHorizontal: theme.SIZES.small / 2,
    color: theme.COLORS.WHITE,
  },
  startButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: theme.SIZES.small,
    paddingVertical: theme.SIZES.small / 2,
  },
  startButton: {
    marginHorizontal: theme.SIZES.small / 1.2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: `${theme.COLORS.PRIMARY}60`,
    backgroundColor: `${theme.COLORS.PRIMARY}20`,
    alignSelf: 'flex-end',
  },
  startButtonText: {
    fontFamily: 'Signika-Medium',
    fontSize: theme.SIZES.small + 2,
    marginHorizontal: theme.SIZES.small / 2,
    color: theme.COLORS.BORDER_TEXT,
  },
  durationTitle: {
    fontFamily: 'Signika-Medium',
    fontSize: theme.SIZES.small - 2,
    color: theme.COLORS.HEADER,
    alignSelf: 'flex-start',
  },
  featureLabel: {
    fontFamily: 'Signika-Medium',
    fontSize: theme.SIZES.normal - 2,
    color: theme.COLORS.HEADER,
    flex: 1,
  },
  featureValue: {
    fontFamily: 'Signika-Medium',
    fontSize: theme.SIZES.normal,
    color: theme.COLORS.HEADER,
    flex: 1,
  },
  featuresContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 1,
    width: width * 0.6,
  },
  testName: {
    fontFamily: 'Signika-SemiBold',
    fontSize: theme.SIZES.large - 1,
    color: theme.COLORS.HEADER,
    width: width * 0.6,
    marginBottom: 3,
  },
  parent1: {
    backgroundColor: '#F5F5F5',
    marginVertical: theme.SIZES.small,
    marginHorizontal: theme.SIZES.small,
    paddingVertical: theme.SIZES.small,
    paddingHorizontal: theme.SIZES.small,
    borderRadius: 6,
    alignSelf: 'center',
  },
  parent2: {
    paddingHorizontal: theme.SIZES.large,
    paddingVertical: theme.SIZES.small,
    backgroundColor: theme.COLORS.DEFAULT,
    flexDirection: 'row-reverse',
    alignSelf: 'center',
    alignItems: 'center',
    borderBottomColor: `${theme.COLORS.HEADER}50`,
    borderBottomWidth: 1,
  },
  durationText: {
    fontFamily: 'Signika-SemiBold',
    fontSize: theme.SIZES.large + 10,
    color: theme.COLORS.HEADER,
    lineHeight: theme.SIZES.large + 10,
  },
  linearGradient: {
    width: width * 0.2,
    height: width * 0.19,
    borderRadius: 8,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.SIZES.large,
  },
  innerContainer: {
    marginLeft: theme.SIZES.small,
  },
});
