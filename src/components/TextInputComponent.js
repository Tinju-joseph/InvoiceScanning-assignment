import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

//Reusable input field component
const TextInputComponent = ({ 
  placeholder, 
  value, 
  maxLength,
  onChangeText, 
  keyboardType = 'default', 
  style = {} 
}) => {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      maxLength={maxLength}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
});

export default TextInputComponent;
