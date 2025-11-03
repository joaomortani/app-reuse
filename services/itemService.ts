import apiClient from './apiClient';

export interface CreateItemPayload {
  title: string;
  description: string;
  lat: number;
  lng: number;
  category?: string | null;
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
    const body: CreateItemPayload = {
      ...payload,
      images: payload.images && payload.images.length > 0 ? payload.images : ['https://placehold.co/600x400?text=Reuse'],
    };

    const response = await apiClient.post('/items', body, {
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
  const headers = buildAuthHeaders(token);

  const normalizeItems = (data: any) => {
    if (!data) {
      return [];
    }

    if (Array.isArray(data?.items)) {
      return data.items;
    }

    if (Array.isArray(data)) {
      return data;
    }

    if (Array.isArray(data?.data?.items)) {
      return data.data.items;
    }

    if (Array.isArray(data?.data)) {
      return data.data;
    }

    return [];
  };

  try {
    const response = await apiClient.get('/items/mine', { headers });
    const mine = normalizeItems(response.data?.data ?? response.data);
    return Array.isArray(mine) ? mine : [];
  } catch (error: any) {
    if (error?.response?.status && error.response.status !== 404) {
      console.warn('Erro ao consultar /items/mine, tentando fallback:', error?.response?.data || error.message);
    }
  }

  try {
    const response = await apiClient.get('/items?page=1&limit=100', { headers });
    const allItems = normalizeItems(response.data?.data ?? response.data);

    if (userId && Array.isArray(allItems)) {
      return allItems.filter((item: any) => item?.ownerId === userId || item?.owner?.id === userId);
    }

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
  
