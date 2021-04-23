import {Height, width} from '../Constants/size';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FunctionComponent, useState} from 'react';

import Icon from 'react-native-vector-icons/Entypo';
import {Picker} from '@react-native-picker/picker';
import theme from '../Constants/theme';

type props = {
  list: Array<{id: number; name: string}>;
  selected: string;
  onSelect: (selected: string) => void;
  error: string;
  show?: boolean;
  style?: any;
  list_height?: number;
};
const indicator = (rotate: boolean) => (
  <Icon
    name="arrow-with-circle-down"
    size={20}
    color={theme.COLORS.HEADER}
    style={{marginTop: 2}}
  />
);
const CustomDropdown: FunctionComponent<props> = ({
  list,
  selected,
  error,
  onSelect,
  show = false,
  style,
  list_height = Height / 5,
}) => {
  const [toggle, setToggle] = useState(show);

  const handleToggle = () => {
    setToggle(!toggle);
  };
  const listItem = (item: any) => {
    return (
      <TouchableHighlight
        key={`${item.id}`}
        activeOpacity={0.5}
        underlayColor="#DDDDDD"
        onPress={() => {
          setToggle(false);
          onSelect(item.name);
        }}
        style={styles.list_item}>
        <Text style={styles.item_title}>{item.name}</Text>
      </TouchableHighlight>
    );
  };
  return (
    <View style={styles.parent}>
      <TouchableOpacity
        style={[styles.first_child_touchable, style]}
        onPress={() => handleToggle()}>
        <View style={styles.first_child}>
          <Text style={styles.selected}>{selected}</Text>
          {indicator(false)}
        </View>
      </TouchableOpacity>
      {toggle ? (
        <ScrollView style={[styles.list, {height: list_height}]}>
          {list.map((item, index) => {
            return listItem(item);
          })}
        </ScrollView>
      ) : null}
    </View>
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  list: {
    width: '96%',
    position: 'absolute',
    top: 53,
    borderRadius: 7,
    elevation: 1,
    backgroundColor: theme.COLORS.DEFAULT,
  },
  item_title: {
    fontSize: theme.SIZES.normal - 1,
    fontFamily: 'Comfortaa-Bold',
  },
  list_item: {
    width: '100%',
    padding: theme.SIZES.small - 5,
    borderRadius: 7,
    marginVertical: 2,
  },
  selected: {
    width: '60%',
    fontSize: theme.SIZES.normal - 3,
    fontFamily: 'Comfortaa-Bold',
  },
  parent: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginRight: theme.SIZES.small,
    marginVertical: 5,
    marginBottom: 10,
  },

  error: {
    marginTop: theme.SIZES.small - 5,
    fontSize: theme.SIZES.normal - 2,
    fontFamily: 'Comfortaa-Bold',
    lineHeight: 22,
    color: theme.COLORS.ERROR,
    width: '98%',
  },
  first_child: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  first_child_touchable: {
    width: width / 4.6,
    paddingHorizontal: theme.SIZES.small - 5,
    alignItems: 'center',
    flexDirection: 'row',
    height: theme.SIZES.large * 2,
    backgroundColor: '#cccccc',
    borderRadius: 7,
  },
});
