import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';


const PaymentDoneScreen = ({ navigation }) => {
 

  return (
    <View style={styles.mainContainer}>
      <Image
        source={require('../assets/done.png')} 
        style={styles.successImage}
        resizeMode="contain"
      />
      <Text style={styles.title}>Payment Successful!</Text>
      <Text style={styles.subtitle}>Your payment has been processed successfully.</Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
  },
  successImage: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
  },
 
});

export default PaymentDoneScreen;

