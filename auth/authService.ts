import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '@/services/apiClient';

export const ACCESS_TOKEN_KEY = 'accessToken';
export const REFRESH_TOKEN_KEY = 'refreshToken';

type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

type AuthResponse<TUser = any> = {
  user: TUser;
} & AuthTokens;

async function persistTokens({ accessToken, refreshToken }: AuthTokens) {
  await AsyncStorage.multiSet([
    [ACCESS_TOKEN_KEY, accessToken],
    [REFRESH_TOKEN_KEY, refreshToken],
  ]);
}

export async function login<TUser = any>(email: string, password: string): Promise<AuthResponse<TUser>> {
  const { data } = await apiClient.post<AuthResponse<TUser>>('/auth/login', { email, password });

  if (!data?.accessToken || !data?.refreshToken) {
    throw new Error('Tokens not provided by login response');
  }

  await persistTokens(data);

  return data;
}

export async function register<TUser = any>(name: string, email: string, password: string): Promise<AuthResponse<TUser>> {
  const { data } = await apiClient.post<AuthResponse<TUser>>('/users/register', { name, email, password });

  if (!data?.accessToken || !data?.refreshToken) {
    throw new Error('Tokens not provided by register response');
  }

  await persistTokens(data);

  return data;
}

export async function getCurrentUser<TUser = any>(): Promise<TUser> {
  const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);

  if (!accessToken) {
    throw new Error('No access token available');
  }

  const { data } = await apiClient.get<TUser>('/auth/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
}

export async function refresh(): Promise<string> {
  const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);

  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  const { data } = await apiClient.post<{ accessToken: string }>('/auth/refresh', { refreshToken });

  if (!data?.accessToken) {
    throw new Error('Refresh token response did not include a new access token');
  }

  await AsyncStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);

  return data.accessToken;
}

export async function logout() {
  await AsyncStorage.multiRemove([ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY]);
}
