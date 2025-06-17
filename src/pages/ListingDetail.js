import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';

function ListingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [bookingError, setBookingError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState('');

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

  const handleBooking = async (e) => {
    e.preventDefault();
    setBookingError('');
    setBookingSuccess('');

    // Validate dates
    if (!startDate || !endDate) {
      setBookingError('Please select both start and end dates.');
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start >= end) {
      setBookingError('End date must be after start date.');
      return;
    }

    // Check if selected dates are within available dates
    const isAvailable = listing.availableDates.some(date => {
      const availableStart = new Date(date.start);
      const availableEnd = new Date(date.end);
      return start >= availableStart && end <= availableEnd;
    });

    if (!isAvailable) {
      setBookingError('Selected dates are not available.');
      return;
    }

    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      setBookingError('Please log in to book this listing.');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    // Send booking request to backend
    try {
      const response = await api.post('/bookings', {
        listingId: id,
        startDate,
        endDate,
      });
      setBookingSuccess('Booking successful! Redirecting to your dashboard...');
      setTimeout(() => navigate('/host-dashboard'), 2000);
    } catch (err) {
      console.error('Error creating booking:', err);
      setBookingError(err.response?.data?.message || 'Failed to book the listing. Please try again.');
    }
  };

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

      {/* Booking Form */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Book This Place</h3>
        {bookingError && <p className="text-red-600 mb-2">{bookingError}</p>}
        {bookingSuccess && <p className="text-green-600 mb-2">{bookingSuccess}</p>}
        <form onSubmit={handleBooking} className="flex flex-col gap-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700"
          >
            Book Now
          </button>
        </form>
      </div>

      {/* Placeholder for Map and Payment sections */}
    </div>
  );
}

export default ListingDetail;