import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { BusinessProvider } from './context/BusinessContext';

// Pages
import BarberLanding from './pages/BarberLanding';
import BarberFeatures from './pages/BarberFeatures';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';

// 11 Kuttly Basic Plan Pages
import BarberDashboard from './pages/BarberDashboard';
import BusinessProfile from './pages/BusinessProfile';
import BarberServices from './pages/BarberServices';
import Bookings from './pages/Bookings';
import Availability from './pages/Availability';
import Customers from './pages/Customers';
import Portfolio from './pages/Portfolio';
import Reviews from './pages/Reviews';
import Walkins from './pages/Walkins';
import Promotions from './pages/Promotions';
import Settings from './pages/Settings';

// Global Components
import BackToTop from './components/BackToTop';
import AnimatedPage from './components/AnimatedPage';
import ScrollToTop from './components/ScrollToTop';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Marketing & Auth */}
        <Route path="/" element={<AnimatedPage><BarberLanding /></AnimatedPage>} />
        <Route path="/features" element={<AnimatedPage><BarberFeatures /></AnimatedPage>} />
        <Route path="/login" element={<AnimatedPage><Login /></AnimatedPage>} />
        <Route path="/signup" element={<AnimatedPage><SignUp /></AnimatedPage>} />
        <Route path="/forgot-password" element={<AnimatedPage><ForgotPassword /></AnimatedPage>} />

        {/* 11 Kuttly Basic Plan Routes */}
        <Route path="/dashboard" element={<AnimatedPage><BarberDashboard /></AnimatedPage>} />
        <Route path="/dashboard/profile" element={<AnimatedPage><BusinessProfile /></AnimatedPage>} />
        <Route path="/dashboard/services" element={<AnimatedPage><BarberServices /></AnimatedPage>} />
        <Route path="/dashboard/bookings" element={<AnimatedPage><Bookings /></AnimatedPage>} />
        <Route path="/dashboard/availability" element={<AnimatedPage><Availability /></AnimatedPage>} />
        <Route path="/dashboard/customers" element={<AnimatedPage><Customers /></AnimatedPage>} />
        <Route path="/dashboard/portfolio" element={<AnimatedPage><Portfolio /></AnimatedPage>} />
        <Route path="/dashboard/reviews" element={<AnimatedPage><Reviews /></AnimatedPage>} />
        <Route path="/dashboard/walkins" element={<AnimatedPage><Walkins /></AnimatedPage>} />
        <Route path="/dashboard/promotions" element={<AnimatedPage><Promotions /></AnimatedPage>} />
        <Route path="/dashboard/settings" element={<AnimatedPage><Settings /></AnimatedPage>} />

        {/* Legacy / appointments redirect alias */}
        <Route path="/dashboard/appointments" element={<AnimatedPage><Bookings /></AnimatedPage>} />
        <Route path="/dashboard/payments" element={<AnimatedPage><Promotions /></AnimatedPage>} />

        {/* /business/* path aliases for backward & multi-domain compatibility */}
        <Route path="/business" element={<AnimatedPage><BarberLanding /></AnimatedPage>} />
        <Route path="/business/features" element={<AnimatedPage><BarberFeatures /></AnimatedPage>} />
        <Route path="/business/login" element={<AnimatedPage><Login /></AnimatedPage>} />
        <Route path="/business/signup" element={<AnimatedPage><SignUp /></AnimatedPage>} />
        <Route path="/business/forgot-password" element={<AnimatedPage><ForgotPassword /></AnimatedPage>} />
        <Route path="/business/dashboard" element={<AnimatedPage><BarberDashboard /></AnimatedPage>} />
        <Route path="/business/dashboard/profile" element={<AnimatedPage><BusinessProfile /></AnimatedPage>} />
        <Route path="/business/dashboard/services" element={<AnimatedPage><BarberServices /></AnimatedPage>} />
        <Route path="/business/dashboard/bookings" element={<AnimatedPage><Bookings /></AnimatedPage>} />
        <Route path="/business/dashboard/availability" element={<AnimatedPage><Availability /></AnimatedPage>} />
        <Route path="/business/dashboard/customers" element={<AnimatedPage><Customers /></AnimatedPage>} />
        <Route path="/business/dashboard/portfolio" element={<AnimatedPage><Portfolio /></AnimatedPage>} />
        <Route path="/business/dashboard/reviews" element={<AnimatedPage><Reviews /></AnimatedPage>} />
        <Route path="/business/dashboard/walkins" element={<AnimatedPage><Walkins /></AnimatedPage>} />
        <Route path="/business/dashboard/promotions" element={<AnimatedPage><Promotions /></AnimatedPage>} />
        <Route path="/business/dashboard/settings" element={<AnimatedPage><Settings /></AnimatedPage>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BusinessProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <AnimatedRoutes />
          <BackToTop />
        </div>
      </Router>
    </BusinessProvider>
  );
}
