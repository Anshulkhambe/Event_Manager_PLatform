import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await register(username, email, password);
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      // Check if err.response.data is a string, and if so, use it directly
      const errorMessage = typeof err.response?.data === 'string' 
        ? err.response.data 
        : err.response?.data?.message || 'Registration failed. Please try again.';
      
      setError(errorMessage);
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-6 bg-gradient-to-br from-blue-900 via-indigo-950 to-purple-950">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-md animate-fade-in-up">
        <h2 className="text-4xl font-bold mb-8 text-center text-white">
          Join Event<span className="text-amber-400">ify</span>
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6"> {/* Increased space-y for better spacing */}
          <div>
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
              placeholder="Choose a unique username"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-white text-base font-semibold mb-3">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow-lg appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 bg-white/90"
              required
              disabled={loading}
              placeholder="Enter your email address"
            />
          </div>
          <div>
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
              placeholder="Create a strong password"
            />
          </div>
          {error && <p className="bg-red-500/20 text-red-300 border border-red-400 p-3 rounded-md text-sm text-center shadow-inner mt-4">{error}</p>}
          <button
            type="submit"
            className="group bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline w-full transition-all duration-300 transform hover:scale-105 hover:from-green-600 hover:to-emerald-700 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="mt-8 text-center text-gray-200 text-md">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-amber-300 hover:underline hover:text-amber-200 transition-colors duration-300">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;