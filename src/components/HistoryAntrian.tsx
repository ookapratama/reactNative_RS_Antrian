import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Card, Divider, Text} from '@ui-kitten/components';
import {Content, HStack} from '.';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getHistory} from '../services/PasienService';
import moment from 'moment';

const data = new Array(18).fill({
  no_rekam_medis: 'Title for Item',
  tgl_antrian: 'Description for Item',
  no_antrian: '0001',
});

const HistoryAntrian = () => {
  const [history, setHistory] = useState([]);
  const [isHistory, setIsHistory] = useState(false);

  const dataHistory = async () => {
    try {
      const no_rm = await AsyncStorage.getItem('no_rm');

      const res = await getHistory(no_rm);
      console.log(res);

      setHistory(res);
      res.message === 'data tidak di temukan'
        ? setIsHistory(false)
        : setIsHistory(true);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  useEffect(() => {
    dataHistory();
  }, []);

  return (
    <View>
      {isHistory ? (
        <FlatList
          data={history.data}
          renderItem={({item}) => (
            <Content>
              <Card
                status="basic"
                style={{marginHorizontal: 12, marginVertical: 6}}>
                <HStack>
                  <Text category="h5">{item.no_rekam_medis}</Text>
                  <Text category="h6">
                    {' '}
                    {moment(item.tgl_antrian).format('DD-MM-YYYY')}
                  </Text>
                </HStack>
                <Text category="s1">Antrian : {item.no_antrian}</Text>
              </Card>
              <Divider />
            </Content>
          )}
        />
      ) : (
        <Content>
          <Card
            status="basic"
            style={{marginHorizontal: 12, marginVertical: 6}}>
            <Text style={{textAlign: 'center'}} category="h6">
              Riwayat Antrian belum ada.{'\n'} Silahkan ambil antrian
            </Text>
          </Card>
          <Divider />
        </Content>
      )}
    </View>
  );
};

export default HistoryAntrian;

const styles = StyleSheet.create({});
