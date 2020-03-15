import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

const CustomButton = ({label, onPress = () => {}}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
