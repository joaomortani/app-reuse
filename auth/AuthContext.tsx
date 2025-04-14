import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as auth from './authService';

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: any) {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem('token');
      setUserToken(token);
      setLoading(false);
    };
    loadToken();
  }, []);

  const signIn = async (email: string, password: string) => {
    const token = await auth.login(email, password);
    setUserToken(token);
  };

  const signUp = async (email: string, password: string) => {
    const token = await auth.register(email, password);
  };

  const signOut = async () => {
    await auth.logout();
    setUserToken(null);
  };

  return (
    <AuthContext.Provider value={{ userToken, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);