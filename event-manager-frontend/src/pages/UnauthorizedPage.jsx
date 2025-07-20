    // src/pages/UnauthorizedPage.jsx
    import React from 'react';
    import { Link } from 'react-router-dom';

    const UnauthorizedPage = () => {
      return (
        <div className="text-center p-8 text-red-500">
          <h1 className="text-4xl font-bold mb-4">403 - Unauthorized</h1>
          <p>You do not have permission to view this page.</p>
          <Link to="/" className="text-indigo-600 hover:underline mt-4 block">Go to Home</Link>
        </div>
      );
    };

    export default UnauthorizedPage;
    