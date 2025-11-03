import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiBaseUrl } from './config';

type UnauthorizedHandler = () => void | Promise<void>;

let unauthorizedHandler: UnauthorizedHandler | null = null;
let isRedirecting = false;

export function setUnauthorizedHandler(handler: UnauthorizedHandler | null) {
  unauthorizedHandler = handler;
}

async function attachToken(
  config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> {
  try {
    const storedToken = await AsyncStorage.getItem('token');

    if (storedToken) {
      if (config.headers) {
        const headers = config.headers as any;
        const hasSet = typeof headers.set === 'function';

        if (hasSet) {
          const currentAuthorization = headers.get?.('Authorization') ?? headers.Authorization;
          if (!currentAuthorization) {
            headers.set('Authorization', `Bearer ${storedToken}`);
          }
        } else if (!headers.Authorization) {
          headers.Authorization = `Bearer ${storedToken}`;
        }
      } else {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
    }
  } catch (error) {
    console.warn('Não foi possível anexar o token ao header Authorization:', error);
  }

  return config;
}

async function handleUnauthorized(error: AxiosError) {
  if (error.response?.status !== 401) {
    throw error;
  }

  try {
    await AsyncStorage.multiRemove(['token', 'refreshToken', 'user']);
  } catch (storageError) {
    console.warn('Erro ao limpar dados de autenticação:', storageError);
  }

  if (!isRedirecting && unauthorizedHandler) {
    isRedirecting = true;
    try {
      await unauthorizedHandler();
    } finally {
      isRedirecting = false;
    }
  }

  throw error;
}

const apiClient = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(attachToken);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error instanceof AxiosError) {
      return handleUnauthorized(error);
    }

    throw error;
  },
);

export default apiClient;
