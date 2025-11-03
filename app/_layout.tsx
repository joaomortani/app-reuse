import { Stack, router, usePathname } from 'expo-router';
import { AuthProvider, useAuth } from '../auth/AuthContext';
import { useEffect, useRef } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import theme from '../styles/theme';

export default function Layout() {
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <LayoutInner />
      </AuthProvider>
    </PaperProvider>
  );
}

function LayoutInner() {
  const { userToken, loading } = useAuth();
  const pathname = usePathname();
  const redirectingRef = useRef(false);

  useEffect(() => {
    if (loading || redirectingRef.current) return;

    const isAuthRoute = pathname === '/login' || pathname === '/register';

    // Se não está autenticado e não está em rota de auth, redireciona para login
    if (!userToken && !isAuthRoute) {
      if (pathname !== '/login') {
        redirectingRef.current = true;
        router.replace('/login');
        setTimeout(() => {
          redirectingRef.current = false;
        }, 500);
      }
      return;
    }

    // Se está autenticado e está em rota de auth, redireciona para explorar
    if (userToken && isAuthRoute) {
      redirectingRef.current = true;
      router.replace('/');
      setTimeout(() => {
        redirectingRef.current = false;
      }, 500);
      return;
    }
  }, [loading, userToken, pathname]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
