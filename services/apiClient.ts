import axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const baseURL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000';

interface RetryAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

type RefreshResponse = {
  accessToken: string;
  refreshToken: string;
};

const apiClient = axios.create({
  baseURL,
});

apiClient.interceptors.request.use(async (config) => {
  const requestConfig = config as InternalAxiosRequestConfig;
  const token = await AsyncStorage.getItem('accessToken');

  if (token) {
    requestConfig.headers = requestConfig.headers ?? {};
    requestConfig.headers.Authorization = `Bearer ${token}`;
  }

  return requestConfig;
});

const refreshClient = axios.create({
  baseURL,
});

const handleRefresh = async (): Promise<RefreshResponse> => {
  const storedRefreshToken = await AsyncStorage.getItem('refreshToken');

  if (!storedRefreshToken) {
    throw new Error('Refresh token not found');
  }

  const response = await refreshClient.post('/auth/refresh', {
    refreshToken: storedRefreshToken,
  });

  const payload = response.data?.data ?? response.data;
  if (!payload?.accessToken || !payload?.refreshToken) {
    throw new Error('Invalid refresh response');
  }

  await AsyncStorage.setItem('accessToken', payload.accessToken);
  await AsyncStorage.setItem('refreshToken', payload.refreshToken);

  return payload;
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const status = error.response?.status;
    const originalRequest = error.config as RetryAxiosRequestConfig | undefined;

    if (status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const tokens = await handleRefresh();
        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;
        return apiClient(originalRequest as AxiosRequestConfig);
      } catch (refreshError) {
        await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
        router.replace('/login');
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
