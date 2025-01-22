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