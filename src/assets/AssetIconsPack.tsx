import React from 'react';
import {Image, ImageProps, ImageSourcePropType, StyleSheet} from 'react-native';
import {IconPack, IconProvider} from '@ui-kitten/components';
import {SvgProps} from 'react-native-svg';
import {Icons} from './icon_menu/index';

const createIcon = (source: ImageSourcePropType): IconProvider<ImageProps> => {
  console.log(source);
  return {
    toReactElement: props => (
      <Image
        style={styles.icon}
        {...props}
        source={source}
        resizeMode="cover"
      />
    ),
  };
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

const AssetsIconsPack: IconPack<ImageProps | SvgProps> = {
  name: 'assets',
  icons: {
    home: createIcon(Icons.home),
    logout: createIcon(Icons.logout),
    about: createIcon(Icons.about),
    camera: createIcon(Icons.camera),
    exit: createIcon(Icons.exit),
    gallery: createIcon(Icons.gallery),
    object3D: createIcon(Icons.object3D),
    student: createIcon(Icons.student),
    showEye: createIcon(Icons.show_eye),
    hiddenEye: createIcon(Icons.hidden_eye),
  },
};

export default AssetsIconsPack;
