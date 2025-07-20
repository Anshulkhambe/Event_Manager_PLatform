        // src/api/events.js
        import api from './api'; // IMPORTANT: Import your configured Axios API instance

        // Note: For all authenticated requests, directly use the 'api' instance
        // imported from './api'. The 'api' instance has an interceptor configured
        // to automatically attach the JWT token from localStorage.

        export const getAllEvents = async () => {
          try {
            // This endpoint is publicly accessible (GET /api/events),
            // but using the 'api' instance is fine and consistent.
            const response = await api.get('/events');
            return response.data;
          } catch (error) {
            console.error('Error fetching events:', error);
            throw error;
          }
        };

        export const getEventById = async (id) => {
          try {
            // This endpoint is publicly accessible (GET /api/events/{id}),
            // but using the 'api' instance is fine and consistent.
            const response = await api.get(`/events/${id}`);
            return response.data;
          } catch (error) {
            console.error(`Error fetching event with ID ${id}:`, error);
            throw error;
          }
        };

        export const createEvent = async (eventData) => {
          try {
            // CRITICAL FIX: Removed manual token retrieval and header setting.
            // The 'api' instance (imported above) automatically handles the Authorization header.
            const response = await api.post('/events', eventData); 
            return response.data;
          } catch (error) {
            console.error('Error creating event:', error);
            throw error;
          }
        };

        export const updateEvent = async (id, eventData) => {
          try {
            // CRITICAL FIX: Removed manual token retrieval and header setting.
            // The 'api' instance automatically handles the Authorization header.
            const response = await api.put(`/events/${id}`, eventData);
            return response.data;
          } catch (error) {
            console.error(`Error updating event with ID ${id}:`, error);
            throw error;
          }
        };

        export const deleteEvent = async (id) => {
          try {
            // CRITICAL FIX: Removed manual token retrieval and header setting.
            // The 'api' instance automatically handles the Authorization header.
            await api.delete(`/events/${id}`);
            console.log(`Event with ID ${id} deleted successfully.`);
          } catch (error) {
            console.error(`Error deleting event with ID ${id}:`, error);
            throw error;
          }
        };
        