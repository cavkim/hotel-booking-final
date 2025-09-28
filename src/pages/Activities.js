import React from 'react';
import { 
  MapPin, 
  Star, 
  Clock, 
  Utensils,
  Heart,
  Lock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { showLoginModal } from '../redux/actions/authActions';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Activities = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);

  const waterActivities = [
    {
      id: 1,
      title: 'Traditional Boat Tour',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80',
      description: 'Explore the coastline in traditional wooden boats',
      duration: '2-3 hours',
      price: '$45'
    },
    {
      id: 2,
      title: 'Sunset Kayaking',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
      description: 'Paddle through calm waters during golden hour',
      duration: '1.5 hours',
      price: '$35'
    },
    {
      id: 3,
      title: 'Jet Ski Adventure',
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
      description: 'High-speed adventure across the open water',
      duration: '1 hour',
      price: '$75'
    },
    {
      id: 4,
      title: 'Banana Boat Ride',
      image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
      description: 'Fun group activity for all ages',
      duration: '30 minutes',
      price: '$25'
    }
  ];

  const handleActivityBooking = (activity) => {
    if (isAuthenticated) {
      // Navigate to booking page with activity data
      navigate('/booking/activity', { 
        state: { 
          activity: {
            ...activity,
            type: 'activity',
            category: 'water-activities'
          }
        } 
      });
    } else {
      // Show login modal
      dispatch(showLoginModal({
        message: 'You need to sign in to your account to book this activity. Please log in to continue.',
        redirectPath: '/booking/activity'
      }));
    }
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-screen bg-gradient-to-br from-blue-400 to-teal-600 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80')"
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>
        
        <div className="relative z-10 flex items-center justify-center h-full pt-20">
          <div className="text-center text-white max-w-4xl px-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
              Experience Something New Every Moment
            </h1>
            <p className="text-xl md:text-2xl mb-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              Escape to a place where you can relax and unwind, rejuvenate, and reconnect
            </p>
            <button className="bg-white text-teal-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 animate-slide-up" style={{ animationDelay: '0.6s' }}>
              Explore Activities
            </button>
          </div>
        </div>
      </section>

      {/* Find Your Best Destination */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Find Your Best Destination</h2>
            <p className="text-gray-600 text-lg">Discover unique experiences that will create lasting memories</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Bioluminescent Experience */}
            <div className="relative">
              <div className="relative h-96 rounded-3xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80"
                  alt="Bioluminescent Experience"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Bioluminescent Experience</h3>
                  <p className="text-sm opacity-90">Witness the magical glow of bioluminescent plankton</p>
                </div>
              </div>
            </div>

            {/* Right - Snorkeling Experience */}
            <div className="relative">
              <div className="relative h-96 rounded-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
                  alt="Snorkeling Experience"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Coral Reef Exploration</h3>
                  <p className="text-sm opacity-90">Find the best place to travel and relax</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Water Activities Section */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Boating for Fun, Viewing Corals and Underwater Plants</h2>
            <p className="text-gray-600 text-lg">Explore the vibrant marine life and crystal-clear waters</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {waterActivities.map((activity) => (
              <div 
                key={activity.id}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
              >
                <div className="relative mb-4">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-48 object-cover rounded-xl"
                  />
                  <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full text-xs font-semibold text-gray-800">
                    {activity.price}
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{activity.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{activity.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{activity.duration}</span>
                  </div>
                  <button 
                    onClick={() => handleActivityBooking(activity)}
                    className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                      isAuthenticated 
                        ? 'bg-teal-600 text-white hover:bg-teal-700' 
                        : 'bg-gray-400 text-white cursor-not-allowed'
                    }`}
                  >
                    {!isAuthenticated && <Lock className="w-4 h-4" />}
                    <span>{isAuthenticated ? 'Book Now' : 'Login Required'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dining Section */}
      <section className="py-20 px-8 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Delicious Seafood Restaurant</h2>
            <p className="text-gray-600 text-lg">Experience the finest Khmer cuisine with ocean views</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Left - Description */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center space-x-3 mb-6">
                  <Utensils className="w-8 h-8 text-orange-500" />
                  <h3 className="text-2xl font-bold text-gray-800">Seafood Restaurant</h3>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Seafood Restaurant is a famous Khmer restaurant specializing in fresh seafood. 
                  Dine with a beautiful view of the ocean and enjoy the finest local ingredients.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="text-gray-700">4.8/5 Rating</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">Open Daily 6:00 AM - 10:00 PM</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">Beachfront Location</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Center - Restaurant Images */}
            <div className="lg:col-span-1 space-y-4">
              <div className="relative h-64 rounded-2xl overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <img
                  src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  alt="Restaurant View"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative h-48 rounded-2xl overflow-hidden transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                <img
                  src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  alt="Restaurant Pier"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right - Food Images */}
            <div className="lg:col-span-1 space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="relative h-32 rounded-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
                    alt="Fresh Seafood"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <span className="text-white font-semibold">Fresh Seafood</span>
                  </div>
                </div>
                <div className="relative h-32 rounded-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
                    alt="Grilled Specialties"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <span className="text-white font-semibold">Grilled Specialties</span>
                  </div>
                </div>
                <div className="relative h-32 rounded-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
                    alt="Romantic Dining"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <span className="text-white font-semibold">Romantic Dining</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inspirational Message Section */}
      <section className="py-20 px-8 bg-gradient-to-br from-teal-600 to-blue-700">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Message */}
            <div className="text-white">
              <h2 className="text-3xl font-bold mb-6">Enjoy Your Time Off and Create Wonderful Memories</h2>
              <p className="text-lg leading-relaxed mb-6">
                Can't wait to hear all about your adventures. May this vacation be a time of great joy, 
                peace, and self-care. Enjoy every moment, you deserve it!
              </p>
              <div className="flex items-center space-x-4">
                <Heart className="w-6 h-6 text-red-400" />
                <span className="text-sm opacity-90">From The Oceanscape Team</span>
              </div>
            </div>

            {/* Right - Image */}
            <div className="relative">
              <div className="relative h-96 rounded-3xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  alt="Tropical Paradise"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resort Aerial View */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Tropical Paradise</h2>
            <p className="text-gray-600 text-lg">Experience luxury in harmony with nature</p>
          </div>
          
          <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80"
              alt="Resort Aerial View"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-2xl font-bold mb-2">Overwater Bungalows</h3>
              <p className="text-sm opacity-90">Luxury accommodations surrounded by turquoise waters</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Activities; 