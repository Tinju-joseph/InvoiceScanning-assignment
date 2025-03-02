
import axios from 'axios';
import { BASE_URL } from '../constants/apiConstants';



const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000, 
});

// Interceptor for request 
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Global response handler to intercept errors globally
axiosInstance.interceptors.response.use(
  (response) => response, 
  (error) => {
    // Check if error is a network error (i.e., no response received)
    if (!error.response) {
      return Promise.reject({
        ...error,
        message: "Please check your internet connection.", 
      });
    }

    // Handle other errors 
  return Promise.reject({
      ...error,
      message: "Something went wrong. Please try again later.", 
    });
  }
);

export default axiosInstance;
