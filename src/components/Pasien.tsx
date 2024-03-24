import {Alert, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
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
import {createRegis as RegisService} from '../services/PasienService';
import {LogOut as onLogOut} from '../services/AuthService';
import {navigate} from '../navigation/RootNavigation';

const jkl = ['Laki-laki', 'Perempuan'];

const Pasien = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<IndexPath>(
    new IndexPath(0),
  );

  const displayValue = jkl[selectedIndex.row];

  // data form
  const [date, setDate] = useState(new Date());
  const [nama, setNama] = useState('');
  const [tempatLahir, setTempatLahir] = useState('');
  const [alamat, setAlamat] = useState('');
  const [telepon, setTelepon] = useState('');

  //   proses registresi
  const onRegis = async () => {
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
      telepon,
      user_id,
    ];

    const res = await RegisService(data);
    if (res === false) {
      Alert.alert('Warning', 'Profil gagal di lengkapi');
      return;
    }

    Alert.alert('Success', 'Profil berhasil di lengkapi', [
      {
        text: 'OK',
        onPress: async () => {
          Alert.alert('Message', 'Silahkan login kembali');
          const status = await onLogOut();

          if (status) {
            // console.log(status);
            navigate('SignIn');
          } else Alert.alert('Warning', 'Terjadi kesalahan saat Logout');
        },
      },
    ]);
    return;
  };

  return (
    <View>
      <VStack itemsCenter mv={24}>
        <Text
          style={{
            textTransform: 'uppercase',
            letterSpacing: 2,
            marginBottom: 24,
          }}
          category="h2">
          Pasien
        </Text>
        <Button onPress={() => setShowModal(true)}>Registrasi Pasien</Button>
      </VStack>

      {/* Form Modal */}
      <Modal
        style={{width: '80%'}}
        visible={showModal}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setShowModal(false)}>
        <Card disabled={true}>
          <VStack>
            <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 20}}>
              Registrasi Pasien
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
            <Button onPress={() => onRegis()}>Submit</Button>
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
});
