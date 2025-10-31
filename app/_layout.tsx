import { Stack, router, usePathname } from 'expo-router';
import { AuthProvider, useAuth } from '../auth/AuthContext';
import { useEffect } from 'react';
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
  const { accessToken, loading } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      const isAuthRoute =
        pathname.startsWith('/(auth)') || pathname === '/login' || pathname === '/register';

      if (!userToken && !isAuthRoute) {
        router.replace('/login');
      }

      if (userToken && isAuthRoute) {
        router.replace('/');
      }
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
