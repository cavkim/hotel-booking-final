import React, { useState, useEffect, useRef } from 'react';
import { User, Menu, X, Leaf, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOutUser, loadUserFromStorage } from '../redux/actions/authActions';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const userMenuRef = useRef(null);

  // Load user from storage on component mount
  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  // Debug user data
  useEffect(() => {
    if (user) {
      console.log('User data in Header:', user);
      console.log('Profile image:', user.profileImage);
    }
  }, [user]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleSignOut = () => {
    dispatch(signOutUser());
    setShowUserMenu(false);
    navigate('/');
  };

  const handleUserClick = () => {
    if (isAuthenticated) {
      setShowUserMenu(!showUserMenu);
    } else {
      navigate('/signin');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100">
      <div className="flex items-center justify-between px-8 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div 
          className="flex items-center space-x-3 group cursor-pointer"
          onClick={() => navigate('/')}
        >
          <div className="text-teal-600 group-hover:text-teal-700 transition-colors duration-300">
            <Leaf className="w-8 h-8" />
          </div>
          <div className="text-2xl font-bold text-teal-600 group-hover:text-teal-700 transition-colors duration-300">
            <div className="text-sm transform group-hover:scale-105 transition-transform duration-300">THE</div>
            <div className="text-xl transform group-hover:scale-105 transition-transform duration-300">OCEANSCAPE</div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <button 
            onClick={() => handleNavigation('/')}
            className={`relative group ${
              location.pathname === '/' ? 'text-teal-600 font-semibold' : 'text-gray-600 hover:text-teal-600'
            } transition-colors duration-300`}
          >
            ROOM
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 group-hover:w-full transition-all duration-300"></span>
          </button>
          <button 
            onClick={() => handleNavigation('/activities')}
            className="text-gray-600 hover:text-teal-600 transition-colors duration-300 relative group"
          >
            ACTIVITIES
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 group-hover:w-full transition-all duration-300"></span>
          </button>
          <button 
            onClick={() => handleNavigation('/about')}
            className="text-gray-600 hover:text-teal-600 transition-colors duration-300 relative group"
          >
            ABOUT
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 group-hover:w-full transition-all duration-300"></span>
          </button>
        </nav>

        {/* User Icons */}
        <div className="flex items-center space-x-4">
          <div className="relative group" ref={userMenuRef}>
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={handleUserClick}
            >
              {/* User Avatar */}
              <div className="relative">
                {isAuthenticated && user?.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover border-2 border-teal-200 hover:border-teal-300 transition-colors duration-300"
                  />
                ) : (
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center hover:bg-teal-200 transition-colors duration-300">
                    <User className="w-5 h-5 text-teal-600" />
                  </div>
                )}
                
                {/* Online Status Indicator */}
                {isAuthenticated && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              
              {isAuthenticated && user && (
                <span className="hidden md:block text-sm text-gray-700">
                  {user.firstName}
                </span>
              )}
            </div>
            
            {/* User dropdown menu */}
            {showUserMenu && isAuthenticated && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    {/* Profile Image in Dropdown */}
                    <div className="relative">
                      {user?.profileImage ? (
                        <img
                          src={user.profileImage}
                          alt="Profile"
                          className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-gray-500" />
                        </div>
                      )}
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    navigate('/profile');
                    setShowUserMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                >
                  <User className="w-4 h-4" />
                  <span>My Profile</span>
                </button>
                <button
                  onClick={handleSignOut}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
            
            {!isAuthenticated && (
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                Sign In
              </div>
            )}
          </div>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-teal-600" />
            ) : (
              <Menu className="w-6 h-6 text-teal-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-8 py-4 space-y-4">
            <button 
              onClick={() => handleNavigation('/')}
              className={`block py-2 rounded-lg px-3 transition-colors duration-300 w-full text-left ${
                location.pathname === '/' ? 'text-teal-600 font-semibold bg-teal-50' : 'text-gray-600 hover:text-teal-600 hover:bg-gray-50'
              }`}
            >
              ROOM
            </button>
            <button 
              onClick={() => handleNavigation('/activities')}
              className="block text-gray-600 py-2 hover:text-teal-600 hover:bg-gray-50 rounded-lg px-3 transition-colors duration-300 w-full text-left"
            >
              ACTIVITIES
            </button>
            <button 
              onClick={() => handleNavigation('/about')}
              className="block text-gray-600 py-2 hover:text-teal-600 hover:bg-gray-50 rounded-lg px-3 transition-colors duration-300 w-full text-left"
            >
              ABOUT
            </button>
            
            {/* Mobile auth section */}
            <div className="border-t border-gray-200 pt-4">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <div className="px-3 py-2 text-sm text-gray-700">
                    Welcome, {user?.firstName}!
                  </div>
                  <button
                    onClick={() => handleNavigation('/profile')}
                    className="block w-full text-left text-teal-600 py-2 hover:bg-teal-50 rounded-lg px-3 transition-colors duration-300"
                  >
                    My Profile
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left text-red-600 py-2 hover:bg-red-50 rounded-lg px-3 transition-colors duration-300"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={() => handleNavigation('/signin')}
                    className="block w-full text-left text-teal-600 py-2 hover:bg-teal-50 rounded-lg px-3 transition-colors duration-300"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => handleNavigation('/signup')}
                    className="block w-full text-left text-teal-600 py-2 hover:bg-teal-50 rounded-lg px-3 transition-colors duration-300"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 