import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk-next';
import {Alert, Keyboard} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {getCategories, set_categories, set_user_recents} from './main';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {GraphRequestConfig} from 'react-native-fbsdk-next/types/FBGraphRequest';
import Snackbar from 'react-native-snackbar';
import User from '../models/user';
import {firebase} from '@react-native-firebase/messaging';
import services from '../../Services/services';
import {useSelector} from 'react-redux';

export const HANDLE_REGISTER = 'HANDLE_USER';
export const HANDLE_LOGIN = 'HANDLE_LOGIN';
export const SEND_CODE_PHONE = 'SEND_CODE_PHONE';
export const SEND_CODE_EMAIL = 'SEND_CODE_EMAIL';
export const VERIFY_CODE = 'VERIFY_CODE';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
export const SIGN_UP = 'SIGN_UP';
export const RESET_REGISTER = 'RESET_REGISTER';
export const RESET_LOGIN = 'RESET_LOGIN';
export const SET_REFERRAL_CODE = 'SET_REFERRAL_CODE';
export const RESET_MODAL = 'RESET_MODAL';
export const SIGN_IN = 'SIGN_IN';
export const HANDLE_FVU = 'HANDLE_FVU';
// export const SET_LOAD = 'SET_LOAD';   //? should be specific to each component
export const HANDLE_CONTROLS = 'HANDLE_CONTROLS';
export const SAVE_OTP = 'SAVE_OTP';
export const LOGOUT = 'LOGOUT';
export const GOOGLE_SIGNIN = 'GOOGLE_SIGNIN';
export const FACEBOOK_SIGNIN = 'FACEBOOK_SIGNIN';
export const GOOGLE_REGISTER = 'GOOGLE_REGISTER';
export const FACEBOOK_REGISTER = 'FACEBOOK_REGISTER';
export const TOGGLE_AGREE = 'TOGGLE_AGREE';
export const SET_REFERAL = 'SET_REFERAL';
export const SET_ALERT = 'SET_ALERT';
export const SET_USER = 'SET_USER';

const service = new services();
export const resetModal = () => {
  return {type: RESET_MODAL};
};
export const resetRegister = () => {
  return {type: RESET_REGISTER};
};
export const handleLogin = (
  key: 'id' | 'password',
  key1: 'text' | 'active' | 'error_message' | 'show',
  value: any,
) => {
  return {type: HANDLE_LOGIN, key, key1, value};
};

export const setReferralCode = (value: string) => {
  return {type: SET_REFERAL, value};
};
export const handleRegister = (
  key: string, // coming from registration template
  key1: string,
  value: any,
) => {
  return {type: HANDLE_REGISTER, key, key1, value};
};

export const handleControls = (key: 'FVU' | 'agree', value: any) => {
  return {type: HANDLE_CONTROLS, key, value};
};

export const handleFVU = (
  key:
    | 'email'
    | 'default_otp'
    | 'input_otp'
    | 'password'
    | 'password_again'
    | 'contact',
  key1: 'text' | 'active' | 'show' | 'error_message' | 'type',
  value: any,
) => {
  return {type: HANDLE_FVU, key, key1, value};
};
export const setUser = (user: any) => {
  return {type: SET_USER, user};
};

export const getUser = () => {
  return async (dispatch: any) => {
    try {
      const response = await service.get_user();
      if (response.status !== 200) {
        throw new Error(
          `${response.data === undefined ? response : response.data}`,
        );
      }
      dispatch(set_user_recents(response.data.recents));
      dispatch(setUser(response.data));
    } catch (err) {
      throw err;
    }
  };
};
//* TRIGGER SERVICES
export const Login = (navigation: any, loginData: any) => {
  return async (dispatch: any) => {
    try {
      Keyboard.dismiss();
      const response = await service.authenticate(loginData);
      if (response.status !== 200) {
        throw new Error(`ERROR - ${response.data}`);
      }
      const token = await firebase.messaging().getToken();
      await AsyncStorage.setItem('TOKEN', response.headers['x-auth-token']);
      await service.update_student({device_token: token});
      dispatch(setUser(response.data));
      dispatch({
        type: SIGN_IN,
      });
      const category = await AsyncStorage.getItem('CATEGORY');
      if (category) {
        return navigation.replace('Main');
      } else {
        return navigation.replace('Category');
      }
    } catch (err) {
      throw err;
    }
  };
};

export const sendCodeMail = (email: string, type: string) => {
  return async (dispatch: any) => {
    try {
      Keyboard.dismiss();
      const current_code = await saveOtp(type);

      const response = await service.sendCode(
        current_code,
        email,
        type === 'EMAIL-VERIFY' ? 'VERIFY' : 'RESET',
        'MAIL',
      );
      if (response.status !== 200) {
        throw new Error(`ERROR - ${response.data}`);
      }
      Snackbar.show({
        text: response.data.message,
        duration: Snackbar.LENGTH_SHORT,
      });
      dispatch({
        type: SEND_CODE_EMAIL,
        email,
        current_code: `${current_code}`,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const sendCodePhone = (contact: string, type: string) => {
  return async (dispatch: any) => {
    try {
      Keyboard.dismiss();
      const current_code = await saveOtp(type);
      const response = await service.sendCode(
        current_code,
        contact,
        type === 'CONTACT-VERIFY' ? 'VERIFY' : 'RESET',
        'CONTACT',
      );
      if (response.status !== 200) {
        throw new Error(`ERROR - ${response.data}`);
      }
      Snackbar.show({
        text: response.data.message,
        duration: Snackbar.LENGTH_SHORT,
      });
      dispatch({
        type: SEND_CODE_PHONE,
        contact,
        current_code: `${current_code}`,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const VerifyCode = () => {
  return {type: VERIFY_CODE};
};

export const UpdatePassword = (password: string, id: string) => {
  return async (dispatch: any) => {
    try {
      Keyboard.dismiss();
      const response = await service.reset_password(password, id);

      if (response.status !== 200) {
        throw new Error(`ERROR - ${response.data}`);
      }
      Snackbar.show({
        text: response.data,
        duration: Snackbar.LENGTH_SHORT,
      });
      dispatch({type: UPDATE_PASSWORD});
    } catch (error) {
      throw error;
    }
  };
};

export const Register = (navigation: any, userData: any) => {
  return async (dispatch: any) => {
    try {
      Keyboard.dismiss();
      const response = await service.create_user(userData);
      if (response.status !== 200) {
        throw new Error(`ERROR - ${response.data ? response.data : response}`);
      }
      const token = await firebase.messaging().getToken();
      await AsyncStorage.setItem('TOKEN', response.headers['x-auth-token']);
      await service.update_student({device_token: token});
      dispatch(setUser(response.data));
      dispatch({
        type: SIGN_UP,
      });
      const category = await AsyncStorage.getItem('CATEGORY');
      if (category) {
        return navigation.replace('Main');
      } else {
        return navigation.replace('Category');
      }
    } catch (err) {
      throw err;
    }
  };
};

export const logout = () => {
  return {type: LOGOUT};
};

export const handleAlert = (typeOf: string, message: string) => {
  return {type: SET_ALERT, typeOf, message, title: typeOf};
};

export const saveOtp = async (type: string) => {
  const current_code = Math.floor(100000 + Math.random() * 900000);
  if (type === 'EMAIL-VERIFY' || type === 'CONTACT-VERIFY') {
    const prevOtp: any = await AsyncStorage.getItem('VERIFY');

    if (prevOtp) {
      return JSON.parse(prevOtp).code;
    }
    let x = {code: current_code, created_at: new Date()};
    await AsyncStorage.setItem('VERIFY', JSON.stringify(x));
    return current_code;
  } else if (type === 'EMAIL-RESET' || type === 'CONTACT-RESET') {
    const prevOtp: any = await AsyncStorage.getItem('RESET');
    if (prevOtp) {
      return JSON.parse(prevOtp).code;
    }
    let x = {code: current_code, created_at: new Date()};
    await AsyncStorage.setItem('RESET', JSON.stringify(x));
    return current_code;
  }
};

//*google

export const signInGoogle = (navigation: any) => {
  return async (dispatch: any) => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      let userData = new User(
        `${userInfo.user.givenName} ${userInfo.user.familyName}`,
        userInfo.user.email,
        `${userInfo.user.givenName?.slice(0, -3)}*${userInfo.user.id.slice(
          0,
          5,
        )}`,
        'GOOGLE',
        '',
      );
      await dispatch(Register(navigation, userData));
    } catch (error) {
      console.log('google_err', error);
      throw error;
    }
  };
};
export const signOutGoogle = async () => {
  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
  } catch (error) {
    Alert.alert('Something else went wrong... ', error.toString());
  }
};
export const getCurrentUserInfo = async () => {
  try {
    const userInfo = await GoogleSignin.signInSilently();
    console.log('userInfo_silent', userInfo);
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_REQUIRED) {
      // when user hasn't signed in yet
      Alert.alert('Please Sign in');
    } else {
      Alert.alert('Something else went wrong... ', error.toString());
    }
  }
};

//*facebook
export const getInfoFromToken = (
  token: GraphRequestConfig,
  navigation: any,
) => {
  return async (dispatch: any) => {
    try {
      const PROFILE_REQUEST_PARAMS = {
        fields: {
          string: 'id,name,first_name,last_name,email',
        },
      };
      const profileRequest = new GraphRequest(
        '/me',
        {token, parameters: PROFILE_REQUEST_PARAMS},
        async (error: any, user: any) => {
          if (error) {
            throw new Error('facebook login info has error: ' + error);
          } else {
            let userData = new User(
              `${user.name}`,
              user.email,
              `${user.first_name?.slice(0, -3)}*${user.id.slice(0, 5)}`,
              'FACEBOOK',
              '',
            );
            console.log('facebook_result:', user);
            await dispatch(Register(navigation, userData));
          }
        },
      );
      new GraphRequestManager().addRequest(profileRequest).start();
    } catch (err) {
      throw err;
    }
  };
};

export const loginWithFacebook = (navigation: any) => {
  // Attempt a login using the Facebook login dialog asking for default permissions.
  return async (dispatch: any) => {
    try {
      const login = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      if (login.isCancelled) {
        throw new Error('User Cancelled login');
      }
      const token: any = await AccessToken.getCurrentAccessToken();
      await dispatch(
        getInfoFromToken(token.accessToken.toString(), navigation),
      );
    } catch (err) {
      throw err;
    }
  };
};

export const facebook_logout = async () => {
  await LoginManager.logOut();
};

// .then(
//     (login: any) => {
//       if (login.isCancelled) {
//         console.log('Login cancelled');
//       } else {
//         AccessToken.getCurrentAccessToken().then((data: any) => {
//           const accessToken = data.accessToken.toString();
//           getInfoFromToken(accessToken);
//         });
//       }
//     },
//     (error: any) => {
//       console.log('facebook Login fail with error: ' + error);
//     },
//   );
