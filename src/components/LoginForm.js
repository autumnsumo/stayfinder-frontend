import React, { useState } from 'react'; // Corrected import statement
import axios from 'axios'; // Assuming you use axios for API calls. If not, replace with your API client.

// Create an instance of axios with a base URL if you have one.
// This is good practice to avoid repeating the base URL for every request.
const api = axios.create({
  baseURL: 'http://localhost:5000', // **IMPORTANT: Replace with your actual backend URL**
});

function LoginForm() { // It's good practice to wrap your component in a function definition
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use the 'api' instance to make the POST request
      const response = await api.post('/api/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      // It's generally better to use React Router for navigation if you have it set up.
      // For simple cases, window.location.href works but might cause a full page reload.
      window.location.href = '/';
    } catch (err) {
      console.error('Login failed:', err); // Log the full error for debugging
      // Provide more specific feedback if possible (e.g., from server response)
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded"> {/* Added some basic styling for better appearance */}
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2> {/* Centered heading */}

      <div className="mb-4"> {/* Added div for better input grouping and spacing */}
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
        <input
          type="email"
          id="email" // Added id for accessibility with label
          placeholder="Enter your email" // More descriptive placeholder
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500" // Improved styling
          required
        />
      </div>

      <div className="mb-6"> {/* Added div for better input grouping and spacing */}
        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
        <input
          type="password"
          id="password" // Added id for accessibility with label
          placeholder="Enter your password" // More descriptive placeholder
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500" // Improved styling
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-pink-600 text-white p-3 rounded-lg hover:bg-pink-700 focus:outline-none focus:shadow-outline transition duration-200 ease-in-out" // Improved styling
      >
        Login
      </button>
    </form>
  );
}

export default LoginForm;