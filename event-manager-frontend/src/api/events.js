        // src/api/events.js
        import api from './api'; 

        

        export const getAllEvents = async () => {
          try {
           
            const response = await api.get('/events');
            return response.data;
          } catch (error) {
            console.error('Error fetching events:', error);
            throw error;
          }
        };

        export const getEventById = async (id) => {
          try {
         
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
        