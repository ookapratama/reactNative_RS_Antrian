import {View, Image, StyleSheet, Alert} from 'react-native';
import React, {useState} from 'react';
import {Container, HStack, IconNavigation, VStack} from '../../components';
import {Text} from '@ui-kitten/components';
import {LogOut} from '../../services/AuthService';
import {navigate} from '../../navigation/RootNavigation';

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
          console.log(status);
          Alert.alert('Success', 'Berhasil Logout');
          navigate('SignIn');
        } else Alert.alert('Warning', 'Terjadi kesalahan saat Logout');
      },
    },
  ]);
};

const Home = () => {
  const [activePasien, setActivePasien] = useState(true);
  const [activeAntrian, setActiveAntrian] = useState(false);

  const handleActvieMenu = (menuName: string) => {
    if (menuName == 'Pasien') {
      setActivePasien(true);
      setActiveAntrian(false);
    } else if (menuName == 'Antrian') {
      setActiveAntrian(true);
      setActivePasien(false);
    }
  };

  return (
    <Container level="1">
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
            [styles.menu, {color: activePasien ? 'black' : 'grey'}],
            {marginRight: 24},
          ]}
          onPress={() => handleActvieMenu('Pasien')}>
          Pasien
        </Text>
        <Text
          style={[styles.menu, {color: activeAntrian ? 'black' : 'grey'}]}
          onPress={() => handleActvieMenu('Antrian')}>
          Antrian
        </Text>
      </HStack>
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({
  menu: {
    fontSize: 16,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
