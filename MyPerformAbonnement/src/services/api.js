import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie

const api = axios.create({
  baseURL: 'http://localhost:5000', 
});

api.interceptors.request.use((config) => {
  const token = Cookies.get('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;