// /styles/theme.js
import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4CAF50',   
    secondary: '#388E3C', 
    text: '#FFFFFF',      
  },
  roundness: 4, // bordas arredondadas
  
};