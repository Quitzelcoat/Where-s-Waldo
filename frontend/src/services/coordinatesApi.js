import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const validateClick = async (character, x, y) => {
  const response = await axios.post(`${API_URL}/validate`, {
    character,
    x,
    y,
  });
  return response.data;
};
