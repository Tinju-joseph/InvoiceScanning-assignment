import React,{useEffect,createRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home/HomeScreen';
import BankIDSignInScreen from '../screens/BankIDSignInScreen';
import PaymentOptionScreen from '../screens/PaymentOptionScreen';
import PaymentDoneScreen from '../screens/PaymentDoneScreen';
import ScanImageScreen from '../screens/ScanImageScreen';
import { BackHandler, AppState, Alert } from 'react-native';


const Stack = createNativeStackNavigator();

const RootNavigation = () => {

  useEffect(() => {
    // Back button handler: Triggers an alert when the device back button is pressed.
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
     Alert.alert('Are you Sure?', 'Do you want to exit?', [
        { text: 'No', onPress: () => null, style: 'cancel' },
        { text: 'Yes', onPress: () => BackHandler.exitApp() },
      ]);
      return true;  
    });

    // App state listener: Detects when the app moves to the foreground (active state).
    const appStateListener = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        // Reset the navigation stack to the 'Home' screen when the app comes to the foreground
        navigationRef.current?.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      }
    });

    
    return () => {
      backHandler.remove();
      appStateListener.remove();
    };
  }, []);

  const navigationRef = createRef();

  return (
  
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen}  />
        <Stack.Screen name="Scan" component={ScanImageScreen}  />
        <Stack.Screen name="Payment" component={PaymentOptionScreen}  />
        <Stack.Screen name="BankSignIn" component={BankIDSignInScreen}  />
        <Stack.Screen name="PayDone" component={PaymentDoneScreen}  />
      </Stack.Navigator>
    </NavigationContainer>
   
  );

};
export default RootNavigation