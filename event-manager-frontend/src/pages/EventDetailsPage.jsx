// src/pages/EventDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getEventById } from '../api/events';
import moment from 'moment';
import BookingForm from '../components/BookingForm'; 

const EventDetailsPage = () => {
  const { id } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEventDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getEventById(id);
      setEventDetails(data);
    } catch (err) {
      setError('Failed to fetch event details. Event might not exist or network error.');
      console.error('Error fetching event details:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-900 via-indigo-950 to-purple-950">
        <div className="text-center text-amber-300 text-3xl font-bold animate-pulse">Summoning event magic...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-red-900">
        <div className="text-center text-red-300 text-xl font-semibold p-8 rounded-lg bg-black/30 backdrop-blur-sm shadow-xl border border-red-500">
          {error}
        </div>
      </div>
    );
  }

  if (!eventDetails) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-900 via-indigo-950 to-purple-950">
        <div className="text-center text-gray-400 text-xl font-medium p-8 rounded-lg bg-white/10 backdrop-blur-sm shadow-xl border border-white/20">
          Event not found. It might have been moved or cancelled.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 font-inter bg-gradient-to-br from-blue-900 via-indigo-950 to-purple-950 text-white">
      <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/20 animate-fade-in-up">
        {eventDetails.imageUrl && (
          <div className="relative w-full h-96 overflow-hidden">
            <img
              src={eventDetails.imageUrl}
              alt={eventDetails.title}
              className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x400/1F2937/FCD34D?text=Event+Image"; }}
            />
            {eventDetails.availableTickets <= 0 && (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                <span className="text-red-400 text-4xl font-extrabold uppercase tracking-widest animate-pulse">SOLD OUT</span>
              </div>
            )}
          </div>
        )}
        {!eventDetails.imageUrl && (
          <div className="w-full h-96 bg-gradient-to-br from-blue-800 to-indigo-900 flex flex-col items-center justify-center text-white text-3xl font-semibold p-4">
            <i className="fas fa-image text-6xl mb-4 text-amber-400"></i>
            <span>No Image Available</span>
          </div>
        )}
        <div className="p-8 md:p-12">
          <h1 className="text-5xl font-extrabold text-white mb-4 leading-tight drop-shadow-lg">{eventDetails.title}</h1>
          <p className="text-gray-200 text-lg mb-8 leading-relaxed">{eventDetails.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg text-gray-200 mb-10">
            <p className="flex items-center font-medium">
              <i className="fas fa-calendar-alt w-6 h-6 mr-3 text-amber-400"></i> 
              <strong className="text-white mr-2">Date:</strong> {moment(eventDetails.dateTime).format('MMMM DD, YYYY')}
            </p>
            <p className="flex items-center font-medium">
              <i className="fas fa-clock w-6 h-6 mr-3 text-amber-400"></i> 
              <strong className="text-white mr-2">Time:</strong> {moment(eventDetails.dateTime).format('hh:mm A')}
            </p>
            <p className="flex items-center font-medium">
              <i className="fas fa-map-marker-alt w-6 h-6 mr-3 text-amber-400"></i> 
              <strong className="text-white mr-2">Location:</strong> {eventDetails.location}
            </p>
            <p className="flex items-center font-medium">
              <i className="fas fa-ticket-alt w-6 h-6 mr-3 text-amber-400"></i> 
              <strong className="text-white mr-2">Tickets Available:</strong> <span className={`${eventDetails.availableTickets <= 5 && eventDetails.availableTickets > 0 ? 'text-orange-400' : ''} ${eventDetails.availableTickets <= 0 ? 'text-red-400' : 'text-green-400'}`}>
                {eventDetails.availableTickets}
              </span> / {eventDetails.totalTickets}
            </p>
            <p className="flex items-center font-medium">
              <i className="fas fa-rupee-sign w-6 h-6 mr-3 text-amber-400"></i> 
              <strong className="text-white mr-2">Price:</strong> 
              <span className="text-amber-300 font-bold text-xl">
                {eventDetails.price === 0 ? 'FREE' : `₹${eventDetails.price.toFixed(2)}`}
              </span>
            </p>
          </div>

          <BookingForm eventId={eventDetails.id} eventDetails={eventDetails} onBookingSuccess={fetchEventDetails} />
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;