import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL_API} from '../../env';

export const showAntrian = async () => {
  console.log('Show Antrian Service');
  try {
    const datas = await axios.get(`${BASE_URL_API}/antrian/detail/RM-0001`);
    const res = datas.data;
    return res;
  } catch (error) {
    console.log(error.response.data);
    return false;
  }
};

export const buatAntrian = async (data: any) => {
  console.log('buat antrian service');
  console.log(data);
  try {
    const datas = await axios.post(`${BASE_URL_API}/antrian/create`, {
      no_rekam_medis: data,
    });
    const res = datas.data;
    console.log(res);
    return res;
  } catch (error) {
    console.log(error.response.data);
    return false;
  }
};
