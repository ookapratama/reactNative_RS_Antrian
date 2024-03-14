import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {reset} from '../../navigation/RootNavigation';
import {Icons} from '../../assets';

const Splash = () => {
  useEffect(() => {
    setTimeout(() => {
      reset('Home');
    }, 3000);
  }, []);

  const iconMap = {
    splash: Icons.splash_image,
  };

  return (
    <View style={{backgroundColor: '#67AAF9', flex: 1}}>
      <Image
        style={styles.image}
        source={iconMap['splash']}
        resizeMode="contain"
      />
      <Text style={styles.text}>Nature Explorer</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  image: {
    width: '70%',
    height: '40%',
    alignSelf: 'center',
    marginTop: '40%',
  },
  text: {
    fontSize: 40,
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: 4,
    color: '#EBE9E9',
  },
});
