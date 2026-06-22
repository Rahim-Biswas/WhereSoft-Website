import axios from 'axios';
import API_BASE from '../config';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' }
});

// Attach JWT to every request if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('ws_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401 globally
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('ws_token');
      localStorage.removeItem('ws_user');
    }
    return Promise.reject(err);
  }
);

export default api;
