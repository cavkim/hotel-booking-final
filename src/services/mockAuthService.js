// Mock authentication service for development when backend is not available
class MockAuthService {
  // Mock register - simulates successful registration
  async register(userData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful response
    const mockUser = {
      id: 'mock-user-' + Date.now(),
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone || null,
      profileImage: null // Start with no profile image
    };
    
    const mockToken = 'mock-token-' + Date.now();
    
    // Store in localStorage for consistency
    localStorage.setItem('token', mockToken);
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    return {
      user: mockUser,
      token: mockToken,
      message: 'Account created successfully (Mock Mode - Backend API not available)'
    };
  }

  // Backward compatibility - alias for register
  async signUp(userData) {
    return this.register(userData);
  }

  // Mock login - simulates successful login
  async login(credentials) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful response
    const mockUser = {
      id: 'mock-user-123',
      firstName: 'John',
      lastName: 'Doe',
      email: credentials.email,
      phone: '+1234567890',
      profileImage: null // Start with no profile image
    };
    
    const mockToken = 'mock-token-' + Date.now();
    
    // Store in localStorage for consistency
    localStorage.setItem('token', mockToken);
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    return {
      user: mockUser,
      token: mockToken,
      message: 'Login successful (Mock Mode - Backend API not available)'
    };
  }

  // Backward compatibility - alias for login
  async signIn(credentials) {
    return this.login(credentials);
  }

  // Mock update profile
  async updateProfile(profileData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Get current user
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      throw new Error('No user found');
    }
    
    // Update user data
    const updatedUser = {
      ...currentUser,
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      email: profileData.email,
      phone: profileData.phone || null,
      profileImage: profileData.profileImage || currentUser.profileImage
    };
    
    // Store updated user data
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    console.log('Updated user with profile image:', updatedUser);
    
    return {
      user: updatedUser,
      message: 'Profile updated successfully (Mock Mode)'
    };
  }

  // Sign out user
  signOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // Get current user from localStorage
  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Get token from localStorage
  getToken() {
    return localStorage.getItem('token');
  }

  // Check if user is authenticated
  isAuthenticated() {
    const token = this.getToken();
    return !!token;
  }

  // Mock token verification
  async verifyToken() {
    return this.isAuthenticated();
  }
}

const mockAuthServiceInstance = new MockAuthService();
export default mockAuthServiceInstance;
