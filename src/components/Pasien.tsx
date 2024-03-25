import {
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Button,
  Card,
  Datepicker,
  IndexPath,
  Input,
  Modal,
  Select,
  SelectItem,
  Text,
} from '@ui-kitten/components';
import {VStack, HStack} from '.';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createRegis as RegisService,
  detailPasien,
  updateRegis,
} from '../services/PasienService';
import {LogOut as onLogOut} from '../services/AuthService';
import {navigate} from '../navigation/RootNavigation';
import moment from 'moment';

const jkl = ['Laki-laki', 'Perempuan'];

const Pasien = () => {
  const [showModal, setShowModal] = useState(false);
  const [profilPasien, setProfilPasien] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [refreshPage, setRefreshPage] = useState(false);

  const [isRegis, setIsRegis] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<IndexPath>(
    new IndexPath(0),
  );

  const displayValue = jkl[selectedIndex.row];

  // data form
  const [noRM, setNoRM] = useState('');
  const [date, setDate] = useState(new Date());
  const [nama, setNama] = useState('');
  const [tempatLahir, setTempatLahir] = useState('');
  const [alamat, setAlamat] = useState('');
  const [telepon, setTelepon] = useState('');

  //   proses registresi
  const onRegis = async status => {
    console.log(status);
    if (nama == '' || tempatLahir == '' || telepon == '') {
      Alert.alert('Warning', 'Form tidak boleh ada yang kosong');
      return;
    }

    const user_id = await AsyncStorage.getItem('user_id');
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Menambahkan leading zero jika bulan hanya satu digit
    const day = String(date.getDate()).padStart(2, '0'); // Menambahkan leading zero jika tanggal hanya satu digit
    const formattedDate = `${year}-${month}-${day}`;

    const data = [
      nama,
      tempatLahir,
      formattedDate,
      displayValue,
      alamat,
      telepon,
      user_id,
    ];

    let res = false;

    if (status === 'create') {
      res = await RegisService(data);
    } else {
      res = await updateRegis(data, noRM);
    }
    console.log('res : ', res);
    if (res === false) {
      Alert.alert('Warning', 'Profil gagal di lengkapi');
      return;
    }

    Alert.alert('Success', 'Profil berhasil di lengkapi', [
      {
        text: 'OK',
        onPress: async () => {
          setShowModal(false);
          console.log(res?.no_rm ?? noRM);
          const detail = await detailPasien(res?.no_rm ?? noRM);

          console.log('detail : ', detail);
          console.log('detail : ', detail.data?.no_rekam_medis ?? noRM);

          await AsyncStorage.setItem(
            'no_rm',
            detail.data?.no_rekam_medis ?? noRM,
          );
          await AsyncStorage.setItem('nama', detail.data?.nama ?? nama);
          await AsyncStorage.setItem(
            'tempat_lahir',
            detail.data?.tempat_lahir ?? tempatLahir,
          );
          await AsyncStorage.setItem(
            'tgl_lahir',
            detail.data?.tgl_lahir ?? formattedDate,
          );
          await AsyncStorage.setItem('jkl', detail.data?.jkl ?? displayValue);
          await AsyncStorage.setItem('alamat', detail.data?.alamat ?? alamat);
          await AsyncStorage.setItem(
            'no_telpon',
            detail.data?.no_telpon ?? telepon,
          );

          // setNama('');
          // setAlamat('');
          // setTempatLahir('');
          // setTelepon('');
          setIsRegis(true);
        },
      },
    ]);
    return;
  };

  const onRefresh = useCallback(() => {
    console.log('refresh page');
    setRefreshPage(true);
    setProfile();
    setTimeout(() => {
      setRefreshPage(false);
    }, 1500);
  }, []);

  // update data pasien
  const setProfile = async () => {
    const no_rm = await AsyncStorage.getItem('no_rm');
    const nama_pasien = await AsyncStorage.getItem('nama');
    const tempat_lahir = await AsyncStorage.getItem('tempat_lahir');
    const tgl_lahir = await AsyncStorage.getItem('tgl_lahir');
    const jkl_pasien = await AsyncStorage.getItem('jkl');
    const alamat_pasien = await AsyncStorage.getItem('alamat');
    const no_telpon = await AsyncStorage.getItem('no_telpon');

    setProfilPasien([
      no_rm,
      nama_pasien,
      tempat_lahir,
      tgl_lahir,
      jkl_pasien,
      alamat_pasien,
      no_telpon,
    ]);

    setIsRegis(true);
  };

  useEffect(() => {
    if (isUpdate) {
      setNoRM(profilPasien[0]);
      setNama(profilPasien[1]);
      setTempatLahir(profilPasien[2]);
      setAlamat(profilPasien[5]);
      setTelepon(profilPasien[6]);
    }

    setProfile();
  }, []);

  return (
    <View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshPage} onRefresh={onRefresh} />
        }>
        <VStack itemsCenter mv={24}>
          <Text
            style={{
              textTransform: 'uppercase',
              letterSpacing: 2,
              marginBottom: 14,
            }}
            category="h2">
            Pasien
          </Text>
          {isRegis ? (
            <>
              <HStack
                style={[styles.shadow, {borderRadius: 12}]}
                level="4"
                mb={20}
                padder>
                <VStack justify="flex-start">
                  <Text category="h6">NO REKAM MEDIS </Text>
                  <Text category="h6">NAMA </Text>
                  <Text category="h6">TEMPAT/TGL LAHIR </Text>
                  <Text category="h6">JENIS KELAMIN </Text>
                  <Text category="h6">ALAMAT </Text>
                  <Text category="h6">NO TELEPON </Text>
                  {/* <Text category="h5">{profilPasien[0]}</Text>
              <Text category="h5">{profilPasien[1]}</Text> */}
                </VStack>
                <VStack justify="flex-start" ps={34}>
                  <Text category="h6">: {profilPasien[0]}</Text>
                  <Text category="h6">: {profilPasien[1]} </Text>
                  <Text category="h6">
                    : {`${profilPasien[2]} / ${profilPasien[3]}`}{' '}
                  </Text>
                  <Text category="h6">: {profilPasien[4]} </Text>
                  <Text category="h6">: {profilPasien[5]} </Text>
                  <Text category="h6">: {profilPasien[6]} </Text>
                </VStack>
              </HStack>
              <Button
                status="warning"
                onPress={() => {
                  setShowModal(true);
                  setIsUpdate(true);
                }}>
                Update Pasien
              </Button>
            </>
          ) : (
            <HStack
              style={[styles.shadow, {borderRadius: 12}]}
              level="4"
              padder
              mb={20}>
              <Text category="h6" style={{textAlign: 'center'}}>
                Harus lengkapi profil dulu{'\n'} silahkan registrasi!
              </Text>
              <Button onPress={() => setShowModal(true)}>
                Registrasi Pasien
              </Button>
            </HStack>
          )}
        </VStack>
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
              {isUpdate ? 'Update' : 'Registrasi'} Pasien
            </Text>
            {/* Nama */}
            <Input
              style={{marginBottom: 24, marginTop: 12}}
              size="large"
              placeholder="Masukkan nama lengkap"
              value={nama}
              onChangeText={v => setNama(v)}
            />

            {/* Tempat lahir */}
            <Input
              style={{marginBottom: 24}}
              size="large"
              placeholder="Masukkan tempat lahir"
              value={tempatLahir}
              onChangeText={v => setTempatLahir(v)}
            />
          </VStack>

          {/* Tanggal lahir */}
          <Datepicker
            style={{marginBottom: 24}}
            date={date}
            onSelect={v => setDate(v)}
          />

          {/* Jenis Kelamin */}
          <Select
            style={{marginBottom: 24}}
            selectedIndex={selectedIndex}
            value={displayValue}
            placeholder={'Pilih jenis kelamin'}
            onSelect={index => setSelectedIndex(index)}>
            <SelectItem title="Laki-laki" />
            <SelectItem title="Perempuan" />
          </Select>

          {/* Alamat */}
          <Input
            style={{marginBottom: 24}}
            size="large"
            placeholder="Masukkan alamat"
            value={alamat}
            onChangeText={v => setAlamat(v)}
          />

          {/* Nomor telepon */}
          <Input
            style={{marginBottom: 24}}
            size="large"
            keyboardType="numeric"
            placeholder="Masukkan nomor telepon"
            value={telepon}
            onChangeText={v => setTelepon(v)}
          />

          <HStack>
            <Button status="danger" onPress={() => setShowModal(false)}>
              Batal
            </Button>
            <Button onPress={() => onRegis(isUpdate ? 'update' : 'create')}>
              Submit
            </Button>
          </HStack>
        </Card>
      </Modal>
    </View>
  );
};

export default Pasien;

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
