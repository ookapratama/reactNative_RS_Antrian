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
  Divider,
  IndexPath,
  Input,
  Modal,
  Select,
  SelectItem,
  Spinner,
  Text,
} from '@ui-kitten/components';
import {VStack, HStack, HistoryAntrian} from '.';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createRegis as RegisService,
  detailPasien,
  updateRegis,
} from '../services/PasienService';
import {LogOut as onLogOut} from '../services/AuthService';
import {navigate} from '../navigation/RootNavigation';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';

const jkl = ['Laki-laki', 'Perempuan'];

const Pasien = () => {
  const [showModal, setShowModal] = useState(false);
  const [profilPasien, setProfilPasien] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [refreshPage, setRefreshPage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [isRegis, setIsRegis] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<IndexPath>(
    new IndexPath(0),
  );

  const displayValue = jkl[selectedIndex.row];

  // data form
  const [noRM, setNoRM] = useState('');
  const [date, setDate] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);
  const [nama, setNama] = useState('');
  const [tempatLahir, setTempatLahir] = useState('');
  const [alamat, setAlamat] = useState('');
  const [telepon, setTelepon] = useState('');

  const [tglUpdate, setTglUpdate] = useState('');
  // const updateTgllahir = () => {
  //   console.log(date);
  //   const year = date.getFullYear();
  //   const month = String(date.getMonth() + 1).padStart(2, '0');
  //   const day = String(date.getDate()).padStart(2, '0');
  //   const tgl_lahir_update = `${day}/${month}/${year}`;
  //   console.log(tgl_lahir_update);
  //   setTglUpdate(tgl_lahir_update);
  // };

  //   proses registresi
  const onRegis = async () => {
    if (nama === '' || tempatLahir === '' || telepon === '') {
      Alert.alert('Warning', 'Form tidak boleh ada yang kosong');
      return;
    }

    const user_id = await AsyncStorage.getItem('user_id');
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${day}/${month}/${year}`;

    const data = [
      nama,
      tempatLahir,
      formattedDate,
      displayValue,
      alamat,
      telepon,
      user_id,
    ];

    console.log(data[2]);

    console.log('create');
    const res = await RegisService(data);

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

          console.log('adakah : ', res.no_rm);
          const detail = await detailPasien(profilPasien[0]);
          console.log('detail : ', detail);
          console.log('detail rm : ', detail.data?.no_rekam_medis ?? res.no_rm);

          await AsyncStorage.setItem(
            'no_rm',
            detail.data?.no_rekam_medis ?? res.no_rm,
          );
          await AsyncStorage.setItem('nama', nama);
          await AsyncStorage.setItem('tempat_lahir', tempatLahir);
          await AsyncStorage.setItem('tgl_lahir', formattedDate);
          await AsyncStorage.setItem('jkl', displayValue);
          await AsyncStorage.setItem('alamat', alamat);
          await AsyncStorage.setItem('no_telpon', telepon);

          // setNama('');
          // setAlamat('');
          // setTempatLahir('');
          // setTelepon('');
          onRefresh();
          setIsRegis(true);
        },
      },
    ]);
    return;
  };

  const updateProfile = async () => {
    if (nama === '' || tempatLahir === '' || telepon === '') {
      Alert.alert('Warning', 'Form tidak boleh ada yang kosong');
      return;
    }

    const user_id = await AsyncStorage.getItem('user_id');
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${day}/${month}/${year}`;
    const no_rm = await AsyncStorage.getItem('no_rm');

    const data = [
      nama,
      tempatLahir,
      formattedDate,
      displayValue,
      alamat,
      telepon,
      user_id,
    ];

    console.log('update');
    const res = await updateRegis(data, no_rm);

    console.log('res : ', res);
    if (res === false) {
      Alert.alert('Warning', 'Profil gagal di lengkapi');
      return;
    }

    Alert.alert('Success', 'Profil berhasil di update', [
      {
        text: 'OK',
        onPress: async () => {
          setShowModal(false);

          // console.log('adakah : ', res.no_rm);
          const detail = await detailPasien(profilPasien[0]);
          console.log('detail : ', detail);
          // console.log('detail rm : ', detail.data?.no_rekam_medis ?? res.no_rm);

          // await AsyncStorage.setItem(
          //   'no_rm',
          //   detail.data?.no_rekam_medis
          // );
          // await AsyncStorage.setItem('nama', nama);
          // await AsyncStorage.setItem('tempat_lahir', tempatLahir);
          // await AsyncStorage.setItem('tgl_lahir', formattedDate);
          // await AsyncStorage.setItem('jkl', displayValue);
          // await AsyncStorage.setItem('alamat', alamat);
          // await AsyncStorage.setItem('no_telpon', telepon);

          // setNama('');
          // setAlamat('');
          // setTempatLahir('');
          // setTelepon('');
          onRefresh();
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

  // set data pasien
  const setProfile = async () => {
    const no_rm = await AsyncStorage.getItem('no_rm');
    const detail = await detailPasien(no_rm);

    console.log('set :', detail);
    const res = detail.data;

    if (detail.message === 'data tidak di temukan') {
      setIsRegis(false);
      return;
    } else {
      console.log(no_rm);
      console.log(res);
      setProfilPasien([
        res?.no_rekam_medis,
        res?.nama,
        res?.tempat_lahir,
        moment(res?.tgl_lahir).format('DD/MM/YYYY'),
        res?.jkl,
        res?.alamat,
        res?.no_telpon,
      ]);

      setIsRegis(true);
    }
  };

  useEffect(() => {
    console.log('use effect : ', isUpdate);
    setTimeout(() => {
      setProfile();
      if (!isUpdate) {
        setNoRM(profilPasien[0]);
        setNama(profilPasien[1]);
        setTempatLahir(profilPasien[2]);
        setAlamat(profilPasien[5]);
        setTelepon(profilPasien[6]);
      }
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <View style={{flex: 1}}>
      {isLoading ? (
        <HStack justify="center" mv={160}>
          <Spinner size="giant" />
        </HStack>
      ) : (
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
                    <Text style={styles.infoPasien}>NO REKAM MEDIS </Text>
                    <Text style={styles.infoPasien}>NAMA </Text>
                    <Text style={styles.infoPasien}>TEMPAT LAHIR </Text>
                    <Text style={styles.infoPasien}>TGL LAHIR </Text>
                    <Text style={styles.infoPasien}>JENIS KELAMIN </Text>
                    <Text style={styles.infoPasien}>ALAMAT </Text>
                    <Text style={styles.infoPasien}>NO TELEPON </Text>
                    {/* <Text style={styles.infoPasien} >{profilPasien[0]}</Text>
              <Text style={styles.infoPasien} >{profilPasien[1]}</Text> */}
                  </VStack>
                  <VStack justify="flex-start" ps={34}>
                    <Text style={styles.infoPasien}>: {profilPasien[0]}</Text>
                    <Text style={styles.infoPasien}>: {profilPasien[1]} </Text>
                    <Text style={styles.infoPasien}>: {profilPasien[2]}</Text>
                    <Text style={styles.infoPasien}>: {profilPasien[3]} </Text>
                    <Text style={styles.infoPasien}>: {profilPasien[4]} </Text>
                    <Text style={styles.infoPasien}>: {profilPasien[5]} </Text>
                    <Text style={styles.infoPasien}>: {profilPasien[6]} </Text>
                  </VStack>
                </HStack>
                <Button
                  status="warning"
                  onPress={() => {
                    setShowModal(true);
                    setIsUpdate(true);
                    setTimeout(() => {
                      setProfile();
                      if (isUpdate) {
                        setNoRM(profilPasien[0]);
                        setNama(profilPasien[1]);
                        setTempatLahir(profilPasien[2]);
                        setAlamat(profilPasien[5]);
                        setTelepon(profilPasien[6]);
                      }
                    }, 500);
                  }}>
                  Update Pasien
                </Button>
              </>
            ) : (
              <>
                <VStack
                  style={[styles.shadow, {borderRadius: 12}]}
                  level="4"
                  padder
                  mb={20}>
                  <Text category="h6" style={{textAlign: 'center'}}>
                    Harus lengkapi profil dulu{'\n'} silahkan registrasi!
                  </Text>
                </VStack>
                <Button
                  onPress={() => {
                    setShowModal(true);
                    setIsUpdate(false);
                  }}>
                  Registrasi Pasien
                </Button>
              </>
            )}
          </VStack>

          {/* List History antrian */}
          <Divider />
        </ScrollView>
      )}

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
          <Button onPress={() => setOpenDate(true)}>Pilih tanggal lahir</Button>
          <DatePicker
            modal
            mode="date"
            locale="id"
            open={openDate}
            date={date}
            onDateChange={setDate}
            onConfirm={date => {
              console.log('confirm date: ', date);
              setOpenDate(false);
              setDate(date);

              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, '0');
              const day = String(date.getDate()).padStart(2, '0');
              const tgl_lahir_update = `${day}/${month}/${year}`;
              setTglUpdate(tgl_lahir_update);
            }}
            onCancel={() => {
              setOpenDate(false);
            }}
          />
          <Input
            style={{marginBottom: 6, marginTop: 24, color: 'black'}}
            size="large"
            keyboardType="numeric"
            placeholder="Klik button tanggal lahir"
            value={tglUpdate ? tglUpdate : profilPasien[3]}
          />

          {/* Jenis Kelamin */}
          <Select
            style={{marginBottom: 24, marginTop: 12}}
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
            <Button onPress={() => (isUpdate ? updateProfile() : onRegis())}>
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
  infoPasien: {
    fontSize: 16,
    fontWeight: 'bold',
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
