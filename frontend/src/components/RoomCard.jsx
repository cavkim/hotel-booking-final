import React, { useState } from 'react';
import { Heart, Star, MapPin, Users, Wifi, Car, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { showLoginModal } from '../redux/actions/authActions';

const RoomCard = ({ room }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);

  const handleViewDetails = () => {
    navigate(`/room/${room.id}`);
  };

  const handleBooking = () => {
    if (isAuthenticated) {
      navigate(`/booking/${room.id}`, { state: { room } });
    } else {
      dispatch(showLoginModal({
        message: 'You need to sign in to your account to make a booking. Please log in to continue.',
        redirectPath: `/booking/${room.id}`
      }));
    }
  };

  return (
    <div 
      className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleViewDetails}
    >
      {/* Room Image */}
      <div className="relative mb-4 overflow-hidden rounded-xl">
        <img
          src={room.image}
          alt={room.name}
          className={`w-full h-48 object-cover transition-transform duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        {/* Solo Tag */}
        <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-bold">
          {room.type}
        </div>
        {/* Price */}
        <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm text-gray-800 px-2 py-1 rounded-lg text-lg font-bold">
          ${room.price}
        </div>
        {/* Heart Icon */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-300 ${
            isLiked 
              ? 'bg-red-500 text-white' 
              : 'bg-white/90 backdrop-blur-sm text-gray-600 hover:bg-red-50'
          }`}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Hotel Name */}
      <div className="text-lg font-semibold text-gray-700 mb-1">
        {room.hotelName}
      </div>

      {/* Offer */}
      <div className="text-sm text-teal-600 font-medium mb-3">
        {room.offer}
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>

      {/* Buttons */}
      <div className="flex space-x-2">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            handleBooking();
          }}
          className={`flex-1 py-2 px-4 rounded-xl transition-all duration-300 font-semibold text-sm flex items-center justify-center space-x-2 ${
            isAuthenticated 
              ? 'bg-gradient-to-r from-teal-600 to-teal-700 text-white hover:from-teal-700 hover:to-teal-800 transform hover:scale-105' 
              : 'bg-gradient-to-r from-gray-400 to-gray-500 text-white cursor-not-allowed'
          }`}
        >
          {!isAuthenticated && <Lock className="w-4 h-4" />}
          <span>{isAuthenticated ? 'Booking' : 'Login Required'}</span>
        </button>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            handleViewDetails();
          }}
          className="flex-1 bg-white border border-teal-600 text-teal-600 py-2 px-4 rounded-xl hover:bg-teal-50 transition-all duration-300 font-semibold text-sm"
        >
          Available
        </button>
      </div>

    </div>
  );
};

export default RoomCard; 