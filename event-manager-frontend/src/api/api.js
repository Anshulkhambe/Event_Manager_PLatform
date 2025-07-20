// src/api/api.js
import axios from 'axios';

// Create an Axios instance with a base URL and default headers
const api = axios.create({
  baseURL: 'http://localhost:8080/api', // IMPORTANT: Ensure this EXACTLY matches your Spring Boot backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach the JWT token to outgoing requests
// This runs BEFORE every request sent by this 'api' instance.
api.interceptors.request.use(
  (config) => {
    // Retrieve user data from localStorage
    // This 'user' object should contain the 'jwtToken' obtained during login.
    const user = JSON.parse(localStorage.getItem('user'));

    // If user data and a token exist, attach the token to the Authorization header
    // The property name MUST match what your backend sends (e.g., 'jwtToken' from JwtResponse)
    if (user && user.jwtToken) {
      config.headers.Authorization = `Bearer ${user.jwtToken}`;
    }
    return config; // Return the modified config
  },
  (error) => {
    // Handle request errors (e.g., network issues before sending)
    return Promise.reject(error);
  }
);

export default api;
