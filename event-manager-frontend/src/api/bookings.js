// src/api/bookings.js
import axios from 'axios';

const API_BASE_URL = 'https://event-manager-platform1.onrender.com/api'; // Your Spring Boot backend URL

export const createBooking = async (bookingData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/bookings`, bookingData);
    return response.data;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

export const getAllBookings = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/bookings`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all bookings:', error);
    throw error;
  }
};

export const getBookingsByUserEmail = async (email) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/bookings/user/${email}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching bookings for user ${email}:`, error);
    throw error;
  }
};

export const cancelBooking = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/bookings/${id}/cancel`);
    console.log(`Booking with ID ${id} cancelled successfully.`);
  } catch (error) {
    console.error(`Error cancelling booking with ID ${id}:`, error);
    throw error;
  }
};