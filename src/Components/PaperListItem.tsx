import {Height, width} from '../Constants/size';
import React, {FunctionComponent, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Cover from './common/Cover';
import Expandable from './common/Expandable';
import Icon from './common/Icon';
import KeyValue from './common/KeyValue';
import SkeletonLoader from './SkeletonLoader';
import Touchable from './common/Touchable';
import {URL} from '../Constants/urls';
import baseStyles from './common/styles';
import theme from '../Constants/theme';

type props = {
  subject: any;
  save: () => void;
  onRead: () => void;
  load: boolean;
};

const Loader = () => (
  <View style={styles.contractedParent}>
    <SkeletonLoader
      width={width / 4}
      height={Height * 0.17}
      borderRadius={8}
      bgColor={theme.COLORS.HEADER}
      overlayColor={'#fff'}
    />
    <View style={styles.innerContainer}>
      <SkeletonLoader
        width={width / 2}
        height={theme.SIZES.normal * 1.3}
        borderRadius={7}
        bgColor={theme.COLORS.HEADER}
        overlayColor={'#fff'}
      />
      <SkeletonLoader
        width={width / 2}
        height={theme.SIZES.normal * 1.3}
        borderRadius={7}
        bgColor={theme.COLORS.HEADER}
        overlayColor={'#fff'}
      />
      <View
        style={{
          flex: 1,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
        }}>
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
    </View>
  </View>
);

const PaperListItem: FunctionComponent<props> = ({
  subject,
  save,
  onRead,
  load,
}) => {
  useEffect(() => {
    console.log('url', subject && typeof subject.cover === 'string');
    return () => {};
  }, [subject]);
  const Expanded = (handleToggle: () => void, toggle: boolean) => {
    return (
      <View style={styles.expandedParent}>
        <View style={styles.rowContainer}>
          <View style={styles.innerContainer}>
            <Icon
              type={false ? 'CROSS' : 'SAVE'}
              size={0.7}
              style={styles.iconButton}
              onPress={save}
            />
            <KeyValue
              itemKey={'Summary'}
              value={subject.description}
              style={{
                flexDirection: 'column',
                width: '90%',
                alignItems: 'flex-start',
              }}
              valueStyle={{
                maxWidth: '100%',
                textAlign: 'left',
                marginTop: theme.SIZES.small / 3,
                marginLeft: theme.SIZES.small / 3,
                width: '90%',
              }}
            />
            <Text style={styles.author}>{subject.by}</Text>
          </View>
        </View>
      </View>
    );
  };
  const Contracted = (handleToggle: () => void, toggle: boolean) => {
    return load === true ? (
      <Loader />
    ) : (
      <View style={styles.contractedParent}>
        <Cover
          imageProps={{
            source: {uri: `${URL}/paper/files/${subject.cover}`},
            style: {},
          }}
          style={{borderRadius: 8, padding: theme.SIZES.small / 4}}
        />
        <View style={styles.innerContainer}>
          <View>
            <Text
              style={{
                fontSize: theme.SIZES.large,
                fontWeight: 'bold',
                marginBottom: 5,
                letterSpacing: 1,
                marginLeft: 2,
              }}>
              {subject.name}
            </Text>
            <KeyValue itemKey={'Code'} value={subject.code} />
          </View>
          <View
            style={{
              flex: 1,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'flex-end',
            }}>
            <Touchable
              filled
              title={'Read'}
              loading={false}
              size={'SMALL'}
              touchableProps={{
                onPress: onRead,
                disabled: false,
              }}
            />
            <Touchable
              filled
              title={toggle === true ? 'Less' : 'More'}
              loading={false}
              size={'SMALL'}
              touchableProps={{
                onPress: handleToggle,
                disabled: false,
              }}
              toggle={toggle}
            />
          </View>
        </View>
      </View>
    );
  };
  return (
    <Expandable
      style={baseStyles.card}
      ExpandComp={Expanded}
      ContractComp={Contracted}
      dimen={{
        width: {min: width * 0.95, max: width * 0.95},
        height: {
          min: theme.SIZES.ratio < 1.6 ? Height * 0.2 : Height * 0.23,
          max: theme.SIZES.ratio < 1.6 ? Height * 0.32 : Height * 0.39,
        },
      }}
    />
  );
};

export default PaperListItem;

const styles = StyleSheet.create({
  parent: {},
  iconButton: {
    position: 'absolute',
    right: 8,
    top: -theme.SIZES.small * 0.8,
    borderRadius: 7,
    padding: theme.SIZES.small / 1.5,
    backgroundColor: theme.COLORS.BORDER_COLOR,
    height: theme.SIZES.large * 1.5,
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: theme.SIZES.small,
    paddingTop: theme.SIZES.small / 2,
    minHeight: '70%',
  },
  contractedParent: {
    flexDirection: 'row',
    maxHeight: theme.SIZES.ratio < 1.6 ? Height * 0.2 : Height * 0.22,
    paddingHorizontal: theme.SIZES.small,
    paddingVertical: theme.SIZES.small,
  },
  expandedParent: {
    flexDirection: 'column',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  author: {
    alignSelf: 'flex-end',
    fontSize: theme.SIZES.normal,
    fontWeight: 'bold',
    color: theme.COLORS.HEADER,
    fontStyle: 'italic',
  },
});
