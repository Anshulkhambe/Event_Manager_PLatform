// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ allowedRoles }) => {
  const { isAuthenticated, isLoading, hasRole } = useAuth();

  // If still loading auth state, don't render anything yet
  if (isLoading) {
    return <div className="text-center p-8 text-indigo-700">Loading authentication...</div>;
  }

  // If authenticated and has at least one of the allowed roles, render child routes
  if (isAuthenticated && hasRole(allowedRoles)) {
    return <Outlet />;
  }

  // If authenticated but doesn't have required roles, redirect to unauthorized page or home
  if (isAuthenticated && !hasRole(allowedRoles)) {
    return <Navigate to="/unauthorized" replace />; // Or redirect to a generic home page
  }

  // If not authenticated, redirect to login page
  return <Navigate to="/login" replace />;
};

export default PrivateRoute;
