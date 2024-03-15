import {Image, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {reset} from '../../navigation/RootNavigation';
import {Icons} from '../../assets';
import {Container, VStack} from '../../components';

const Splash = () => {
  useEffect(() => {
    setTimeout(() => {
      reset('SignIn');
    }, 3000);
  }, []);

  const iconMap = {
    splash: Icons.splash_image,
  };

  return (
    <Container level="1">
      <VStack itemsCenter>
        <Image
          style={styles.image}
          source={iconMap['splash']}
          resizeMode="contain"
        />
      </VStack>
    </Container>
  );
};

export default Splash;

const styles = StyleSheet.create({
  image: {
    width: '70%',
    // height: '40%',
    marginTop: '40%',
  },
  // text: {
  //   fontSize: 40,
  //   fontWeight: '500',
  //   textAlign: 'center',
  //   letterSpacing: 3,
  //   color: '#EBE9E9',
  // },
});
