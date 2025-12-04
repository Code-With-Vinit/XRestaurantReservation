

import React from 'react';
import { useBookings } from '../hooks/useBookings';
import '../styles/App.css';
import App from "../assets/App.png";
import banner from "../assets/banner.png";
import Restaurant from "../assets/Restaurant.png";
const MyBookings = () => {
  const { bookings } = useBookings();

  // Add safety check for undefined/null time
  const formatTime = (time) => {
    if (!time) return 'N/A'; // Return default if time is missing
    return time.split(' ')[0] + ' AM';
  };

  return (
    <div className="my-bookings-page-ui">
      {/* Top Banner Section */}
      <div className="my-bookings-banner-ui">
         {/* Required <h1> tag */}
         <h1 className="my-bookings-heading-ui">My Bookings</h1>
         <div className="search-my-bookings-ui">
             <input type="text" placeholder="Search By Restaurant" />
             <button>Search</button>
         </div>
      </div>
      
      <div className="my-bookings-content-wrapper-ui">
        <div className="bookings-list-column-ui">
          {bookings.length === 0 ? (
            <div className="no-bookings-ui">
              <p>You have no current reservations. Start booking today!</p>
            </div>
          ) : (
            bookings.map(booking => (
              <div key={booking.id} className="booking-card-ui-detail">
                <div className="booking-info-left-ui">
                  <img src={Restaurant} alt="" />
                  <div className="booking-text-details-ui">
                    {/* Required <h3> tag */}
                    <h3 className="restaurant-name-ui">{booking.restaurantName}</h3>
                    <p className="location-ui">{booking.city || ""}, {booking.state || ""}</p>
                    <p className="address-ui">{booking.restaurantAddress}</p>
                    <p className="booking-fee-ui">
                      FREE <s style={{ textDecoration: 'line-through' }}>₹500</s> Registration fee
                    </p>
                    <div className="rating-ui">
                       <span className="rating-star-ui">★</span>
                       <span>4.6</span>
                    </div>
                  </div>
                </div>
                <div className="booking-time-date-ui">
                    <p className="booking-time-ui">{formatTime(booking.time)}</p>
                    <p className="booking-date-ui">
                      {booking.date 
                        ? new Date(booking.date).toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' })
                        : 'Date not set'
                      }
                    </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* --- ADVERTISEMENT BANNER (Right Sidebar, same as Search Page) --- */}
        <div className="sidebar-ad-ui">
           <img src={banner} alt="" />
        </div>
      </div>
       {/* Download App Section (Placeholder) */}
      <section className="download-app-section-ui">
             <div className="app-content-ui">
               <div className="app-hand-image">
                 <img src={App} alt="" />
               </div>
               <div className="app-text-ui">
                 <h2>
                   Download the{" "}
                   <span className="blue-text">Restaurant Booking App</span>
                 </h2>
                 <p>Get the link to download the app</p>
                 <div className="phone-input-ui">
                   <input type="tel" placeholder="+91 Enter phone number" />
                   <button className="send-sms-button-ui">Send SMS</button>
                 </div>
                 <div className="app-stores-ui">
                   <button className="store-button-ui">Google Play</button>
                   <button className="store-button-ui">App Store</button>
                 </div>
               </div>
             </div>
           </section>
    </div>
  );
};

export default MyBookings;