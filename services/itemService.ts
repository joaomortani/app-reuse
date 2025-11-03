import apiClient from './apiClient';

export interface CreateItemPayload {
  title: string;
  description: string;
  lat: number;
  lng: number;
  category?: string;
  condition?: string;
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
    const response = await apiClient.post('/items', payload, {
      headers: buildAuthHeaders(token),
    });

    // Backend retorna: {success: true, data: {...item...}}
    return response.data?.data ?? response.data;
  } catch (error: any) {
    console.error('Erro ao criar item:', error?.response?.data || error.message);
    throw new Error('Erro ao criar item');
  }
}

export async function getMyItems(token?: string, userId?: string) {
  try {
    // Como /items/mine não existe, vamos buscar todos os itens e filtrar pelo ownerId
    const response = await apiClient.get('/items?page=1&limit=100', {
      headers: buildAuthHeaders(token),
    });
    
    // Backend retorna: {success: true, data: {items: [...], total, page, limit, totalPages}}
    const allItems = response.data?.data?.items || response.data?.data || [];
    
    // Filtrar apenas os itens do usuário atual
    if (userId && Array.isArray(allItems)) {
      return allItems.filter((item: any) => item.ownerId === userId || item.owner?.id === userId);
    }
    
    // Se não tiver userId, retornar todos (o backend pode implementar /items/mine depois)
    return Array.isArray(allItems) ? allItems : [];
  } catch (error: any) {
    console.error('Erro ao listar meus itens:', error?.response?.data || error.message);
    throw new Error('Erro ao listar meus itens');
  }
}

export async function getItems(page: number = 1, limit: number = 10) {
  try {
    const response = await apiClient.get(`/items?page=${page}&limit=${limit}`);
    
    // Backend retorna: {success: true, data: {items: [...], total, page, limit, totalPages}}
    const items = response.data?.data?.items || response.data?.data || [];
    
    return Array.isArray(items) ? items : [];
  } catch (error: any) {
    console.error('Erro ao listar itens:', error?.response?.data || error.message);
    throw new Error('Erro ao listar itens');
  }
}

export async function getNearbyItems(lat: number, lng: number, radius: number = 2, token?: string) {
  try {
    const response = await apiClient.get(`/items/nearby?lat=${lat}&lng=${lng}&radius=${radius}`, {
      headers: buildAuthHeaders(token),
    });
    
    // Backend retorna: {success: true, data: [...]}
    const items = response.data?.data || [];
    
    return Array.isArray(items) ? items : [];
  } catch (error: any) {
    console.error('Erro ao listar itens próximos:', error?.response?.data || error.message);
    throw new Error('Erro ao listar itens próximos');
  }
}

export async function getTopItems() {
  try {
    const response = await apiClient.get('/items/top');
    
    // Backend retorna: {success: true, data: [...]}
    const items = response.data?.data || [];
    
    return Array.isArray(items) ? items : [];
  } catch (error: any) {
    console.error('Erro ao listar top itens:', error?.response?.data || error.message);
    throw new Error('Erro ao listar top itens');
  }
}
  
