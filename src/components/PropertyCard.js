import { Link } from 'react-router-dom';

function PropertyCard({ listing }) {
  console.log('Rendering PropertyCard for:', listing.title);
  return (
    <Link to={`/listing/${listing._id}`} className="border rounded-lg overflow-hidden shadow hover:shadow-lg">
      <img src={listing.images[0] || 'https://via.placeholder.com/300'} alt={listing.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{listing.title}</h3>
        <p className="text-gray-600">{listing.location}</p>
        <p className="text-pink-600 font-bold">${listing.price}/night</p>
      </div>
    </Link>
  );
}

export default PropertyCard;