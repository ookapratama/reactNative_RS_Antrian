import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL_API, BASE_URL_API_AUTH} from '../../env';
import axios from 'axios';

// Sign Up Handler
export const SignUp = async (data: any) => {
  console.log('Sign Up Service');

  console.log(data);
  console.log('nama :', data[0]);
  console.log('usernamee :', data[1]);
  console.log('password :', data[2]);

  try {
    const datas = await axios.post(`${BASE_URL_API_AUTH}/register`, {
      nama: data[0],
      username: data[1],
      password: data[2],
    });
    const res = datas.data;
    return res;
  } catch (error) {
    console.log(error.response.data);
    return;
  }
};

export const SignIn = async (data: any) => {
  console.log('Sign In Service');
  // console.log(data);

  try {
    const datas = await axios.post(`${BASE_URL_API_AUTH}/login`, {
      username: data[0],
      password: data[1],
    });
    const res = datas.data;
    return res;
  } catch (error) {
    console.log(error.response.data);
    return;
  }
};

export const LogOut = async () => {
  let status = true;
  try {
    await AsyncStorage.removeItem('nama');
    await AsyncStorage.removeItem('username');
    await AsyncStorage.removeItem('status');
    await AsyncStorage.removeItem('no_rm');
    await AsyncStorage.removeItem('id');
  } catch (error) {
    console.log('error logout :', error);
    return false;
  }
  return status;
};
