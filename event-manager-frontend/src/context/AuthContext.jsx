import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios'; // Import axios for API calls
import api from '../api/api'; // Import your configured Axios API instance

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores { username, roles, jwtToken, email }
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Effect to load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('user'); // We now store the whole user object
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Ensure the stored user object has the expected properties
        if (parsedUser.jwtToken && parsedUser.username && Array.isArray(parsedUser.roles)) {
          setUser(parsedUser);
          setIsAuthenticated(true);
          // Set Axios default header for subsequent requests if user is already logged in
          // Use the 'api' instance's interceptor, no need to set axios.defaults directly here for 'api' instance
          // The interceptor in api.js will handle this on subsequent requests.
          // If you were using plain axios, this line would be needed:
          // axios.defaults.headers.common['Authorization'] = `Bearer ${parsedUser.jwtToken}`;
        } else {
          console.warn("Invalid user data in localStorage, clearing it.");
          localStorage.removeItem('user');
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
      }
    }
    setIsLoading(false);
  }, []);

  /**
   * Registers a new user by sending data to the backend.
   * @param {string} username
   * @param {string} email
   * @param {string} password
   * @returns {Promise<any>} Response data from the backend.
   */
  const register = async (username, email, password) => {
    const response = await axios.post('https://event-manager-platform1.onrender.com/api/auth/register', {
      username,
      email,
      password
    });
    return response.data;
  };

  /**
   * Logs in a user by sending credentials to the backend.
   * Stores the JWT token and user roles in localStorage and context state.
   * @param {string} username - The user's username.
   * @param {string} password - The user's password.
   * @returns {Promise<object>} The user data received from the backend.
   * @throws {Error} If login fails.
   */
  const login = async (username, password) => { // Make login async
    setIsLoading(true);
    try {
      // Make the API call to your backend's login endpoint
      const response = await axios.post('https://event-manager-platform1.onrender.com/api/auth/login', {
        username,
        password
      });

      // Assuming your backend's JwtResponse now returns: { jwtToken, username, email, roles: [] }
      const { jwtToken, username: loggedInUsername, email, roles } = response.data; // NEW: Destructure email

      // Store the token in Axios default headers for all subsequent requests using the 'api' instance
      // This is handled by the interceptor in api.js, so no need to set axios.defaults.headers.common['Authorization'] here
      // if you are consistently using the 'api' instance.
      // If you were using plain axios directly in other files, this line would be needed:
      // axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;

      // Create a user object to store in context and localStorage
      const userData = {
        username: loggedInUsername,
        email, // NEW: Store email
        roles, // This is an array of roles from the backend
        jwtToken // Store the token with the user data
      };

      localStorage.setItem('user', JSON.stringify(userData)); // Store the whole object
      setUser(userData);
      setIsAuthenticated(true);
      setIsLoading(false);
      return userData; // Return the user data for LoginPage to use
    } catch (error) {
      console.error('Login failed:', error);
      localStorage.removeItem('user'); // Clear any partial/failed login data
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
      throw error; // Re-throw the error for the LoginPage to handle
    }
  };

  /**
   * Logs out the current user by clearing data from localStorage and context state.
   */
  const logout = () => {
    localStorage.removeItem('user'); // Remove the entire user object
    setUser(null);
    setIsAuthenticated(false);
    // Remove the Authorization header from Axios defaults (if you set it globally)
    // If only using the 'api' instance with interceptor, this line might not be strictly necessary
    // as the interceptor won't find 'user' in localStorage after it's removed.
    // delete axios.defaults.headers.common['Authorization'];
  };

  /**
   * Checks if the current authenticated user has any of the specified roles.
   * @param {string[]} requiredRoles - An array of role strings (e.g., ['ROLE_ADMIN', 'ROLE_MODERATOR']).
   * @returns {boolean} True if the user is authenticated and has at least one of the roles, false otherwise.
   */
  const hasRole = (requiredRoles) => {
    // Ensure user exists and has a 'roles' array
    if (!user || !user.roles || !Array.isArray(user.roles)) {
      return false;
    }
    // Check if any of the user's roles are included in the requiredRoles list
    return requiredRoles.some(role => user.roles.includes(role));
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    hasRole,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
