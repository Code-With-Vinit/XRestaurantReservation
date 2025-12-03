import React from 'react';
import { useBookings } from '../hooks/useBookings';
import '../styles/App.css';

const MyBookings = () => {
  const { bookings } = useBookings();

  const formatTime = (time) => time.split(' ')[0] + ' AM'; // Basic formatting example

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
                  {/*  */}
                  <div className="booking-text-details-ui">
                    {/* Required <h3> tag */}
                    <h3 className="restaurant-name-ui">{booking.restaurantName}</h3>
                    <p className="location-ui">{booking.city || 'Austin'}, {booking.state || 'Texas'}</p>
                    <p className="address-ui">{booking.restaurantAddress}</p>
                    <p className="booking-fee-ui">FREE **R500** Registration fee</p>
                    <div className="rating-ui">
                       <span className="rating-star-ui">★</span>
                       <span>4.6</span>
                    </div>
                  </div>
                </div>
                <div className="booking-time-date-ui">
                    <p className="booking-time-ui">{formatTime(booking.time)}</p>
                    <p className="booking-date-ui">{new Date(booking.date).toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* --- ADVERTISEMENT BANNER (Right Sidebar, same as Search Page) --- */}
        <div className="sidebar-ad-ui">
          {/*  */}
           <div className="ad-content-ui">
            <h3>ARE YOU HUNGRY?</h3>
            <p>50% OFF</p>
          </div>
          <div className="ad-contact-ui">
             <p>NOODLES - PIZZA - BURGER</p>
          </div>
        </div>
      </div>
       {/* Download App Section (Placeholder) */}
      <div className="download-app-section-ui-placeholder">
        {/* Component to Download the Restaurant Booking App... */}
      </div>
    </div>
  );
};

export default MyBookings;