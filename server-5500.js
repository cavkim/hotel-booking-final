const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5500;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(bodyParser.json());

// Health check endpoint
app.get('/v1/health', (req, res) => {
  res.json({ status: 'OK', message: 'API is running on port 5500' });
});

// Auth endpoints
app.post('/v1/auth/register', (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;
  
  // Simple validation
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  
  // Mock response
  res.json({
    user: { 
      id: 'user-' + Date.now(), 
      firstName, 
      lastName, 
      email, 
      phone: phone || null 
    },
    token: 'jwt-token-' + Date.now(),
    message: 'Registration successful'
  });
});

app.post('/v1/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }
  
  res.json({
    user: { 
      id: 'user-123', 
      firstName: 'John', 
      lastName: 'Doe', 
      email 
    },
    token: 'jwt-token-' + Date.now(),
    message: 'Login successful'
  });
});

// Hotel endpoints
app.get('/v1/hotels', (req, res) => {
  res.json([
    {
      id: '1',
      name: 'THE OCEANSCAPE',
      description: 'Luxury resort with ocean views',
      location: 'Phnom Penh',
      amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant']
    },
    {
      id: '2', 
      name: 'Boutique Hotel',
      description: 'Cozy boutique hotel',
      location: 'Siem Reap',
      amenities: ['WiFi', 'Restaurant']
    }
  ]);
});

app.get('/v1/hotels/:id', (req, res) => {
  res.json({
    id: req.params.id,
    name: 'THE OCEANSCAPE',
    description: 'Luxury resort with ocean views',
    location: 'Phnom Penh',
    amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant']
  });
});

// Room endpoints
app.get('/v1/rooms', (req, res) => {
  res.json([
    {
      id: '1',
      name: 'Deluxe Ocean View',
      description: 'Spacious room with ocean view',
      price: 150,
      capacity: 2,
      hotelId: '1'
    },
    {
      id: '2',
      name: 'Presidential Suite',
      description: 'Luxury suite with balcony',
      price: 300,
      capacity: 4,
      hotelId: '1'
    }
  ]);
});

app.get('/v1/rooms/:id', (req, res) => {
  res.json({
    id: req.params.id,
    name: 'Deluxe Ocean View',
    description: 'Spacious room with ocean view',
    price: 150,
    capacity: 2,
    hotelId: '1'
  });
});

// Booking endpoints
app.post('/v1/bookings/create', (req, res) => {
  const { roomId, checkIn, checkOut, guests, userId } = req.body;
  
  res.json({
    id: 'booking-' + Date.now(),
    roomId,
    checkIn,
    checkOut,
    guests,
    userId,
    status: 'confirmed',
    totalAmount: 300
  });
});

app.get('/v1/bookings', (req, res) => {
  res.json([
    {
      id: 'booking-1',
      roomId: '1',
      checkIn: '2024-01-01',
      checkOut: '2024-01-03',
      guests: 2,
      status: 'confirmed'
    }
  ]);
});

// Review endpoints
app.get('/v1/reviews', (req, res) => {
  res.json([
    {
      id: 'review-1',
      hotelId: '1',
      userId: 'user-123',
      rating: 5,
      comment: 'Excellent hotel with amazing ocean views!',
      createdAt: new Date().toISOString()
    }
  ]);
});

app.post('/v1/reviews', (req, res) => {
  const { hotelId, rating, comment, userId } = req.body;
  
  res.json({
    id: 'review-' + Date.now(),
    hotelId,
    rating,
    comment,
    userId,
    createdAt: new Date().toISOString()
  });
});

// Payment endpoints
app.get('/v1/aba/generate-qr-image', (req, res) => {
  res.json({
    qr_code: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
    transaction_id: 'txn-' + Date.now(),
    amount: req.query.amount || 100,
    currency: req.query.currency || 'USD'
  });
});

app.post('/v1/aba/callback', (req, res) => {
  const { tran_id, status, secret } = req.body;
  
  res.json({
    transaction_id: tran_id,
    status: status,
    message: 'Callback processed successfully',
    processed_at: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend API running on http://localhost:${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/v1/health`);
  console.log(`🔗 CORS enabled for: http://localhost:3000`);
});


