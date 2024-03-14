import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
  Alert,
} from 'react-native';
import React from 'react';
import {useLayout} from '../hooks';
import {navigate} from '../navigation/RootNavigation';

// icon menu
import {Icons} from '../assets/index';

const Cards = (props: any) => {
  const {width, height} = useLayout();

  const iconMap = {
    about: Icons.about,
    camera: Icons.camera,
    exit: Icons.exit,
    info: Icons.info,
    student: Icons.student,
    gallery: Icons.gallery,
  };

  const outApp = () => {
    console.log('exit btn clicked');
    Alert.alert('Warning', 'Apakah anda yakin ?', [
      {
        text: 'Kembali',
        style: 'cancel',
      },
      {text: 'Ya', onPress: () => BackHandler.exitApp()},
    ]);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          props.to === 'Exit' ? outApp() : navigate(props.to);
        }}>
        <Image
          source={iconMap[props.icon]}
          style={{width: width - 300, height: height / 10}}
          resizeMode="contain"
        />
        <Text style={styles.title_menu}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Cards;

const styles = StyleSheet.create({
  card: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.21,
    shadowRadius: 8.19,
    elevation: 11,
    backgroundColor: '#FEFCFB',
    padding: 20,
    borderRadius: 10,
  },
  title_menu: {
    fontSize: 22,
    textAlign: 'center',
    color: '#000',
    marginTop: 8,
  },
});
