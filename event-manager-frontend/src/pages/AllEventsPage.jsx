// src/pages/AllEventsPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import moment from 'moment';

const AllEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get('/events');
        setEvents(response.data);
      } catch (err) {
        setError('Failed to fetch all events. Please try again later.');
        console.error('Error fetching all events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-900 via-indigo-950 to-purple-950">
        <div className="text-center text-amber-300 text-3xl font-bold animate-pulse">Gathering all amazing events...</div>
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

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-inter bg-gradient-to-br from-blue-900 via-indigo-950 to-purple-950 text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-white mb-12 drop-shadow-lg">
          Explore All <span className="text-amber-400">Events</span>
        </h1>

        {events.length === 0 ? (
          <div className="text-center text-amber-300 text-xl p-8 bg-white/10 rounded-xl shadow-xl border border-white/20">
            No events available right now. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"> {/* Adjusted grid for slightly larger cards */}
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl flex flex-col border border-white/20 group"
              >
                <div className="relative w-full h-48 sm:h-56 overflow-hidden"> {/* Increased height for images */}
                  <img
                    src={event.imageUrl || `https://placehold.co/400x250/1F2937/FCD34D?text=Event+Image`}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x250/1F2937/FCD34D?text=Event+Image`; }}
                  />
                  {event.availableTickets <= 0 && (
                    <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                      <span className="text-red-400 text-2xl font-bold uppercase tracking-wider animate-pulse">SOLD OUT</span>
                    </div>
                  )}
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold text-white mb-2 leading-tight line-clamp-2" title={event.title}>
                    {event.title}
                  </h2>
                  <p className="text-gray-300 text-sm mb-1 flex items-center">
                    <i className="fas fa-calendar-alt mr-2 text-amber-400"></i>
                    {moment(event.dateTime).format('MMM DD, YYYY')}
                  </p>
                  <p className="text-gray-300 text-sm mb-3 flex items-center">
                    <i className="fas fa-map-marker-alt mr-2 text-amber-400"></i>
                    {event.location}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/10">
                    <p className="text-amber-400 font-extrabold text-xl">
                      {event.price === 0 ? 'FREE' : `₹${event.price.toFixed(2)}`}
                    </p>
                    <Link
                      to={`/events/${event.id}`}
                      className={`py-2 px-4 rounded-full font-semibold text-sm transition-all duration-300 shadow-md transform hover:scale-105
                        ${event.availableTickets <= 0
                            ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-amber-400 to-yellow-600 text-blue-900 hover:from-amber-500 hover:to-yellow-700'}`
                                  }
                      disabled={event.availableTickets <= 0}
                    >
                      {event.availableTickets <= 0 ? 'Sold Out' : 'Details'} {/* Concise button text */}
                    </Link>
                </div>
              </div></div>
            ))}
          </div>
        )}
      </div></div>
  );
};

export default AllEventsPage;