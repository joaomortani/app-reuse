import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.API_URL || 'http://0.0.0.0:8090/api';

type LoginResponse = {
  token?: string;
  user?: Record<string, unknown> | null;
};

export async function login(email: string, password: string): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/v1/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) throw new Error('Login failed');

  const data: LoginResponse = await response.json();
  if (data?.token) {
    await AsyncStorage.setItem('token', data.token);
  }
  if (data?.user) {
    await AsyncStorage.setItem('user', JSON.stringify(data.user));
  }
  return data;
}

export async function register(email: string, password: string) {
  const response = await fetch(`${API_URL}/v1/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) throw new Error('Register failed');

  const data = await response.json();
  return data.email;
}

export async function logout() {
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('user');
}
