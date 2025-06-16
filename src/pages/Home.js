import { useState, useEffect } from 'react';
import api from '../utils/api';
import PropertyCard from '../components/PropertyCard';

function Home() {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    location: '',
    maxPrice: '',
    startDate: '',
  });

  const fetchListings = async () => {
    try {
      const params = {};
      if (filters.location) params.location = filters.location;
      if (filters.maxPrice) params.maxPrice = filters.maxPrice;
      if (filters.startDate) params.startDate = filters.startDate;

      const response = await api.get('/listings', { params });
      console.log('Fetched listings:', response.data);
      setListings(response.data);
      console.log('Updated listings state:', response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching listings:', err);
      setError('Failed to load listings. Please ensure the backend is running at http://localhost:5000.');
    }
  };

  useEffect(() => {
    fetchListings();
  }, [filters]);

  const handleSearch = (e) => {
    e.preventDefault();
    setFilters({
      location: e.target.location.value,
      maxPrice: e.target.maxPrice.value,
      startDate: e.target.startDate.value,
    });
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-4">Available Properties</h2>
      <form onSubmit={handleSearch} className="mb-8 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          name="location"
          placeholder="Location"
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          className="p-2 border rounded"
        />
        <input
          type="date"
          name="startDate"
          className="p-2 border rounded"
        />
        <button type="submit" className="bg-pink-600 text-white p-2 rounded hover:bg-pink-700">Search</button>
      </form>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {listings.length === 0 && !error ? (
        <div>No listings available.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {listings.map((listing) => (
            <PropertyCard key={listing._id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;