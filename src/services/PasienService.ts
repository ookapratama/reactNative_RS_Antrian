import axios from 'axios';
import {BASE_URL_API} from '../../env';

export const createRegis = async (data: any) => {
  try {
    const datas = await axios.post(`${BASE_URL_API}/pasien/create`, {
      nama: data[0],
      tempat_lahir: data[1],
      tgl_lahir: data[2],
      jkl: data[3],
      alamat: data[4],
      no_telpon: data[5],
      user_id: data[6],
    });
    const res = datas.data;
    return res;
  } catch (error) {
    console.log(error.response.data);
    return false;
  }
};

export const updateRegis = async (data, no_rm): any => {
  console.log('update service : ', data);
  console.log(no_rm);
  try {
    const datas = await axios.post(`${BASE_URL_API}/pasien/update/${no_rm}`, {
      nama: data[0],
      tempat_lahir: data[1],
      tgl_lahir: data[2],
      jkl: data[3],
      alamat: data[4],
      no_telpon: data[5],
      user_id: data[6],
    });
    const res = datas.data;
    return res;
  } catch (error) {
    console.log(error.response.data);
    return;
  }
};

export const detailPasien = async (no_rm: any) => {
  try {
    const datas = await axios.get(`${BASE_URL_API}/pasien/detail/${no_rm}`);
    const res = datas.data;
    return res;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const getHistory = async (no_rm: any) => {
  console.log('history pasien');
  try {
    // const datas = await axios.get(`${BASE_URL_API}/pasien/history/${no_rm}`);
    const datas = await axios.get(`${BASE_URL_API}/pasien/history/${no_rm}`);
    const res = datas.data;
    
    return res;
  } catch (error) {
    console.log(error.response.data);
  }
};
