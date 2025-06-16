import { useState, useEffect } from 'react';
import axios from 'axios';

function HostDashboard() {
  const [listings, setListings] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    price: '',
    images: [''],
    availableDates: [{ start: '', end: '' }],
  });

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/listings', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setListings(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchListings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/listings', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('Listing created');
      window.location.reload();
    } catch (err) {
      alert('Failed to create listing');
    }
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-4">Host Dashboard</h2>
      <form onSubmit={handleSubmit} className="mb-8">
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Price per night"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={formData.images[0]}
          onChange={(e) => setFormData({ ...formData, images: [e.target.value] })}
          className="w-full p-2 mb-4 border rounded"
        />
        <button type="submit" className="bg-pink-600 text-white p-2 rounded hover:bg-pink-700">Create Listing</button>
      </form>
      <h3 className="text-xl font-semibold mb-4">Your Listings</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {listings.map((listing) => (
          <div key={listing._id} className="border rounded-lg p-4">
            <h4 className="text-lg font-semibold">{listing.title}</h4>
            <p>{listing.location}</p>
            <p>${listing.price}/night</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HostDashboard;