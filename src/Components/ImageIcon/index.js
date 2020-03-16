import React from 'react';
import {Image} from 'react-native';
import styles from './styles';

const ImageIcon = ({source, size, style, resizeMode = 'contain'}) => {
  return (
    <Image
      source={source}
      resizeMode={resizeMode}
      style={[styles.image, size && {width: size, height: size}, style]}
    />
  );
};

export default ImageIcon;
