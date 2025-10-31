import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8090/api';

export async function createItem(payload: any) {
  try {
    const response = await axios.post(`${API_URL}/v1/items`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Erro ao criar item:', error?.response?.data || error.message);
    throw new Error('Erro ao criar item');
  }
}
export async function getItems() {
  try {
    const response = await axios.get(`${API_URL}/v1/items`);
    return response.data?.data ?? [];
  } catch (error: any) {
    console.error('Erro ao listar itens:', error?.response?.data || error.message);
    throw new Error('Erro ao listar itens');
  }
}
  
