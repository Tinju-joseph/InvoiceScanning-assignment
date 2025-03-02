import axiosInstance from './axiosInstance';  
import { DUMMY_ENDPOINT } from '../constants/apiConstants'; 

export const signInWithBankID = async (scannedData) => {
  try {
     // Making a POST request to the specified API endpoint with the provided scanned data
    const response = await axiosInstance.post(DUMMY_ENDPOINT, scannedData);

        // If the response status is 200 (OK), return the success response with the data
    if (response.status === 200) {
      return {
        success: true,
        message: response.data,
        data: response.data
      };
    } else {
       // If the status is not 200, return a failure response with an error message
      return {
        success: false,
        message: response.data || "Failed to sign in. Please check the data."
      };
    }
  } catch (error) {
     // If there is an error (e.g., network issues, API down), return a failure response with an error message
    return {
      success: false,
      message: error.message || "Something went wrong. Please try again later."
  
    };
  }
};
