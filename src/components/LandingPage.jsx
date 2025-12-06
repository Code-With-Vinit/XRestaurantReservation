import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getStates, getCitiesByState } from "../api/api";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "../styles/App.css";
import chef from "../assets/chef.png";
import Building from "../assets/Building.png";
import SpecialMenus from "../assets/SpecialMenus.png";
import Services from "../assets/Services.png";
import Reservations from "../assets/Reservations.png";
import Locations from "../assets/Locations.png";
import swiperX from "../assets/swiperX.png";
import swiper2 from "../assets/swiper2.png";
import RestaurantLogo from "../assets/Restaurant-Logo.png";
import News from "../assets/News.png";
import Team from "../assets/Team.png";
import FAQ from "../assets/FAQ.png";
import App from "../assets/App.png";

const LandingPage = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // --- API Logic (Unchanged) ---
  useEffect(() => {
    const fetchStates = async () => {
      setIsLoading(true);
      const stateList = await getStates();
      setStates(stateList);
      setIsLoading(false);
    };
    fetchStates();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      if (selectedState) {
        setIsLoading(true);
        const cityList = await getCitiesByState(selectedState);
        setCities(cityList);
        setSelectedCity("");
        setIsLoading(false);
      } else {
        setCities([]);
      }
    };
    fetchCities();
  }, [selectedState]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (selectedState && selectedCity) {
      // Navigate to search results using URL parameters
      navigate(`/restaurants?state=${selectedState}&city=${selectedCity}`);
    }
  };

  const handleFindRestaurantsClick = () => {
    // Navigate to a search page or the search results page, perhaps without initial results
    // As per the requirement, this leads to available restaurants. We'll simulate a general search/selection page.
    // For now, let's navigate to the search bar to prompt selection.
    
    navigate(`/restaurants`);
    // alert("Please select a location to find restaurants.");
    // alert("Check");
    // Optionally: navigate('/restaurants') and show an empty state.
  };

  return (
    <div className="landing-page-ui">
      {/* --- 1. HERO SECTION (Main Content) --- */}
      {/* Background (1).jpg shows this section defining the top of the page */}
      <div className="hero-section-ui-new">
        <div className="hero-content-ui-new">
          <h2>Skip the wait! Reserve Online</h2>
          <h1 className="hero-title-ui">Table Reservation</h1>
          <p className="hero-description">
            Connect instantly with our platform to reserve tables at your favorite restaurants.
          </p>
          <button
            onClick={handleFindRestaurantsClick}
            className="find-restaurants-button-ui"
          >
            Find Restaurants
          </button>
        </div>

        <div>
          {/*  - Placeholder for the chef with spatula and whisk */}
          <img className="chef-avatar-ui" src={chef} alt="" />
        </div>
      </div>

      {/* --- 2. SEARCH AND SERVICE ICONS SECTION --- */}
      {/* This entire section is visually grouped and positioned below the Hero */}
      <div className="search-and-icons-wrapper-ui">
        {/* Search Bar - Note: This must contain the required IDs */}
        <div className="search-form-container-ui-standalone">
          <form onSubmit={handleSearch} className="search-form-ui-standalone">
            {isLoading && (
              <p className="loading-message">
                Loading data... (may take 50-60s)
              </p>
            )}

            {/* State Dropdown */}

             <div id="state" className="dropdown-wrapper-ui">
              <input type="text" value={selectedState || "State"} readOnly placeholder="State" />
               {/* Using input placeholder as per image, but functionally using select  */}
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                disabled={isLoading}
                className="visually-hidden-select"
              >
                <option value="">Select State</option>
                {states.map((state) => (
                   <ul>
                    <li>
                    <option key={state} value={state}>
                          {state}
                    </option>
                  </li>
                  </ul>
                ))}
              </select>
             </div>  


            {/* City Dropdown */}
            <div id="city" className="dropdown-wrapper-ui">
              <input type="text" value={selectedCity || "City"} readOnly placeholder="City" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                disabled={isLoading || !selectedState}
                className="visually-hidden-select"
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <ul>
                    <li>
                    <option key={city} value={city}>
                          {city}
                    </option>
                  </li>
                  </ul>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              id="searchBtn"
              disabled={!selectedState || !selectedCity || isLoading}
              className="search-button-ui"
            >
              <span className="search-icon-ui">🔍</span> Search
            </button>
          </form>
        </div>

        <p className="you-may-be-looking-for-ui">You may be looking for</p>

        {/* Service Icons Section */}
        <div className="icon-list-ui-standalone">
          {/* Icons based on Background (1).jpg */}
          <div className="service-icon-card-ui-new">
            {/*  */}
            <span className="icon-placeholder">
              <img src={Building} alt="" />
            </span>
            <p>Restaurants</p>
          </div>
          <div className="service-icon-card-ui-new">
            {/*  */}
            <span className="icon-placeholder">
              <img src={Locations} alt="" />
            </span>
            <p>Locations</p>
          </div>
          <div className="service-icon-card-ui-new active">
            {/*  - This one is active/selected */}
            <span className="icon-placeholder">
              <img src={Reservations} alt="" />
            </span>
            <p>Reservations</p>
          </div>
          <div className="service-icon-card-ui-new">
            {/*  */}
            <span className="icon-placeholder">
              <img src={SpecialMenus} alt="" />
            </span>
            <p>Special Menus</p>
          </div>
          <div className="service-icon-card-ui-new">
            {/*  */}
            <span className="icon-placeholder">
              <img src={Services} alt="" />
            </span>
            <p>Services</p>
          </div>
        </div>
      </div>

      {/* --- 3. SUPER DELICIOUS FOOD CAROUSEL SECTION --- */}
      {/* ... (Existing code for carousel, restaurant details, news, staff, FAQ, and download app) ... */}

      {/* --- 4. SUPER DELICIOUS FOOD CAROUSEL SECTION --- */}
      <section className="food-offers-section-ui">
        <h2>SUPER DELICIOUS FOOD</h2>
        <div className="carousel-wrapper-ui">
          <Swiper
            spaceBetween={30}
            slidesPerView={3}
            navigation={true}
            loop={true}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="offer-card-ui">
                <img src={swiperX} alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="offer-card-ui">
                <img src={swiper2} alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="offer-card-ui">
                <img src={swiperX} alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="offer-card-ui">
                <img src={swiper2} alt="" />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      {/* --- 5. RESTAURANT DETAILS/LOGO SECTION (Table Reservation Details) --- */}
      <section className="restaurant-details-section-ui">
        <div className="details-content-ui">
          <div className="large-logo-ui">
            {/*  */}
            <img src={RestaurantLogo} alt="" />
          </div>
          <div className="details-text-ui">
            <h1 className="details-title-ui">Table Reservation</h1>
            <ul>
              <li>Feature 1: Seamless booking experience.</li>
              <li>Feature 2: Real-time table availability.</li>
              <li>Feature 3: Verified customer reviews.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* --- 6. READ OUR LATEST NEWS SECTION --- */}
      <section className="news-section-ui">
        <h2>Read Our Latest News</h2>
        <div className="news-cards-ui">
          <div className="news-card-ui">
            <img style={{ width: "100%" }} src={News} alt="" />
            <p>Dining | March 31,2022</p>
            <p>Top 5 Fine Dinning Experiences You Must Try</p>
            <p>👨‍🍳 Chef John</p>
          </div>
          <div className="news-card-ui">
            <img style={{ width: "100%" }} src={News} alt="" />
            <p>Dining | March 31,2022</p>
            <p>Top 5 Fine Dinning Experiences You Must Try</p>
            <p>👨‍🍳 Chef John</p>
          </div>
          <div className="news-card-ui">
            <img style={{ width: "100%" }} src={News} alt="" />
            <p>Dining | March 31,2022</p>
            <p>Top 5 Fine Dinning Experiences You Must Try</p>
            <p>👨‍🍳 Chef John</p>
          </div>
        </div>
      </section>

      {/* --- 7. TABLE BOOKING & STAFF IMAGE SECTION --- */}
      <section className="table-booking-staff-ui">
        <div className="staff-content-ui">
          <div className="booking-text-ui">
            <p>RESERVE YOUR DINING EXPERIENCE</p>
            <h1 className="booking-staff-title-ui">Table Booking</h1>
            <p>
              Discover the perfect dining experience at our restaurant. From
              intimate dinners to special celebrations, we offer seamless
              reservations that ensure your dining experience is exactly as you
              envision. Our attentive staff is ready to accommodate your
              preferences and dietary requirements.
            </p>
          </div>
          <img className="staff-photo-ui" src={Team} alt="" />
          
        </div>
        
      </section>

      {/* --- 8. FAQ SECTION --- */}
      <section className="faq-section-ui">
        
          <div className="faq-background-image-ui">
            {/*  - Used for the FAQ image placeholder */}
            {/* <img  src={FAQ} alt="" /> */}
          </div>
          <div className="faq-content-ui">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-accordion-ui">
              {/* Placeholder for accordion items */}
              <div className="faq-item">How do I reserve a table?</div>
              <div className="faq-item">Can I cancel my reservation?</div>
            </div>
          </div>
      </section>

      {/* --- 9. DOWNLOAD APP SECTION --- */}
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

export default LandingPage;
