import { StyleSheet } from 'react-native';

const baseStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5E1A4", // ou `theme.colors.background` se estiver dinâmico
    paddingTop: 32,
    paddingBottom: 48,
    paddingHorizontal: 20,
  },
});

export default baseStyles;