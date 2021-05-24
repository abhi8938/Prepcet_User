import {
  HANDLE_CONTROLS,
  HANDLE_FVU,
  HANDLE_LOGIN,
  HANDLE_REGISTER,
  RESET_MODAL,
  RESET_REGISTER,
  SEND_CODE_EMAIL,
  SEND_CODE_PHONE,
  SET_ALERT,
  SET_REFERRAL_CODE,
  SET_USER,
  SIGN_IN,
  SIGN_UP,
  UPDATE_PASSWORD,
  VERIFY_CODE,
} from '../actions/user';
import {
  VerifyOTP,
  handleControls,
  handleFVU,
  handleLogin,
  handleRegister,
  resetModal,
  setReferralCode,
} from '../../Pure/user';

export const basicObj = {
  text: '',
  active: false,
  error_message: '',
};
let basicPass = {text: '', active: false, error_message: '', show: false};

export const registerTemplate = {
  first_name: {...basicObj},
  last_name: {...basicObj},
  email: {...basicObj, verified: false},
  contact: {...basicObj, verified: false},
  password: {...basicPass},
  password_again: {...basicPass},
};

export const LoginTemplate = {
  id: {text: '', active: false, error_message: ''},
  password: {text: '', active: false, error_message: '', show: false},
};

export const alertTemplate = {
  typeOf: '', // 'ERROR | SUCCESS
  title: '',
  message: '',
};

export const FVUtemplate = {
  email: {...basicObj},
  contact: {...basicObj},
  default_otp: '',
  input_otp: {...basicObj, type: 'EMAIL-RESET'},
  password: {...basicPass},
  password_again: {...basicPass},
};

export const InputValidation = (key: string, value: string) => {
  let error = '';
  switch (key) {
    case 'first_name':
      if (value.length < 2) error = `First Name is required`;
      break;
    case 'last_name':
      if (value.length < 2) error = `Last Name is required`;
      break;
    case 'email':
      if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value)) {
        error = `Invalid Email`;
      }
      break;
    case 'contact':
      if (value.length === 0) break;
      if (!/^\d{10}$/.test(value)) error = `Invalid contact number`;
      break;
    case 'password':
      if (value.length < 8) error = `Must be 8 character long`;
      break;
    case 'password_again':
      if (value.length < 8) error = `Must be 8 character long`;
      break;
    case 'input_otp':
      if (value.length < 6) error = `Invalid Code`;
    default:
      break;
  }
  return error;
};

export const POLICIES = [
  {
    name: 'Cancellation and Refund policy',
    link: 'https://digitalluxe.in/documents/refund_policy.pdf',
    active: false,
  },
  {
    name: 'Copyright Policy',
    link: 'https://digitalluxe.in/documents/copyright_policy.pdf',
    active: false,
  },
  {
    name: 'Disclaimer',
    link: 'https://digitalluxe.in/documents/disclaimer.pdf',
    active: false,
  },
  {
    name: 'Privacy Policy',
    link: 'https://digitalluxe.in/documents/privacy_policy.pdf',
    active: false,
  },
  {
    name: 'Terms and Conditions',
    link: 'https://digitalluxe.in/documents/terms_conditions.pdf',
    active: false,
  },
];
const initialState = {
  register: JSON.parse(JSON.stringify(registerTemplate)),
  login: JSON.parse(JSON.stringify(LoginTemplate)),
  user: {},
  policies: POLICIES,
  referal: '',
  FVU: JSON.parse(JSON.stringify(FVUtemplate)),
  controls: {
    FVU: 'NONE',
    agree: false,
  },
  alert: {
    title: '',
    message: '',
    typeOf: 'NONE',
  },
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case HANDLE_LOGIN:
      return handleLogin(state, action.key, action.key1, action.value);
    case HANDLE_REGISTER:
      return handleRegister(state, action.key, action.key1, action.value);
    case RESET_MODAL:
      return {...state, FVU: JSON.parse(JSON.stringify(FVUtemplate))};
    case SET_REFERRAL_CODE:
      return setReferralCode(state, action.value);
    case HANDLE_CONTROLS:
      return handleControls(state, action.key, action.value);
    case HANDLE_FVU:
      return handleFVU(state, action.key, action.key1, action.value);
    case SEND_CODE_EMAIL:
      return {
        ...state,
        FVU: {...state.FVU, default_otp: action.current_code},
        controls: {...state.controls, FVU: 'OTP'},
        alert: {...alertTemplate},
      };
    case SEND_CODE_PHONE:
      return {
        ...state,
        FVU: {...state.FVU, default_otp: action.current_code},
        controls: {...state.controls, FVU: 'OTP'},
        alert: {...alertTemplate},
      };
    case SET_ALERT:
      let alert = {
        typeOf: action.typeOf,
        message: action.message,
        title: action.title,
      };
      return {...state, alert};
    case VERIFY_CODE:
      return VerifyOTP(state);
    case SIGN_UP:
      return {
        ...state,
        register: JSON.parse(JSON.stringify(registerTemplate)),
        controls: {...state.controls, agree: false},
      };
    case SIGN_IN:
      return {
        ...state,
        login: JSON.parse(JSON.stringify(LoginTemplate)),
        alert: JSON.parse(JSON.stringify(alertTemplate)),
      };
    case RESET_REGISTER:
      return {...state, register: JSON.parse(JSON.stringify(registerTemplate))};
    case SET_USER:
      return {...state, user: action.user};
    case UPDATE_PASSWORD:
      return {
        ...state,
        controls: {...state.controls, FVU: 'NONE'},
        FVU: JSON.parse(JSON.stringify(FVUtemplate)),
        alert: JSON.parse(JSON.stringify(alertTemplate)),
      };
    default:
      return state;
  }
};

export default userReducer;
