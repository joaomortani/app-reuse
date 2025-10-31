import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8090/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
