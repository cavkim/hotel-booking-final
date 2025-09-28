import React, { useState } from 'react';
import { Menu, Home, Search, Filter } from 'lucide-react';
import RoomCard from './RoomCard';

const RoomListings = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [roomsPerPage, setRoomsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Sample room data
  const rooms = [
    {
      id: 1,
      type: 'Solo',
      price: 145,
      hotelName: 'Grand Plaza Hotel',
      offer: 'Early Bird Special',
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      rating: 4.8,
      location: 'Ocean View'
    },
    {
      id: 2,
      type: 'Double',
      price: 245,
      hotelName: 'Grand Plaza Hotel',
      offer: 'Early Bird Special',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80',
      rating: 4.9,
      location: 'Garden View'
    },
    {
      id: 3,
      type: 'Suite',
      price: 345,
      hotelName: 'Grand Plaza Hotel',
      offer: 'Early Bird Special',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      rating: 4.7,
      location: 'Mountain View'
    },
    {
      id: 4,
      type: 'Solo',
      price: 165,
      hotelName: 'Grand Plaza Hotel',
      offer: 'Early Bird Special',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
      rating: 4.6,
      location: 'City View'
    },
    {
      id: 5,
      type: 'Double',
      price: 265,
      hotelName: 'Grand Plaza Hotel',
      offer: 'Early Bird Special',
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
      rating: 4.8,
      location: 'Ocean View'
    },
    {
      id: 6,
      type: 'Suite',
      price: 365,
      hotelName: 'Grand Plaza Hotel',
      offer: 'Early Bird Special',
      image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
      rating: 4.9,
      location: 'Garden View'
    },
    {
      id: 7,
      type: 'Solo',
      price: 185,
      hotelName: 'Grand Plaza Hotel',
      offer: 'Early Bird Special',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
      rating: 4.7,
      location: 'Mountain View'
    },
    {
      id: 8,
      type: 'Double',
      price: 285,
      hotelName: 'Grand Plaza Hotel',
      offer: 'Early Bird Special',
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
      rating: 4.8,
      location: 'City View'
    },
    {
      id: 9,
      type: 'Suite',
      price: 385,
      hotelName: 'Grand Plaza Hotel',
      offer: 'Early Bird Special',
      image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
      rating: 4.9,
      location: 'Ocean View'
    },
    {
      id: 10,
      type: 'Solo',
      price: 205,
      hotelName: 'Grand Plaza Hotel',
      offer: 'Early Bird Special',
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      rating: 4.6,
      location: 'Garden View'
    },
    {
      id: 11,
      type: 'Double',
      price: 305,
      hotelName: 'Grand Plaza Hotel',
      offer: 'Early Bird Special',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80',
      rating: 4.8,
      location: 'Mountain View'
    },
    {
      id: 12,
      type: 'Suite',
      price: 405,
      hotelName: 'Grand Plaza Hotel',
      offer: 'Early Bird Special',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      rating: 4.9,
      location: 'City View'
    },
    {
      id: 13,
      type: 'Solo',
      price: 225,
      hotelName: 'Grand Plaza Hotel',
      offer: 'Early Bird Special',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
      rating: 4.7,
      location: 'Ocean View'
    },
    {
      id: 14,
      type: 'Double',
      price: 325,
      hotelName: 'Grand Plaza Hotel',
      offer: 'Early Bird Special',
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
      rating: 4.8,
      location: 'Garden View'
    },
    {
      id: 15,
      type: 'Suite',
      price: 425,
      hotelName: 'Grand Plaza Hotel',
      offer: 'Early Bird Special',
      image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
      rating: 4.9,
      location: 'Mountain View'
    },
    {
      id: 16,
      type: 'Solo',
      price: 245,
      hotelName: 'Grand Plaza Hotel',
      offer: 'Early Bird Special',
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      rating: 4.6,
      location: 'City View'
    },
    // Additional rooms for load more functionality
    {
      id: 17,
      type: 'Double',
      price: 285,
      hotelName: 'Grand Plaza Hotel',
      offer: 'Weekend Special',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80',
      rating: 4.7,
      location: 'Ocean View'
    },
    {
      id: 18,
      type: 'Suite',
      price: 445,
      hotelName: 'Grand Plaza Hotel',
      offer: 'Premium Package',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      rating: 4.9,
      location: 'Garden View'
    },
    {
      id: 19,
      type: 'Solo',
      price: 195,
      hotelName: 'Grand Plaza Hotel',
      offer: 'Early Bird Special',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
      rating: 4.5,
      location: 'Mountain View'
    },
    {
      id: 20,
      type: 'Double',
      price: 295,
      hotelName: 'Grand Plaza Hotel',
      offer: 'Family Package',
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
      rating: 4.8,
      location: 'City View'
    },
    {
      id: 21,
      type: 'Suite',
      price: 485,
      hotelName: 'Grand Plaza Hotel',
      offer: 'Luxury Experience',
      image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
      rating: 4.9,
      location: 'Ocean View'
    },
    {
      id: 22,
      type: 'Solo',
      price: 165,
      hotelName: 'Grand Plaza Hotel',
      offer: 'Budget Friendly',
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      rating: 4.4,
      location: 'Garden View'
    },
    {
      id: 23,
      type: 'Double',
      price: 275,
      hotelName: 'Grand Plaza Hotel',
      offer: 'Romantic Getaway',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80',
      rating: 4.7,
      location: 'Mountain View'
    },
    {
      id: 24,
      type: 'Suite',
      price: 525,
      hotelName: 'Grand Plaza Hotel',
      offer: 'Executive Suite',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      rating: 4.9,
      location: 'City View'
    }
  ];

  const filteredRooms = rooms.filter(room => {
    const matchesFilter = activeFilter === 'all' || room.type.toLowerCase() === activeFilter.toLowerCase();
    const matchesSearch = room.hotelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         room.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  // Get rooms for current page
  const totalRooms = filteredRooms.length;
  const totalPages = Math.ceil(totalRooms / roomsPerPage);
  const displayedRooms = filteredRooms.slice(0, currentPage * roomsPerPage);
  const hasMoreRooms = displayedRooms.length < totalRooms;

  const loadMoreRooms = async () => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setCurrentPage(prev => prev + 1);
    setIsLoading(false);
  };

  const resetPagination = () => {
    setCurrentPage(1);
  };

  // Reset pagination when filters change
  React.useEffect(() => {
    resetPagination();
  }, [activeFilter, searchQuery]);

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-16 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">ROOM</h2>
        </div>

        {/* Enhanced Filter Bar */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Price Range */}
            <div className="relative">
              <Menu className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300 appearance-none">
                <option>Price Range</option>
                <option>$0 - $200</option>
                <option>$200 - $400</option>
                <option>$400+</option>
              </select>
            </div>

            {/* Room Type */}
            <div className="relative">
              <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select 
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300 appearance-none"
              >
                <option value="all">Room Type</option>
                <option value="solo">Solo</option>
                <option value="double">Double</option>
                <option value="suite">Suite</option>
              </select>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300"
              />
            </div>

            {/* Filter Button */}
            <button className="bg-gradient-to-r from-teal-600 to-teal-700 text-white py-3 px-6 rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
              <Filter className="w-5 h-5" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>

        {/* Load More Button */}
        {hasMoreRooms && displayedRooms.length > 0 && (
          <div className="text-center mt-12">
            <button 
              onClick={loadMoreRooms}
              disabled={isLoading}
              className={`py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 font-semibold ${
                isLoading 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-white border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                  <span>Loading...</span>
                </div>
              ) : (
                `Load More Rooms (${totalRooms - displayedRooms.length} remaining)`
              )}
            </button>
          </div>
        )}

        {/* Show All Loaded Message */}
        {!hasMoreRooms && displayedRooms.length > 0 && (
          <div className="text-center mt-12">
            <p className="text-gray-600 text-lg">
              🎉 All {totalRooms} rooms have been loaded!
            </p>
          </div>
        )}

        {/* No Results */}
        {displayedRooms.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No rooms found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default RoomListings; 