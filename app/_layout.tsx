import { Stack, router, usePathname } from 'expo-router';
import { AuthProvider, useAuth } from '../auth/AuthContext';
import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { PaperProvider } from 'react-native-paper'; // precisa importar aqui também!
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

  useEffect(() => {
    if (!loading) {
      if (!userToken && pathname !== '/login') {
        router.replace('/login');
      }

      if (userToken && pathname.startsWith('/(auth)')) {
        router.replace('/');
      }
    }
  }, [loading, userToken]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}