import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator,Platform } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import ButtonComponent from '../components/ButtonComponent/ButtonComponent';
import TextInputComponent from '../components/TextInputComponent';

const ScanImageScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [deviceFound, setDeviceFound] = useState(null);
  const [detectText, setDetectText] = useState('');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [date, setDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [photoCaptured, setPhotoCaptured] = useState(false);

  const cameraRef = useRef(null);
  const devices = useCameraDevices();

  useEffect(() => {

    // Function to check and request camera and storage permissions based on the platform
    const checkPermissions = async () => {
      let cameraPermission, storagePermission;

      if (Platform.OS === 'android') {
        cameraPermission = await request(PERMISSIONS.ANDROID.CAMERA);
        storagePermission = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      } else if (Platform.OS === 'ios') {
        cameraPermission = await request(PERMISSIONS.IOS.CAMERA);
        storagePermission = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
      }
if (cameraPermission === RESULTS.GRANTED && storagePermission === RESULTS.GRANTED) {
        setHasPermission(true);
      } else {
        Alert.alert('Permission Denied', 'Camera and storage permissions are required to use this feature.');
      }
    };

    checkPermissions();
  }, []);

  
// Monitor device changes and set the back-facing camera if available
  useEffect(() => {
    if (devices && Array.isArray(devices) && devices.length > 0) {
      const backCamera = devices.find((cam) => cam.position === 'back');
      if (backCamera) {
        setDeviceFound(backCamera);
      }
    }
  }, [devices]);


  // Captures a photo using the camera, processes the image, and extracts text.
  const onClickCapturePhoto = async () => {
    if (cameraRef.current) {
      try {
        setIsLoading(true);
        const photo = await cameraRef.current.takePhoto({
          qualityPrioritization: 'quality',
        });
        const imageUri = photo?.path || photo?.uri;
        if (imageUri) {
          const editedUri = `file://${imageUri}`;
          processImageForTextDetection(editedUri);
        } else {
          Alert.alert('Error', 'Photo URI is invalid.');
        }
      } catch (error) {
       
        Alert.alert('Error', 'Failed to capture photo.');
      }
    }
  };

  //extract specific information from a given text based on a keyword
  const extractDataFromImage = (text, keyword) => {
    const parts = text.split(new RegExp(`${keyword}[:\\s]+`, 'i'));
    if (parts.length > 1) {
      return parts[1].split(/\n|,/)[0].trim();
    }
    return '';
  };

  // Process Image for Text Recognition
  const processImageForTextDetection = async (imgUri) => {
    try {
      const detectedResult = await TextRecognition.recognize(imgUri);
      
      setIsLoading(false);
      if (detectedResult && detectedResult.text.length > 0) {
        setDetectText(detectedResult.text);


      //extract specific pieces of information (account number,name,date,amount)
        let accountNumberExtracted = extractDataFromImage(detectedResult.text, 'Account Number');
        let nameExtracted = extractDataFromImage(detectedResult.text, 'Name');
        let dateExtracted = extractDataFromImage(detectedResult.text, 'Date');
        let amountExtracted = extractDataFromImage(detectedResult.text, 'Amount');

        setAccountNumber(accountNumberExtracted);
        setName(nameExtracted);
        setDate(dateExtracted);
        setAmount(amountExtracted);

        //find missing fields and alert to the user
        let missingFields = [];
        if (!accountNumberExtracted) missingFields.push('Account Number');
        if (!nameExtracted) missingFields.push('Name');
        if (!dateExtracted) missingFields.push('Date');
        if (!amountExtracted) missingFields.push('Amount');

      // Validate that the name contains only letters and spaces
        const isNameValid = /^[A-Za-z\s]+$/.test(nameExtracted);
        if (nameExtracted && !isNameValid) {
          Alert.alert('Invalid Name', 'The name should only contain alphabets. Please check your input.');
          return;
        }

 // Validate that the amount contains only numeric values (integer or decimal)
        const isAmountValid = /^[0-9]+(\.[0-9]{1,2})?$/.test(amountExtracted); 
        if (amountExtracted && !isAmountValid) {
          Alert.alert('Invalid Amount', 'The amount should only contain numbers. Please check your input.');
          return;
        }

        // Validate that the account number contains only digits (no letters or special characters)
        const isAccountNumberValid = /^[0-9]+$/.test(accountNumberExtracted);
        if (accountNumberExtracted && !isAccountNumberValid) {
          Alert.alert('Invalid Account Number', 'The account number should only contain digits. Please check your input.');
          return;
        }

        // Validate that the date follows the DD-MM-YYYY format (day-month-year)
// Ensures the day is between 01-31, the month is between 01-12, and the year has four digits
        const isDateValid = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/.test(dateExtracted);
        if (dateExtracted && !isDateValid) {
          Alert.alert('Invalid Date', 'The date should be in the format DD-MM-YYYY. Please check your input.');
          return;
        }


        // Check for missing fields or text recognition issues, and alert the user accordingly. 
// Handle any errors during text recognition process and provide feedback to the user.

        if (missingFields.length > 0) {
          Alert.alert(
            'Missing Information',
            `Missing Fields: ${missingFields.join(', ')} \n\nPlease ensure all information is visible and legible.\n\nTry again...`,
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
          );
        }
      } else {
        Alert.alert('No Text Found', 'No text recognized in the image.');
      }
    } catch (error) {
     
      Alert.alert('Error', 'Failed to recognize text from the image.');
      setIsLoading(false); 
    }
  };


  // Check if all fields are filled and valid 
  const allFieldsValid =
    name &&
    /^[A-Za-z\s]+$/.test(name) &&  
    accountNumber &&
    /^[0-9]+$/.test(accountNumber) &&  
    date &&
    /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/.test(date) &&  
    amount &&
    /^[0-9]+(\.[0-9]{1,2})?$/.test(amount);  




// The "Confirm" button is rendered only if text detection is successful (detectText is true) 
// and all required fields are valid (allFieldsValid is true).

// Show a confirmation alert with the details entered by the user. 
// If confirmed, navigate to the 'Payment' screen and pass the relevant data.
  const onClickConfirm = () => {
    Alert.alert(
      'Please Confirm Details',
      `Name: ${name}\nAccount Number: ${accountNumber}\nAmount: ${amount}\nDate: ${date}`,
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Payment', {
            accountNumber,
            name,
            date,
            amount
          }),
        },
      ]
    );
  };

  
  return (
    <View style={styles.mainContainer}>
      <View style={styles.cameraContainer}>
        {!deviceFound && <ActivityIndicator size="large" color="#0000ff" />}
        {deviceFound && (
          <Camera
            ref={cameraRef}
            style={styles.camera}
            device={deviceFound}
            isActive={isCameraActive}
            photo={true}
          />
        )}
      </View>

      <Text style={styles.instructionText}>Ensure the camera is focused and click to capture</Text>

      {!photoCaptured && (
        <ButtonComponent
          title="Capture Photo"
          onPress={onClickCapturePhoto}
          loading={isLoading}
          disabled={isLoading}
          
        />
      )}

      <TextInputComponent
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInputComponent
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <TextInputComponent
        placeholder="Account Number"
        value={accountNumber}
        onChangeText={setAccountNumber}
        keyboardType="numeric"
      />
      <TextInputComponent
        placeholder="Date"
        value={date}
        onChangeText={setDate}
      />

      {isLoading && <Text style={styles.loadingText}>Fetching data, please wait...</Text>}

      
      {detectText && allFieldsValid && (
        <ButtonComponent
          title="Confirm"
          onPress={onClickConfirm}
          disabled={!allFieldsValid}  
          style={[ { backgroundColor: "#4CAF50" }]} 
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: { 
    flex: 1, 
    padding: 15 
  },
  cameraContainer: {
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#000',
    marginBottom: 20,
  },
  camera: { 
    width: '100%', 
    height: '100%' 
  },

  instructionText: { textAlign: 'center', fontSize: 13, color: '#808080', marginBottom: 10 },
  loadingText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#0000ff',
    marginVertical: 10,
  },

});

export default ScanImageScreen;
