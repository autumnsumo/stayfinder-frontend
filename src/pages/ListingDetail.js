import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';

function ListingDetail() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await api.get(`/listings/${id}`);
        setListing(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching listing:', err);
        setError('Failed to load listing. Please try again.');
      }
    };
    fetchListing();
  }, [id]);

  if (error) return <div className="text-red-600 text-center mt-8">{error}</div>;
  if (!listing) return <div className="text-center mt-8">Loading...</div>;

  return (
    <div className="container mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-4">{listing.title}</h2>
      <img
        src={listing.images[0] || 'https://picsum.photos/300'}
        alt={listing.title}
        className="w-full h-96 object-cover rounded-lg mb-4"
      />
      <p className="text-gray-600 mb-2">{listing.location}</p>
      <p className="text-pink-600 font-bold mb-4">${listing.price}/night</p>
      <p className="text-gray-800 mb-4">{listing.description}</p>
      <p className="text-gray-600 mb-4">
        Hosted by: {listing.host.name}
      </p>
      <p className="text-gray-600 mb-4">
        Available from: {new Date(listing.availableDates[0].start).toLocaleDateString()} to{' '}
        {new Date(listing.availableDates[0].end).toLocaleDateString()}
      </p>
      {/* Placeholder for Map and Payment sections */}
    </div>
  );
}

export default ListingDetail;