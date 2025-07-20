// src/components/Layout.jsx
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * Layout component that provides a consistent structure for pages.
 * It includes a Navbar at the top, a main content area, and a Footer at the bottom.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be rendered within the main area.
 */
const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-inter">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
