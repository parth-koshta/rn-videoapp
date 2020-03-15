import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

const CustomButton = ({label, onPress = () => {}}, style, labelStyle) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.wrapper, style]}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
