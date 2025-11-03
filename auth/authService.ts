import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiBaseUrl } from '@/services/config';

const API_URL = getApiBaseUrl();

type LoginResponse = {
  token?: string;
  user?: Record<string, unknown> | null;
};

async function parseResponse(response: Response): Promise<any> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

function extractErrorMessage(data: any, fallback: string): string {
  if (!data) return fallback;
  if (typeof data === 'string') return data;
  if (data.message && typeof data.message === 'string') return data.message;
  if (data.error && typeof data.error === 'string') return data.error;
  if (data.error?.message && typeof data.error.message === 'string') return data.error.message;
  if (Array.isArray(data.errors) && data.errors.length > 0) {
    const first = data.errors[0];
    if (typeof first === 'string') return first;
    if (first?.message && typeof first.message === 'string') return first.message;
  }
  return fallback;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  console.log(`[authService] Tentando login em: ${API_URL}/auth/login`);
  
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data: any = await parseResponse(response);
  console.log(`[authService] Resposta login (status ${response.status}):`, JSON.stringify(data));

  if (!response.ok) {
    const errorMsg = extractErrorMessage(data, 'Credenciais inválidas.');
    console.error(`[authService] Erro no login:`, errorMsg);
    throw new Error(errorMsg);
  }

  // Backend retorna: {success: true, data: {user: {...}, accessToken: "...", refreshToken: "..."}}
  const responseData = data?.data || data;
  const accessToken = responseData?.accessToken || responseData?.access_token;
  const refreshToken = responseData?.refreshToken || responseData?.refresh_token;
  const user = responseData?.user || (responseData?.id ? responseData : null);

  if (accessToken) {
    await AsyncStorage.setItem('token', accessToken);
  }
  if (refreshToken) {
    await AsyncStorage.setItem('refreshToken', refreshToken);
  }
  if (user) {
    await AsyncStorage.setItem('user', JSON.stringify(user));
  }

  return { token: accessToken || undefined, user: user || null };
}

export async function register(name: string, email: string, password: string): Promise<string | null> {
  console.log(`[authService] Tentando registro em: ${API_URL}/users/register`);
  
  const response = await fetch(`${API_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await parseResponse(response);
  console.log(`[authService] Resposta registro (status ${response.status}):`, JSON.stringify(data));

  if (!response.ok) {
    const errorMsg = extractErrorMessage(data, 'Não foi possível cadastrar o usuário.');
    console.error(`[authService] Erro no registro:`, errorMsg);
    throw new Error(errorMsg);
  }

  // Backend retorna: {success: true, data: {...usuario...}}
  const userData = data?.data || data;
  if (userData) {
    await AsyncStorage.setItem('user', JSON.stringify(userData));
  }

  return null;
}

export async function refreshToken(): Promise<string | null> {
  const refreshToken = await AsyncStorage.getItem('refreshToken');
  if (!refreshToken) {
    throw new Error('Refresh token não encontrado');
  }

  console.log(`[authService] Renovando token em: ${API_URL}/auth/refresh`);
  
  const response = await fetch(`${API_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  const data: any = await parseResponse(response);
  console.log(`[authService] Resposta refresh (status ${response.status}):`, JSON.stringify(data));

  if (!response.ok) {
    const errorMsg = extractErrorMessage(data, 'Erro ao renovar token.');
    console.error(`[authService] Erro no refresh:`, errorMsg);
    throw new Error(errorMsg);
  }

  // Backend retorna: {success: true, data: {accessToken: "..."}}
  const responseData = data?.data || data;
  const accessToken = responseData?.accessToken || responseData?.access_token;
  const newRefreshToken = responseData?.refreshToken || responseData?.refresh_token;

  if (accessToken) {
    await AsyncStorage.setItem('token', accessToken);
  }
  if (newRefreshToken) {
    await AsyncStorage.setItem('refreshToken', newRefreshToken);
  }

  return accessToken || null;
}

export async function logout() {
  const refreshToken = await AsyncStorage.getItem('refreshToken');
  
  if (refreshToken) {
    try {
      console.log(`[authService] Fazendo logout em: ${API_URL}/auth/logout`);
      
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      const data = await parseResponse(response);
      console.log(`[authService] Resposta logout (status ${response.status}):`, JSON.stringify(data));
    } catch (error) {
      console.warn('[authService] Erro ao fazer logout no backend:', error);
      // Continua removendo tokens localmente mesmo se falhar no backend
    }
  }

  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('refreshToken');
  await AsyncStorage.removeItem('user');
}
