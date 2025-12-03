import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getRestaurants } from '../api/api';
import '../styles/App.css';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const state = searchParams.get('state');
  const city = searchParams.get('city');

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (state && city) {
        setIsLoading(true);
        const results = await getRestaurants(state, city);
        setRestaurants(results);
        setIsLoading(false);
      } else {
        navigate('/');
      }
    };
    fetchRestaurants();
  }, [state, city, navigate]);

  const handleBookClick = (restaurant) => {
    const mockId = restaurant.name.replace(/\s/g, '-');
    navigate(`/book/${mockId}`, { state: { restaurant } });
  };

  return (
    <div className="search-results-page-ui">
      {/* --- Search Bar (Repeating element from header) --- */}
      <div className="search-bar-mini-ui">
        {/* State and City displays here based on URL params */}
        <input type="text" value={state} readOnly />
        <input type="text" value={city} readOnly />
        <button className="search-button-ui">Search</button>
      </div>

      <div className="results-content-wrapper-ui">
        <div className="restaurant-list-column-ui">
          {/* Required H1 Tag for Search Results Heading */}
          <h1 className="results-heading-ui">
            {restaurants.length} restaurants available in {city}
          </h1>

          <p className="sub-header-ui">Book tables with minimum wait time & verified restaurant details</p>

          {isLoading ? (
             <div className="loading-state-ui"><p>Searching for restaurants... (This may take up to a minute)</p></div>
          ) : (
            restaurants.map((restaurant, index) => (
              <div key={index} className="restaurant-card-ui">
                <div className="restaurant-info-ui">
                  {/*  */}
                  <div className="text-details-ui">
                    {/* Required <h3> tag */}
                    <h3 className="restaurant-name-ui">{restaurant.name}</h3>
                    <p>{restaurant.city}, {restaurant.state}</p>
                    <p className="address-ui">{restaurant.address}</p>
                    <p className="booking-fee-ui">FREE **R500** Registration fee</p>
                    <div className="rating-ui">
                       <span className="rating-star-ui">★</span>
                       <span>{restaurant.rating || '4.5'}</span>
                    </div>
                  </div>
                </div>
                <div className="booking-status-ui">
                  <p className="available-text-ui">Available Today</p>
                  <button 
                    className="book-reservation-button-ui"
                    onClick={() => handleBookClick(restaurant)}
                  >
                    Book FREE Reservation
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* --- ADVERTISEMENT BANNER (Right Sidebar) --- */}
        <div className="sidebar-ad-ui">
          {/*  */}
          <div className="ad-content-ui">
            <h3>SUPER DELICIOUS FOOD</h3>
            <p>50% OFF</p>
          </div>
          <div className="ad-contact-ui">
             <p>FAUCET HOTEL</p>
             <p>www.restauranthotel.com</p>
             <p>+91 987-654-3210</p>
          </div>
        </div>
      </div>
      
       {/* Download App Section (Included in LandingPage but shown here for completeness) */}
      <div className="download-app-section-ui-placeholder">
        {/* Component to Download the Restaurant Booking App... */}
      </div>
    </div>
  );
};

export default SearchResults;