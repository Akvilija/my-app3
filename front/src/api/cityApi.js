import axios from "axios";
import { BASE_URL } from "./BaseUrl"; 

export const getCities = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/cities`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw error;
  }
};

export const createCity = async (cityData) => {
  try {
    const response = await axios.post(`${BASE_URL}/cities`, cityData); // POST request to create a city
    return response.data; // Return the created city
  } catch (error) {
    console.error("Error creating city:", error);
    throw error; // Re-throw the error for handling in the calling code
  }
};