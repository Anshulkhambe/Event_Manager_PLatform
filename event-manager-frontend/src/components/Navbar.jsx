import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2'; // Make sure this is imported

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { isAuthenticated, user, logout, hasRole } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out from your account.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33', // Red for "Yes, logout!"
      cancelButtonColor: '#3085d6', // Blue for "Cancel"
      confirmButtonText: 'Yes, logout!',
      reverseButtons: true // Puts confirm button on the left
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed, proceed with logout
        logout();
        navigate('/login');
        setIsMobileOpen(false);

        Swal.fire({
          icon: 'success',
          title: 'Logged Out!',
          text: 'You have been successfully logged out.',
          showConfirmButton: false, // No confirm button needed for success
          timer: 1500 // Auto close after 1.5 seconds
        });
      }
    });
  };

  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);
  const closeMobile = () => setIsMobileOpen(false);

  return (
    <nav className="bg-blue-900 shadow-lg w-full z-50">
      <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4">
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMobile}
          className="text-white text-3xl font-extrabold tracking-tight hover:text-amber-400 transition-colors duration-300 transform hover:scale-105"
        >
          Event<span className="text-amber-400">ify</span>
        </Link>

        {/* Hamburger icon for mobile */}
        <div className="md:hidden">
          <button
            onClick={toggleMobile}
            className="text-amber-300 hover:text-amber-200 focus:outline-none transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/events" className="text-white hover:text-amber-400 transition-colors duration-300 px-3 py-2 rounded-md font-medium text-lg">
            Events
          </Link>

          {isAuthenticated && hasRole(['ROLE_USER', 'ROLE_ADMIN']) && (
            <Link to="/my-bookings" className="text-white hover:text-amber-400 transition-colors duration-300 px-3 py-2 rounded-md font-medium text-lg">
              My Bookings
            </Link>
          )}

          {isAuthenticated && hasRole(['ROLE_ADMIN']) && (
            <>
              <Link to="/admin/dashboard" className="bg-purple-700 hover:bg-purple-800 text-white px-5 py-2 rounded-full text-base font-semibold shadow-md transition-all duration-300">
                Admin Dashboard
              </Link>
              <Link to="/admin/events/new" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-base font-semibold shadow-md transition-all duration-300">
                Add/Edit Events
              </Link>
            </>
          )}

          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="text-amber-300 text-lg font-medium">
                Hello, <span className="font-semibold">
                  {user?.role === 'ROLE_ADMIN' ? 'Admin' : user?.username}
                </span> ({user?.role?.replace('ROLE_', '')})
              </span>
              <button
                onClick={handleLogout} // This is the button that triggers the SweetAlert
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full text-base font-semibold shadow-md transition-all duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login" className="bg-gradient-to-r from-amber-400 to-yellow-600 text-blue-900 px-5 py-2 rounded-full text-base font-semibold hover:from-amber-500 hover:to-yellow-700 transition-all duration-300 shadow-md">
                Login
              </Link>
              <Link to="/register" className="border border-white/40 text-white px-5 py-2 rounded-full text-base font-semibold hover:bg-white/10 hover:border-white transition-all duration-300">
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile dropdown */}
        {isMobileOpen && (
          <div className="md:hidden bg-blue-950 px-4 py-3 space-y-3 shadow-inner">
            <Link to="/events" onClick={closeMobile} className="block text-white hover:bg-blue-800 px-4 py-2 rounded-md font-medium transition-colors duration-200">
              Events
            </Link>

            {isAuthenticated && hasRole(['ROLE_USER', 'ROLE_ADMIN']) && (
              <Link to="/my-bookings" onClick={closeMobile} className="block text-white hover:bg-blue-800 px-4 py-2 rounded-md font-medium transition-colors duration-200">
                My Bookings
              </Link>
            )}

            {isAuthenticated && hasRole(['ROLE_ADMIN']) && (
              <>
                <Link to="/admin/dashboard" onClick={closeMobile} className="block bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-full font-semibold transition-all duration-300">
                  Admin Dashboard
                </Link>
                <Link to="/admin/events/new" onClick={closeMobile} className="block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-semibold transition-all duration-300">
                  Add/Edit Events
                </Link>
              </>
            )}

            {isAuthenticated ? (
              <>
                <div className="text-amber-300 text-base border-t border-blue-800 pt-3">
                  Hello, <span className="font-semibold">
                    {user?.role === 'ROLE_ADMIN' ? 'Admin' : user?.username}
                  </span> (<span className="text-sm">{user?.role?.replace('ROLE_', '')}</span>)
                </div>
                <button
                  onClick={handleLogout} // This is also the button that triggers the SweetAlert
                  className="block bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full w-full text-left font-semibold transition-all duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={closeMobile} className="block bg-gradient-to-r from-amber-400 to-yellow-600 text-blue-900 px-4 py-2 rounded-full font-semibold w-full text-left transition-all duration-300 shadow-md">
                  Login
                </Link>
                <Link to="/register" onClick={closeMobile} className="block border border-white/40 text-white px-4 py-2 rounded-full font-semibold w-full text-left hover:bg-white/10 hover:border-white transition-all duration-300">
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;