# API Organization Guide

This document explains the new organized API structure for the Hotel Booking Frontend application.

## 📁 File Structure

```
src/
├── config/
│   ├── apiConfig.js          # Centralized API configuration
│   └── apiClient.js          # Enhanced API client with error handling
├── utils/
│   └── apiUtils.js           # API utility functions
├── services/
│   ├── authService.js         # Authentication service (updated)
│   ├── bookingService.js      # Booking service
│   ├── hotelService.js        # Hotel service
│   └── ...                    # Other services
└── helpers/
    └── axioHelper.js          # Legacy helper (deprecated)
```

## 🔧 Environment Configuration

### Environment Files

- **`.env.example`** - Template with all available environment variables
- **`.env`** - Your local environment configuration (copy from .env.example)

### Key Environment Variables

```bash
# API Configuration
REACT_APP_API_URL=http://localhost:5501/v1
REACT_APP_API_TIMEOUT=10000
REACT_APP_API_VERSION=v1

# Authentication
REACT_APP_TOKEN_KEY=hotel_booking_token
REACT_APP_USER_KEY=hotel_booking_user
REACT_APP_SESSION_TIMEOUT=30

# Payment
REACT_APP_PAYMENT_API_URL=http://localhost:5501/v1/payment
REACT_APP_PAYMENT_TIMEOUT=15000

# Feature Flags
REACT_APP_ENABLE_PAYMENT=true
REACT_APP_ENABLE_DEBUG_TOOLS=true
REACT_APP_ENABLE_API_TESTER=true
```

## 🚀 API Configuration Module

### `src/config/apiConfig.js`

This module provides centralized configuration for all API-related settings:

```javascript
import { API_CONFIG, AUTH_CONFIG, API_ENDPOINTS } from '../config/apiConfig';

// Use configuration
console.log(API_CONFIG.BASE_URL);        // API base URL
console.log(AUTH_CONFIG.TOKEN_KEY);      // Token storage key
console.log(API_ENDPOINTS.AUTH.LOGIN);   // Login endpoint
```

### Available Configurations

- **API_CONFIG** - Base API settings (URLs, timeouts, versions)
- **AUTH_CONFIG** - Authentication settings (token keys, session timeout)
- **APP_CONFIG** - Application settings (name, version, environment)
- **PAYMENT_CONFIG** - Payment gateway settings
- **EXTERNAL_SERVICES** - External service API keys
- **UPLOAD_CONFIG** - File upload settings
- **FEATURE_FLAGS** - Feature toggle settings
- **API_ENDPOINTS** - All API endpoint definitions
- **HTTP_STATUS** - HTTP status codes
- **ERROR_MESSAGES** - Standardized error messages
- **SUCCESS_MESSAGES** - Standardized success messages

## 🔌 Enhanced API Client

### `src/config/apiClient.js`

The enhanced API client provides:

- **Automatic token management**
- **Request/response logging** (debug mode)
- **Centralized error handling**
- **Request ID tracking**
- **Timeout handling**
- **Retry mechanisms**

### Usage

```javascript
import { apiMethods } from '../config/apiClient';

// GET request
const data = await apiMethods.get('/hotels');

// POST request
const result = await apiMethods.post('/bookings', bookingData);

// File upload
const uploadResult = await apiMethods.upload('/images/upload', formData);
```

## 🛠️ API Utilities

### `src/utils/apiUtils.js`

Utility functions for common API operations:

```javascript
import { 
  handleApiResponse, 
  handleApiError, 
  createPaginationParams,
  buildEndpoint 
} from '../utils/apiUtils';

// Handle API responses
const result = handleApiResponse(response, 'Success message');

// Handle API errors
const error = handleApiError(error, 'Custom error message');

// Create pagination parameters
const params = createPaginationParams(1, 10, 'name', 'asc');

// Build dynamic endpoints
const url = buildEndpoint('/hotels/:id', { id: 123 });
```

## 📋 Service Layer Updates

### Updated Service Structure

All services now use the new configuration and utilities:

```javascript
// Before (old way)
import apiClient from '../helpers/axioHelper';
const response = await apiClient.post('/auth/login', credentials);

// After (new way)
import { apiMethods } from '../config/apiClient';
import { API_ENDPOINTS } from '../config/apiConfig';
import { handleApiResponse, handleApiError } from '../utils/apiUtils';

const response = await apiMethods.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
return handleApiResponse(response, SUCCESS_MESSAGES.LOGIN_SUCCESS);
```

### Service Methods Return Standardized Responses

```javascript
// All service methods now return:
{
  success: boolean,
  data: any,
  message: string,
  error?: any
}
```

## 🔍 Error Handling

### Centralized Error Management

The new system provides:

1. **Automatic error categorization**
2. **User-friendly error messages**
3. **Debug logging** (when enabled)
4. **Automatic token refresh** (for auth errors)
5. **Network error handling**

### Error Types

- **NETWORK_ERROR** - Connection issues
- **UNAUTHORIZED** - Authentication required
- **FORBIDDEN** - Access denied
- **NOT_FOUND** - Resource not found
- **VALIDATION_ERROR** - Input validation failed
- **SERVER_ERROR** - Server-side errors

## 🎯 API Endpoints

### Organized Endpoint Structure

```javascript
API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    PROFILE: '/auth/profile',
    // ...
  },
  HOTELS: {
    LIST: '/hotels',
    DETAIL: (id) => `/hotels/${id}`,
    SEARCH: '/hotels/search',
    // ...
  },
  BOOKINGS: {
    LIST: '/bookings',
    CREATE: '/bookings',
    DETAIL: (id) => `/bookings/${id}`,
    // ...
  }
  // ...
}
```

## 🔧 Migration Guide

### For Existing Code

1. **Update imports**:
   ```javascript
   // Old
   import apiClient from '../helpers/axioHelper';
   
   // New
   import { apiMethods } from '../config/apiClient';
   ```

2. **Use endpoint constants**:
   ```javascript
   // Old
   const response = await apiClient.post('/auth/login', data);
   
   // New
   const response = await apiMethods.post(API_ENDPOINTS.AUTH.LOGIN, data);
   ```

3. **Handle responses consistently**:
   ```javascript
   // Old
   return response.data;
   
   // New
   return handleApiResponse(response, 'Success message');
   ```

### Backward Compatibility

The old `axioHelper.js` is still available but deprecated. It now imports from the new system to maintain compatibility.

## 🚀 Getting Started

1. **Copy environment file**:
   ```bash
   cp .env.example .env
   ```

2. **Update environment variables** in `.env`:
   ```bash
   REACT_APP_API_URL=your_api_url
   REACT_APP_DEBUG=true
   ```

3. **Use the new API client**:
   ```javascript
   import { apiMethods } from '../config/apiClient';
   import { API_ENDPOINTS } from '../config/apiConfig';
   
   const hotels = await apiMethods.get(API_ENDPOINTS.HOTELS.LIST);
   ```

## 🐛 Debugging

### Enable Debug Mode

Set `REACT_APP_DEBUG=true` in your `.env` file to enable:
- Request/response logging
- Error details
- Performance monitoring

### Debug Tools

- **API Tester** - Available at `/api-test` (if enabled)
- **Health Check** - Automatic API health monitoring
- **Console Logging** - Detailed request/response logs

## 📊 Performance Features

- **Request caching** (configurable)
- **Request deduplication**
- **Automatic retries** for failed requests
- **Timeout management**
- **Request/response compression**

## 🔒 Security Features

- **Automatic token refresh**
- **Secure token storage**
- **Request ID tracking**
- **CORS handling**
- **Input validation**

## 📝 Best Practices

1. **Always use endpoint constants** instead of hardcoded URLs
2. **Handle responses** with `handleApiResponse` and `handleApiError`
3. **Use environment variables** for all configuration
4. **Enable debug mode** during development
5. **Implement proper error boundaries** in React components
6. **Use feature flags** to toggle functionality

## 🆘 Troubleshooting

### Common Issues

1. **API not responding**:
   - Check `REACT_APP_API_URL` in `.env`
   - Verify backend server is running
   - Check network connectivity

2. **Authentication errors**:
   - Verify token is stored correctly
   - Check token expiration
   - Ensure proper headers are sent

3. **CORS issues**:
   - Configure backend CORS settings
   - Check API base URL configuration

### Debug Steps

1. Enable debug mode: `REACT_APP_DEBUG=true`
2. Check browser console for detailed logs
3. Use API tester at `/api-test`
4. Verify environment variables are loaded

---

This new API organization makes it much easier to:
- ✅ Manage API configurations
- ✅ Handle errors consistently
- ✅ Debug API issues
- ✅ Maintain and scale the application
- ✅ Add new API endpoints
- ✅ Implement new features
