// src/pages/EventsPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import moment from 'moment'; // Ensure moment.js is installed: npm install moment

const EventsPage = () => {
  const [allEvents, setAllEvents] = useState([]); // Still fetch all to get featured and recommended
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllAndFeaturedEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get('/events');
        setAllEvents(response.data);
        // For featured events, take a subset (e.g., first 3-5)
        setFeaturedEvents(response.data.slice(0, 4)); // Display up to 4 featured events in horizontal scroll

      } catch (err) {
        setError('Failed to fetch events. Please try again later.');
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllAndFeaturedEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-900 via-indigo-950 to-purple-950">
        <div className="text-center text-amber-300 text-3xl font-bold animate-pulse">Loading amazing events...</div>
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
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-950 to-purple-950 font-inter text-white">
      {/* 1. Top Hero/Carousel Section (BookMyShow style) */}
      <section className="relative w-full h-96 overflow-hidden flex items-center justify-center shadow-lg">
        {featuredEvents.length > 0 ? (
          <div className="flex items-center justify-center w-full h-full">
            <img
              src={featuredEvents[0].imageUrl || "https://placehold.co/1200x400/1F2937/FCD34D?text=Featured+Event"}
              alt={featuredEvents[0].title}
              className="absolute inset-0 w-full h-full object-cover opacity-60" 
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/1200x400/1F2937/FCD34D?text=Featured+Event"; }}
            />
            <div className="relative z-10 text-center p-6 bg-black/50 rounded-lg shadow-xl border border-white/20"> {/* Darker overlay, subtle border */}
              <p className="text-amber-400 text-lg md:text-xl font-semibold uppercase tracking-wider mb-2">Featured Event</p>
              <h2 className="text-4xl md:text-6xl font-extrabold mb-3 drop-shadow-lg text-white"> {/* Larger, more impactful title */}
                {featuredEvents[0].title}
              </h2>
              <p className="text-lg md:text-2xl font-medium text-amber-300 mb-4"> {/* Amber for date/time */}
                {moment(featuredEvents[0].dateTime).format('MMM DD, YYYY | hh:mm A')}
              </p>
              <Link
                to={`/events/${featuredEvents[0].id}`}
                className="inline-block bg-gradient-to-r from-amber-400 to-yellow-600 text-blue-900 font-bold py-3 px-8 rounded-full shadow-lg hover:from-amber-500 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105" // Gold gradient button
              >
                View Details
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center text-2xl text-white font-medium">No featured events available for banner.</div>
        )}
      </section>

      {/* 2. Recommended Events Section (Horizontal Scroll) */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8"> {/* Increased bottom margin */}
          <h2 className="text-4xl font-extrabold text-white drop-shadow-md">Recommended for You</h2> {/* Larger, bolder heading */}
          {allEvents.length > 0 && (
            <Link to="/all-events" className="text-amber-400 hover:text-amber-300 font-semibold flex items-center text-lg transition-colors duration-300"> {/* Amber link */}
              See All Events <i className="fas fa-arrow-right ml-2 text-lg"></i>
            </Link>
          )}
        </div>

        {/* Horizontal Scroll Container for Recommended Events */}
        {featuredEvents.length === 0 && allEvents.length === 0 ? (
          <div className="text-center text-amber-300 text-xl p-8 bg-white/10 rounded-xl shadow-xl border border-white/20">
            No events available to display at the moment. Check back soon!
          </div>
        ) : (
          <div className="flex overflow-x-auto pb-6 -mx-4 px-4 sm:px-0 sm:-mx-0 scrollbar-hide space-x-6"> {/* Increased padding, margin, and space */}
            {allEvents.map((event) => ( // Use allEvents for recommended section, not just featured
              <div
                key={event.id}
                className="w-72 flex-shrink-0 bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl flex flex-col border border-white/20 group" // Translucent card, larger hover
              >
                <div className="relative h-48 bg-gray-900 overflow-hidden">
                  <img
                    src={event.imageUrl || `https://placehold.co/800x400/1F2937/FCD34D?text=Event+Image`}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" // Slower, more pronounced hover
                    onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/800x400/1F2937/FCD34D?text=Event+Image`; }}
                  />
                  {event.availableTickets <= 0 && (
                    <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center"> {/* Darker overlay */}
                      <span className="text-red-400 text-3xl font-bold uppercase tracking-wider animate-pulse">SOLD OUT</span> {/* Red highlight for sold out */}
                    </div>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-grow"> {/* Increased padding */}
                  <h3 className="text-2xl font-bold text-white mb-3 leading-tight line-clamp-2" title={event.title}> {/* Changed to h3, bolder, line-clamp for truncation */}
                    {event.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-2 flex items-center"> {/* Lighter gray for date/location */}
                    <i className="fas fa-calendar-alt mr-3 text-amber-400 text-base"></i> {/* Amber icon */}
                    {moment(event.dateTime).format('MMM DD, YYYY | hh:mm A')}
                  </p>
                  <p className="text-gray-300 text-sm mb-4 flex items-center">
                    <i className="fas fa-map-marker-alt mr-3 text-amber-400 text-base"></i> {/* Amber icon */}
                    {event.location}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10"> {/* Lighter border */}
                    <p className="text-amber-400 font-extrabold text-2xl"> {/* Price in prominent amber */}
                      {event.price === 0 ? 'FREE' : `₹${event.price.toFixed(2)}`} {/* Changed to Rupee symbol */}
                    </p>
                    <Link
                      to={`/events/${event.id}`}
                      className={`py-2.5 px-5 rounded-full font-semibold text-base transition-all duration-300 shadow-lg transform hover:scale-105
                        ${event.availableTickets <= 0
                            ? 'bg-gray-700 text-gray-400 cursor-not-allowed' // Darker disabled state
                            : 'bg-gradient-to-r from-amber-400 to-yellow-600 text-blue-900 hover:from-amber-500 hover:to-yellow-700'}` // Gold gradient for active
                              }
                      disabled={event.availableTickets <= 0}
                    >
                      {event.availableTickets <= 0 ? 'Sold Out' : 'Book Now'}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default EventsPage;