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

  get_papers = async () => {
    //Call register api
    const token = await AsyncStorage.getItem('TOKEN');
    const headers = {
      'Content-Type': 'application/json',
      'x-auth-token': token,
      assigned_to: token,
    };
    return axios
      .get(URL + '/getPapers', {headers})
      .then((response) => response)
      .catch((error) => error);
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

  add_device_token = async (device_token: string) => {
    const token = await AsyncStorage.getItem('TOKEN');
    const headers = {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    };
    return axios
      .put(URL + '/student', {device_token}, {headers})
      .then((response) => response)
      .catch((error) => error);
  };

  upload_paper = async (
    file: {name: string; file: string},
    paper_id: string,
  ) => {
    const token = await AsyncStorage.getItem('TOKEN');
    const id = await AsyncStorage.getItem('id');
    if (!id) return;
    const headers = {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    };
    return axios
      .post(
        URL + '/updatePaper',
        {
          id: paper_id,
          submissions: [
            {
              submission_date: new Date(),
              by: id,
              status: 'SUBMITTED',
              file: file.file,
              name: file.name,
            },
          ],
        },
        {headers},
      )
      .then((response) => response)
      .catch((error) => error);
  };

  get_universities = async () => {
    //Call authenticate api
    const token = await AsyncStorage.getItem('TOKEN');
    const headers = {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    };
    return axios
      .get(URL + '/university', {headers})
      .then((response) => response)
      .catch((error) => error);
  };
  get_programs = async (id: string) => {
    //Call authenticate api
    const token = await AsyncStorage.getItem('TOKEN');
    const headers = {
      'Content-Type': 'application/json',
      'x-auth-token': token,
      university_id: id,
    };
    return axios
      .get(URL + '/program', {headers})
      .then((response) => response)
      .catch((error) => error);
  };

  get_packages = async () => {
    //Call authenticate api
    const token = await AsyncStorage.getItem('TOKEN');
    const headers = {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    };
    return axios
      .get(URL + '/packages', {headers})
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

  create_subscription = async (id: string, paymentId?: string) => {
    const token = await AsyncStorage.getItem('TOKEN');
    const headers = {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    };
    let data: any = {
      PID: id,
    };
    if (paymentId) {
      data.PA_ID = paymentId;
    }
    return axios
      .post(URL + '/subscriptions', data, {headers})
      .then((response) => response)
      .catch((error) => error);
  };

  get_subscription = async () => {
    //Call authenticate api
    const token = await AsyncStorage.getItem('TOKEN');
    const headers = {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    };
    return axios
      .get(URL + '/subscriptions/me', {headers})
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
      .get(URL + '/subject/all/' + id, {headers})
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

  get_annotations = async (id: string) => {
    const token = await AsyncStorage.getItem('TOKEN');
    const headers = {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    };
    return axios
      .get(URL + '/annotations/' + id, {headers})
      .then((response) => response)
      .catch((error) => error);
  };
  update_annotations = async (id: string, ann: Array<any>) => {
    const token = await AsyncStorage.getItem('TOKEN');
    const headers = {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    };
    return axios
      .put(URL + '/annotations/' + id, {ann}, {headers})
      .then((response) => response)
      .catch((error) => error);
  };
  get_broadcast = async () => {
    const token = await AsyncStorage.getItem('TOKEN');
    const headers = {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    };
    return axios
      .get(URL + '/extras/bmessage', {headers})
      .then((response) => response)
      .catch((error) => error);
  };

  renew_subscription = async (
    subId: string,
    status: 'ACTIVE' | 'INACTIVE',
    transId: string,
  ) => {
    const token = await AsyncStorage.getItem('TOKEN');
    const headers = {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    };
    const data = {
      status,
      PA_ID: transId,
    };
    return axios
      .put(URL + '/subscriptions/me', data, {headers})
      .then((response) => response)
      .catch((error) => error);
  };
}
