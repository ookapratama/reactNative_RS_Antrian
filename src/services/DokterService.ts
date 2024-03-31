import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL_API} from '../../env';

export const showAntrian = async () => {
  console.log('Show Antrian Service');
  try {
    const datas = await axios.get(`${BASE_URL_API}/antrian/show`);
    const res = datas.data;
    return res;
  } catch (error) {
    console.log(error.response.data);
    return false;
  }
};

export const buatAntrian = async (id: any) => {
  console.log('selesaikan antrian service');
  console.log('service : ', id);
  try {
    const datas = await axios.post(`${BASE_URL_API}/antrian/proses/${id}`);
    const res = datas.data;
    console.log(res);
    return res;
  } catch (error) {
    console.log(error.response.data);
    return false;
  }
};
