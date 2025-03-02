import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';

//Reusable button component that displays a loading spinner
const ButtonComponent = ({ title, onPress, disabled, loading,style }) => {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      disabled={disabled} 
      style={[styles.button, disabled && styles.disabledButton, style]}>
      {loading ? (
        <ActivityIndicator size="small" color="#ffffff" testID="loading-spinner"/> 
      ) : (
        <Text style={styles.buttonText}>{title}</Text> 
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginVertical: 10,
  },
  disabledButton: {
    backgroundColor: '#9E9E9E', 
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ButtonComponent;



