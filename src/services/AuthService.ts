import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL_API, BASE_URL_API_AUTH} from '../../env';
import axios from 'axios';

// Sign Up Handler
export const SignUp = async (data: any) => {
  console.log('Sign Up Service');

  console.log(data[0]);
  console.log(data[1]);
  console.log(data[2]);

  const nm = data[0];

  await axios
    .post(`${BASE_URL_API}/auth/register`, {
      nama: nm,
      username: data[1],
      password: data[2],
    })
    .then(async response => {
      const res = await response.data;
      console.log('sukses');
    })
    .catch(error => {
      console.log(error.response.data);
      // console.log(error);
    });
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
    console.log(error);
    return;
  }
};
