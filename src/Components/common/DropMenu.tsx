//TODO:
// If the Key is 'register', Show the drop meny for register with no icons
// If the Key is 'home', Show the drop meny for Home having icons

import {Height, width} from '../../Constants/size';
import React, {FunctionComponent, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';
import Expandable from './Expandable';
import Icon from './Icon';
import {TouchableOpacity} from 'react-native-gesture-handler';
import baseStyles from './styles';
import theme from '../../Constants/theme';

type props = {
  dimen: {width: number; height: number};
  outline: boolean;
  itemStyle: any;
  onSelected: (selected: {icon: string; text: string}) => void;
  selected: {icon: string; text: string};
  data: Array<any>;
};

const ListItem = ({
  icon,
  text,
  itemStyle,
  onPress,
}: {
  icon: string;
  text: string;
  itemStyle: any;
  onPress: (e: any) => void;
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[baseStyles.parent, itemStyle]}>
      <Icon size={3} type={icon} />
      <Text style={baseStyles.heading}>{text}</Text>
    </TouchableOpacity>
  );
};

const DropMenu: FunctionComponent<props> = ({
  dimen,
  outline,
  itemStyle,
  onSelected,
  selected,
  data,
}) => {
  const Header = (handleToggle: () => void) => (
    <ListItem
      itemStyle={[itemStyle]}
      onPress={() => {
        handleToggle();
      }}
      icon={selected.icon}
      text={selected.text}
    />
  );
  const List = (handleToggle: () => void) => (
    <View style={styles.listContainer}>
      {data.map((item) => (
        <ListItem
          itemStyle={[
            selected.text === item.text ? styles.active : styles.inactive,
            itemStyle,
          ]}
          onPress={() => {
            onSelected(item);
            handleToggle();
          }}
          icon={item.icon}
          text={item.text}
        />
      ))}
    </View>
  );
  return (
    <View style={styles.parent}>
      <Expandable
        ExpandComp={List}
        ContractComp={Header}
        dimen={{width: {min: 320, max: 320}, height: {min: 100, max: 300}}}
      />
    </View>
  );
};

export default DropMenu;

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: 'column',
  },
  parent: {
    // flexDirection: 'column',
    // justifyContent: 'flex-end',
    // backgroundColor: 'black',
    // alignItems:'flex-end'
  },
  errorContainer: {
    marginLeft: width * 0.05,
  },
  error: {
    fontSize: theme.SIZES.normal * 0.8,
    color: theme.COLORS.ERROR,
  },
  active: {},
  inactive: {},
});
