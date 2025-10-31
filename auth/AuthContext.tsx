import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import * as authService from './authService';

type AuthContextValue<TUser = any> = {
  user: TUser | null;
  accessToken: string | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (user: TUser | null) => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<any | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      try {
        const [[, storedAccessToken], [, storedRefreshToken]] = await AsyncStorage.multiGet([
          authService.ACCESS_TOKEN_KEY,
          authService.REFRESH_TOKEN_KEY,
        ]);

        if (storedAccessToken && storedRefreshToken) {
          setAccessToken(storedAccessToken);

          try {
            const currentUser = await authService.getCurrentUser();
            setUser(currentUser);
          } catch (error) {
            try {
              const refreshedAccessToken = await authService.refresh();
              setAccessToken(refreshedAccessToken);
              const currentUser = await authService.getCurrentUser();
              setUser(currentUser);
            } catch (refreshError) {
              await authService.logout();
              setUser(null);
              setAccessToken(null);
            }
          }
        }
      } catch (error) {
        console.error('Erro ao inicializar autenticação:', error);
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, []);

  const signIn = async (email: string, password: string) => {
    const authData = await authService.login(email, password);
    setUser(authData.user);
    setAccessToken(authData.accessToken);
    router.replace('/');
  };

  const signUp = async (name: string, email: string, password: string) => {
    const token = await auth.register(name, email, password);
    if (token) {
      setUserToken(token);
      return;
    }

    const loginToken = await auth.login(email, password);
    setUserToken(loginToken);
  };

  const signOut = async () => {
    await authService.logout();
    setUser(null);
    setAccessToken(null);
    router.replace('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        loading,
        signIn,
        signUp,
        signOut,
        updateUser: setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }

  return context;
}
