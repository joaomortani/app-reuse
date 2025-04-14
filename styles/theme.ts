import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4CAF50',
    onPrimary: '#FFFFFF',
    secondary: '#388E3C',
    background: '#F5E1A4',
    surface: '#FFFFFF',
    text: '#212121',
    error: '#B00020',
    onSurface: '#000000',
    buttonColor: '#4CAF50',
  },
  roundness: 4,
};

export default theme;
