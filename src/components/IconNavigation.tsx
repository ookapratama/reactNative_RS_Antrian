import React, {memo} from 'react';
import {Icons} from '../assets/icon_menu';
import {Image, StyleSheet, TouchableOpacity, ViewProps} from 'react-native';

export interface IconNavigationProps extends ViewProps {
  width?: number;
  iconName?: string;
  onPress?: () => void;
  margin?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  marginTop?: number;
  marginBottom?: number;
  marginRight?: number;
  marginLeft?: number;
}

const icons = (name: string) => {
  switch (name) {
    case 'about':
      return require('../assets/icon_menu/about.png');
    case 'camera':
      return require('../assets/icon_menu/camera.png');
    case 'exit':
      return require('../assets/icon_menu/exit-door.png');
    case 'gallery':
      return require('../assets/icon_menu/gallery.png');
    case 'info':
      return require('../assets/icon_menu/info.png');
    case 'student':
      return require('../assets/icon_menu/student.png');
    case 'object3D':
      return require('../assets/icon_menu/3d.png');
    case 'show_eye':
      return require('../assets/icon_menu/eye.png');
    case 'hidden_eye':
      return require('../assets/icon_menu/hidden_eye.png');
    case 'logout':
      return require('../assets/icon_menu/logout.png');
    default:
      return require('../assets/icon_menu/home.png');
  }
};

const IconNavigation: React.FC<IconNavigationProps> = memo(
  ({
    width = 24,
    iconName = 'home',
    onPress,
    margin,
    marginHorizontal,
    marginVertical,
    marginTop,
    marginBottom,
    marginRight,
    marginLeft,
    ...props
  }: IconNavigationProps) => {
    const source = icons(iconName);
    console.log(icons(iconName));
    return (
      <TouchableOpacity onPress={onPress} {...props}>
        <Image
          source={source}
          style={[
            styles.container,
            {
              width: width,
              height: width,
              margin: margin,
              marginHorizontal: marginHorizontal,
              marginVertical: marginVertical,
              marginTop: marginTop,
              marginBottom: marginBottom,
              marginRight: marginRight,
              marginLeft: marginLeft,
            },
          ]}
        />
      </TouchableOpacity>
    );
  },
);

export default IconNavigation;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
