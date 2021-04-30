import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FunctionComponent, useState} from 'react';
import theme, {default_config} from '../../Constants/theme';

import {Height} from '../../Constants/size';
import Icon from 'react-native-vector-icons/Ionicons';

type props = {
  item: any;
};

const SupportExpandView: FunctionComponent<props> = ({item}) => {
  const [show, setShow] = useState(false);
  return (
    <View style={styles.parent}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setShow(!show)}
        style={[styles.inner_container]}>
        <Text style={[styles.question]}>{item.question}</Text>
        <Icon
          name={show ? 'caret-up-outline' : 'caret-down-outline'}
          size={25}
        />
      </TouchableOpacity>
      {show && (
        <View style={styles.expandable_container}>
          <Text style={styles.answer}>{item.answer}</Text>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  parent: {
    marginTop: theme.SIZES.normal,
    borderBottomColor: theme.COLORS.GREEN,
    borderBottomWidth: 1,
  },
  inner_container: {
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: theme.SIZES.small / 2,
    paddingVertical: theme.SIZES.small * 0.6,
    alignItems: 'center',
    flexDirection: 'row',
  },
  question: {
    width: '92%',
    fontFamily: 'Signika-Medium',
    fontSize: theme.SIZES.normal,
    color: theme.COLORS.HEADER,
    lineHeight: 24,
  },
  answer: {
    fontSize: theme.SIZES.small + 3,
    lineHeight: 21,
    color: theme.COLORS.HEADER,
    marginBottom: theme.SIZES.small / 2,
  },
  expandable_container: {
    paddingHorizontal: theme.SIZES.small / 2,
    paddingTop: theme.SIZES.small / 1.5,
  },
});

export default SupportExpandView;
