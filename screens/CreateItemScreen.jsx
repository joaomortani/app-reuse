// screens/CreateItemScreen.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { View, ScrollView, Alert, Text, StyleSheet, Platform } from 'react-native';
import { TextInput, Button, Chip, SegmentedButtons, HelperText } from 'react-native-paper';
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
  const [category, setCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [condition, setCondition] = useState('USED');

  const categories = ['Furniture', 'Electronics', 'Clothing', 'Books', 'Appliances', 'Other'];
  const conditionOptions = [
    { value: 'NEW', label: 'Novo' },
    { value: 'LIKE_NEW', label: 'Seminovo' },
    { value: 'USED', label: 'Usado' },
  ];

  const previewPayload = useMemo(() => {
    const resolvedCategory = customCategory.trim() || category || undefined;

    return {
      title,
      description,
      lat: lat ? Number(lat) : undefined,
      lng: lng ? Number(lng) : undefined,
      category: resolvedCategory,
      condition,
      images: ['https://placehold.co/600x400?text=Reuse'],
    };
  }, [title, description, lat, lng, category, customCategory, condition]);

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

    const resolvedCategory = customCategory.trim() || category;

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
        category: resolvedCategory ? resolvedCategory : undefined,
        condition,
        images: ['https://placehold.co/600x400?text=Reuse'],
      };

      await createItem(payload, userToken);
      Alert.alert('Sucesso', 'Item criado com sucesso!');
      router.replace('/items');
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
          <View style={localStyles.fieldGroup}>
            <Text style={styles.fieldLabel}>Categoria</Text>
            <View style={localStyles.chipGroup}>
              {categories.map((option) => (
                <Chip
                  key={option}
                  style={localStyles.chip}
                  selected={category === option}
                  onPress={() => {
                    setCategory(option);
                    setCustomCategory('');
                  }}
                >
                  {option}
                </Chip>
              ))}
            </View>
            <TextInput
              label="Outra categoria"
              value={customCategory}
              onChangeText={(value) => {
                setCustomCategory(value);
                if (value.trim().length > 0) {
                  setCategory('');
                }
              }}
              placeholder="Informe uma categoria personalizada"
              mode="outlined"
              style={styles.textInput}
            />
            <HelperText type="info" visible>
              Selecione uma categoria ou digite uma nova.
            </HelperText>
          </View>
          <View style={localStyles.fieldGroup}>
            <Text style={styles.fieldLabel}>Condição</Text>
            <SegmentedButtons
              value={condition}
              onValueChange={(value) => setCondition(value || 'USED')}
              buttons={conditionOptions}
              density="regular"
              style={localStyles.segmented}
            />
          </View>
          <View style={localStyles.previewBox}>
            <Text style={localStyles.previewTitle}>Pré-visualização do payload</Text>
            <Text style={localStyles.previewText}>{JSON.stringify(previewPayload, null, 2)}</Text>
          </View>
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

const localStyles = StyleSheet.create({
  chipGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  chip: {
    marginRight: 4,
    marginBottom: 4,
  },
  fieldGroup: {
    gap: 12,
  },
  segmented: {
    marginTop: 4,
  },
  previewBox: {
    marginTop: 16,
    backgroundColor: '#F1F8E9',
    borderRadius: 8,
    padding: 16,
    gap: 8,
  },
  previewTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#33691E',
  },
  previewText: {
    fontSize: 12,
    color: '#2E7D32',
    fontFamily: Platform.select({ ios: 'Courier', default: 'monospace' }),
  },
});
