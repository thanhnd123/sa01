import apiClient from './apiClient'

// Types
interface Template {
  _id: string
  user_id: string
  team_id: string
  product_type: string
  fields: {
    template_name: string
    description: string
    template_link: string
  }
  created_at: string
  updated_at: string
}

export interface TemplateListItem {
  id: string
  user_id: string
  user_name: string
  team_id: string
  product_type: string
  product_type_name: string
  created_at: string
  updated_at: string
  template_name: string
  description: string
  template_link: string
}

interface ProductType {
  _id: string
  name: string
}

export interface Mockup {
  _id: string
  name: string
  product_type: string
  images: string[]
  notes: string
  status: string
  team_id: number
  user_id: string
  created_at: string
  updated_at: string
}

interface ApiResponse<T> {
  result: T;
  status?: string;
}

// Define a type that includes both structures
export type TemplateCreateData = {
  user_id: string;
  team_id: string;
  product_type: string;
  fields: {
    template_name?: string;
    description?: string;
    template_link: string;
    color?: string;
    size?: string;
  };
  // Fields that might be at the root level with typo
  teamplate_name?: string;
  template_name?: string;
  description?: string;
};

// Get all templates
export const getTemplates = async () => {
  try {
    const response = await apiClient.get<ApiResponse<Template[]>>('/template')
    return response.result
  } catch (error) {
    console.error('Error fetching templates:', error)
    throw error
  }
}

// Get templates by team ID
export const getTemplatesByTeamId = async (teamId: string) => {
  try {
    const response = await apiClient.get<ApiResponse<{data: any[]}>>(`/template/${teamId}/list`)
    
    if (response && response.result && response.result.data) {
      // Transform the data to match the expected format
      const transformedData = response.result.data.map((item: any) => ({
        id: item._id,
        user_id: item.user_id,
        user_name: item.user_name,
        team_id: item.team_id,
        product_type: item.product_type,
        product_type_name: item.product_type_name,
        created_at: item.created_at,
        updated_at: item.updated_at,
        // Handle both old and new data formats, and the typo in 'teamplate_name'
        template_name: item.teamplate_name || item.template_name || item.fields?.template_name || '',
        description: item.description || item.fields?.description || '',
        template_link: item.fields?.template_link || ''
      }))
      
      return transformedData as TemplateListItem[]
    }
    
    return []
  } catch (error) {
    console.error(`Error fetching templates for team ${teamId}:`, error)
    throw error
  }
}

// Get template by ID
export const getTemplateById = async (id: string) => {
  try {
    const response = await apiClient.get<ApiResponse<Template>>(`/template/${id}`)
    return response.result
  } catch (error) {
    console.error(`Error fetching template with ID ${id}:`, error)
    throw error
  }
}

// Create a new template
export const createTemplate = async (templateData: TemplateCreateData) => {
  try {
    const response = await apiClient.post<ApiResponse<Template>>('/template/create', templateData)
    return response.result
  } catch (error) {
    console.error('Error creating template:', error)
    throw error
  }
}

// Update template
export const updateTemplate = async (id: string, templateData: Partial<Omit<Template, '_id' | 'created_at' | 'updated_at'>>) => {
  try {
    const response = await apiClient.put<ApiResponse<Template>>(`/template/${id}/update`, templateData)
    return response.result
  } catch (error) {
    console.error(`Error updating template with ID ${id}:`, error)
    throw error
  }
}

// Delete template
export const deleteTemplate = async (id: string) => {
  try {
    const response = await apiClient.delete<ApiResponse<Template>>(`/template/delete/${id}`)
    return response.result
  } catch (error) {
    console.error(`Error deleting template with ID ${id}:`, error)
    throw error
  }
}

// Get product types
export const getProductTypes = async () => {
  try {
    const response = await fetch('https://apiecom.teamexp.net/products/product-types')
    const data = await response.json()
    
    if (data.result && typeof data.result === 'object') {
      // Transform the object format to an array format for easier use in components
      const productTypesArray = Object.entries(data.result).map(([id, name]) => ({
        _id: id,
        name: name as string
      }))
      
      return productTypesArray
    }
    
    return []
  } catch (error) {
    console.error('Error fetching product types:', error)
    throw error
  }
}

// Get mockups by product type
export const getMockupsByProductType = async (productTypeName: string) => {
  try {
    const response = await apiClient.get<ApiResponse<Mockup[]>>(`/mockup/${productTypeName}/list`)
    return response.result
  } catch (error) {
    console.error(`Error fetching mockups for product type ${productTypeName}:`, error)
    throw error
  }
} 