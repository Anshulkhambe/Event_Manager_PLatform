// src/components/EventCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  const formattedDate = new Date(event.eventDateTime).toLocaleString();

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105">
      <img
        src={event.imageUrl || 'https://via.placeholder.com/400x200?text=Event+Image'}
        alt={event.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.title}</h3>
        <p className="text-gray-600 text-sm mb-1">
          <span className="font-medium">Date:</span> {formattedDate}
        </p>
        <p className="text-gray-600 text-sm mb-3">
          <span className="font-medium">Location:</span> {event.location}
        </p>
        <p className="text-gray-700 text-base mb-4 line-clamp-3">{event.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-indigo-600">
            {event.price > 0 ? `$${event.price.toFixed(2)}` : 'FREE'}
          </span>
          <Link
            to={`/events/${event.id}`}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;