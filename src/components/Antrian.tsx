import React, {memo, useCallback, useEffect, useState} from 'react';
import {Container, HStack, VStack} from '.';
import {
  Button,
  Card,
  IndexPath,
  Input,
  Modal,
  Select,
  SelectItem,
  Text,
} from '@ui-kitten/components';
import {Alert, ScrollView, StyleSheet, RefreshControl} from 'react-native';
import {
  buatAntrian as createAntrianService,
  showAntrian as showAntrianService,
} from '../services/AntrianService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const spesialis = ['Dokter Anak', 'Dokter Gigi'];

const Antrian = () => {
  const [showAntrian, setShowAntrian] = useState(false);
  const [refreshPage, setRefreshPage] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [rm, setRm] = useState('');
  const [data, setData] = useState([]);
  const [formattedDate, setFormattedDate] = useState();

  const [selectedIndex, setSelectedIndex] = useState<IndexPath>(
    new IndexPath(0),
  );
  const displayValue = spesialis[selectedIndex.row];
  const id_spesialis = selectedIndex.row + 1;

  const createAntrian = async () => {
    const noAntrian = await AsyncStorage.getItem('no_rm');
    setRm(noAntrian);
    console.log('rm :', rm);
    console.log('id :', id_spesialis, 'dokter spesialis : ', displayValue);

    const dataForm = [noAntrian, id_spesialis];

    const data = await createAntrianService(dataForm);
    console.log('res data: ', data);

    if (data?.message != 'nomor antrian sudah ada') {
      if (!data) {
        Alert.alert('Warning', 'Anda harus registrai pasien dulu');
        setShowAntrian(false);
        return;
      }

      Alert.alert('Success', 'Nomor antrian telah terdaftar');
      setShowAntrian(true);
      setShowModal(false);
      getAntrian();
      return;
    } else {
      Alert.alert('Warning', 'Nomor antrian sudah ada');
      setShowAntrian(false);
      getAntrian();
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
    console.log('get : ', getData);

    if (getData?.data != undefined) {
      setShowAntrian(true);
      setFormattedDate(moment(getData.data.tgl_antrian).format('DD-MM-YYYY'));
      return setData(getData);
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
            <VStack level="4" mh={54} border={18} pb={34} pt={14} itemsCenter>
              <Text category="h6">Antrian anda</Text>
              <Text
                style={{
                  fontSize: 42,
                  fontWeight: 'bold',
                  letterSpacing: 2,
                }}>
                {data.data?.no_antrian}
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
                {data.data?.no_rekam_medis ?? ''}
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

            <VStack
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
            </VStack>
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
          onPress={() => {
            // createAntrian()
            setShowModal(true);
          }}
          size="large"
          style={{marginHorizontal: 54, marginVertical: 24}}>
          Ambil Antrian
        </Button>
      </ScrollView>
      {/* Form Modal */}
      <Modal
        style={{width: '80%'}}
        visible={showModal}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setShowModal(false)}>
        <Card disabled={true}>
          <VStack>
            <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 20}}>
              Pilih dokter spesialis
            </Text>
          </VStack>

          {/* Jenis Kelamin */}
          <Select
            style={{marginBottom: 24}}
            selectedIndex={selectedIndex}
            value={displayValue}
            placeholder={'Pilih jenis kelamin'}
            onSelect={index => setSelectedIndex(index)}>
            <SelectItem title="Dokter Anak" />
            <SelectItem title="Dokter Gigi" />
          </Select>

          <HStack>
            <Button status="danger" onPress={() => setShowModal(false)}>
              Batal
            </Button>
            <Button onPress={() => createAntrian()}>Submit</Button>
          </HStack>
        </Card>
      </Modal>
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
