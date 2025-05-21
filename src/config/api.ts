import axios from 'axios';

//const BASE_URL = 'http://localhost:3000';
const BASE_URL = 'https://goosebe.onrender.com';

export const API_ENDPOINTS = {
  auth: {
    login: `${BASE_URL}/auth/login`,
  },
  rounds: {
    list: `${BASE_URL}/rounds`,
    create: `${BASE_URL}/rounds`,
    get: (id: number) => `${BASE_URL}/rounds/${id}`,
    tap: (id: number) => `${BASE_URL}/goose/tap/${id}`,
    details: (id: number) => `${BASE_URL}/rounds/${id}/details`,
  },
};

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });

    if (error.response?.status === 401 && !window.location.pathname.includes('/login')) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
