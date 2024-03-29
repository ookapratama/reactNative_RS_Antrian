import {
  View,
  Image,
  StyleSheet,
  Alert,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {
  Container,
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

  const [activeAntrian, setActiveAntrian] = useState(true);
  const [activePasien, setActivePasien] = useState(false);
  const [activeRiwayat, setActiveRiwayat] = useState(false);

  const handleActvieMenu = (menuName: string) => {
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
  };

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

      {/* Navigation Antrain dan Pasien */}

      {activeAntrian ? (
        <Antrian />
      ) : activePasien ? (
        <Pasien />
      ) : (
        <HistoryAntrian />
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
