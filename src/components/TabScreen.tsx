import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Antrian from './Antrian';
import Pasien from './Pasien';


const TabScreen = () => {
  return (
    <View style={{flex: 1}}>
        <Tab.Navigator>
          <Tab.Screen name="Antrian" component={Antrian} />
          <Tab.Screen name="Pasien" component={Pasien} />
        </Tab.Navigator>
    </View>
  );
};

export default TabScreen;

const styles = StyleSheet.create({});
