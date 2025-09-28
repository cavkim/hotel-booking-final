import React, { useState } from 'react';
import { Facebook, Instagram, MessageCircle, Linkedin, Mail, Phone, MapPin, ArrowRight, Heart } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <footer className="bg-gradient-to-br from-teal-800 to-teal-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-48 translate-y-48"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto py-16 px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Hotel Booking */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="text-3xl font-bold">
                <div className="text-sm">THE</div>
                <div className="text-xl">OCEANSCAPE</div>
              </div>
            </div>
            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              Experience luxury and comfort at The Oceanscape. Book your perfect stay with us and create unforgettable memories in paradise.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              <button className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-110 hover:text-blue-400">
                <Facebook className="w-6 h-6" />
              </button>
              <button className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-110 hover:text-pink-400">
                <Instagram className="w-6 h-6" />
              </button>
              <button className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-110 hover:text-green-400">
                <MessageCircle className="w-6 h-6" />
              </button>
              <button className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-110 hover:text-blue-600">
                <Linkedin className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* For Beginners */}
          <div>
            <h3 className="text-xl font-bold mb-6">For Beginners</h3>
            <ul className="space-y-3">
              <li>
                <button className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center space-x-2 group w-full text-left">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  <span>New Account</span>
                </button>
              </li>
              <li>
                <button className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center space-x-2 group w-full text-left">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  <span>Start Booking a Room</span>
                </button>
              </li>
              <li>
                <button className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center space-x-2 group w-full text-left">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  <span>Use Payments</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Explore Us */}
          <div>
            <h3 className="text-xl font-bold mb-6">Explore Us</h3>
            <ul className="space-y-3">
              <li>
                <button className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center space-x-2 group w-full text-left">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  <span>Our Careers</span>
                </button>
              </li>
              <li>
                <button className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center space-x-2 group w-full text-left">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  <span>Privacy</span>
                </button>
              </li>
              <li>
                <button className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center space-x-2 group w-full text-left">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  <span>Terms & Conditions</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact & Payment Section */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-bold mb-6">Connect Us</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 group">
                  <div className="bg-white/10 p-2 rounded-full group-hover:bg-white/20 transition-all duration-300">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                    support@grandplazahotel.id
                  </span>
                </div>
                <div className="flex items-center space-x-3 group">
                  <div className="bg-white/10 p-2 rounded-full group-hover:bg-white/20 transition-all duration-300">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                    021-2208-1996
                  </span>
                </div>
                <div className="flex items-center space-x-3 group">
                  <div className="bg-white/10 p-2 rounded-full group-hover:bg-white/20 transition-all duration-300">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                    Staycation, Sihanoukville, Cambodia
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <h3 className="text-xl font-bold mb-6">Payments</h3>
              <div className="flex flex-wrap gap-3">
                <button className="bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300">
                  <span className="font-semibold">PayPal</span>
                </button>
                <button className="bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300">
                  <span className="font-semibold">Stripe</span>
                </button>
                <button className="bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300">
                  <span className="font-semibold">Mastercard</span>
                </button>
                <button className="bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300">
                  <span className="font-semibold">Skrill</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-white/20 text-center">
          <p className="text-gray-300">
            © 2024 The Oceanscape. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 