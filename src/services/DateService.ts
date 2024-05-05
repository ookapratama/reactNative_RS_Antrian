import axios from 'axios';
import {BASE_URL_API} from '../../env';
import {FC} from 'react';
import {err} from 'react-native-svg';

export const getDate = async (today: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL_API}/jadwal-praktek/detail/${today}`,
    );
    const res = response.data;
    return res;
  } catch (error) {
    console.log(error.response.data);
    return error;
  }
};
