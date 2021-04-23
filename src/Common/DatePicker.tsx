import React, {FunctionComponent, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import theme from '../Constants/theme';

type picker_props = {
  show?: boolean;
  onChange: (event: Event, selected: Date | undefined) => void;
  value: Date | string;
};

const DatePicker: FunctionComponent<picker_props> = ({
  show = false,
  onChange,
  value,
}) => {
  const [toggle, setShow] = useState(show);
  return (
    <View style={styles.date_parent}>
      <TouchableOpacity
        style={styles.date_touchable}
        onPress={() => setShow(!show)}>
        <Text
          style={{
            fontSize: theme.SIZES.normal + 2,
            fontFamily: 'Comfortaa-Bold',
          }}>
          {typeof value === 'string' ? value : value.toDateString()}
        </Text>
      </TouchableOpacity>
      {toggle === true ? (
        <DateTimePicker
          testID="datePicker"
          value={typeof value === 'string' ? new Date() : value}
          mode={'date'}
          display="default"
          onChange={(event: any, date: any) => {
            setShow(false);
            onChange(event, date);
          }}
        />
      ) : null}
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  date_parent: {
    marginHorizontal: 2.5,
    marginVertical: 5,
    marginBottom: 10,
  },
  date_touchable: {
    justifyContent: 'center',
    height: theme.SIZES.large * 2.3,
    backgroundColor: '#cccccc',
    borderRadius: 7,
    paddingHorizontal: theme.SIZES.small,
    width: '97%',
    alignSelf: 'center',
  },
});
