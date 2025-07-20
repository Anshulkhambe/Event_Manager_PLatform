// src/App.jsx
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage'; // NEW: Import HomePage
import EventsPage from './pages/EventsPage'; // This is now your All Events grid page
import EventDetailsPage from './pages/EventDetailsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserBookingsPage from './pages/UserBookingsPage';
import AddEditEventPage from './pages/AddEditEventPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import AllEventsPage from './pages/AllEventsPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import UserAgreement from './pages/UserAgreement';
import Sitemap from './pages/Sitemap'
// REMOVED: AllEventsPage is no longer needed
// import AllEventsPage from './pages/AllEventsPage';

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <main className="pt-0">
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Set HomePage as the default route */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<UserAgreement />} />

          <Route path="/sitemap" element={<Sitemap />} />

          <Route path="/events" element={<EventsPage />} /> {/* EventsPage is now the All Events grid */}
          <Route path="/events/:id" element={<EventDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/all-events" element={<AllEventsPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          {/* Protected Routes */}
          <Route element={<PrivateRoute allowedRoles={['ROLE_USER', 'ROLE_ADMIN']} />}>
            <Route path="/my-bookings" element={<UserBookingsPage />} />
          </Route>

          {/* Admin Protected Routes */}
          <Route element={<PrivateRoute allowedRoles={['ROLE_ADMIN']} />}>
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/events/new" element={<AddEditEventPage />} />
            <Route path="/admin/events/edit/:id" element={<AddEditEventPage />} />
          </Route>

          {/* Fallback for unmatched routes */}
         
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </AuthProvider>
  );
}

const NotFoundPage = () => (
  <div className="text-center p-8 text-red-500">
    <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <Link to="/" className="text-indigo-600 hover:underline mt-4 block">Go to Home</Link>
  </div>
);

export default App;
