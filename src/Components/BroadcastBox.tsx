import React, {FunctionComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import GroupContainer from './common/GroupContainer';
import SkeletonLoader from './SkeletonLoader';
import Touchable from './common/Touchable';
import baseStyles from './common/styles';
import theme from '../Constants/theme';
import {width} from '../Constants/size';

type props = {
  title: string;
  message: string;
  show: boolean;
  onDismiss: () => void;
  onPress: () => void;
  load: boolean;
};

const BroadCastLoader = () => (
  <>
    <SkeletonLoader
      width={width / 4}
      height={theme.SIZES.large * 1.5}
      borderRadius={8}
      bgColor={theme.COLORS.HEADER}
      overlayColor={'#fff'}
    />
    <SkeletonLoader
      width={width / 1.2}
      height={theme.SIZES.normal * 1.4}
      borderRadius={7}
      bgColor={theme.COLORS.HEADER}
      overlayColor={'#fff'}
    />
    <SkeletonLoader
      width={width / 2.8}
      height={theme.SIZES.normal * 1.4}
      borderRadius={7}
      bgColor={theme.COLORS.HEADER}
      overlayColor={'#fff'}
    />
    <View style={styles.buttonContainer}>
      <SkeletonLoader
        width={width / 6}
        height={theme.SIZES.large * 1.3}
        borderRadius={7}
        bgColor={theme.COLORS.HEADER}
        overlayColor={'#fff'}
      />
      <SkeletonLoader
        width={width / 6}
        height={theme.SIZES.large * 1.3}
        borderRadius={7}
        bgColor={theme.COLORS.HEADER}
        overlayColor={'#fff'}
      />
    </View>
  </>
);

const BroadcastBox = ({
  title,
  message,
  show,
  onDismiss,
  onPress,
  load,
}: props) => {
  return show === true ? (
    <GroupContainer style={styles.parent} card={true}>
      {load === true ? (
        <BroadCastLoader />
      ) : (
        <>
          <Text style={[baseStyles.title, {marginTop: theme.SIZES.small / 2}]}>
            {title}
          </Text>
          <Text
            style={[
              baseStyles.text,
              {
                fontFamily: 'Signika-Regular',
                fontSize: theme.SIZES.normal,
                marginTop: theme.SIZES.small / 2,
                marginHorizontal: theme.SIZES.small / 3,
              },
            ]}>
            {message}
          </Text>
          <View style={styles.buttonContainer}>
            <Touchable
              filled
              title={'Dismiss'}
              loading={false}
              size={'SMALL'}
              touchableProps={{
                onPress: onDismiss,
                disabled: false,
              }}
            />
          </View>
        </>
      )}
    </GroupContainer>
  ) : null;
};

export default BroadcastBox;

const styles = StyleSheet.create({
  parent: {},
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
