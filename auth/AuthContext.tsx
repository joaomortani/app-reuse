import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import * as authService from './authService';

type User = {
  id?: string;
  name?: string;
  email?: string;
  [key: string]: any;
};

type AuthContextValue = {
  userToken: string | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

async function persistToken(token: string | null) {
  if (token) {
    await AsyncStorage.setItem('token', token);
  } else {
    await AsyncStorage.removeItem('token');
  }
}

function sanitizeUser(user: User | null): User | null {
  if (!user) {
    return null;
  }

  const sanitizedEntries = Object.entries(user).filter(
    ([, value]) => value !== undefined && value !== null,
  );

  if (sanitizedEntries.length === 0) {
    return null;
  }

  return Object.fromEntries(sanitizedEntries) as User;
}

async function persistUser(user: User | null) {
  const sanitizedUser = sanitizeUser(user);

  if (sanitizedUser) {
    await AsyncStorage.setItem('user', JSON.stringify(sanitizedUser));
  } else {
    await AsyncStorage.removeItem('user');
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const [storedToken, storedUser] = await Promise.all([
          AsyncStorage.getItem('token'),
          AsyncStorage.getItem('user'),
        ]);

        setUserToken(storedToken);
        if (storedUser) {
          setUser(sanitizeUser(JSON.parse(storedUser)));
        }
      } catch (error) {
        console.error('Erro ao carregar sessão do usuário', error);
      } finally {
        setLoading(false);
      }
    };

    loadSession();
  }, []);

  const signIn = async (email: string, password: string) => {
    const data = await authService.login(email, password);
    const token = data?.token ?? null;
    const userData = (data?.user as User | null) ?? null;

    setUserToken(token);
    setUser(sanitizeUser(userData));

    await persistToken(token);
    await persistUser(userData);
  };

  const signUp = async (email: string, password: string) => {
    await authService.register(email, password);
  };

  const signOut = async () => {
    await authService.logout();
    setUserToken(null);
    setUser(null);
    await persistToken(null);
    await persistUser(null);
  };

  const updateUser = async (updates: Partial<User>) => {
    let mergedUser: User | null = null;
    setUser((prevUser) => {
      mergedUser = sanitizeUser({ ...(prevUser ?? {}), ...updates });
      return mergedUser;
    });
    await persistUser(mergedUser);
  };

  const value: AuthContextValue = {
    userToken,
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser utilizado dentro de um AuthProvider');
  }
  return context;
};
