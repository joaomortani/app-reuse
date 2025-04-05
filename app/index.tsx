

// or any files within the Snack
import Routes from '@/routes';
import { theme } from '@/styles/theme';
import { Provider as PaperProvider } from 'react-native-paper';
import React from 'react';


export default function App() {
    
  return (
    <PaperProvider theme={theme}>
       <Routes />
    </PaperProvider>
  );
}



