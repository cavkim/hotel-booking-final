// Payment API Service
import apiClient from '../helpers/axioHelper';

// ABA Payment Secret Key
const ABA_SECRET = '';

const paymentService = {
  // Generate QR image for ABA payment
  generateQRImage: async (paymentData) => {
    try {
      const response = await apiClient.get('/aba/generate-qr-image', {
        params: {
          amount: paymentData.amount,
          currency: paymentData.currency || 'USD',
          description: paymentData.description || 'Payment',
          booking_id: paymentData.bookingId,
          secret: ABA_SECRET
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to generate QR image');
    }
  },

  // Alternative QR generation using direct fetch
  generateQRImageDirect: async (paymentData) => {
    try {
      const params = new URLSearchParams({
        amount: paymentData.amount,
        currency: paymentData.currency || 'USD',
        description: paymentData.description || 'Payment',
        booking_id: paymentData.bookingId,
        secret: ABA_SECRET
      });
      
      const response = await fetch(`https://api.bakongcity.cityaba/generate-qr-image?${params}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('QR generation error:', error);
      throw new Error(error.message || 'Failed to generate QR image');
    }
  },

  // Generate QR for specific payment amount
  generateQRForAmount: async (amount, currency = 'USD', description = 'Payment') => {
    try {
      const response = await apiClient.get('/aba/generate-qr-image', {
        params: {
          amount: amount,
          currency: currency,
          description: description,
          secret: ABA_SECRET
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to generate QR for amount');
    }
  },

  // Generate QR with booking details
  generateQRForBooking: async (bookingData) => {
    try {
      const response = await apiClient.get('/aba/generate-qr-image', {
        params: {
          amount: bookingData.totalAmount,
          currency: bookingData.currency || 'USD',
          description: `Booking for ${bookingData.hotelName}`,
          booking_id: bookingData.bookingId,
          customer_name: bookingData.customerName,
          check_in: bookingData.checkIn,
          check_out: bookingData.checkOut,
          secret: ABA_SECRET
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to generate QR for booking');
    }
  },

  // Handle ABA payment callback
  handleCallback: async (callbackData) => {
    try {
      const response = await apiClient.post('/aba/callback', {
        ...callbackData,
        secret: ABA_SECRET
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to handle payment callback');
    }
  },

  // Simulate payment callback (for testing)
  simulateCallback: async (transactionId, status) => {
    try {
      const callbackData = {
        tran_id: transactionId,
        status: status,
        secret: ABA_SECRET
      };
      
      const response = await apiClient.post('/aba/callback', callbackData);
      return response.data;
    } catch (error) {
      console.error('Callback simulation error:', error);
      throw new Error(error.response?.data?.message || 'Failed to simulate callback');
    }
  },

  // Alternative callback simulation using direct fetch (as per your example)
  simulateCallbackDirect: async (transactionId, status) => {
    try {
      const response = await fetch('https://api.bakongcity.cityaba/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tran_id: transactionId,
          status: status,
          secret: ABA_SECRET
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Callback simulation error:', error);
      throw new Error(error.message || 'Failed to simulate callback');
    }
  },

  // Process payment
  processPayment: async (paymentData) => {
    try {
      const response = await apiClient.post('/payments/process', {
        ...paymentData,
        secret: ABA_SECRET
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to process payment');
    }
  },

  // Get payment status
  getPaymentStatus: async (paymentId) => {
    try {
      const response = await apiClient.get(`/payments/${paymentId}/status`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get payment status');
    }
  },

  // Refund payment
  refundPayment: async (paymentId, refundData) => {
    try {
      const response = await apiClient.post(`/payments/${paymentId}/refund`, {
        ...refundData,
        secret: ABA_SECRET
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to refund payment');
    }
  },

  // Create payment with QR generation
  createPaymentWithQR: async (paymentData) => {
    try {
      // First generate QR
      const qrData = await this.generateQRImage(paymentData);
      
      // Then process payment
      const payment = await this.processPayment({
        ...paymentData,
        qr_data: qrData
      });
      
      return {
        payment,
        qr_data: qrData
      };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create payment with QR');
    }
  }
};

export default paymentService;
