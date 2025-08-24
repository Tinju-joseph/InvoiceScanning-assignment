import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';

const HomeScreen = ({navigation}) => {
  const onScanClick = () => {
    console.log('scan invoice');
    navigation.navigate('Scan');
  };

  return (
    <View style={styles.mainContainer}>
      <ButtonComponent title="Take Picture of Invoice" onPress={onScanClick} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ECFFDC',
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 80,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#333',
    fontWeight: 'bold',
    position: 'absolute',
    top: 70,
  },
});

export default HomeScreen;
