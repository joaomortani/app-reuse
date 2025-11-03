import Constants from 'expo-constants';
import { Platform } from 'react-native';

function getLanIpFromExpo(): string | null {
  const debuggerHost = (Constants as any)?.expoConfig?.hostUri || (Constants as any)?.expoConfig?.debuggerHost || (Constants as any)?.manifest?.debuggerHost;
  if (typeof debuggerHost !== 'string') return null;
  const host = debuggerHost.split(':')[0];
  if (!host || host === 'localhost' || host === '127.0.0.1') return null;
  return host;
}

export function getApiBaseUrl(): string {
  const envUrl = process.env.EXPO_PUBLIC_API_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim().length > 0) {
    return envUrl.replace(/\/$/, '');
  }

  // Fallbacks por plataforma
  if (Platform.OS === 'android') {
    // Emulador Android usa 10.0.2.2 para acessar localhost do host
    return 'http://10.0.2.2:3000';
  }

  // iOS Simulator consegue acessar 127.0.0.1
  const lanIp = getLanIpFromExpo();
  if (lanIp) {
    return `http://${lanIp}:3000`;
  }

  return 'http://127.0.0.1:3000';
}


