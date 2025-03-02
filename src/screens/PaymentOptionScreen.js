import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ButtonComponent from '../components/ButtonComponent/ButtonComponent';

const PaymentOptionScreen = ({ navigation, route }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const { accountNumber, name, date, amount } = route.params;

// Calculate payment options based on the given amount:
// 1. 'Pay Now' with the original amount.
// 2. 'Pay in 30 days' with a 5% increment on the amount.
// 3. 'Split in 12 months' by applying a 5% increase and dividing the amount into 12 equal payments.
 const paymentOptions = [
    { id: 1, label: 'Pay Now', amount: parseFloat(amount).toFixed(2) },
    { id: 2, label: 'Pay in 30 days', amount: (parseFloat(amount) * 1.05).toFixed(2) },  
    { id: 3, label: 'Split in 12 months', amount: (parseFloat(amount) * 1.05 / 12).toFixed(2) },
  ];

  // Handle the selection of a payment option. 
// Sets the selected date and retrieves the corresponding payment amount from paymentOptions.
  const onClickSelection = (id) => {
    setSelectedDate(id);
    const selectedOption = paymentOptions.find(option => option.id === id);
    setSelectedAmount(selectedOption.amount);
  };

  // Navigate to the 'BankSignIn' screen with the selected payment details if a date is selected.
  const onClickNext = () => {
    if (selectedDate) {
      navigation.navigate('BankSignIn', {
        accountNumber,
        name,
        date,
        amount,
        selectedDate,
        selectedAmount
      });
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>When do you want to pay?</Text>
      {paymentOptions.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={[
            styles.option,
            selectedDate === option.id && styles.selectedOption,
          ]}
          onPress={() => onClickSelection(option.id)}
        >
          <Text
            style={[
              styles.optionText,
              selectedDate === option.id && styles.selectedText,
            ]}
          >
            {option.label}
          </Text>
          <Text
            style={[
              styles.amountText,
              selectedDate === option.id && styles.selectedText,
            ]}
          >
            {option.amount} kr
          </Text>
        </TouchableOpacity>
      ))}

      <ButtonComponent 
        title="NEXT" 
        onPress={onClickNext}
        disabled={!selectedDate} 
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
    paddingBottom: 40,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  option: {
    width: 'auto', 
    minWidth: 200, 
    paddingVertical: 15,  
    paddingHorizontal: 20, 
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,  
  },
  optionText: {
    fontSize: 18,
    color: '#333',
  },
  amountText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  selectedOption: {
    backgroundColor: '#4CAF50',
  },
  selectedText: {
    color: '#fff',
  },
  
});

export default PaymentOptionScreen;
