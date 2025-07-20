// src/pages/UserBookingsPage.jsx
import React, { useState, useEffect } from 'react';
import api from '../api/api';
import moment from 'moment';
import { useAuth } from '../context/AuthContext';
import ConfirmationModal from '../components/ConfirmationModal';
import Swal from 'sweetalert2';

const UserBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null); // For errors that might not use SweetAlert2 immediately
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);

  const { user } = useAuth();

  const fetchMyBookings = async () => {
    setLoading(true);
    setError(null);
    setErrorMessage(null);
    try {
      const response = await api.get('/bookings/my-bookings');
      setBookings(response.data);
    } catch (err) {
      setError('Failed to fetch your bookings. Please try again later.');
      console.error('Error fetching user bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const confirmCancelBooking = (bookingId) => {
    setBookingToCancel(bookingId);
    setIsModalOpen(true);
  };

  const handleCancelBooking = async () => {
    setIsModalOpen(false); // Close the modal immediately
    setError(null);
    setErrorMessage(null);
    if (!bookingToCancel) return;

    // Show loading SweetAlert2 notification
    Swal.fire({
      title: 'Cancelling Booking...',
      text: 'Please wait, your request is being processed.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      await api.delete(`/bookings/${bookingToCancel}/cancel`);

      Swal.fire({
        icon: 'success',
        title: 'Booking Cancelled!',
        text: 'Your booking has been successfully cancelled.',
        showConfirmButton: false,
        timer: 2000,
      });

      fetchMyBookings(); // Re-fetch immediately after success notification

    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to cancel booking. Please try again.';
      setErrorMessage(msg); // Set local error message if needed for persistent display

      Swal.fire({
        icon: 'error',
        title: 'Cancellation Failed',
        text: msg,
      });
      // Do not set setLoading(false) here, fetchMyBookings or the error Swall handles it
    } finally {
      setBookingToCancel(null);
      // If SweetAlert2 loading was open, close it if not already handled by success/error fires
      if (Swal.isLoading()) {
          Swal.close();
      }
    }
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
    setBookingToCancel(null);
  };

  useEffect(() => {
    if (user) {
      fetchMyBookings();
    } else {
      setLoading(false);
      setError('Please log in to view your bookings.');
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-900 via-indigo-950 to-purple-950">
        <div className="text-center text-amber-300 text-3xl font-bold animate-pulse">Summoning your booked adventures...</div>
      </div>
    );
  }

  if (error || errorMessage) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-red-900">
        <div className="text-center text-red-300 text-xl font-semibold p-8 rounded-lg bg-black/30 backdrop-blur-sm shadow-xl border border-red-500">
          {error || errorMessage}
        </div>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-900 via-indigo-950 to-purple-950">
        <div className="text-center text-gray-400 text-xl font-medium p-8 rounded-lg bg-white/10 backdrop-blur-sm shadow-xl border border-white/20">
          You haven't booked any events yet. Time to explore!
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-inter bg-gradient-to-br from-blue-900 via-indigo-950 to-purple-950 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-white mb-12 drop-shadow-lg">
          Your <span className="text-amber-400">Bookings</span>
        </h1>

        <div className="grid grid-cols-1 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center border border-white/20 hover:shadow-2xl transition-shadow duration-300 group"
            >
              <div className="mb-4 md:mb-0 md:w-2/3">
                <h2 className="text-2xl font-bold text-white mb-2 leading-tight">
                  <i className="fas fa-ticket-alt text-amber-400 mr-3"></i>
                  {booking.event.title}
                </h2>
                <p className="text-gray-300 flex items-center mb-1">
                  <i className="fas fa-cubes text-amber-500 mr-2 opacity-70"></i>
                  Tickets: <span className="font-semibold text-white ml-1">{booking.numberOfTickets}</span>
                </p>
                <p className="text-gray-300 flex items-center mb-1">
                  <i className="fas fa-info-circle text-amber-500 mr-2 opacity-70"></i>
                  Status: <span className={`font-semibold ml-1 ${booking.status === 'CONFIRMED' ? 'text-green-400' : booking.status === 'CANCELLED' || booking.status === 'FAILED' ? 'text-red-400' : 'text-yellow-400'}`}>
                    {booking.status}
                  </span>
                </p>
                <p className="text-gray-300 flex items-center mb-1">
                  <i className="fas fa-calendar-check text-amber-500 mr-2 opacity-70"></i>
                  Booked on: <span className="text-white ml-1">{moment(booking.bookingDateTime).format('MMM DD, YYYY hh:mm A')}</span>
                </p>
                {booking.paymentId && (
                  <p className="text-gray-300 flex items-center">
                    <i className="fas fa-receipt text-amber-500 mr-2 opacity-70"></i>
                    Payment ID: <span className="text-white ml-1">{booking.paymentId}</span>
                  </p>
                )}
              </div>
              <div className="md:w-1/3 flex justify-end">
                {(booking.status === 'CONFIRMED' || booking.status === 'PENDING_PAYMENT') && (
                  <button
                    onClick={() => confirmCancelBooking(booking.id)}
                    className="bg-gradient-to-r from-red-600 to-red-800 text-white font-bold py-2 px-5 rounded-full shadow-md hover:from-red-700 hover:to-red-900 transition-all duration-300 transform hover:scale-105 flex items-center"
                  >
                    <i className="fas fa-times-circle mr-2"></i> Cancel Booking
                  </button>
                )}
                {booking.status === 'CANCELLED' && (
                    <span className="text-red-400 font-semibold text-lg flex items-center">
                        <i className="fas fa-ban mr-2"></i> Cancelled
                    </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <ConfirmationModal
          isOpen={isModalOpen}
          message="Are you sure you want to cancel this booking? This action cannot be undone."
          onConfirm={handleCancelBooking}
          onCancel={handleCancelModal}
        />
      </div>
    </div>
  );
};

export default UserBookingsPage;