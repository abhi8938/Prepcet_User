import {
  Alert,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Height, width} from '../../Constants/size';
import React, {FunctionComponent, useEffect, useState} from 'react';

import Icon from '../../Components/common/Icon';
import IonicIcons from 'react-native-vector-icons/Ionicons';
import SkeletonLoader from '../SkeletonLoader';
import Touchable from '../../Components/common/Touchable';
import theme from '../../Constants/theme';
import useAuthState from '../../State/AuthState';

const PackageLoader = () => {
  return (
    <View style={styles.trial}>
      <View style={{alignSelf: 'center'}}>
        <SkeletonLoader
          height={Height * 0.03}
          width={width * 0.3}
          borderRadius={9}
          bgColor={theme.COLORS.HEADER}
          overlayColor={'#fff'}
        />
      </View>
      <View style={{paddingLeft: 15, marginTop: 5}}>
        <SkeletonLoader
          height={Height * 0.01}
          width={width * 0.35}
          borderRadius={3}
          bgColor={theme.COLORS.HEADER}
          overlayColor={'#fff'}
        />
        <SkeletonLoader
          height={Height * 0.01}
          width={width * 0.25}
          borderRadius={3}
          bgColor={theme.COLORS.HEADER}
          overlayColor={'#fff'}
        />
        <SkeletonLoader
          height={Height * 0.01}
          width={width * 0.2}
          borderRadius={3}
          bgColor={theme.COLORS.HEADER}
          overlayColor={'#fff'}
        />
        <SkeletonLoader
          height={Height * 0.01}
          width={width * 0.25}
          borderRadius={3}
          bgColor={theme.COLORS.HEADER}
          overlayColor={'#fff'}
        />
        <SkeletonLoader
          height={Height * 0.01}
          width={width * 0.35}
          borderRadius={3}
          bgColor={theme.COLORS.HEADER}
          overlayColor={'#fff'}
        />
      </View>
      <View style={{alignSelf: 'center', marginTop: theme.SIZES.large}}>
        <SkeletonLoader
          height={Height * 0.04}
          width={width * 0.2}
          borderRadius={3}
          bgColor={theme.COLORS.HEADER}
          overlayColor={'#fff'}
        />
      </View>
    </View>
  );
};

type prop = {
  data: any;
};

const FeatureView: FunctionComponent<prop> = ({data}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: theme.SIZES.normal,
        paddingHorizontal: theme.SIZES.small / 2,
        alignItems: 'center',
      }}>
      <Icon type={data.active ? 'TICK_GREEN' : 'CROSS_RED'} size={0.6} />

      <Text
        style={{
          marginLeft: theme.SIZES.small,
          fontSize: theme.SIZES.small + 4,
          color: theme.COLORS.PRICE_COLOR,
        }}>
        {data.feature}
      </Text>
    </View>
  );
};

type props = {
  load: boolean;
  packs: any;
  index: number;
  title: string;
  buy: () => void;
  trial: () => void;
};

const PackageOverView: FunctionComponent<props> = ({
  index,
  title,
  buy,
  packs,
  load,
  trial,
}) => {
  return (
    <>
      {load === true && <PackageLoader />}
      {load === false && (
        <View style={styles.trial}>
          <Text
            style={{
              fontSize: 22,
              color: theme.COLORS.PRIMARY,
              alignSelf: 'center',
            }}>
            {title}
          </Text>
          <Text style={{alignSelf: 'center', fontWeight: 'bold', marginTop: 8}}>
            {parseInt(packs.price) - parseInt(packs.discount)}
          </Text>
          {packs.features &&
            packs.features.map((item: any, index: number) => (
              <FeatureView data={item} key={index} />
            ))}
          {index == 0 && (
            <Text
              style={{
                fontSize: theme.SIZES.small - 2,
                alignSelf: 'center',
                marginTop: theme.SIZES.small / 4,
                marginRight: theme.SIZES.small,
                color: theme.COLORS.BLACK,
              }}>
              (Limited Access)
            </Text>
          )}
          <Touchable
            touchableProps={{
              onPress: title === 'PAID' ? buy : trial,
              disabled: false,
            }}
            style={{alignSelf: 'center', marginTop: theme.SIZES.large}}
            loading={false}
            title={'Subscribe'}
            size={'SMALL'}
            filled
          />
        </View>
      )}
    </>
  );
};

export default PackageOverView;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: theme.COLORS.DEFAULT,
    // paddingHorizontal: theme.SIZES.small / 2,
  },
  child: {
    flexDirection: 'row',
    width: '100%',
    marginTop: theme.SIZES.large * 2,
    paddingHorizontal: theme.SIZES.small / 2,
    height: Height * 0.38,
  },
  trial: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    borderColor: theme.COLORS.PRIMARY,
    width: '49%',
    borderRadius: 8,
    borderWidth: 1,
    paddingVertical: theme.SIZES.small,
  },
});
