// src/components/EventForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/api';
import moment from 'moment';
import Swal from 'sweetalert2'; // Import SweetAlert2

const EventForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState(0);
  const [totalTickets, setTotalTickets] = useState(1);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(null); // Renamed 'error' to 'formError' to avoid conflict with SweetAlert2

  useEffect(() => {
    if (isEditMode) {
      const fetchEvent = async () => {
        setLoading(true);
        setFormError(null);
        try {
          const response = await api.get(`/events/${id}`);
          const event = response.data;
          setTitle(event.title);
          setDescription(event.description);
          setDateTime(moment(event.dateTime).format('YYYY-MM-DDTHH:mm'));
          setLocation(event.location);
          setPrice(event.price);
          setTotalTickets(event.totalTickets);
          setImageUrl(event.imageUrl || '');
        } catch (err) {
          const msg = err.response?.data?.message || 'Failed to load event for editing.';
          setFormError(msg);
          Swal.fire({
            icon: 'error',
            title: 'Error Loading Event',
            text: msg,
          });
          console.error('Error fetching event for edit:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchEvent();
    }
  }, [id, isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormError(null); // Clear form-specific errors

    // Basic client-side validation
    if (!title || !description || !dateTime || !location) {
      setFormError('Please fill in all required text fields.');
      setLoading(false);
      return;
    }
    if (isNaN(price) || price < 0) {
      setFormError('Price must be a non-negative number.');
      setLoading(false);
      return;
    }
    if (isNaN(totalTickets) || totalTickets < 1) {
      setFormError('Total tickets must be at least 1.');
      setLoading(false);
      return;
    }

    const eventData = {
      title,
      description,
      dateTime: moment(dateTime).toISOString(),
      location,
      price: parseFloat(price),
      totalTickets: parseInt(totalTickets),
      imageUrl,
    };

    // Show loading SweetAlert2 notification
    Swal.fire({
      title: isEditMode ? 'Updating Event...' : 'Creating Event...',
      text: 'Please wait while we save your event.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      if (isEditMode) {
        await api.put(`/events/${id}`, eventData);
        Swal.fire({
          icon: 'success',
          title: 'Event Updated!',
          text: 'The event has been successfully updated.',
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        await api.post('/events', eventData);
        Swal.fire({
          icon: 'success',
          title: 'Event Created!',
          text: 'Your new event has been successfully created.',
          showConfirmButton: false,
          timer: 2000,
        });
      }
      // Redirect after SweetAlert closes or after a short delay
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1500); // Give users a moment to see the success message
    } catch (err) {
      const backendErrorMessage = err.response?.data?.message || err.response?.data?.error || 'An unexpected error occurred.';
      setFormError(`Failed to save event: ${backendErrorMessage}. Please check your inputs.`); // Set form-specific error
      console.error('Error saving event:', err.response?.data || err);

      Swal.fire({
        icon: 'error',
        title: isEditMode ? 'Update Failed' : 'Creation Failed',
        text: `Error: ${backendErrorMessage}`,
      });
    } finally {
      setLoading(false);
      if (Swal.isLoading()) {
          Swal.close(); // Close the loading SweetAlert if it's still open
      }
    }
  };

  if (loading && isEditMode) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-900 via-indigo-950 to-purple-950">
        <div className="text-center text-amber-300 text-3xl font-bold animate-pulse">Fetching event details...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-inter bg-gradient-to-br from-blue-900 via-indigo-950 to-purple-950 text-white">
      <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 sm:p-10 border border-white/20">
        <h1 className="text-4xl font-extrabold text-center text-white mb-10 drop-shadow-lg">
          {isEditMode ? 'Edit ' : 'Create New '}
          <span className="text-amber-400">Event</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-gray-200 text-sm font-semibold mb-2">
              <i className="fas fa-heading mr-2 text-amber-400 opacity-80"></i>Title:
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-gray-200 text-sm font-semibold mb-2">
              <i className="fas fa-align-left mr-2 text-amber-400 opacity-80"></i>Description:
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="5"
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 resize-y"
              required
            ></textarea>
          </div>

          {/* Date & Time */}
          <div>
            <label htmlFor="dateTime" className="block text-gray-200 text-sm font-semibold mb-2">
              <i className="fas fa-clock mr-2 text-amber-400 opacity-80"></i>Date & Time:
            </label>
            <input
              type="datetime-local"
              id="dateTime"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-gray-200 text-sm font-semibold mb-2">
              <i className="fas fa-map-marker-alt mr-2 text-amber-400 opacity-80"></i>Location:
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-gray-200 text-sm font-semibold mb-2">
              <i className="fas fa-rupee-sign mr-2 text-amber-400 opacity-80"></i>Price (₹):
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
              min="0"
              step="0.01"
              required
            />
          </div>

          {/* Total Tickets */}
          <div>
            <label htmlFor="totalTickets" className="block text-gray-200 text-sm font-semibold mb-2">
              <i className="fas fa-ticket-alt mr-2 text-amber-400 opacity-80"></i>Total Tickets:
            </label>
            <input
              type="number"
              id="totalTickets"
              value={totalTickets}
              onChange={(e) => setTotalTickets(e.target.value)}
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
              min="1"
              required
            />
          </div>

          {/* Image URL */}
          <div>
            <label htmlFor="imageUrl" className="block text-gray-200 text-sm font-semibold mb-2">
              <i className="fas fa-image mr-2 text-amber-400 opacity-80"></i>Image URL (Optional):
            </label>
            <input
              type="url"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
              placeholder="e.g., https://example.com/event-image.jpg"
            />
          </div>

          {formError && (
            <p className="text-red-400 text-sm mt-2 text-center flex items-center justify-center">
              <i className="fas fa-exclamation-circle mr-2"></i> {formError}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-blue-900 font-extrabold py-3 px-6 rounded-full shadow-lg hover:from-amber-600 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center text-lg"
            disabled={loading}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin mr-3"></i> Saving...
              </>
            ) : isEditMode ? (
              <>
                <i className="fas fa-save mr-3"></i> Update Event
              </>
            ) : (
              <>
                <i className="fas fa-plus mr-3"></i> Create Event
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventForm;