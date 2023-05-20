import axios from 'axios';

const BASE_URL = "http://localhost:5000";

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, { username, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
