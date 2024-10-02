import axios from "axios";
import { toast } from "react-toastify";

const API_URL = 'https://story-app-2-1.onrender.com/api';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(
      "Error during signup: " + (error.response?.data.message || error.message)
    );
    throw error.response
      ? error.response.data.message || "Registration failed"
      : "Registration failed";
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(
      "Error during signup: " + (error.response?.data.message || error.message)
    );
    throw error.response
      ? error.response.data.message || "Registration failed"
      : "Registration failed";
  }
};

export const loadUser = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/auth/getuser`, {
      headers: { Authorization: `Bearer ${token}` },
    });
   
    return response.data;
  } catch (error) {
    console.error("Error loading user:", error);
    throw error;
  }
};
