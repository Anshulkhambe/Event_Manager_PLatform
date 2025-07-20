// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const userData = await login(username, password);
      if (userData.roles && userData.roles.includes('ROLE_ADMIN')) {
        navigate('/admin/dashboard');
      } else {
        navigate('/events');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-6 bg-gradient-to-br from-blue-900 via-indigo-950 to-purple-950">
      <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-md animate-fade-in-up">
        <h2 className="text-4xl font-bold mb-8 text-center text-white">
          Welcome Back!
        </h2>
        {error && <p className="bg-red-500/20 text-red-300 border border-red-400 p-3 rounded-md text-sm mb-6 text-center shadow-inner">{error}</p>}
        
        <div className="mb-6">
          <label htmlFor="username" className="block text-white text-base font-semibold mb-3">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="shadow-lg appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 bg-white/90"
            required
            disabled={loading}
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-8">
          <label htmlFor="password" className="block text-white text-base font-semibold mb-3">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow-lg appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 bg-white/90"
            required
            disabled={loading}
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="group bg-gradient-to-r from-amber-400 to-yellow-600 text-blue-900 font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline w-full transition-all duration-300 transform hover:scale-105 hover:from-amber-500 hover:to-yellow-700 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? 'Logging In...' : 'Login'}
        </button>
        <p className="text-center text-gray-200 text-md mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="font-bold text-amber-300 hover:underline hover:text-amber-200 transition-colors duration-300">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;