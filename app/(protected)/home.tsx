import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import baseStyles from '@/styles/baseStyles';
import styles from '@/styles/styles';

export default function CreateItemHomeScreen() {
  const router = useRouter();

  return (
    <View style={[baseStyles.container, localStyles.container]}>
      <View style={localStyles.content}>
        <MaterialIcons name="add-circle-outline" size={80} color="#1B5E20" />
        <Text style={styles.formTitle}>Criar Novo Item</Text>
        <Text style={localStyles.description}>
          Compartilhe itens que você não usa mais com outras pessoas
        </Text>
        <TouchableOpacity
          style={localStyles.button}
          onPress={() => router.push('/item/create-item')}
        >
          <Text style={localStyles.buttonText}>Começar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 32,
    maxWidth: 400,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 32,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#1B5E20',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    minWidth: 200,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});