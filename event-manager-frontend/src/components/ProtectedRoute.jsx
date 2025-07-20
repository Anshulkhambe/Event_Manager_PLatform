// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * A ProtectedRoute component to control access to routes based on authentication status and user roles.
 * @param {object} props - The component props.
 * @param {string[]} [props.allowedRoles] - An array of roles that are allowed to access this route.
 * If not provided, only authentication is checked.
 */
const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, isLoading, hasRole } = useAuth();

  // Show a loading spinner or null while checking auth status
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-indigo-500"></div>
        <p className="ml-4 text-xl text-indigo-700">Loading user session...</p>
      </div>
    );
  }

  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If allowedRoles are specified and the user does not have any of them, redirect to home
  if (allowedRoles && !hasRole(allowedRoles)) {
    // For simplicity, redirect to home. In a real app, you might have an /unauthorized page.
    return <Navigate to="/" replace />;
  }

  // If authenticated and has required role (or no role required), render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
