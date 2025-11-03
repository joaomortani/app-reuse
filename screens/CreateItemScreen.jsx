// screens/CreateItemScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import baseStyles from '@/styles/baseStyles';
import styles from '@/styles/styles';
import { createItem } from '@/services/itemService';
import { useAuth } from '@/auth/AuthContext';

const CreateItemScreen = () => {
  const router = useRouter();
  const { userToken } = useAuth();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Erro', 'Permissão para acessar localização negada.');
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      setLat(String(location.coords.latitude));
      setLng(String(location.coords.longitude));
    })();
  }, []);

  const handleSubmit = async () => {
    if (!title || !description || !lat || !lng) {
      Alert.alert('Erro', 'Todos os campos obrigatórios devem ser preenchidos.');
      return;
    }

    if (!userToken) {
      Alert.alert('Erro', 'Sessão expirada. Faça login novamente.');
      router.replace('/login');
      return;
    }

    try {
      setLoading(true);
      const payload = {
        title,
        description,
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        images: [
          'https://example.com/img1.jpg',
          'https://example.com/img2.jpg',
        ],
      };

      await createItem(payload, userToken);
      Alert.alert('Sucesso', 'Item criado com sucesso!');
      router.replace('/');
    } catch (err) {
      Alert.alert('Erro', 'Falha ao criar item.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={baseStyles.container}>
      <ScrollView contentContainerStyle={[styles.mainContent, { paddingBottom: 48 }]}>
        <Text style={styles.formTitle}>Criar novo item</Text>

        <View style={styles.formFields}>
          <TextInput
            label="Título"
            value={title}
            onChangeText={setTitle}
            mode="outlined"
            style={styles.textInput}
          />
          <TextInput
            label="Descrição"
            value={description}
            onChangeText={setDescription}
            multiline
            mode="outlined"
            style={styles.textInput}
          />
          <TextInput label="Latitude" value={lat} disabled mode="outlined" style={styles.textInput} />
          <TextInput label="Longitude" value={lng} disabled mode="outlined" style={styles.textInput} />
        </View>

        <View style={styles.formActions}>
          <Button mode="contained" onPress={handleSubmit} loading={loading} disabled={loading}>
            Criar Item
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateItemScreen;
