import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000';

type AuthResponse = {
  accessToken: string;
  refreshToken: string;
};

const parseResponse = async (response: Response) => {
  if (!response.ok) {
    const message = `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  const payload = await response.json();
  return (payload?.data ?? payload) as AuthResponse;
};

export async function login(email: string, password: string) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await parseResponse(response);

  if (!data.accessToken || !data.refreshToken) {
    throw new Error('Login response missing tokens');
  }

  await AsyncStorage.setItem('accessToken', data.accessToken);
  await AsyncStorage.setItem('refreshToken', data.refreshToken);

  return data.accessToken;
}

export async function register(email: string, password: string) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await parseResponse(response);

  await AsyncStorage.setItem('accessToken', data.accessToken);
  await AsyncStorage.setItem('refreshToken', data.refreshToken);

  return data;
}

export async function logout() {
  await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
}
