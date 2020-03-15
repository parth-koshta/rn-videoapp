import React from 'react';
import {View, TextInput, Text} from 'react-native';
import styles from './styles';
import { Colors } from '../../Theme';

const CustomInput = React.forwardRef(
  (
    {
      value,
      onChangeText,
      maxLength,
      label,
      returnKeyType,
      onSubmitEditing,
      accessoryViewId,
      autoCapitalize,
      multiline = false,
    },
    ref,
  ) => {
    return (
      <View style={styles.container}>
        <TextInput
          ref={ref}
          selectionColor={Colors.RED}
          accessoryViewId={accessoryViewId}
          value={value}
          onChangeText={onChangeText}
          maxLength={maxLength}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          autoCapitalize={autoCapitalize}
          numberOfLines={1}
          style={styles.input}
          multiline={multiline}
        />
        <View style={styles.placeholderWrapper}>
          <Text style={styles.label}>{label}</Text>
        </View>
      </View>
    );
  },
);

export default CustomInput;
