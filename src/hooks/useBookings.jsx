import { useState, useEffect, useCallback } from 'react';

const BOOKINGS_KEY = 'bookings'; // Required localStorage key

export const useBookings = () => {
  // Initialize state from localStorage
  const [bookings, setBookings] = useState(() => {
    try {
      const storedBookings = localStorage.getItem(BOOKINGS_KEY);
      return storedBookings ? JSON.parse(storedBookings) : [];
    } catch (error) {
      console.error("Could not load bookings from localStorage", error);
      return [];
    }
  });

  // Effect to update localStorage whenever bookings change
  useEffect(() => {
    try {
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
    } catch (error) {
      console.error("Could not save bookings to localStorage", error);
    }
  }, [bookings]);

  // Function to add a new booking
  const addBooking = useCallback((newBooking) => {
    const bookingWithId = { 
      ...newBooking, 
      id: Date.now() // Simple unique ID
    };
    setBookings(prevBookings => [...prevBookings, bookingWithId]);
  }, []);
  
  // Function to remove a booking (optional, but good practice)
  const cancelBooking = useCallback((bookingId) => {
    setBookings(prevBookings => prevBookings.filter(b => b.id !== bookingId));
  }, []);

  return { bookings, addBooking, cancelBooking };
};