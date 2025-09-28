# 🏨 Hotel Booking System

A modern React-based hotel booking application with organized API structure and comprehensive testing capabilities.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm package manager

### Installation & Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment**:
   ```bash
   # Copy environment template
   cp .env.example .env
   
   # Edit .env file with your settings
   REACT_APP_API_URL=http://localhost:5500/v1
   REACT_APP_DEBUG=true
   ```

3. **Start the backend server**:
   ```bash
   node server-5500.js
   ```

4. **Start the frontend** (in new terminal):
   ```bash
   npm start
   ```

5. **Access the application**:
   - Frontend: http://localhost:3000
   - API Tester: http://localhost:3000/api-test
   - Backend Health: http://localhost:5500/v1/health

## 🧪 Testing the API

### Method 1: Built-in API Tester (Recommended)
1. Navigate to: `http://localhost:3000/api-test`
2. Configure test data:
   - Email: `test@example.com`
   - Password: `password123`
   - Hotel ID: `1`
   - Room ID: `1`
3. Click "Test All APIs" for comprehensive testing

### Method 2: Manual Testing
1. **User Registration**: `http://localhost:3000/signup`
2. **User Login**: `http://localhost:3000/signin`
3. **Browse Hotels**: `http://localhost:3000/`
4. **View Room Details**: Click on any hotel

## 🔧 API Configuration

### Environment Variables
```bash
# API Configuration
REACT_APP_API_URL=http://localhost:5500/v1
REACT_APP_API_TIMEOUT=10000

# Authentication
REACT_APP_TOKEN_KEY=hotel_booking_token
REACT_APP_USER_KEY=hotel_booking_user

# Feature Flags
REACT_APP_ENABLE_PAYMENT=true
REACT_APP_ENABLE_DEBUG_TOOLS=true
REACT_APP_ENABLE_API_TESTER=true
```

## 📁 Project Structure

```
frontend/
├── 📄 Documentation
│   ├── README.md                    # This file
│   ├── API_ORGANIZATION_GUIDE.md   # API structure guide
│   └── API_TESTING_STATUS.md       # Testing instructions
├── 🔧 Configuration
│   ├── .env                         # Environment variables
│   ├── .env.example                # Environment template
│   └── package.json                # Dependencies
├── 🚀 Servers
│   ├── server-5500.js              # Backend mock server
│   └── setup-api.ps1               # Windows setup script
└── 💻 Source Code
    └── src/
        ├── 📋 Configuration
        │   ├── config/              # API configuration
        │   └── utils/               # Utility functions
        ├── 🔌 Services             # API service layer
        ├── 🎨 Components           # React components
        ├── 📄 Pages                # Application pages
        ├── 🗃️ Redux               # State management
        └── 🛠️ Helpers             # Legacy helpers
```

## 🎯 Features

### ✅ Implemented Features
- **User Authentication**: Registration, login, profile management
- **Hotel Management**: Browse hotels, view details, search
- **Room Management**: View rooms, check availability, pricing
- **Booking System**: Create bookings, manage reservations
- **Payment Integration**: QR code generation, payment processing
- **Review System**: Leave reviews, view ratings
- **API Testing**: Built-in comprehensive testing tools
- **Error Handling**: Centralized error management

## 🐛 Troubleshooting

### Common Issues

#### **API Connection Issues**
- **Solution**: 
  1. Check if backend is running: `netstat -an | findstr :5500`
  2. Verify API URL in `.env` file
  3. Check CORS configuration

#### **Testing Issues**
- **Solution**:
  1. Ensure backend server is running
  2. Check API health: `http://localhost:5500/v1/health`
  3. Enable debug mode: `REACT_APP_DEBUG=true`

### Debug Mode
Enable detailed logging by setting in `.env`:
```bash
REACT_APP_DEBUG=true
REACT_APP_ENABLE_API_TESTER=true
```

## 📚 Additional Resources

- **API Organization Guide**: `API_ORGANIZATION_GUIDE.md`
- **Testing Status**: `API_TESTING_STATUS.md`
- **Postman Collection**: `hotel_booking_api_postman_collectionn.json`

## 🎉 Ready to Use!

Your hotel booking system is now **fully organized** and ready for development:

- ✅ **Clean project structure**
- ✅ **Organized API configuration**
- ✅ **Comprehensive testing tools**
- ✅ **Detailed documentation**

**Start developing**: `npm start` and visit `http://localhost:3000`