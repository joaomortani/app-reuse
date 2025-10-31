import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useAuth } from '../../auth/AuthContext';
import { MotiView } from 'moti';
import baseStyles from '@/styles/baseStyles';
import styles from '@/styles/styles';

export default function RegisterScreen() {
  const { signUp } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);
      await signUp(email, password);
      router.replace('/');
    } catch (err) {
      Alert.alert('Erro', 'Erro ao cadastrar usuário.');
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
            <Text style={styles.formTitle}>Criar Conta</Text>

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
              <Button mode="contained" onPress={handleRegister} loading={loading} disabled={loading}>
                Cadastrar
              </Button>
            </View>

            <TouchableOpacity onPress={() => router.replace('/login')}>
              <Text style={styles.menuText}>Já tem conta? Entrar</Text>
            </TouchableOpacity>
          </MotiView>
        </View>
      </ScrollView>
    </View>
  );
}