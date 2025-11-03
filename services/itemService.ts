import apiClient from './apiClient';

export interface CreateItemPayload {
  title: string;
  description: string;
  lat: number;
  lng: number;
  images?: string[];
}

function buildAuthHeaders(token?: string) {
  if (!token) {
    return {};
  }

  return {
    Authorization: `Bearer ${token}`,
  };
}

export async function createItem(payload: CreateItemPayload, token?: string) {
  try {
    const response = await apiClient.post('/v1/items', payload, {
      headers: buildAuthHeaders(token),
    });

    return response.data?.data ?? response.data;
  } catch (error: any) {
    console.error('Erro ao criar item:', error?.response?.data || error.message);
    throw new Error('Erro ao criar item');
  }
}

export async function getItems(token?: string) {
  try {
    const response = await apiClient.get('/v1/items', {
      headers: buildAuthHeaders(token),
    });
    return response.data?.data ?? [];
  } catch (error: any) {
    console.error('Erro ao listar itens:', error?.response?.data || error.message);
    throw new Error('Erro ao listar itens');
  }
}
  
