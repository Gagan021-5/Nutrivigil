import axios from 'axios';

const API_URL = 'http://localhost:3000/api/planner';

export const savePlan = async (planData) => {
  const response = await axios.post(`${API_URL}/save`, planData);
  return response.data;
};

export const fetchPlan = async (userId) => {
  const response = await axios.get(`${API_URL}/${userId}`);
  return response.data;
};