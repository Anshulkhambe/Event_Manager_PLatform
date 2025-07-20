// src/pages/TermsOfService.jsx (or src/TermsOfService.jsx)

import React from 'react';
import { FileText } from 'lucide-react'; // Example icon

const UserAgreement = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-xl border border-gray-100">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <div className="bg-purple-600 p-4 rounded-full shadow-lg">
              <FileText className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-600">Last Updated: July 16, 2025</p>
        </div>

        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
          <p>
            Welcome to Eventify! These Terms of Service ("Terms") govern your use of the Eventify website (<a href="https://www.eventify.com" className="text-blue-600 hover:underline">eventify.com</a>) and all related services provided by Eventify. By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the service.
          </p>

          <h2 className="text-3xl font-bold text-gray-800 mt-10 mb-4">1. Services Provided</h2>
          <p>Eventify offers comprehensive event planning and management services, including but not limited to, venue selection, vendor coordination, decor design, entertainment booking, photography, and on-site event management for various types of events such as weddings, corporate events, birthday parties, and festivals.</p>
          <p>The exact scope of services will be detailed in a separate service agreement or proposal, which will form an integral part of these Terms once accepted by both parties.</p>

          <h2 className="text-3xl font-bold text-gray-800 mt-10 mb-4">2. User Accounts</h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>To access certain features of our services, you may be required to register for an account.</li>
            <li>You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.</li>
            <li>You are responsible for safeguarding your password and for any activities or actions under your password. Eventify cannot and will not be liable for any loss or damage arising from your failure to comply with the above requirements.</li>
          </ul>

          <h2 className="text-3xl font-bold text-gray-800 mt-10 mb-4">3. Payments, Cancellations, and Refunds</h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>**Pricing:** All prices for services are quoted in INR (Indian Rupees) unless otherwise specified. Detailed pricing will be provided in your custom proposal.</li>
            <li>**Payment Schedule:** A non-refundable deposit is required to secure your booking. Subsequent payments will be due according to a schedule outlined in your service agreement.</li>
            <li>**Cancellations:** Cancellation policies and associated fees will be clearly defined in your service agreement. Deposits are generally non-refundable.</li>
            <li>**Refunds:** Refunds (if any) will be processed according to the terms specified in your service agreement.</li>
          </ul>

          <h2 className="text-3xl font-bold text-gray-800 mt-10 mb-4">4. Intellectual Property</h2>
          <p>The Service and its original content (excluding content provided by users), features and functionality are and will remain the exclusive property of Eventify and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Eventify.</p>

          <h2 className="text-3xl font-bold text-gray-800 mt-10 mb-4">5. User Conduct</h2>
          <p>You agree not to use the Service for any unlawful purpose or for any purpose prohibited by these Terms. You may not use the Service in any manner that could damage, disable, overburden, or impair the Service or interfere with any other party's use and enjoyment of the Service.</p>

          <h2 className="text-3xl font-bold text-gray-800 mt-10 mb-4">6. Disclaimers and Limitation of Liability</h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>The Service is provided on an "AS IS" and "AS AVAILABLE" basis. Eventify makes no warranties, expressed or implied, and hereby disclaims all other warranties.</li>
            <li>In no event shall Eventify, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.</li>
          </ul>

          <h2 className="text-3xl font-bold text-gray-800 mt-10 mb-4">7. Governing Law</h2>
          <p>These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any dispute arising under these Terms shall be subject to the exclusive jurisdiction of the courts in Pune, Maharashtra, India.</p>

          <h2 className="text-3xl font-bold text-gray-800 mt-10 mb-4">8. Changes to Terms</h2>
          <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>

          <h2 className="text-3xl font-bold text-gray-800 mt-10 mb-4">9. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us:</p>
          <p className="mt-4">
            <strong>Eventify</strong><br />
            123 Event Avenue, Sector 18<br />
            Pune, Maharashtra, India<br />
            Email: <a href="mailto:info@eventify.com" className="text-blue-600 hover:underline">info@eventify.com</a><br />
            Phone: +91 98765 43210
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserAgreement;