// src/pages/AddEditEventPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import EventForm from '../components/EventForm';

/**
 * Page component for adding a new event or editing an existing one.
 * It uses the EventForm component and passes the event ID if in edit mode.
 */
const AddEditEventPage = () => {
  const { id } = useParams(); // 'id' will be present for edit, undefined for new

  return (
    // The main container for the page, applying the global gradient background
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-inter bg-gradient-to-br from-blue-900 via-indigo-950 to-purple-950 text-white">
      {/* The EventForm component is designed to handle its own max-width, 
        centering, and themed background (translucent card) internally.
        So, we don't need additional styling on this wrapper's children,
        just the page background.
      */}
      <EventForm eventId={id} />
    </div>
  );
};

export default AddEditEventPage;