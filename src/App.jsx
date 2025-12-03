import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import SearchResults from './components/SearchResults';
import BookingInterface from './components/BookingInterface';
import MyBookings from './components/MyBookings';
import NotFound from './pages/NotFound'; // Import the new component
import './styles/App.css'; // Import the main stylesheet

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main>
          <Routes>
            {/* Landing Page Route - Initial search */}
            <Route path="/" element={<LandingPage />} />

            {/* Search Results Route - Uses URL params for state/city */}
            <Route path="/restaurants" element={<SearchResults />} />
            
            {/* Booking Interface Route - Pass restaurant data or ID */}
            <Route path="/book/:restaurantId" element={<BookingInterface />} />

            {/* My Bookings Page - Required endpoint: /my-bookings */}
            <Route path="/my-bookings" element={<MyBookings />} />

            {/* Default to Landing Page if no match (or implement a 404) */}
            <Route path="*" element={<LandingPage />} /> 

            {/* CATCH-ALL ROUTE: Must be the last one */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;