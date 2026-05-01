import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production' 
  ? '/_/backend/api/v1' 
  : 'http://localhost:5000/api';

const api = axios.create({
  baseURL,
  withCredentials: true,
});

export default api;