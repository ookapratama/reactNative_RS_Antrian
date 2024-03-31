import {FlatList, StyleSheet, View} from 'react-native';
import {Card, Divider, Text} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showAllAntrian} from '../services/DokterService';
import {Content, HStack} from '.';
import moment from 'moment';

const DaftarPasien = () => {
  const [pasien, setPasien] = useState([]);
  const [isPasien, setIsPasien] = useState(false);

  const dataPasien = async () => {
    try {
      const no_rm = await AsyncStorage.getItem('no_rm');

      const res = await showAllAntrian();
      console.log(res);

      setPasien(res);
      res.message === 'data antrian tidak di temukan'
        ? setIsPasien(false)
        : setIsPasien(true);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  useEffect(() => {
    dataPasien();
  }, []);
  return (
    <View>
      {isPasien ? (
        <FlatList
          data={pasien.data}
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
              Belum ada antrian pasien.
            </Text>
          </Card>
          <Divider />
        </Content>
      )}
    </View>
  );
};

export default DaftarPasien;

const styles = StyleSheet.create({});
