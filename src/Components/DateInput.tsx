import React, {
  Fragment,
  FunctionComponent,
  createRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

import TextField from './common/TextField';
import baseStyles from './common/styles';
import theme from '../Constants/theme';
import {width} from '../Constants/size';

type props = {
  setdob: (dob: Date) => void;
};

const dateRef = createRef();
const monthRef = createRef();
const yearRef = createRef();

const DateInput: FunctionComponent<props> = ({setdob}) => {
  const [date, setDate] = useState({
    day: {text: '', active: false, error_message: ''},
    month: {text: '', active: false, error_message: ''},
    year: {text: '', active: false, error_message: ''},
  });
  const [error, setError] = useState('');
  const handleDate = (
    key: 'day' | 'month' | 'year',
    key1: 'text' | 'active' | 'error_message',
    value: any,
  ) => {
    let x: any = {...date};
    if (isNaN(value) === true) {
      return;
    }

    x[key][key1] = value;
    if (key === 'day' && (parseInt(value) < 1 || parseInt(value) > 31)) {
      return setError('Invalid Day');
    }
    if (key === 'month' && (parseInt(value) < 1 || parseInt(value) > 12)) {
      return setError('Invalid Month');
    }
    if (key === 'year' && (parseInt(value) < 1 || parseInt(value) > 2021)) {
      return setError('Invalid Year');
    }

    if (key === 'day' && value.length === 2) {
      console.log('Month');
      setTimeout(() => monthRef && monthRef.current?.focus(), 10);
    }
    if (key === 'month' && value.length === 2) {
      setTimeout(() => yearRef && yearRef.current?.focus(), 10);
    }
    if (key === 'year' && value.length === 4) {
      setTimeout(() => yearRef && yearRef.current?.blur(), 10);
    }
    setError('');
    console.log('Date', x);
    setDate(x);
  };
  const handleSubmission = () => {
    for (let key in date) {
      if (
        date.day.text.length !== 0 &&
        date.month.text.length !== 0 &&
        date.year.text.length === 4
      ) {
        const dob = new Date(
          parseInt(date.year.text),
          parseInt(date.month.text) - 1,
          parseInt(date.day.text) + 1,
        );

        console.log('dob', dob);
        setdob(dob);
      }
    }
  };
  return (
    <View style={styles.container}>
      <Text
        style={[
          baseStyles.text,
          {
            fontSize: theme.SIZES.normal + 5,
            marginBottom: theme.SIZES.small / 5,
          },
        ]}>
        Date of birth
      </Text>
      <View
        style={{
          paddingLeft: theme.SIZES.normal,
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <TextField
            style={[
              styles.input,
              {
                width: '18%',
                paddingLeft: theme.SIZES.small / 2,
                minWidth: 47,
              },
            ]}
            inputProps={{
              ref: dateRef,
              placeholder: 'DD',
              value: date.day.text,
              onChangeText: (text) => {
                handleDate('day', 'text', text);
              },
              onBlur: () => handleDate('day', 'active', false),
              onFocus: () => {
                handleDate('day', 'active', false);
                handleSubmission();
              },
              keyboardType: 'number-pad',
              maxLength: 2,
              editable: error.length == 0 || error.includes('Day'),
            }}
            error={date.day.error_message}
          />
          <TextField
            style={[
              styles.input,
              {width: '18%', minWidth: 50, paddingLeft: theme.SIZES.small / 2},
            ]}
            inputProps={{
              placeholder: 'MM',
              value: date.month.text,
              onChangeText: (text) => {
                handleDate('month', 'text', text);
              },
              onBlur: () => {
                handleDate('month', 'active', false);
                handleSubmission();
              },
              onFocus: () => handleDate('month', 'active', true),
              keyboardType: 'number-pad',
              maxLength: 2,
              editable: error.length == 0 || error.includes('Month'),
              ref: monthRef,
            }}
            error={date.month.error_message}
          />
          <TextField
            style={[
              styles.input,
              {
                width: '27%',
                paddingLeft: theme.SIZES.small / 2,
                minWidth: 60,
              },
            ]}
            inputProps={{
              ref: yearRef,
              placeholder: 'YYYY',
              value: date.year.text,
              onChangeText: (text) => {
                handleDate('year', 'text', text);
              },
              onBlur: () => {
                handleDate('year', 'active', false);
                handleSubmission();
              },
              onFocus: () => handleDate('year', 'active', true),
              keyboardType: 'number-pad',
              maxLength: 4,
              editable: error.length == 0 || error.includes('Year'),
            }}
            error={date.year.error_message}
          />
        </View>
        <View style={styles.errorContainer}>
          {error.length !== 0 && <Text style={styles.error}>{error}</Text>}
        </View>
      </View>
    </View>
  );
};

export default DateInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {},
  input: {
    backgroundColor: theme.COLORS.LIGHT_GREY,
    borderRadius: 4,
  },
  errorContainer: {
    marginLeft: theme.SIZES.small / 3,
  },
  error: {
    fontSize: theme.SIZES.normal / 1.4,
    color: theme.COLORS.ERROR,
    fontFamily: 'Signika-Regular',
  },
});
