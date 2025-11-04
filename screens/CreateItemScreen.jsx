// screens/CreateItemScreen.tsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { View, ScrollView, Alert, Text, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import { TextInput, Button, Chip, SegmentedButtons, HelperText } from 'react-native-paper';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import baseStyles from '@/styles/baseStyles';
import styles from '@/styles/styles';
import { createItem } from '@/services/itemService';
import { useAuth } from '@/auth/AuthContext';
import { createCategory, getCategories } from '@/services/categoryService';

const CreateItemScreen = () => {
  const router = useRouter();
  const { userToken } = useAuth();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [categoriesError, setCategoriesError] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [selectedCategoryName, setSelectedCategoryName] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [customCategoryDescription, setCustomCategoryDescription] = useState('');
  const [condition, setCondition] = useState('USED');

  const [creatingCategory, setCreatingCategory] = useState(false);

  const conditionOptions = [
    { value: 'NEW', label: 'Novo' },
    { value: 'LIKE_NEW', label: 'Seminovo' },
    { value: 'USED', label: 'Usado' },
  ];

  const previewPayload = useMemo(() => {
    const resolvedCategory = customCategory.trim() || selectedCategoryName || undefined;
    const resolvedCategoryId = selectedCategoryId || undefined;

    return {
      title,
      description,
      lat: lat ? Number(lat) : undefined,
      lng: lng ? Number(lng) : undefined,
      categoryId: resolvedCategoryId,
      category: resolvedCategory,
      condition,
      images: ['https://placehold.co/600x400?text=Reuse'],
    };
  }, [title, description, lat, lng, selectedCategoryId, selectedCategoryName, customCategory, condition]);

  const loadCategories = useCallback(async () => {
    try {
      setCategoriesLoading(true);
      setCategoriesError('');
      const data = await getCategories();
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
      setCategories([]);
      setCategoriesError('Não foi possível carregar as categorias disponíveis.');
    } finally {
      setCategoriesLoading(false);
    }
  }, []);

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

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const resolveExistingCategory = useCallback(
    (name) => {
      if (!name) {
        return null;
      }

      const normalized = name.trim().toLowerCase();
      if (!normalized) {
        return null;
      }

      return categories.find((category) => category?.name?.trim()?.toLowerCase() === normalized) || null;
    },
    [categories],
  );

  const handleSubmit = async () => {
    if (!title || !description || !lat || !lng) {
      Alert.alert('Erro', 'Todos os campos obrigatórios devem ser preenchidos.');
      return;
    }

    const customCategoryName = customCategory.trim();

    if (!userToken) {
      Alert.alert('Erro', 'Sessão expirada. Faça login novamente.');
      router.replace('/login');
      return;
    }

    try {
      setLoading(true);
      let categoryIdToUse = selectedCategoryId;
      let categoryNameToUse = selectedCategoryName;

      if (!categoryIdToUse && customCategoryName) {
        const existing = resolveExistingCategory(customCategoryName);
        if (existing) {
          categoryIdToUse = existing.id;
          categoryNameToUse = existing.name;
          setSelectedCategoryId(existing.id);
          setSelectedCategoryName(existing.name);
          setCustomCategory('');
          setCustomCategoryDescription('');
        } else {
          try {
            setCreatingCategory(true);
            const newCategory = await createCategory(
              {
                name: customCategoryName,
                description: customCategoryDescription.trim() || undefined,
              },
              userToken,
            );
            categoryIdToUse = newCategory.id;
            categoryNameToUse = newCategory.name;
            setCategories((prev) => [newCategory, ...prev]);
            setSelectedCategoryId(newCategory.id);
            setSelectedCategoryName(newCategory.name);
            setCustomCategory('');
            setCustomCategoryDescription('');
          } catch (err) {
            console.error('Erro ao criar categoria:', err);
            Alert.alert('Erro', 'Não foi possível criar a categoria informada.');
            return;
          } finally {
            setCreatingCategory(false);
          }
        }
      }

      const payload = {
        title,
        description,
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        categoryId: categoryIdToUse ? categoryIdToUse : undefined,
        category: !categoryIdToUse && categoryNameToUse ? categoryNameToUse : undefined,
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
            {categoriesLoading ? (
              <ActivityIndicator size="small" color="#1B5E20" />
            ) : null}
            {categoriesError ? (
              <HelperText type="error" visible>
                {categoriesError}
              </HelperText>
            ) : null}
            <View style={localStyles.chipGroup}>
              {categories.map((option) => (
                <Chip
                  key={option.id}
                  style={localStyles.chip}
                  selected={selectedCategoryId === option.id}
                  onPress={() => {
                    setSelectedCategoryId(option.id);
                    setSelectedCategoryName(option.name);
                    setCustomCategory('');
                    setCustomCategoryDescription('');
                  }}
                >
                  {option.name}
                </Chip>
              ))}
            </View>
            <Button mode="text" onPress={loadCategories} disabled={categoriesLoading} compact>
              Atualizar categorias
            </Button>
            <TextInput
              label="Nova categoria"
              value={customCategory}
              onChangeText={(value) => {
                setCustomCategory(value);
                if (value.trim().length > 0) {
                  setSelectedCategoryId('');
                  setSelectedCategoryName('');
                }
              }}
              placeholder="Informe o nome de uma nova categoria"
              mode="outlined"
              style={styles.textInput}
            />
            {customCategory.trim().length > 0 ? (
              <TextInput
                label="Descrição da categoria"
                value={customCategoryDescription}
                onChangeText={setCustomCategoryDescription}
                placeholder="Descreva brevemente a categoria"
                mode="outlined"
                multiline
                style={styles.textInput}
              />
            ) : null}
            <HelperText type="info" visible>
              Selecione uma categoria existente ou informe uma nova. Categorias novas serão criadas automaticamente.
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
          <Button
            mode="contained"
            onPress={handleSubmit}
            loading={loading || creatingCategory}
            disabled={loading || creatingCategory}
          >
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
