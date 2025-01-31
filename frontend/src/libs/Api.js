import axios from 'axios';

export const Api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

Api.interceptors.request.use(
  (config) => {
    const data = localStorage.getItem('auth');

    if (data) {
      const auth = JSON.parse(data)
      config.headers.Authorization = `Bearer ${auth.token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
