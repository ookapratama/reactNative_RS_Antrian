import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useLayout} from '../hooks';
import {HStack} from '.';
import {Icons} from '../assets';

const Nav = (props: any) => {
  const {width, height} = useLayout();
  const iconMap = {
    splash: Icons.splash_image,
  };
  
  return (
    <HStack
      style={[styles.nav, {backgroundColor: '#67AAF9'}]}
      pe={20}
      pv={30}
      justify="space-around">
      <Image
        style={{width: width - 300, height: height / 10}}
        source={iconMap['splash']}
        resizeMode="contain"
      />
      <Text style={styles.text_nav}>{props.title}</Text>
    </HStack>
  );
};

export default Nav;

const styles = StyleSheet.create({
  nav: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 18,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20.0,
    elevation: 24,
  },
  text_nav: {
    fontSize: 28,
    fontWeight: '500',
    textAlign: 'center',
    alignSelf: 'center',
    color: '#000',
  },
});
