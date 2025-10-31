import apiClient from './apiClient';

export interface CreateItemPayload {
  title: string;
  description: string;
  lat: number;
  lng: number;
}

export async function createItem(payload: CreateItemPayload) {
  try {
    const response = await apiClient.post('/items', {
      title: payload.title,
      description: payload.description,
      lat: payload.lat,
      lng: payload.lng,
    });

    return response.data?.data ?? response.data;
  } catch (error: any) {
    console.error('Erro ao criar item:', error?.response?.data || error.message);
    throw new Error('Erro ao criar item');
  }
}

export async function getItems() {
  try {
    const response = await apiClient.get('/items');
    return response.data?.data ?? response.data;
  } catch (error: any) {
    console.error('Erro ao listar itens:', error?.response?.data || error.message);
    throw new Error('Erro ao listar itens');
  }
}
