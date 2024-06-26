import {
  Alert,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, {Children, useCallback, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {
  Button,
  Card,
  Divider,
  IndexPath,
  Modal,
  Select,
  SelectItem,
  Text,
} from '@ui-kitten/components';
import {Container, Content, HStack, VStack} from '.';
import {
  showAntrian as showAntrianDokter,
  buatAntrian as clearAntrianService,
  showAllAntrian as showAll,
} from '../services/DokterService';

const AntrianDokter = () => {
  const [showAntrian, setShowAntrian] = useState(false);

  const [refreshPage, setRefreshPage] = useState(false);
  const [isButton, setIsButton] = useState(true);

  const [data, setData] = useState([]);
  const [dataAntrian, setDataAntrian] = useState([]);
  const [formattedDate, setFormattedDate] = useState();
  const [idAntrian, setIdAntrian] = useState();

  const getAll = async () => {
    try {
      const dataAll = await showAll();
      // console.log(dataAll);
      setDataAntrian(dataAll);
    } catch (error) {
      console.log(error);
    }
  };

  const clearAntrian = async () => {
    const data = await clearAntrianService(idAntrian);
    console.log('res data: ', data);

    if (data?.message === 'proses antrian berhasil') {
      Alert.alert('Success', 'Antrian berhasil diproses');
      setShowAntrian(true);
      getAntrian();
      return;
    } else {
      Alert.alert('Error', 'Terdapat kesalahan, silahkan coba lagi');
      setShowAntrian(false);
      getAntrian();
      return;
    }
  };

  const onRefresh = useCallback(() => {
    console.log('refresh page');
    setRefreshPage(true);
    getAntrian();
    console.log(showAntrian);
    setTimeout(() => {
      setRefreshPage(false);
    }, 1500);
  }, []);

  const getAntrian = async () => {
    const resData = await showAntrianDokter();
    const getData = resData.sekarang;

    console.log('get : ', resData);

    if (getData != null) {
      setShowAntrian(true);
      setFormattedDate(moment(getData.tgl_antrian).format('DD-MM-YYYY'));
      setIdAntrian(getData.id);
      setIsButton(false);
      return setData(getData);
    }
    setShowAntrian(false);
    setIsButton(true);
    return setData(getData?.message);
  };

  useEffect(() => {
    getAntrian();
    getAll();
  }, []);
  return (
    <Container>
      {/* <ScrollView
        refreshControl={
          }> */}
      <RefreshControl refreshing={refreshPage} onRefresh={onRefresh} />
      {/* diatas satu component terpisah */}
      <VStack itemsCenter mt={26} mb={16}>
        <Text
          style={{
            fontSize: 32,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: 1,
            marginBottom: 8,
          }}>
          Antrian
        </Text>
      </VStack>

      {showAntrian ? (
        <>
          <VStack level="4" mh={54} border={18} pb={34} pt={14} itemsCenter>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                letterSpacing: 2,
                textTransform: 'uppercase',
              }}>
              No. Antrian
            </Text>
            <Text
              style={{
                fontSize: 42,
                fontWeight: 'bold',
                letterSpacing: 2,
              }}>
              {data?.no_antrian}
            </Text>
          </VStack>

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

          {/* <VStack
              level="4"
              mh={54}
              border={18}
              mt={24}
              pb={14}
              pt={14}
              itemsCenter>
              <Text category="h6">No. Antrian Sekarang</Text>
              <Text
                style={{
                  fontSize: 42,
                  fontWeight: 'bold',
                  letterSpacing: 2,
                }}>
                {data?.antrian}
              </Text>
            </VStack> */}
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
          <Text category="h5" style={{}}>
            Belum ada Antrian
          </Text>
        </HStack>
      )}

      {isButton ? (
        <></>
      ) : (
        <Button
          onPress={() => {
            Alert.alert('Warning', 'Ke nomor antrian selanjutnya ?', [
              {
                text: 'Batal',
                style: 'cancel',
              },
              {
                text: 'YA',
                onPress: () => {
                  clearAntrian();
                },
              },
            ]);
          }}
          size="large"
          style={{marginHorizontal: 54, marginVertical: 24}}>
          Antrian Selanjutnya
        </Button>
      )}

      <FlatList
        data={dataAntrian.data}
        renderItem={({item}) => (
          <Content>
            {/* <Text>Tes Antrian</Text> */}
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
      {/* </ScrollView> */}
    </Container>
  );
};

export default AntrianDokter;

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
