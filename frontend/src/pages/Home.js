import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import TrendingOffers from '../components/TrendingOffers';
import RoomListings from '../components/RoomListings';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <TrendingOffers />
      <RoomListings />
      <Footer />
    </div>
  );
};

export default Home;  