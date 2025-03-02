import React,{useState} from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
import ButtonComponent from '../components/ButtonComponent/ButtonComponent';
import { signInWithBankID } from '../api/SignInValidationCheck';  


const BankIDSignInScreen = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const { accountNumber, name, date, amount,selectedDate,selectedAmount } = route.params;
  
  // Handles the sign-in process by submitting the scanned data to the signInWithBankID function.
  const onClickSignIn = async () => {
    setLoading(true);
    const scannedData = { accountNumber,
          name,
          date,
          amount,
          selectedDate,
          selectedAmount, };
    const { success, message } = await signInWithBankID(scannedData);
    
    if (success) {
      navigation.navigate('PayDone');
    } else {
      Alert.alert('Error', message);
    }
     setLoading(false);
  };

  return (
    <View style={styles.mainContainer}>
     <Image
        source={require('../assets/BankID_logo.png')} 
        style={styles.logo}
        resizeMode="contain"
      />


      <ButtonComponent 
        title="SIGN IN" 
        onPress={onClickSignIn} 
        disabled={loading}
        loading={loading}   
      />
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
  logo: {
    width: 350,
    height: 350,
    marginBottom: 30,
  },
  
  
});

export default BankIDSignInScreen;
