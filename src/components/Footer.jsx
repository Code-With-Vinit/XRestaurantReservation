import React from 'react';
import '../styles/App.css'; 
import X from "../assets/X.png"
import YT from "../assets/YT.png"
import Pinterest from "../assets/Pinterest.png"
import FB from "../assets/FB.png"
import RestaurantLogo from "../assets/Restaurant-Logo.png"



const Footer = () => {
  return (
    <footer className="app-footer-ui">
      <div className="footer-content-main-ui">
        <div className="footer-logo-ui">
          {/*  */}
          {/* <span className="logo-text-ui">Restaurant</span> */}
          <div >
            <img className='footer-logo' src={RestaurantLogo} alt="" />
          </div>
          <div className="footer-socials-ui">
              {/* Placeholders for social icons */}
              <img src={FB} alt="" />
              <img src={X} alt="" />
              <img src={YT} alt="" />
              <img src={Pinterest} alt="" />
          </div>
        </div>
        
        <div className="footer-links-ui">
          {/* Column 1 */}
          <ul>
            <li>&gt; About Our Restaurant</li>
            <li>&gt; Menu</li>
            <li>&gt; Photo Gallery</li>
            <li>&gt; Contact Us</li>
            <li>&gt; Terms of Service</li>
          </ul>
          {/* Column 2 */}
          <ul>
            <li>&gt; Reservations</li>
            <li>&gt; Special Events</li>
            <li>&gt; Private Dining</li>
            <li>&gt; Customer Support</li>
            <li>&gt; Gift Cards</li>
          </ul>
          {/* Column 3 */}
          <ul>
            <li>&gt; Our Cuisine</li>
            <li>&gt; Wine List</li>
            <li>&gt; Chef's Special</li>
            <li>&gt; Catering Services</li>
            <li>&gt; Loyalty Program</li>
          </ul>
        </div>
      </div>
      <div className="footer-copyright-ui">
        <p>Copyright ©2025 FineDining.com. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;