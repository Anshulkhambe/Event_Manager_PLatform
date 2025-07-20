// src/pages/PrivacyPolicy.jsx (or src/PrivacyPolicy.jsx)

import React from 'react';
import { Shield } from 'lucide-react'; // Example icon for visual appeal

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-xl border border-gray-100">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-600 p-4 rounded-full shadow-lg">
              <Shield className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600">Last Updated: July 16, 2025</p>
        </div>

        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
          <p>
            Welcome to Eventify! We are committed to protecting your privacy and ensuring you have a positive experience on our website and while using our services. This Privacy Policy outlines how Eventify ("we", "our", or "us") collects, uses, maintains, and discloses information collected from users (each, a "User") of the <a href="https://www.eventify.com" className="text-blue-600 hover:underline">eventify.com</a> website ("Site") and all products and services offered by Eventify.
          </p>

          <h2 className="text-3xl font-bold text-gray-800 mt-10 mb-4">1. Information We Collect</h2>
          <p>We may collect personal identification information from Users in a variety of ways, including, but not limited to, when Users visit our site, register on the site, place an order, subscribe to the newsletter, respond to a survey, fill out a form, and in connection with other activities, services, features or resources we make available on our Site. Users may be asked for, as appropriate, name, email address, mailing address, phone number, credit card information.</p>
          <p>We will collect personal identification information from Users only if they voluntarily submit such information to us. Users can always refuse to supply personally identification information, except that it may prevent them from engaging in certain Site related activities.</p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">Non-personal identification information</h3>
          <p>We may collect non-personal identification information about Users whenever they interact with our Site. Non-personal identification information may include the browser name, the type of computer and technical information about Users means of connection to our Site, such as the operating system and the Internet service providers utilized and other similar information.</p>

          <h2 className="text-3xl font-bold text-gray-800 mt-10 mb-4">2. How We Use Collected Information</h2>
          <p>Eventify may collect and use Users personal information for the following purposes:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>To improve customer service</li>
            <li>To personalize user experience</li>
            <li>To improve our Site</li>
            <li>To process payments</li>
            <li>To run a promotion, contest, survey or other Site feature</li>
            <li>To send Users information they agreed to receive about topics we think will be of interest to them.</li>
            <li>To send periodic emails (e.g., event updates, newsletters).</li>
          </ul>

          <h2 className="text-3xl font-bold text-gray-800 mt-10 mb-4">3. How We Protect Your Information</h2>
          <p>We adopt appropriate data collection, storage and processing practices and security measures to protect against unauthorized access, alteration, disclosure or destruction of your personal information, username, password, transaction information and data stored on our Site.</p>
          <p>Sensitive and private data exchange between the Site and its Users happens over an SSL secured communication channel and is encrypted and protected with digital signatures.</p>

          <h2 className="text-3xl font-bold text-gray-800 mt-10 mb-4">4. Sharing Your Personal Information</h2>
          <p>We do not sell, trade, or rent Users personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates and advertisers for the purposes outlined above. We may use third party service providers to help us operate our business and the Site or administer activities on our behalf, such as sending out newsletters or surveys. We may share your information with these third parties for those limited purposes provided that you have given us your permission.</p>

          <h2 className="text-3xl font-bold text-gray-800 mt-10 mb-4">5. Third-Party Websites</h2>
          <p>Users may find advertising or other content on our Site that link to the sites and services of our partners, suppliers, advertisers, sponsors, licensors and other third parties. We do not control the content or links that appear on these sites and are not responsible for the practices employed by websites linked to or from our Site. In addition, these sites or services, including their content and links, may be constantly changing. These sites and services may have their own privacy policies and customer service policies. Browse and interaction on any other website, including websites which have a link to our Site, is subject to that website's own terms and policies.</p>

          <h2 className="text-3xl font-bold text-gray-800 mt-10 mb-4">6. Changes to This Privacy Policy</h2>
          <p>Eventify has the discretion to update this privacy policy at any time. When we do, we will revise the "last updated" date at the top of this page. We encourage Users to frequently check this page for any changes to stay informed about how we are helping to protect the personal information we collect. You acknowledge and agree that it is your responsibility to review this privacy policy periodically and become aware of modifications.</p>

          <h2 className="text-3xl font-bold text-gray-800 mt-10 mb-4">7. Your Acceptance of These Terms</h2>
          <p>By using this Site, you signify your acceptance of this policy and <a href="/terms-of-service" className="text-blue-600 hover:underline">terms of service</a>. If you do not agree to this policy, please do not use our Site. Your continued use of the Site following the posting of changes to this policy will be deemed your acceptance of those changes.</p>

          <h2 className="text-3xl font-bold text-gray-800 mt-10 mb-4">8. Contacting Us</h2>
          <p>If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us at:</p>
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

export default PrivacyPolicy;