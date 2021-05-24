import AsyncStorage from '@react-native-async-storage/async-storage';
import PackageScreen from '../Screens/PackageScreen';
import {URL} from './../Constants/urls';
import axios from 'axios';

export default class services {
  authenticate = async (loginData: {id: string; password: string}) => {
    //Call authenticate api
    const headers = {
      'Content-Type': 'application/json',
    };
    return axios
      .post(URL + '/students/authenticate', loginData, {headers})
      .then((response) => response)
      .catch((error) => error);
  };

  get_user = async () => {
    //Call authenticate api
    const token = await AsyncStorage.getItem('TOKEN');
    const headers = {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    };
    return axios
      .get(URL + '/students/me', {headers})
      .then((response) => response)
      .catch((error) => error);
  };

  create_user = async (user: any) => {
    //Call register api
    const headers = {
      'Content-Type': 'application/json',
    };
    return axios
      .post(URL + '/students', user, {headers})
      .then((response) => response)
      .catch((error) => {
        return error;
      });
  };

  reset_password = async (password: string, id: string) => {
    const headers = {
      'Content-Type': 'application/json',
    };
    return axios
      .put(URL + '/students/reset', {password, id}, {headers})
      .then((response) => response)
      .catch((error) => error);
  };

  sendCode = async (
    code: number,
    recipent: string,
    type: 'RESET' | 'VERIFY',
    method: 'MAIL' | 'CONTACT',
  ) => {
    const headers = {
      'Content-Type': 'application/json',
    };
    return axios
      .post(URL + '/extras/sendCode', {code, recipent, type, method}, {headers})
      .then((response) => response)
      .catch((error) => error);
  };

  update_student = async (data: any) => {
    const token = await AsyncStorage.getItem('TOKEN');
    const headers = {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    };
    return axios
      .put(URL + '/students', data, {headers})
      .then((response) => response)
      .catch((error) => error);
  };

  create_order = async (data: any) => {
    const token = await AsyncStorage.getItem('TOKEN');

    const headers = {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    };
    return axios
      .post(URL + '/payment', data, {headers})
      .then((response) => response)
      .catch((error) => error);
  };

  update_payment = async (data: any, id: string) => {
    const token = await AsyncStorage.getItem('TOKEN');
    const headers = {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    };
    return axios
      .put(URL + '/payment/' + id, data, {headers})
      .then((response) => response)
      .catch((error) => error);
  };

  set_logout = async () => {
    const token = await AsyncStorage.getItem('TOKEN');
    const headers = {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    };
    return axios
      .post(URL + '/students/logout', {}, {headers})
      .then((response) => response)
      .catch((error) => error);
  };

  get_subjects = async (id: string) => {
    const token = await AsyncStorage.getItem('TOKEN');
    const headers = {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    };
    return axios
      .get(URL + '/subject/' + id, {headers})
      .then((response) => response)
      .catch((error) => error);
  };

  get_resources = async () => {
    const token = await AsyncStorage.getItem('TOKEN');
    const headers = {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    };
    return axios
      .get(URL + '/resources', {headers})
      .then((response) => response)
      .catch((error) => error);
  };

  get_faq = async () => {
    //Call authenticate api
    const token = await AsyncStorage.getItem('TOKEN');
    const headers = {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    };
    return axios
      .get(URL + '/extras/faqs', {headers})
      .then((response) => response)
      .catch((error) => error);
  };

  get_offers = async () => {
    const token = await AsyncStorage.getItem('TOKEN');
    const headers = {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    };
    return axios
      .get(URL + '/offers', {headers})
      .then((response) => response)
      .catch((error) => error);
  };
  get_tests = async (id: string) => {
    const token = await AsyncStorage.getItem('TOKEN');
    const headers = {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    };
    return axios
      .get(URL + '/tests/' + id, {headers})
      .then((response) => response)
      .catch((error) => error);
  };
  get_lectures = async (id: string) => {
    const token = await AsyncStorage.getItem('TOKEN');
    const headers = {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    };
    return axios
      .get(URL + '/lectures/' + id, {headers})
      .then((response) => response)
      .catch((error) => error);
  };
  get_vocabs = async () => {
    const token = await AsyncStorage.getItem('TOKEN');
    const headers = {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    };
    return axios
      .get(URL + '/vocabs', {headers})
      .then((response) => response)
      .catch((error) => error);
  };

  get_affairs = async () => {
    const token = await AsyncStorage.getItem('TOKEN');
    const headers = {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    };
    return axios
      .get(URL + '/current_affairs', {headers})
      .then((response) => response)
      .catch((error) => error);
  };

  get_combos = async () => {
    const token = await AsyncStorage.getItem('TOKEN');
    const headers = {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    };
    return axios
      .get(URL + '/combos', {headers})
      .then((response) => response)
      .catch((error) => error);
  };

  get_user_combos = async () => {
    const token = await AsyncStorage.getItem('TOKEN');
    const headers = {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    };
    return axios
      .get(URL + '/user_combos', {headers})
      .then((response) => response)
      .catch((error) => error);
  };
}
