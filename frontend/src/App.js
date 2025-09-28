import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Home from './pages/Home';
import RoomDetail from './pages/RoomDetail';
import Activities from './pages/Activities';
import About from './pages/About';
import Booking from './pages/Booking';
import BookingConfirmation from './pages/BookingConfirmation';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import UserProfile from './pages/UserProfile';
import ProtectedRoute from './components/ProtectedRoute';
import LoginModal from './components/LoginModal';
import APITester from './components/APITester';
import APIHealthCheck from './components/APIHealthCheck';
import PaymentTester from './components/PaymentTester';
import MockServiceNotification from './components/MockServiceNotification';
import CallbackExample from './components/CallbackExample';
import QRGenerator from './components/QRGenerator';
import BookingPaymentExample from './components/BookingPaymentExample';

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/room/:id" element={<RoomDetail />} />
            <Route path="/booking/:id" element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            } />
            <Route path="/booking/activity" element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            } />
            <Route path="/booking-confirmation" element={
              <ProtectedRoute>
                <BookingConfirmation />
              </ProtectedRoute>
            } />
            <Route path="/activities" element={<Activities />} />
            <Route path="/about" element={<About />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            } />
            <Route path="/api-test" element={<APITester />} />
            <Route path="/payment-test" element={<PaymentTester />} />
            <Route path="/callback-example" element={<CallbackExample />} />
            <Route path="/qr-generator" element={<QRGenerator />} />
            <Route path="/booking-payment" element={<BookingPaymentExample />} />
          </Routes>
          <LoginModal />
          <APIHealthCheck />
          <MockServiceNotification />
        </div>
      </Router>
    </Provider>
  );
}