// src/pages/Sitemap.jsx (or src/Sitemap.jsx)

import React from 'react';
import { Snail } from 'lucide-react'; // A unique icon for sitemap

const Sitemap = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-xl border border-gray-100">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <div className="bg-green-600 p-4 rounded-full shadow-lg">
              <Snail className="w-12 h-12 text-white" /> {/* Snail icon to symbolize crawling/navigation */}
            </div>
          </div>
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">Site Map</h1>
          <p className="text-lg text-gray-600">A guide to easily navigate Eventify</p>
        </div>

        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Main Navigation</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><a href="/" className="text-blue-600 hover:underline">Home</a></li>
              <li><a href="/services" className="text-blue-600 hover:underline">Services</a>
                <ul className="list-circle list-inside space-y-1 ml-6 text-sm">
                  <li><a href="/services#weddings" className="text-gray-600 hover:underline">Weddings</a></li>
                  <li><a href="/services#corporate" className="text-gray-600 hover:underline">Corporate Events</a></li>
                  <li><a href="/services#birthdays" className="text-gray-600 hover:underline">Birthday Parties</a></li>
                  <li><a href="/services#concerts" className="text-gray-600 hover:underline">Concerts & Festivals</a></li>
                  <li><a href="/services#photography" className="text-gray-600 hover:underline">Photography & Videography</a></li>
                </ul>
              </li>
              <li><a href="/about" className="text-blue-600 hover:underline">About Us</a></li>
              <li><a href="/testimonials" className="text-blue-600 hover:underline">Testimonials</a></li>
              <li><a href="/contact" className="text-blue-600 hover:underline">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Legal & Information</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a></li>
              <li><a href="/terms-of-service" className="text-blue-600 hover:underline">Terms of Service</a></li>
              <li><a href="/sitemap" className="text-blue-600 hover:underline">HTML Site Map</a> (You are here!)</li>
              {/* This is the link for search engines - won't render directly for users but good to list */}
              <li><a href="/sitemap.xml" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">XML Site Map (for Search Engines)</a></li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-800 mt-8 mb-4">Other Important Pages</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><a href="/blog" className="text-blue-600 hover:underline">Blog / Latest News</a> (If you add one)</li>
              <li><a href="/faq" className="text-blue-600 hover:underline">Frequently Asked Questions</a> (If you add one)</li>
              <li><a href="/careers" className="text-blue-600 hover:underline">Careers</a> (If applicable)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;