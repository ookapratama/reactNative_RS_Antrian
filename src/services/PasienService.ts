import axios from 'axios';
import {BASE_URL_API} from '../../env';

export const createRegis = async (data: any) => {
  console.log(data);
  try {
    const datas = await axios.post(`${BASE_URL_API}/pasien/create`, {
      name: data[0],
      tempat_lahir: data[1],
      tgl_lahir: data[2],
      jkl: data[3],
      alamat: data[4],
      no_telepon: data[5],
      user_id: data[6],
    });
    const res = datas.data;
    return res;
  } catch (error) {
    console.log(error.response.data);
    return false;
  }
};
