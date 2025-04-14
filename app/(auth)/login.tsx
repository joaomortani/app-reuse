import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useAuth } from '../../auth/AuthContext';
import { MotiView } from 'moti';
import baseStyles from '@/styles/baseStyles';
import styles from '@/styles/styles';

export default function LoginScreen() {
  const { signIn } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      await signIn(email, password);
    } catch (err) {
      Alert.alert('Erro', 'Credenciais inválidas ou erro ao conectar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={baseStyles.container}>
      <ScrollView contentContainerStyle={[styles.scrollContainer, { flexGrow: 1, justifyContent: 'center' }]}>
        <View style={styles.mainContent}>
          <MotiView
            from={{ opacity: 0, translateY: 40 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 600 }}
          >
            <Text style={styles.formTitle}>Entrar</Text>

            <View style={styles.formFields}>
              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>Email</Text>
                <TextInput
                  mode="outlined"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  style={styles.textInput}
                />
              </View>

              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>Senha</Text>
                <TextInput
                  mode="outlined"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  style={styles.textInput}
                />
              </View>
            </View>

            <View style={styles.formActions}>
              <Button mode="contained" onPress={handleLogin} loading={loading} disabled={loading}>
                Login
              </Button>
            </View>

            <TouchableOpacity onPress={() => router.push('/register')}>
              <Text style={styles.menuText}>Ainda não tem conta? Cadastre-se</Text>
            </TouchableOpacity>
          </MotiView>
        </View>
      </ScrollView>
    </View>
  );
}