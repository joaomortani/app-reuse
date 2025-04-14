import { View, Text, Button } from 'react-native';
import { useAuth } from '../../auth/AuthContext';

export default function ProtectedHome() {
  const { signOut } = useAuth();

  return (
    <View style={{ padding: 20 }}>
      <Text>Bem-vindo! Essa é uma área protegida 🎉</Text>
      <Button title="Sair" onPress={signOut} />
    </View>
  );
}