import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <nav className="bg-white shadow p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-pink-600">StayFinder</Link>
        <div>
          {isAuthenticated ? (
            <>
              <Link to="/host-dashboard" className="mr-4 text-gray-700 hover:text-pink-600">Host Dashboard</Link>
              <button onClick={handleLogout} className="text-gray-700 hover:text-pink-600">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4 text-gray-700 hover:text-pink-600">Login</Link>
              <Link to="/register" className="text-gray-700 hover:text-pink-600">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;