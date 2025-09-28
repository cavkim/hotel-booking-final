import React from 'react';
import { 
  CheckCircle, 
  MapPin, 
  Star, 
  Clock, 
  Wifi, 
  Coffee
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About = () => {
  const features = [
    {
      icon: MapPin,
      title: "Located near the sea",
      description: "Just minutes from major tourist attractions and transportation hubs"
    },
    {
      icon: Star,
      title: "Comfortable and modern rooms",
      description: "Designed with your comfort in mind"
    },
    {
      icon: Clock,
      title: "Exceptional service",
      description: "Friendly staff ready to assist you at all hours"
    },
    {
      icon: Wifi,
      title: "Online booking",
      description: "Quick, easy and secure booking"
    },
    {
      icon: Coffee,
      title: "Amenities",
      description: "Free Wi-Fi, swimming pool, spa, meeting rooms and more"
    }
  ];

  const loginUser = async (email, password) => {
    try {
      const response = await fetch('https://api.bakongcity.city/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });
      
      if (!response.ok) {
        throw new Error('Login failed');
      }
      
      const data = await response.json();
      console.log('Login successful:', data);
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Example usage - you can call this with actual credentials
  // loginUser('user@example.com', 'password123'); 
  return (
    <div className="min-h-screen bg-blue-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-48 pb-24 px-8 bg-gradient-to-br from-blue-100 to-teal-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 animate-slide-up">
            About Us
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            Welcome to Grand Plaza Hotel Where Comfort Meets Luxury
          </p>
        </div>
      </section>

      {/* Main Image Collage */}
      <section className="py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
            {/* Left Rectangular Image */}
            <div className="w-full lg:w-80 h-96 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80"
                alt="Luxury resort pool"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Middle Rectangular Image */}
            <div className="w-full lg:w-80 h-96 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt="Modern hotel room"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Rectangular Image */}
            <div className="w-full lg:w-80 h-96 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt="Cozy tropical room"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Small Circular Overlay Image */}
          <div className="flex justify-center -mt-16 relative z-10">
            <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
                alt="Underwater diving scene"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Introductory Text */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-gray-700 leading-relaxed text-center">
            Located in Sihanoukville, Grand Plaza Hotel is your ultimate destination for elegance, 
            comfort and exceptional service. Whether you are traveling for business or pleasure, 
            we offer a relaxing atmosphere with modern amenities to make your stay unforgettable.
          </p>
        </div>
      </section>

      {/* Middle Image Gallery */}
      <section className="py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left - Circular Images Cluster */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {/* Top circular image */}
                <div className="flex justify-center">
                  <div className="relative w-40 h-40 rounded-full overflow-hidden shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
                      alt="Hotel room with ocean view"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Bottom two circular images */}
                <div className="flex justify-center space-x-4">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
                      alt="Modern room with window"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
                      alt="Indoor space with windows"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Rectangular Images Grid */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80"
                    alt="Beach setup with umbrella"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
                <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                    alt="Aerial beach view"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
                <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                    alt="Sunset with pool"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
                <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
                    alt="Aerial resort view"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Text */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-gray-700 leading-relaxed text-center">
            With stylish rooms, fine dining options, and top-notch hospitality, Grand Plaza Hotel 
            has become a trusted name for travelers from around the world. From our 24/7 front desk 
            service to our personalized guest experiences, we're committed to making every stay special. 
            The best escape you can have is getting a hotel room and doing what you love.
          </p>
        </div>
      </section>

      {/* Bottom Image Gallery - Pool Facilities */}
      <section className="py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Top Left - Resort Complex */}
            <div className="lg:col-span-1">
              <div className="relative h-80 rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80"
                  alt="Resort complex with pool"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
            </div>

            {/* Top Right - Resort with Pool */}
            <div className="lg:col-span-1">
              <div className="relative h-80 rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  alt="Resort with swimming pool"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
            </div>

            {/* Bottom Center - Infinity Pool */}
            <div className="lg:col-span-1">
              <div className="relative h-80 rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  alt="Infinity pool with ocean view"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Bottom Right - Blue Pool */}
          <div className="mt-6 flex justify-end">
            <div className="relative w-80 h-64 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
                alt="Blue swimming pool"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 px-8 bg-gradient-to-br from-teal-50 to-blue-50">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    <span className="font-semibold">{feature.title}</span> - {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Concluding Statement */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xl text-gray-700 leading-relaxed">
            At Grand Plaza Hotel, we don't just provide rooms - we provide an experience. 
            Discover the true meaning of hospitality with us.
          </p>
        </div>
      </section>

      {/* Thank You Section */}
      <section className="py-20 px-8 relative overflow-hidden">
        {/* Wave Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-600 to-blue-700"></div>
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="white"></path>
            </svg>
          </div>
          {/* Beach Background Image */}
          <div className="absolute inset-0 opacity-30">
            <img
              src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80"
              alt="Tropical beach"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Thank you for Staying
            </h2>
            <p className="text-xl text-white">
              with Us at Grand Plaza Hotel Dear Valued Guest
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About; 