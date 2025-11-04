import apiClient from './apiClient';

export interface Category {
  id: string;
  name: string;
  description?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface CreateCategoryPayload {
  name: string;
  description?: string;
}

function buildAuthHeaders(token?: string) {
  if (!token) {
    return {};
  }

  return {
    Authorization: `Bearer ${token}`,
  };
}

function normalizeCategory(raw: any): Category | null {
  if (!raw) {
    return null;
  }

  const id = raw.id ?? raw._id ?? raw.uuid ?? raw.slug;
  const name = raw.name ?? raw.title ?? raw.label;

  if (!id || !name) {
    return null;
  }

  return {
    id: String(id),
    name: String(name),
    description: raw.description ?? null,
    createdAt: raw.createdAt ?? null,
    updatedAt: raw.updatedAt ?? null,
  };
}

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await apiClient.get('/category');
    const payload = response.data?.data ?? response.data;

    const categoriesArray = Array.isArray(payload?.data)
      ? payload.data
      : Array.isArray(payload?.categories)
        ? payload.categories
        : Array.isArray(payload)
          ? payload
          : [];

    return categoriesArray
      .map((category) => normalizeCategory(category))
      .filter((category): category is Category => Boolean(category));
  } catch (error: any) {
    console.error('Erro ao listar categorias:', error?.response?.data || error.message);
    throw new Error('Erro ao listar categorias');
  }
}

export async function createCategory(payload: CreateCategoryPayload, token?: string): Promise<Category> {
  try {
    const response = await apiClient.post('/category', payload, {
      headers: buildAuthHeaders(token),
    });

    const normalized = normalizeCategory(response.data?.data ?? response.data);

    if (!normalized) {
      throw new Error('Categoria inválida retornada pela API');
    }

    return normalized;
  } catch (error: any) {
    console.error('Erro ao criar categoria:', error?.response?.data || error.message);
    throw new Error('Erro ao criar categoria');
  }
}
