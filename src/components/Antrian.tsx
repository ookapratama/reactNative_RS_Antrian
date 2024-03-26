import React, {memo, useCallback, useEffect, useState} from 'react';
import {Container, HStack, VStack} from '.';
import {Button, Card, Input, Modal, Text} from '@ui-kitten/components';
import {Alert, ScrollView, StyleSheet, RefreshControl} from 'react-native';
import {
  buatAntrian as createAntrianService,
  showAntrian as showAntrianService,
} from '../services/AntrianService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const Antrian = () => {
  const [showAntrian, setShowAntrian] = useState(false);
  const [rm, setRm] = useState('');
  const [refreshPage, setRefreshPage] = useState(false);
  const [data, setData] = useState([]);
  const [formattedDate, setFormattedDate] = useState();

  const createAntrian = async () => {
    const noAntrian = await AsyncStorage.getItem('no_rm');
    setRm(noAntrian);
    console.log('rm :', rm);
    const data = await createAntrianService(noAntrian);

    if (data?.message != 'nomor antrian sudah ada') {
      if (!data) {
        Alert.alert('Warning', 'Anda harus registrai pasien dulu');
        setShowAntrian(false);
        return;
      }

      Alert.alert('Success', 'Nomor antrian telah terdaftar');
      setShowAntrian(true);
      getAntrian();
      return;
    } else {
      Alert.alert('Warning', 'Nomor antrian sudah ada');
      setShowAntrian(false);
      return;
    }
  };

  const onRefresh = useCallback(() => {
    console.log('refresh page');
    setRefreshPage(true);
    getAntrian();
    setTimeout(() => {
      setRefreshPage(false);
    }, 1500);
  }, []);

  const getAntrian = async () => {
    const noAntrian = await AsyncStorage.getItem('no_rm');
    // setRm(noAntrian);
    console.log(noAntrian);

    const getData = await showAntrianService(noAntrian);
    console.log(getData);
    console.log('get : ', getData?.data);
    if (getData?.data != undefined) {
      setShowAntrian(true);
      setFormattedDate(moment(getData.tgl_antrian).format('DD-MM-YYYY'));
      return setData(getData?.data);
    }
    setShowAntrian(false);
    return setData(getData?.message);
  };

  useEffect(() => {
    getAntrian();
  }, []);

  return (
    <Container>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshPage} onRefresh={onRefresh} />
        }>
        <VStack itemsCenter mt={26} mb={16}>
          <Text
            style={{
              fontSize: 32,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: 1,
              marginBottom: 8,
            }}>
            Detail Antrian
          </Text>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              letterSpacing: 2,
              textTransform: 'uppercase',
            }}>
            No. Antrian
          </Text>
        </VStack>

        {showAntrian ? (
          <>
            <HStack level="4" mh={54} border={18} pv={34} justify="center">
              <Text
                style={{
                  fontSize: 42,
                  fontWeight: 'bold',
                  letterSpacing: 2,
                }}>
                {data?.no_antrian}
              </Text>
            </HStack>

            <HStack
              level="4"
              mh={54}
              mt={-35}
              pv={34}
              ph={10}
              justify="space-between">
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  letterSpacing: 2,
                }}>
                Rekam Medis
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  letterSpacing: 2,
                }}>
                {data?.no_rekam_medis ?? ''}
              </Text>
            </HStack>

            <HStack
              style={{borderBottomLeftRadius: 18, borderBottomRightRadius: 18}}
              level="4"
              mh={54}
              mt={-35}
              pv={14}
              ph={10}
              justify="space-between">
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  letterSpacing: 2,
                }}>
                Tanggal
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  letterSpacing: 2,
                }}>
                {formattedDate}
              </Text>
            </HStack>
          </>
        ) : (
          <HStack
            style={[styles.shadow, {borderRadius: 12}]}
            level="4"
            padder
            itemsCenter
            justify="center"
            mh={54}
            mb={20}>
            <Text category="h6" style={{textAlign: 'center'}}>
              Belum ada No. Antrian{'\n'}Silahkan ambil antrian dulu
            </Text>
          </HStack>
        )}

        <Button
          onPress={() => createAntrian()}
          size="large"
          style={{marginHorizontal: 54, marginVertical: 24}}>
          Ambil Antrian
        </Button>
      </ScrollView>
    </Container>
  );
};

export default Antrian;

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  shadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5.62,
    elevation: 7,
  },
});
