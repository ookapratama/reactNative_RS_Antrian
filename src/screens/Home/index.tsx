import {
  View,
  Image,
  StyleSheet,
  Alert,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  AntrianDokter,
  Container,
  DaftarPasien,
  HStack,
  HistoryAntrian,
  IDivider,
  IconNavigation,
  Pasien,
  VStack,
} from '../../components';
import {Button, StyleService, Text, useStyleSheet} from '@ui-kitten/components';
import {LogOut} from '../../services/AuthService';
import {navigate} from '../../navigation/RootNavigation';
import Antrian from '../../components/Antrian';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {getDate} from '../../services/DateService';
require('moment/locale/id');

const onLogOut = () => {
  Alert.alert('Warning', 'Ingin Logout Akun? ', [
    {
      text: 'Batal',
      style: 'cancel',
    },
    {
      text: 'YA',
      onPress: async () => {
        const status = await LogOut();
        if (status) {
          // console.log(status);
          Alert.alert('Success', 'Berhasil Logout');
          navigate('SignIn');
        } else Alert.alert('Warning', 'Terjadi kesalahan saat Logout');
      },
    },
  ]);
};

const Home = () => {
  const styles = useStyleSheet(themedStyles);

  const [role, setRole] = useState('');
  const [activeAntrian, setActiveAntrian] = useState(true);
  const [activePasien, setActivePasien] = useState(false);
  const [activeRiwayat, setActiveRiwayat] = useState(false);

  // untuk role dokter
  const [activeAntrianDokter, setActiveAntrianDokter] = useState(true);
  const [activeDaftarPasien, setActiveDaftarPasien] = useState(false);

  // getDate
  const [dateActive, setDateActive] = useState([]);
  const lagiBuka =
    dateActive.hari === 'Minggu'
      ? `, Apotek sedang ${dateActive.jam_buka}`
      : `, terbuka dari ${dateActive?.jam_buka ?? ''} - ${
          dateActive?.jam_tutup ?? ''
        } WIT`;

  const dokterHariIni = dateActive?.dokter?.map(i => i.nama + ' | ') || [];
  // const dokterHariIni = ' '

  const getToday = async () => {
    try {
      const getData = await getDate(moment().format('dddd'));
      setDateActive(getData.data);
      console.log(getData.data.dokter);
    } catch (error) {
      console.log(error);
    }
  };

  const handleActvieMenu = (menuName: string) => {
    if (role === 'D') {
      if (menuName === 'Antrian Dokter') {
        setActiveAntrianDokter(true);
        setActiveDaftarPasien(false);
      } else if (menuName === 'Daftar Pasien') {
        setActiveAntrianDokter(false);
        setActiveDaftarPasien(true);
      }
    } else {
      if (menuName === 'Pasien') {
        setActivePasien(true);
        setActiveAntrian(false);
        setActiveRiwayat(false);
      } else if (menuName === 'Antrian') {
        setActiveAntrian(true);
        setActivePasien(false);
        setActiveRiwayat(false);
      } else if (menuName === 'Riwayat') {
        setActiveAntrian(false);
        setActivePasien(false);
        setActiveRiwayat(true);
      }
    }
  };

  const getLevel = async () => {
    const level = await AsyncStorage.getItem('level');
    // console.log(level);
    setRole(level);
  };

  useEffect(() => {
    getLevel();
    getToday();
  }, []);

  return (
    <View style={styles.container}>
      <HStack level="4" padding={24} itemsCenter>
        <Text style={{fontSize: 50, fontWeight: '700', color: 'black'}}>
          Home
        </Text>

        <IconNavigation
          iconName={'logout'}
          width={40}
          onPress={() => onLogOut()}
          marginTop={10}
        />
      </HStack>

      <HStack ph={24} mt={-15} level="4">
        <Text category="h6">
          Selamat Datang {role === 'D' ? ', Dokter' : ''}
        </Text>
      </HStack>

      {role === 'D' ? (
        <HStack level="4" ph={24} pv={24} justify="flex-start" itemsCenter>
          <Text
            style={[
              styles.menu,
              {color: activeAntrianDokter ? 'black' : 'grey', marginRight: 24},
            ]}
            onPress={() => handleActvieMenu('Antrian Dokter')}>
            Antrian
          </Text>
          <Text
            style={[
              [
                styles.menu,
                {color: activeDaftarPasien ? 'black' : 'grey', marginRight: 24},
              ],
            ]}
            onPress={() => handleActvieMenu('Daftar Pasien')}>
            Daftar Pasien
          </Text>
        </HStack>
      ) : (
        <HStack level="4" ph={24} pv={24} justify="flex-start" itemsCenter>
          <Text
            style={[
              styles.menu,
              {color: activeAntrian ? 'black' : 'grey', marginRight: 24},
            ]}
            onPress={() => handleActvieMenu('Antrian')}>
            Antrian
          </Text>
          <Text
            style={[
              [
                styles.menu,
                {color: activePasien ? 'black' : 'grey', marginRight: 24},
              ],
            ]}
            onPress={() => handleActvieMenu('Pasien')}>
            Pasien
          </Text>
          <Text
            style={[[styles.menu, {color: activeRiwayat ? 'black' : 'grey'}]]}
            onPress={() => handleActvieMenu('Riwayat')}>
            Riwayat
          </Text>
        </HStack>
      )}

      {/* Information */}
      <VStack ps={12} pv={10} style={{backgroundColor: '#446DF6'}}>
        <Text style={{color: 'white'}}>
          Ini hari {`${dateActive.hari}${lagiBuka}`}
        </Text>
        <Text style={{color: 'white', paddingTop: 5}}>
          Dokter hari ini : {dokterHariIni}
        </Text>
      </VStack>

      {/* Navigation Antrain dan Pasien */}
      {role === 'D' ? (
        <>{activeAntrianDokter ? <AntrianDokter /> : <DaftarPasien />}</>
      ) : (
        <>
          {activeAntrian ? (
            <Antrian />
          ) : activePasien ? (
            <Pasien />
          ) : (
            <HistoryAntrian />
          )}
        </>
      )}
    </View>
  );
};

export default Home;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 0,
    paddingBottom: 0,
  },
  menu: {
    fontSize: 16,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
