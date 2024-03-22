import {View, Image, StyleSheet} from 'react-native';
import React from 'react';
import {Container, HStack, IconNavigation, VStack} from '../../components';
import {Text} from '@ui-kitten/components';

const Home = () => {
  return (
    <Container level="1">
      <HStack level="4" padding={24} itemsCenter>
        <Text style={{fontSize: 50, fontWeight: '700', color: 'black'}}>
          Home
        </Text>
        <IconNavigation
          iconName={'logout'}
          width={40}
          onPress={() => console.log('buat logout')}
          marginTop={10}
        />
      </HStack>
      <HStack level="4" ph={24} pv={24} justify="flex-start" itemsCenter>
        <Text
          style={[styles.menu, {marginRight: 24}]}
          onPress={() => console.log('menu pasien')}>
          Pasien
        </Text>
        <Text style={styles.menu} onPress={() => console.log('menu antrian')}>
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
