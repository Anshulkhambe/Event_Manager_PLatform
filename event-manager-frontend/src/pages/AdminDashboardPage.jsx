// src/pages/AdminDashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import moment from 'moment';
import ConfirmationModal from '../components/ConfirmationModal';
import Swal from 'sweetalert2';

const AdminDashboardPage = () => {
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [errorEvents, setErrorEvents] = useState(null);
  const [errorBookings, setErrorBookings] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null); // For general page-level errors

  const [isDeleteEventModalOpen, setIsDeleteEventModalOpen] = useState(false);
  const [eventToDeleteId, setEventToDeleteId] = useState(null);

  const [isCancelBookingModalOpen, setIsCancelBookingModalOpen] = useState(false);
  const [bookingToCancelId, setBookingToCancelId] = useState(null);

  const fetchEvents = async () => {
    setLoadingEvents(true);
    setErrorEvents(null);
    try {
      const response = await api.get('/events');
      setEvents(response.data);
    } catch (err) {
      setErrorEvents('Failed to fetch events for admin dashboard.');
      console.error('Error fetching events:', err);
    } finally {
      setLoadingEvents(false);
    }
  };

  const fetchBookings = async () => {
    setLoadingBookings(true);
    setErrorBookings(null);
    try {
      const response = await api.get('/bookings');
      setBookings(response.data);
    } catch (err) {
      setErrorBookings('Failed to fetch bookings for admin dashboard.');
      console.error('Error fetching bookings:', err);
    } finally {
      setLoadingBookings(false);
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchBookings();
  }, []);

  const confirmDeleteEvent = (eventId) => {
    setEventToDeleteId(eventId);
    setIsDeleteEventModalOpen(true);
  };

  const handleDeleteEvent = async () => {
    setIsDeleteEventModalOpen(false);
    setErrorMessage(null); // Clear previous error messages

    // Show loading SweetAlert2 notification
    Swal.fire({
      title: 'Deleting Event...',
      text: 'Please wait, event is being removed.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    if (!eventToDeleteId) return;

    try {
      await api.delete(`/events/${eventToDeleteId}`);

      Swal.fire({
        icon: 'success',
        title: 'Event Deleted!',
        text: 'The event has been successfully deleted.',
        showConfirmButton: false,
        timer: 2000,
      });

      fetchEvents(); // Re-fetch events immediately
      fetchBookings(); // Also re-fetch bookings in case they were related

    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to delete event.';
      setErrorMessage(msg);
      Swal.fire({
        icon: 'error',
        title: 'Deletion Failed',
        text: msg,
      });
    } finally {
      setEventToDeleteId(null);
      if (Swal.isLoading()) {
          Swal.close();
      }
    }
  };

  const confirmCancelBooking = (bookingId) => {
    setBookingToCancelId(bookingId);
    setIsCancelBookingModalOpen(true);
  };

  const handleCancelBooking = async () => {
    setIsCancelBookingModalOpen(false);
    setErrorMessage(null); // Clear previous error messages

    // Show loading SweetAlert2 notification
    Swal.fire({
      title: 'Cancelling Booking...',
      text: 'Please wait, the booking is being processed.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    if (!bookingToCancelId) return;

    try {
      await api.delete(`/bookings/${bookingToCancelId}/cancel`);

      Swal.fire({
        icon: 'success',
        title: 'Booking Cancelled!',
        text: 'The booking has been successfully cancelled.',
        showConfirmButton: false,
        timer: 2000,
      });

      fetchBookings(); // Re-fetch bookings immediately
      fetchEvents(); // Also re-fetch events to update available tickets

    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to cancel booking.';
      setErrorMessage(msg);
      Swal.fire({
        icon: 'error',
        title: 'Cancellation Failed',
        text: msg,
      });
    } finally {
      setBookingToCancelId(null);
       if (Swal.isLoading()) {
          Swal.close();
      }
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-inter bg-gradient-to-br from-blue-900 via-indigo-950 to-purple-950 text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-white mb-12 drop-shadow-lg">
          Admin <span className="text-amber-400">Dashboard</span>
        </h1>

        {errorMessage && (
          <div className="bg-red-800/30 border border-red-500 text-red-300 px-4 py-3 rounded-lg relative mb-8 text-center text-lg shadow-md animate-fade-in">
            <i className="fas fa-exclamation-triangle mr-3"></i> {errorMessage}
          </div>
        )}

        {/* Manage Events Section */}
        <div className="bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl mb-10 border border-white/20">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-white mb-4 sm:mb-0">
              <i className="fas fa-calendar-alt text-amber-400 mr-3"></i> Manage <span className="text-amber-300">Events</span>
            </h2>
            <Link
              to="/admin/events/new"
              className="bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:from-green-600 hover:to-green-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              <i className="fas fa-plus-circle mr-2"></i> Add New Event
            </Link>
          </div>

          {loadingEvents && <div className="text-center text-amber-300 text-lg py-8 animate-pulse">Loading events data...</div>}
          {errorEvents && <div className="text-center text-red-400 text-lg py-8">{errorEvents}</div>}
          {!loadingEvents && !errorEvents && events.length === 0 && (
            <div className="text-center text-gray-400 text-lg py-8">No events found. Start by adding one!</div>
          )}

          {!loadingEvents && !errorEvents && events.length > 0 && (
            <div className="overflow-x-auto rounded-lg border border-white/10 shadow-inner-lg">
              <table className="min-w-full bg-white/5 rounded-lg overflow-hidden">
                <thead className="bg-white/10">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-white/80 uppercase tracking-wider">Title</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-white/80 uppercase tracking-wider">Date & Time</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-white/80 uppercase tracking-wider">Location</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-white/80 uppercase tracking-wider">Price</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-white/80 uppercase tracking-wider">Tickets</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-white/80 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => (
                    <tr key={event.id} className="border-b border-white/10 hover:bg-white/15 transition-colors duration-200">
                      <td className="py-3 px-4 text-gray-200">{event.title}</td>
                      <td className="py-3 px-4 text-gray-200">{moment(event.dateTime).format('MMM DD, YYYY hh:mm A')}</td>
                      <td className="py-3 px-4 text-gray-200">{event.location}</td>
                      <td className="py-3 px-4 text-gray-200">₹{event.price.toFixed(2)}</td>
                      <td className="py-3 px-4 text-gray-200">{event.availableTickets}/{event.totalTickets}</td>
                      <td className="py-3 px-4 flex space-x-2">
                        <Link
                          to={`/admin/events/edit/${event.id}`}
                          className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-3 rounded-md transition-colors duration-200 flex items-center"
                        >
                          <i className="fas fa-edit mr-1"></i> Edit
                        </Link>
                        <button
                          onClick={() => confirmDeleteEvent(event.id)}
                          className="bg-red-600 hover:bg-red-700 text-white text-sm py-1 px-3 rounded-md transition-colors duration-200 flex items-center"
                        >
                          <i className="fas fa-trash-alt mr-1"></i> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* All Bookings Section */}
        <div className="bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl border border-white/20">
          <h2 className="text-3xl font-bold text-white mb-6">
            <i className="fas fa-receipt text-amber-400 mr-3"></i> All <span className="text-amber-300">Bookings</span>
          </h2>

          {loadingBookings && <div className="text-center text-amber-300 text-lg py-8 animate-pulse">Loading bookings data...</div>}
          {errorBookings && <div className="text-center text-red-400 text-lg py-8">{errorBookings}</div>}
          {!loadingBookings && !errorBookings && bookings.length === 0 && (
            <div className="text-center text-gray-400 text-lg py-8">No bookings found yet.</div>
          )}

          {!loadingBookings && !errorBookings && bookings.length > 0 && (
            <div className="overflow-x-auto rounded-lg border border-white/10 shadow-inner-lg">
              <table className="min-w-full bg-white/5 rounded-lg overflow-hidden">
                <thead className="bg-white/10">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-white/80 uppercase tracking-wider">Booking ID</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-white/80 uppercase tracking-wider">Event Title</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-white/80 uppercase tracking-wider">User Name</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-white/80 uppercase tracking-wider">Tickets</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-white/80 uppercase tracking-wider">Status</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-white/80 uppercase tracking-wider">Booked On</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-white/80 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="border-b border-white/10 hover:bg-white/15 transition-colors duration-200">
                      <td className="py-3 px-4 text-gray-200">{booking.id}</td>
                      <td className="py-3 px-4 text-gray-200">{booking.event.title}</td>
                      <td className="py-3 px-4 text-gray-200">{booking.userName}</td>
                      <td className="py-3 px-4 text-gray-200">{booking.numberOfTickets}</td>
                      <td className="py-3 px-4">
                        <span className={`font-semibold ${booking.status === 'CONFIRMED' ? 'text-green-400' : booking.status === 'CANCELLED' || booking.status === 'FAILED' ? 'text-red-400' : 'text-yellow-400'}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-200">{moment(booking.bookingDateTime).format('MMM DD, YYYY hh:mm A')}</td>
                      <td className="py-3 px-4">
                        {(booking.status === 'CONFIRMED' || booking.status === 'PENDING_PAYMENT') && (
                          <button
                            onClick={() => confirmCancelBooking(booking.id)}
                            className="bg-red-600 hover:bg-red-700 text-white text-sm py-1 px-3 rounded-md transition-colors duration-200 flex items-center"
                          >
                            <i className="fas fa-times-circle mr-1"></i> Cancel
                          </button>
                        )}
                        {booking.status === 'CANCELLED' && (
                            <span className="text-red-400 font-semibold text-sm flex items-center">
                                <i className="fas fa-ban mr-2"></i> Cancelled
                            </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <ConfirmationModal
          isOpen={isDeleteEventModalOpen}
          message="Are you sure you want to delete this event? This action cannot be undone and will affect associated bookings."
          onConfirm={handleDeleteEvent}
          onCancel={() => setIsDeleteEventModalOpen(false)}
        />

        <ConfirmationModal
          isOpen={isCancelBookingModalOpen}
          message="Are you sure you want to cancel this booking? Tickets will be returned to the event."
          onConfirm={handleCancelBooking}
          onCancel={() => setIsCancelBookingModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default AdminDashboardPage;