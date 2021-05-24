import {
  FVUtemplate,
  InputValidation,
  alertTemplate,
  registerTemplate,
} from '../Store/reducers/user';
import {Keyboard, Vibration} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
//@ts-ignore
import RazorpayCheckout from 'react-native-razorpay';
import Snackbar from 'react-native-snackbar';
import {firebase} from '@react-native-firebase/messaging';
import services from '../Services/services';
import theme from '../Constants/theme';

const service = new services();

export const resetModal = (state: any) => {
  let x = {...state.controls};
  x['FVU'] = 'NONE';
  return {...state, FVU: JSON.parse(JSON.stringify(FVUtemplate)), controls: x};
};
export const resetRegister = (state: any) => {
  return {...state, register: JSON.parse(JSON.stringify(registerTemplate))};
};
export const handleLogin = (
  state: any,
  key: 'id' | 'password',
  key1: 'text' | 'active' | 'error_message' | 'show',
  value: any,
) => {
  let x: any = {...state.login};
  x[key][key1] = value;
  if (key1 === 'active' && x[key][key1] === false) {
    x[key]['error_message'] = InputValidation(key, x[key]['text']);
  }
  if (key1 === 'active' && x[key][key1] === true) {
    x[key]['error_message'] = '';
  }
  return {...state, login: x};
};

export const getUser = async () => {
  const response = await service.get_user();
  if (response.status === 200) {
    console.log('user', response.data);
  } else {
    console.log('Error', `${response.data}`);
  }
};

export const setReferralCode = (state: any, value: string) => {
  return {...state, referal: value};
};
export const handleRegister = (
  state: any,
  key: string, // coming from registration template
  key1: string,
  value: any,
) => {
  let x: any = {...state.register};
  x[key][key1] = value;
  //check input validation
  if (key1 !== 'error_message') {
    x[key]['error_message'] = InputValidation(key, x[key]['text']);
  }
  //disbale error on select
  if (key === 'password_again' && key1 === 'text') {
    if (x[key].text !== x.password.text)
      x[key]['error_message'] = 'Password does not match';
  }
  return {...state, register: x};
};

export const handleControls = (
  state: any,
  key: 'FVU' | 'agree',
  value: any,
) => {
  let x: any = {...state.controls};
  x[key] = value;
  return {...state, controls: x};
};

export const handleFVU = (
  state: any,
  key:
    | 'email'
    | 'input_otp'
    | 'password'
    | 'password_again'
    | 'contact'
    | 'default_otp',
  key1: 'text' | 'active' | 'show' | 'error_message' | 'type',
  value: any,
) => {
  let x: any = {...state.FVU};
  x[key][key1] = value;

  if (key1 !== 'error_message') {
    x[key]['error_message'] = InputValidation(key, x[key]['text']);
  }
  if (key === 'password_again' && key1 === 'text') {
    if (x[key].text !== x.password.text)
      x[key]['error_message'] = 'Password does not match';
  }
  if (key1 === 'active' && x[key][key1] === true) {
    x[key]['error_message'] = '';
  }
  return {...state, FVU: x};
};

export const handleAlert = (
  state: any,
  type: string,
  title: string,
  message: string,
) => {
  let x: any = {...state.alert};
  x['title'] = title;
  x['message'] = message;
  x['type'] = type;

  return {...state, alert: x};
};

export const VerifyOTP = (state: any) => {
  let FVU: any = {...state.FVU};
  console.log('verify', FVU.input_otp.text, FVU.default_otp);

  let controls: any = {...state.controls};
  let alert: any = {...alertTemplate};
  let register: any = {...state.register};
  if (FVU.input_otp.text === FVU.default_otp) {
    if (
      FVU.input_otp.type === 'EMAIL-VERIFY' ||
      FVU.input_otp.type === 'CONTACT-VERIFY'
    ) {
      register[FVU.input_otp.type === 'EMAIL-VERIFY' ? 'email' : 'contact'][
        'verified'
      ] = true;
      FVU['input_otp']['text'] = '';
      FVU['default_otp'] = '';
    }
    FVU.input_otp.type === 'EMAIL-VERIFY' ||
    FVU.input_otp.type === 'CONTACT-VERIFY'
      ? (controls['FVU'] = 'NONE')
      : (controls['FVU'] = 'UPDATE');
    return {...state, FVU, controls, alert, register};
  }
  return {
    ...state,
    FVU: {
      ...state.FVU,
      input_otp: {...state.FVU.input_otp, error_message: 'Wrong Code'},
    },
  };
};

//* TRIGGER SERVICES

//* FETCH DATA SERVICES
