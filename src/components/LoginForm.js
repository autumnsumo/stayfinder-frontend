import React, { useState } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Replace with your actual backend URL
});

function LoginForm() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    isHost: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLoginMode ? '/api/auth/login' : '/api/auth/register';
      const payload = isLoginMode 
        ? { email: formData.email, password: formData.password }
        : formData;
      const response = await api.post(endpoint, payload);
      localStorage.setItem('token', response.data.token);
      window.location.href = '/home';
    } catch (err) {
      console.error(`${isLoginMode ? 'Login' : 'Registration'} failed:`, err);
      alert(`${isLoginMode ? 'Login' : 'Registration'} failed. Please check your ${isLoginMode ? 'credentials' : 'details'}.`);
    }
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setFormData({
      name: '',
      email: '',
      password: '',
      isHost: false,
    });
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        {isLoginMode ? 'Login' : 'Register'}
      </h2>
      <form onSubmit={handleSubmit}>
        {!isLoginMode && (
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
              required={!isLoginMode}
            />
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
            required
          />
        </div>
        {!isLoginMode && (
          <label className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={formData.isHost}
              onChange={(e) => setFormData({ ...formData, isHost: e.target.checked })}
              className="mr-2"
            />
            Register as Host
          </label>
        )}
        <button
          type="submit"
          className="w-full bg-pink-600 text-white p-3 rounded-lg hover:bg-pink-700 focus:outline-none focus:shadow-outline transition duration-200 ease-in-out"
        >
          {isLoginMode ? 'Login' : 'Register'}
        </button>
      </form>
      <p className="mt-4 text-center text-gray-600">
        {isLoginMode ? "Don't have an account?" : 'Already have an account?'}
        <button
          onClick={toggleMode}
          className="ml-1 text-pink-600 hover:text-pink-700 font-semibold focus:outline-none"
        >
          {isLoginMode ? 'Register' : 'Login'}
        </button>
      </p>
    </div>
  );
}

export default LoginForm;