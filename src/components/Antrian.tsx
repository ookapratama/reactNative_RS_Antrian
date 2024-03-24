import React, {memo, useCallback, useEffect, useState} from 'react';
import {HStack, VStack} from '.';
import {Button, Card, Input, Modal, Text} from '@ui-kitten/components';
import {Alert, ScrollView, StyleSheet, RefreshControl} from 'react-native';
import {
  buatAntrian as createAntrianService,
  showAntrian as showAntrianService,
} from '../services/AntrianService';

const Antrian = () => {
  const [showModal, setShowModal] = useState(false);
  const [noAntrian, setNoAntrian] = useState('RM-000');
  const [refreshPage, setRefreshPage] = useState(false);
  const [data, setData] = useState([]);

  const createAntrian = async () => {
    const data = await createAntrianService(noAntrian);

    if (data.message != 'nomor antrian sudah ada') {
      Alert.alert('Success', 'Nomor antrian telah terdaftar');
      setShowModal(false);
      return;
    } else {
      Alert.alert('Warning', 'Nomor antrian sudah ada');
      return;
    }
  };

  const onRefresh = useCallback(() => {
    console.log('refresh page');
    setRefreshPage(true);
    setTimeout(() => {
      setRefreshPage(false);
    }, 1500);
  }, []);

  useEffect(() => {
    const getAntrian = async () => {
      const getData = await showAntrianService();
      console.log(getData.data);
      if (getData.message == 'detail antrian') {
        return setData(getData.data);
      }
      return setData(getData.message);
    };
    getAntrian();
  }, []);

  return (
    <>
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

        <HStack level="4" mh={54} border={18} pv={34} justify="center">
          <Text
            style={{
              fontSize: 42,
              fontWeight: 'bold',
              letterSpacing: 2,
            }}>
            {data?.no_antrian ?? 'Nomor antrian tidak ditemukan'}
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
            {}
          </Text>
        </HStack>

        <HStack
          level="4"
          mh={54}
          mt={-10}
          pv={8}
          ph={10}
          pb={42}
          justify="space-between"
          style={{borderBottomLeftRadius: 18, borderBottomRightRadius: 18}}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              letterSpacing: 2,
            }}>
            Status
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              letterSpacing: 2,
            }}>
            1
          </Text>
        </HStack>

        <Button
          onPress={() => setShowModal(true)}
          size="large"
          style={{marginHorizontal: 54, marginVertical: 24}}>
          Ambil Antrian
        </Button>
      </ScrollView>

      {/* Form Modal */}
      <Modal
        visible={showModal}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setShowModal(false)}>
        <Card disabled={true}>
          <VStack>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              Ambil Antrian
            </Text>
            <Input
              style={{marginBottom: 24, marginTop: 12}}
              size="large"
              placeholder="Masukkan nomor antrian"
              keyboardType="numeric"
              value={noAntrian}
              onChangeText={v => setNoAntrian(v)}
            />
          </VStack>
          <HStack>
            <Button status="danger" onPress={() => setShowModal(false)}>
              Batal
            </Button>
            <Button onPress={() => createAntrian()}>Submit</Button>
          </HStack>
        </Card>
      </Modal>
    </>
  );
};

export default Antrian;

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
