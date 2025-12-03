import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useBookings } from '../hooks/useBookings';
import '../styles/App.css'; 

// Helper to generate dates (up to one week in advance)
const getAvailableDates = () => {
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    dates.push({
      fullDate: date.toISOString().split('T')[0],
      dayName: i === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' }),
      dateNumber: date.getDate(),
    });
  }
  return dates;
};

// Mock time slots grouped by time of day
const timeSlots = {
  Morning: ['9:00 AM', '10:00 AM', '11:00 AM'],
  Afternoon: ['12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM'],
  Evening: ['6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'],
};

const BookingInterface = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addBooking } = useBookings();
  
  const availableDates = getAvailableDates();
  const restaurant = location.state?.restaurant;

  // Initialize state to the current day's full date string
  const [selectedDate, setSelectedDate] = useState(availableDates[0].fullDate);
  const [selectedTime, setSelectedTime] = useState('');
  
  if (!restaurant) {
    return (
        <div className="booking-page-ui-wrapper">
            <div className="error-message-ui">
                <p>Restaurant data not found. Please go back and search again.</p>
                <button className="search-button-ui" onClick={() => navigate('/')}>
                    Go to Search
                </button>
            </div>
        </div>
    );
  }

  const handleBookingConfirm = () => {
    if (!selectedTime) {
      alert("Please select a time slot.");
      return;
    }

    const newBooking = {
      restaurantName: restaurant.name,
      restaurantAddress: restaurant.address,
      date: selectedDate,
      time: selectedTime,
      bookingTime: new Date().toISOString(),
      city: restaurant.city,
      state: restaurant.state,
    };

    addBooking(newBooking);
    alert(`Reservation confirmed for ${restaurant.name} on ${selectedDate} at ${selectedTime}!`);
    navigate('/my-bookings');
  };

  return (
    <div className="booking-page-ui-wrapper">
      <div className="booking-card-main-ui">
        {/* Required <h3> tag for the restaurant name */}
        <h3 className="booking-restaurant-name-ui">Booking for {restaurant.name}</h3>
        <p className="booking-address-ui">{restaurant.address}, {restaurant.city}</p>
        <hr/>
        
        {/* 1. Date Selection (Calendar style matching design aesthetics) */}
        <h4 className="section-title-ui">Select Date (Up to 7 Days in Advance)</h4>
        <div className="date-selector-ui">
          {availableDates.map(dateObj => (
            <div
              key={dateObj.fullDate}
              className={`date-tile-ui ${selectedDate === dateObj.fullDate ? 'selected' : ''}`}
              onClick={() => setSelectedDate(dateObj.fullDate)}
            >
              <span className="day-name-ui">{dateObj.dayName}</span>
              <span className="date-number-ui">{dateObj.dateNumber}</span>
            </div>
          ))}
        </div>

        {/* 2. Time Slot Selection */}
        <h4 className="section-title-ui">Select Time Slot</h4>
        <div className="time-slots-container-ui">
          {Object.entries(timeSlots).map(([timeOfDay, slots]) => (
            <div key={timeOfDay} className="time-of-day-group-ui">
              {/* Required <p> tag for Time of Day */}
              <p className="time-of-day-heading-ui">
                {timeOfDay}
                {timeOfDay === 'Morning' && <span className="today-label-ui"> (Today)</span>}
              </p> 
              <div className="slots-grid-ui">
                {slots.map(slot => (
                  <button
                    key={slot}
                    className={`time-slot-button-ui ${selectedTime === slot ? 'selected' : ''}`}
                    onClick={() => setSelectedTime(slot)}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <button 
          className="confirm-booking-button-ui" 
          onClick={handleBookingConfirm}
          disabled={!selectedTime}
        >
          Confirm Reservation
        </button>
      </div>
    </div>
  );
};

export default BookingInterface;