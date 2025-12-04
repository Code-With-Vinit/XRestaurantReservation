import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import RestaurantLogo from "../assets/Restaurant-Logo.png";
import '../styles/App.css';

const Header = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <header className="app-header-ui">
      <div className="top-banner-ui">
        <p>Stay updated with the latest restaurants and maximize your dining experience with our platform.</p>
      </div>
      <div className="header-main-ui">
        <Link to="/" className="logo-link-ui">
          {/*  */}
          {/* <span className="logo-text-ui">Restaurant</span> */}
          <img className='footer-logo-banner' src={RestaurantLogo} alt="" />
        </Link>
        <nav className="nav-bar-ui">
          <Link to="/" className={`nav-link-ui ${isActive('/') ? 'active' : ''}`}>Find Restaurants</Link>
          <Link to="/locations" className="nav-link-ui">Locations</Link>
          <Link to="/reservations" className="nav-link-ui">Reservations</Link>
          <Link to="/special-menus" className="nav-link-ui">Special Menus</Link>
          <Link to="/management" className="nav-link-ui">Restaurant Management Software</Link>
          <Link to="/services" className="nav-link-ui">Services</Link>
          <Link to="/my-bookings" className={`nav-link-ui book-link ${isActive('/my-bookings') ? 'active-book' : ''}`}>My Bookings</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;