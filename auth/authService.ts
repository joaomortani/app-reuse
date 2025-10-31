import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '@/services/apiClient';

type ApiResponse = {
  token?: string;
  message?: string;
  [key: string]: unknown;
};

const parseResponse = async (response: Response): Promise<ApiResponse> => {
  const text = await response.text();

  if (!text) {
    return {};
  }

  try {
    return JSON.parse(text);
  } catch (error) {
    return { message: text };
  }
};

const extractErrorMessage = (data: ApiResponse, fallback: string) => {
  if (typeof data.message === 'string' && data.message.trim().length > 0) {
    return data.message;
  }

  return fallback;
};

export async function login(email: string, password: string) {
  const response = await fetch(`${API_URL}/v1/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await parseResponse(response);

  if (!response.ok) {
    throw new Error(extractErrorMessage(data, 'Credenciais inválidas.'));
  }

  if (!data.token || typeof data.token !== 'string') {
    throw new Error('Resposta inválida da API.');
  }

  await AsyncStorage.setItem('token', data.token);
  return data.token;
}

export async function register(name: string, email: string, password: string) {
  const response = await fetch(`${API_URL}/v1/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await parseResponse(response);

  if (!response.ok) {
    throw new Error(extractErrorMessage(data, 'Não foi possível cadastrar o usuário.'));
  }

  if (data.token && typeof data.token === 'string') {
    await AsyncStorage.setItem('token', data.token);
    return data.token;
  }

  return null;
}

export async function logout() {
  await AsyncStorage.multiRemove([ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY]);
}
