import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import React, {FunctionComponent, useEffect, useRef} from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
//@ts-ignore
import Slider from '@react-native-community/slider';
import theme from '../../../Constants/theme';

type color_item = {color: string; label: string; background?: string};
type highlight_color = {color: string; label: string};

type config = {
  list: Array<color_item> | Array<highlight_color>;
  selected: color_item;
  onSelect: (value: color_item | highlight_color) => void;
  type: string;
};

export const ColorList: FunctionComponent<config> = ({
  list,
  selected,
  onSelect,
  type,
}) => {
  const colorItem = (item: color_item) => {
    const itemStyle = type === 'CONFIG' ? styles.colorItem : styles.annItem;
    const toggleActiveStyle =
      type === 'CONFIG'
        ? selected.background === item.background &&
          selected.color === item.color
          ? styles.active
          : styles.inactive
        : selected.color === item.color
        ? styles.active
        : styles.inactive;
    return (
      <TouchableHighlight
        underlayColor={theme.COLORS.BLOCK}
        activeOpacity={0.1}
        onPress={() => onSelect(item)}
        style={[
          toggleActiveStyle,
          itemStyle,
          {backgroundColor: type === 'CONFIG' ? item.background : item.color},
          styles.shadow,
        ]}>
        <Text style={[styles.colorItemText, {color: item.color}]}>
          {type === 'CONFIG' ? 'Aa' : ''}
        </Text>
      </TouchableHighlight>
    );
  };

  return (
    <View style={[styles.firstChild]}>
      {/* TODO: Create list of subjects - SubjectItem */}
      <FlatList
        // ListEmptyComponent={}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        contentContainerStyle={styles.colorList}
        data={list}
        keyExtractor={(item: any) =>
          `KEY_${item.label !== undefined ? item.label : item.color}`
        }
        renderItem={({item}: any) => colorItem(item)}
      />
    </View>
  );
};

type slider = {
  value: number;
  onChange: (value: any) => void;
  labels: {
    min: string;
    max: string;
  };
  min_max: {
    min: number;
    max: number;
  };
  step: number;
};

export const SliderComponent: FunctionComponent<slider> = ({
  onChange,
  value,
  labels,
  min_max,
  step,
}) => {
  return (
    <View style={styles.slider_container}>
      <Text style={styles.min}>{labels.min}</Text>
      <Slider
        style={styles.slider}
        disabled={false}
        value={value}
        onSlidingComplete={onChange}
        minimumValue={min_max.min}
        maximumValue={min_max.max}
        step={step}
        onValueChange={(value) => onChange(value)}
        thumbTintColor={theme.COLORS.BLOCK}
      />
      <Text style={styles.max}>{labels.max}</Text>
    </View>
  );
};

type flow = {
  value: string;
  onChange: (event: any, value: 'paginated' | 'scrolled') => void;
  disabled: boolean;
};

export const FlowComponent: FunctionComponent<flow> = ({
  onChange,
  value,
  disabled,
}) => {
  return (
    <View style={styles.flow_container}>
      <TouchableHighlight
        // disabled={disabled}
        style={[styles.backButton]}
        underlayColor={theme.COLORS.BLOCK}
        activeOpacity={0.5}
        onPress={(event) =>
          onChange(event, value === 'paginated' ? 'scrolled' : 'paginated')
        }>
        <View style={styles.flow_container}>
          <Text style={[styles.label, {marginHorizontal: 10}]}>
            {value === 'paginated' ? 'Scrollable' : 'Paginated'}
          </Text>
          <Icon
            name={
              value === 'paginated'
                ? 'ios-document-text-outline'
                : 'ios-document-text'
            }
            size={theme.SIZES.small * 2}
            color={theme.COLORS.HEADER}
            style={[styles.shadow]}
          />
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: theme.SIZES.small + 5,
    paddingVertical: 4,
    fontFamily: 'Signika-Medium',
    color: theme.COLORS.HEADER,
  },
  flow_container: {
    flexDirection: 'row',
    marginHorizontal: theme.SIZES.small / 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.SIZES.small / 2,
  },
  max: {
    fontSize: theme.SIZES.normal + 6,
    fontFamily: 'Signika-Medium',
    color: theme.COLORS.HEADER,
  },
  min: {
    fontSize: theme.SIZES.small + 1,
    fontFamily: 'Signika-Medium',
    color: theme.COLORS.HEADER,
  },
  backButton: {
    // width: 30,
    // height: 33,
    shadowColor: theme.COLORS.BLOCK,
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 1,
    shadowOpacity: 0.4,
    elevation: 1,
    borderRadius: 7,
  },
  slider_container: {
    // flex: 1,
    flexDirection: 'row',
    marginHorizontal: theme.SIZES.small / 1.5,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: theme.SIZES.small,
  },
  colorItem: {
    width: theme.SIZES.large * 1.8,
    height: theme.SIZES.large * 1.8,
    borderRadius: 5,
    marginHorizontal: theme.SIZES.small / 2,
    marginBottom: theme.SIZES.small / 2,
    paddingLeft: theme.SIZES.small / 3,
  },
  colorItemText: {},
  colorList: {
    // paddingVertical: 2,
  },
  empty_container: {},
  firstChild: {
    // margin: theme.SIZES.small - 3,
    backgroundColor: '#ccc',
    padding: theme.SIZES.small / 4,
    borderRadius: 8,
  },
  secondChild: {
    // margin: theme.SIZES.small - 3,
    // padding: theme.SIZES.small,
    // marginBottom: theme.SIZES.normal,
  },
  title: {
    fontSize: theme.SIZES.normal + 1,
    fontFamily: 'Comfortaa-Bold',
    fontWeight: '500',
    color: theme.COLORS.BLACK,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 3,
    shadowOpacity: 0.5,
    elevation: 2,
  },
  slider: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  active: {
    borderWidth: 1,
    borderColor: theme.COLORS.HEADER,
  },
  inactive: {},
  annItem: {
    width: theme.SIZES.large * 1.8,
    height: theme.SIZES.large * 1.8,
    borderRadius: 5,
    marginHorizontal: theme.SIZES.small / 2,
    marginBottom: theme.SIZES.small / 2,
    paddingLeft: theme.SIZES.small / 3,
  },
});
