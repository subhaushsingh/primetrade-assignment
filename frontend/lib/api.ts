import axios from 'axios';

const baseURL = 'https://primetrade-assignment-h3io.onrender.com/api/v1/'

const api = axios.create({
  baseURL,
  withCredentials: true,
});

export default api;