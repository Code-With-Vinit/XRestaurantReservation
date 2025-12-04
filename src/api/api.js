import axios from 'axios';

const BASE_URL = 'https://restaurantdata.onrender.com';

/**
 * Fetches all available states.
 * @returns {Promise<string[]>} List of state names.
 */
export const getStates = async () => {
  try {
    // NOTE: Backend may take 50-60 seconds to respond.
    const response = await axios.get(`${BASE_URL}/states`);
    return response.data;
  } catch (error) {
    console.error("Error fetching states:", error);
    return [];
  }
};

/**
 * Fetches cities for a specific state.
 * @param {string} state - The name of the state.
 * @returns {Promise<string[]>} List of city names.
 */
export const getCitiesByState = async (state) => {
  if (!state) return [];
  try {
    // NOTE: Backend may take 50-60 seconds to respond.
    const response = await axios.get(`${BASE_URL}/cities/${state}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching cities for ${state}:`, error);
    return [];
  }
};

/**
 * Fetches restaurants based on state and city.
 * @param {string} state - The name of the state.
 * @param {string} city - The name of the city.
 * @returns {Promise<object[]>} List of restaurant objects.
 */
export const getRestaurants = async (state, city) => {
  if (!state || !city) return [];
  try {
    // NOTE: Backend may take 50-60 seconds to respond.
    const response = await axios.get(`${BASE_URL}/restaurants`, {
      params: { state, city }
    });
    // Extract required fields: Name, Address, City, State, Overall Rating
    return response.data.map(r => ({
      name: r.restaurantName,
      address: r.address,
      city: r.city,
      state: r.state,
      rating: r.rating['Overall Rating']
    }));
  } catch (error) {
    console.error(`Error fetching restaurants for ${city}, ${state}:`, error);
    return [];
  }
};