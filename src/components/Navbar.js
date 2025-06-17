import { Link, useNavigate } from 'react-router-dom';

function Navbar({ isAuthenticated, onLogout }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/home" className="text-xl font-bold">StayFinder</Link>
        <div className="space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/home" className="hover:underline">Home</Link>
              <button
                onClick={handleLogoutClick}
                className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;