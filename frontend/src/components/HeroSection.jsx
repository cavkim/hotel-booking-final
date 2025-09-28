import React, { useState } from 'react';
import { Calendar, User, Sun, ArrowRight, MapPin, Star } from 'lucide-react';

const HeroSection = () => {
  const [activeField, setActiveField] = useState(null);

  const handleFieldClick = (fieldName) => {
    setActiveField(fieldName);
  };

  return (
    <section className="relative h-screen bg-gradient-to-b from-blue-400 to-blue-600 overflow-hidden">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 animate-bounce">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
            <Star className="w-6 h-6 text-yellow-400" />
          </div>
        </div>
        <div className="absolute top-40 right-20 animate-pulse">
          <div className="bg-teal-500/20 backdrop-blur-sm rounded-full p-3">
            <MapPin className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="absolute bottom-40 left-20 animate-bounce" style={{ animationDelay: '1s' }}>
          <div className="bg-yellow-400/20 backdrop-blur-sm rounded-full p-3">
            <Sun className="w-6 h-6 text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-start justify-center h-full pt-0">
        <div className="text-center text-white mb-8 animate-fade-in mt-64">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-slide-up">
            Discover Paradise
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            Experience luxury and comfort at The Oceanscape
          </p>
        </div>

        {/* Booking Form */}
        <div className="absolute bottom-[28rem] left-1/2 transform -translate-x-1/2 w-full max-w-5xl px-4">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/20 animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
              {/* Check In */}
              <div 
                className={`flex items-center space-x-3 p-3 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                  activeField === 'checkin' 
                    ? 'border-teal-500 bg-teal-50 shadow-lg' 
                    : 'border-gray-200 hover:border-teal-300 hover:shadow-md'
                }`}
                onClick={() => handleFieldClick('checkin')}
              >
                <Calendar className="w-5 h-5 text-teal-600" />
                <div>
                  <div className="text-xs text-gray-500">Check In</div>
                  <div className="font-semibold text-gray-800 text-sm">25 April 2025</div>
                </div>
              </div>

              {/* Check Out */}
              <div 
                className={`flex items-center space-x-3 p-3 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                  activeField === 'checkout' 
                    ? 'border-teal-500 bg-teal-50 shadow-lg' 
                    : 'border-gray-200 hover:border-teal-300 hover:shadow-md'
                }`}
                onClick={() => handleFieldClick('checkout')}
              >
                <Calendar className="w-5 h-5 text-teal-600" />
                <div>
                  <div className="text-xs text-gray-500">Check Out</div>
                  <div className="font-semibold text-gray-800 text-sm">25 April 2025</div>
                </div>
              </div>

              {/* Guest */}
              <div 
                className={`flex items-center space-x-3 p-3 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                  activeField === 'guest' 
                    ? 'border-teal-500 bg-teal-50 shadow-lg' 
                    : 'border-gray-200 hover:border-teal-300 hover:shadow-md'
                }`}
                onClick={() => handleFieldClick('guest')}
              >
                <User className="w-5 h-5 text-teal-600" />
                <div>
                  <div className="text-xs text-gray-500">Guest</div>
                  <div className="font-semibold text-gray-800 text-sm">1 Room 3 Guest</div>
                </div>
              </div>

              {/* View */}
              <div 
                className={`flex items-center space-x-3 p-3 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                  activeField === 'view' 
                    ? 'border-teal-500 bg-teal-50 shadow-lg' 
                    : 'border-gray-200 hover:border-teal-300 hover:shadow-md'
                }`}
                onClick={() => handleFieldClick('view')}
              >
                <Sun className="w-5 h-5 text-teal-600" />
                <div>
                  <div className="text-xs text-gray-500">View</div>
                  <div className="font-semibold text-gray-800 text-sm">Sunset</div>
                </div>
              </div>

              {/* Search Button */}
              <div className="flex justify-center">
                <button className="bg-gradient-to-r from-teal-600 to-teal-700 text-white p-3 rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 