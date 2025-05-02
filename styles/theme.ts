import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2E7D32',      // Verde ReUse
    onPrimary: '#FFFFFF',
    secondary: '#64B5F6',    // Azul claro para botões ou links
    background: '#F5E1A4',   // Bege claro
    surface: '#FFFFFF',
    text: '#37474F',         // Texto escuro
    outline: '#B0BEC5',      // Contornos e bordas
    error: '#FF7043',        // Avisos, erros
  },
  roundness: 8,
  fonts: {
    bodySmall: {
      fontFamily: 'Lato-Regular',
      fontSize: 14,
    },
    bodyLarge: {
      fontFamily: 'Lato-Regular',
      fontSize: 16,
    },
    titleLarge: {
      fontFamily: 'Montserrat-Bold',
      fontSize: 24,
    },
    labelLarge: {
      fontFamily: 'Nunito-Bold',
      fontSize: 18,
    },
  }
};

export default theme;