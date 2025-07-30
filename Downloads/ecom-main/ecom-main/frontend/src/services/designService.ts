import apiClient, { API_URL } from './apiClient'
import { CommentType } from '@/types/apps/designTypes'
import { DataRequest, BannerGenerateRequest } from '@/components/dialogs/ideals'

export interface ApiTask {
  _id: string
  title: string
  product_ideal_id: string
  product_types: string[]
  seller_id: string
  dropbox: string[]
  designer_id: string
  images: string[]
  banner: string
  status: 1 | 2 | 3 | 4
  seller_note: string
  comments: CommentType[]
  created_at?: string
  updated_at?: string
  design_links?: string[]
}

export interface ApiResponse<T = ApiTask[]> {
  result: T
}

interface ProductTypesResponse {
  result: { [key: string]: string }
}

interface UpdateDesignParams {
  id: string;
  status?: number;
  designer_id?: string;
  dropbox?: string[];
  comments?: CommentType[];
  images?: string[];
}

interface Template {
  product_type: string;
  color: string;
  size: string;
  count: number;
  template_link: string;
  template_id?: string;
  items: Array<{
    color: string;
    size: string;
  }>;
}

interface MockupSelect {
  product_type: string;
  mockup_id: string;
  mockup_name: string;
  mockup_file: string;
  placeholder_png?: string;
  placeholder_png_needs_processing?: boolean;
}

export const fetchDesigns = async (): Promise<ApiResponse> => {
  try {
    const response = await apiClient.get<ApiResponse>('/design/complete/list');
    return response;
  } catch (error) {
    console.error('Error fetching designs:', error);
    throw error;
  }
}

export const updateDesign = async (params: UpdateDesignParams): Promise<ApiTask> => {
  try {
    const { id, ...updateData } = params;

    console.log('📡 Updating design:', { id, ...updateData });

    const response = await apiClient.put<{ result: ApiTask }>(
      `/design/${id}/update`,
      { ...updateData }
    );

    console.log('✅ Update successful:', response.result);
    return response.result;
  } catch (error) {
    console.error('❌ Error updating design:', {
      ...params,
      error,
      timestamp: new Date().toISOString()
    });
    throw error;
  }
};

export const updateDesignStatus = async (id: string, status: number, designer_id?: string): Promise<ApiTask> => {
  const updateParams: UpdateDesignParams = { id, status };
  if (designer_id !== undefined) {
    updateParams.designer_id = designer_id;
  }
  return updateDesign(updateParams);
};

export const fetchProductTypes = async (): Promise<{ [key: string]: string }> => {
  try {
    // const response = await apiClient.get<ProductTypesResponse>('/teamexp/products/product-types');
    const response = await fetch(API_URL + '/products/product-types');
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('Error fetching product types:', error);
    throw error;
  }
};

export const updateDesignDropbox = async (id: string, dropbox: string[]): Promise<ApiTask> => {
  return updateDesign({ id, dropbox });
};

export const updateDesignComments = async (id: string, comments: CommentType[]): Promise<ApiTask> => {
  return updateDesign({ id, comments });
};

export const fetchDesignById = async (id: string): Promise<ApiTask> => {
  try {
    const response = await apiClient.get<{ result: ApiTask }>(`/design/${id}`);
    return response.result;
  } catch (error) {
    console.error(`Error fetching design with ID ${id}:`, error);
    throw error;
  }
};

export const createDesignAction = async (data: DataRequest | BannerGenerateRequest): Promise<ApiResponse> => {
  try {
    const response = await apiClient.post<ApiResponse>('/design/actions/create', data);
    return response;
  } catch (error) {
    console.error('Error creating design action:', error);
    throw error;
  }
};

export const getDesignMockups = async (designId: string): Promise<string[]> => {
  try {
    const response = await apiClient.get<ApiResponse<string[]>>(`/design/${designId}/mockups`);
    console.log('Fetched mockups for design:', designId, response.result);
    return response.result || [];
  } catch (error) {
    console.error('Error fetching design mockups:', error);
    return [];
  }
};

export const deleteDesign = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/design/${id}`);
  } catch (error) {
    console.error('Error deleting design:', error);
    throw error;
  }
};