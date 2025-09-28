import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, Sparkles, Star, Zap, ArrowRight } from 'lucide-react';

const TrendingOffers = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });

  const offers = [
    {
      id: 1,
      title: 'Boat Transfer',
      subtitle: 'Luxury Experience',
      discount: '30% Off',
      originalPrice: '$120',
      currentPrice: '$84',
      daysLeft: '3',
      icon: '🚤',
      bgColor: 'from-teal-500 to-teal-600',
      accentColor: 'bg-teal-400',
      description: 'Luxury boat transfer to nearby islands',
      rating: 4.9,
      reviews: 127
    },
    {
      id: 2,
      title: 'Kayak Rentals',
      subtitle: 'Adventure Awaits',
      discount: '25% Off',
      originalPrice: '$80',
      currentPrice: '$60',
      daysLeft: '2',
      icon: '🛶',
      bgColor: 'from-blue-500 to-blue-600',
      accentColor: 'bg-blue-400',
      description: 'Explore crystal clear waters',
      rating: 4.8,
      reviews: 89
    },
    {
      id: 3,
      title: 'Island Bike Tour',
      subtitle: 'Scenic Journey',
      discount: '35% Off',
      originalPrice: '$95',
      currentPrice: '$62',
      daysLeft: '5',
      icon: '🚴',
      bgColor: 'from-cyan-500 to-teal-600',
      accentColor: 'bg-cyan-400',
      description: 'Scenic cycling adventure',
      rating: 4.7,
      reviews: 156
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % offers.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + offers.length) % offers.length);
  };

  const visibleOffers = offers.slice(currentSlide, currentSlide + 3);

  return (
    <section className="relative -mt-96 z-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="relative bg-gradient-to-r from-teal-600 to-teal-700 rounded-xl p-4 sm:p-6 shadow-lg border border-teal-500/20">
          {/* Background Pattern */}
          <div className="absolute inset-0 rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-teal-600/10 to-cyan-600/10"></div>
          </div>

          {/* Header */}
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
            <div className="flex items-center space-x-2 mb-3 sm:mb-0">
              <div className="relative">
                <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">Trending Offers</h2>
                <p className="text-teal-100 text-xs">Limited time deals</p>
              </div>
            </div>
            
            {/* Countdown Timer */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1 bg-red-500/20 px-2 py-1 rounded-lg border border-red-500/30">
                <Clock className="w-3 h-3 text-red-300" />
                <div className="flex space-x-1 text-white font-mono text-xs">
                  <span className="bg-red-500/30 px-1 py-0.5 rounded">{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span>:</span>
                  <span className="bg-red-500/30 px-1 py-0.5 rounded">{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span>:</span>
                  <span className="bg-red-500/30 px-1 py-0.5 rounded">{String(timeLeft.seconds).padStart(2, '0')}</span>
                </div>
              </div>
              
              {/* Navigation */}
              <div className="flex space-x-1">
                <button 
                  onClick={prevSlide}
                  className="bg-white/20 backdrop-blur-sm p-1.5 rounded-lg hover:bg-white/30 transition-all duration-300 transform hover:scale-105 border border-white/20"
                >
                  <ChevronLeft className="w-4 h-4 text-white" />
                </button>
                <button 
                  onClick={nextSlide}
                  className="bg-white/20 backdrop-blur-sm p-1.5 rounded-lg hover:bg-white/30 transition-all duration-300 transform hover:scale-105 border border-white/20"
                >
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Offers Grid */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleOffers.map((offer, index) => (
              <div 
                key={offer.id} 
                className={`bg-gradient-to-br ${offer.bgColor} rounded-lg p-4 text-white transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-pointer group relative overflow-hidden shadow-lg`}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                {/* Floating Elements */}
                <div className="absolute top-3 right-3 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                  <Star className="w-4 h-4 fill-current" />
                </div>
                
                <div className="relative z-10">
                  {/* Icon and Badge */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-3xl transform group-hover:scale-110 transition-transform duration-300">
                      {offer.icon}
                    </div>
                    <div className={`${offer.accentColor} text-black px-2 py-1 rounded-full text-xs font-bold shadow-md`}>
                      {offer.discount}
                    </div>
                  </div>

                  {/* Title and Subtitle */}
                  <div className="mb-2">
                    <h3 className="text-base font-bold mb-1">{offer.title}</h3>
                    <p className="text-white/80 text-xs">{offer.subtitle}</p>
                  </div>

                  {/* Description */}
                  <p className="text-white/70 text-xs mb-3 leading-relaxed">{offer.description}</p>

                  {/* Rating */}
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-2.5 h-2.5 ${i < Math.floor(offer.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-white/30'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-white/80 text-xs">{offer.rating} ({offer.reviews})</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-lg font-bold">{offer.currentPrice}</span>
                      <span className="text-white/60 line-through ml-1 text-xs">{offer.originalPrice}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-white/80">
                      <Zap className="w-3 h-3" />
                      <span className="text-xs font-medium">{offer.daysLeft} days left</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/30 rounded-lg py-2 px-3 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-1 group/btn">
                    <span className="font-semibold text-sm">Book Now</span>
                    <ArrowRight className="w-3 h-3 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="relative z-10 mt-6 text-center">
            <button className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-sm">
              View All Offers
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingOffers; 