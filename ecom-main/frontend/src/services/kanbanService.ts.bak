import apiClient from './apiClient'

// Types
import type { ColumnType, TaskType } from '@/types/apps/kanbanTypes'

// Type định nghĩa response
interface KanbanResponse {
  columns: any[];
  tasks: any[];
}

interface ApiResponse<T> {
  result: T;
}
// const API_URL = process.env.NEXT_PUBLIC_API_URL

// Get all kanban data (columns and tasks)
export const getKanbanData = async () => {
  try {
    const response = await apiClient.get<KanbanResponse>('/design/kanban')
    return response
  } catch (error) {
    console.error('Error fetching kanban data:', error)
    throw error
  }
}

// Get all columns
export const getColumns = async () => {
  try {
    const response = await apiClient.get<ApiResponse<any[]>>('/design/columns')
    return response.result
  } catch (error) {
    console.error('Error fetching columns:', error)
    throw error
  }
}

// Create a new column
export const createColumn = async (title: string) => {
  try {
    const response = await apiClient.post<ApiResponse<string>>('/design/column/create', { title })
    return response.result
  } catch (error) {
    console.error('Error creating column:', error)
    throw error
  }
}

// Update column
export const updateColumn = async (id: string, title: string, taskIds?: string[]) => {
  try {
    const response = await apiClient.put<ApiResponse<any>>(`/design/column/${id}/update`, { title, taskIds })
    return response.result
  } catch (error) {
    console.error('Error updating column:', error)
    throw error
  }
}

// Update column task order
export const updateColumnTaskIds = async (id: string, taskIds: string[]) => {
  if (!id) {
    console.error('Error: Missing column ID in updateColumnTaskIds')
    throw new Error('Column ID is required')
  }
  
  // Đảm bảo taskIds luôn là mảng hợp lệ
  const validTaskIds = Array.isArray(taskIds) 
    ? taskIds.filter(tid => tid !== undefined && tid !== null && tid !== '')
    : []
    
  try {
    console.log('Gọi API cập nhật tasks cho column:', {
      columnId: id,
      taskCount: validTaskIds.length
    })
    
    // Thêm tiền xử lý để đảm bảo dữ liệu hợp lệ
    if (validTaskIds.length === 0) {
      console.warn(`Warning: Updating column ${id} with empty task list`)
    }
    
    // Đảm bảo tránh race condition bằng cách chỉ gửi API khi dữ liệu hợp lệ
    const response = await apiClient.put<ApiResponse<any>>(`/design/column/${id}/update-tasks`, {
      taskIds: validTaskIds
    })
    
    // Log thành công để debug
    console.log(`Successfully updated column ${id} with ${validTaskIds.length} tasks`)
    
    return response.result
  } catch (error) {
    console.error('Lỗi khi cập nhật thứ tự task trong cột:', error)
    
    // Thêm chi tiết lỗi để dễ debug
    if (error instanceof Error) {
      console.error('Error message:', error.message)
    }
    
    // Log ra dữ liệu gửi đi để debug
    console.error('Failed request data:', { id, taskIds: validTaskIds })
    
    throw error
  }
}

// Delete column
export const deleteColumn = async (id: string) => {
  try {
    const response = await apiClient.delete<ApiResponse<any>>(`/design/column/${id}/delete`)
    return response.result
  } catch (error) {
    console.error('Error deleting column:', error)
    throw error
  }
}

// Get all tasks (designs)
export const getTasks = async () => {
  try {
    const response = await apiClient.get<ApiResponse<any[]>>('/designs')
    return response.result
  } catch (error) {
    console.error('Error fetching tasks:', error)
    throw error
  }
}

// Create a new task
export const createTask = async (data: any) => {
  try {
    const response = await apiClient.post<ApiResponse<string>>('/design/create', data)
    return response.result
  } catch (error) {
    console.error('Error creating task:', error)
    throw error
  }
}

// Update task
export const updateTask = async (id: string, data: any) => {
  try {
    const response = await apiClient.put<ApiResponse<any>>(`/design/${id}/update`, data)
    return response.result
  } catch (error) {
    console.error('Error updating task:', error)
    throw error
  }
}

// Delete task
export const deleteTask = async (id: string) => {
  try {
    const response = await apiClient.delete<ApiResponse<any>>(`/design/${id}/delete`)
    return response.result
  } catch (error) {
    console.error('Error deleting task:', error)
    throw error
  }
}

// Add product from design
export const addProductFromDesign = async (data: any) => {
  try {
    const response = await apiClient.post<ApiResponse<any>>(`/design/addproduct`, data)
    return response.result
  } catch (error) {
    console.error('Error adding product from design:', error)
    throw error
  }
}

// Upload mockup file
export const uploadMockupFile = async (file: File) => {
  try {
    const formData = new FormData()
    formData.append('file', file)
    
    console.log(`Uploading file: ${file.name}, size: ${file.size} bytes`)
    
    // Define the response type to match the actual API response structure
    interface UploadResponse {
      result: { file_url: string };
      success: boolean;
    }
    
    const response = await apiClient.post<UploadResponse>('/design/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    
    // Log the entire response for debugging
    console.log('Upload response:', JSON.stringify(response, null, 2))
    
    // Check if response has the expected structure and access file_url
    if (response && 
        typeof response === 'object' && 
        'result' in response && 
        response.result && 
        typeof response.result === 'object' && 
        'file_url' in response.result && 
        response.result.file_url) {
      
      console.log('File URL extracted:', response.result.file_url)
      return response.result.file_url
    } else {
      console.error('Invalid response structure:', response)
      throw new Error('Invalid response format: file_url not found')
    }
  } catch (error) {
    console.error('Error uploading mockup file:', error)
    throw error
  }
}

// Delete mockup file
export const deleteMockupFile = async (filePath: string) => {
  try {
    console.log(`Deleting file: ${filePath}`)
    
    const response = await apiClient.delete('/design/file/delete', {
      data: {
        file_path: filePath
      }
    })
    
    console.log('Delete response:', JSON.stringify(response, null, 2))
    return response
  } catch (error) {
    console.error('Error deleting mockup file:', error)
    throw error
  }
}

// Get tasks by status with pagination
export const getTasksByStatus = async (status: string | number, limit: number = 50, offset: number = 0) => {
  try {
    const response = await apiClient.get<ApiResponse<any[]>>('/design/tasks', {
      params: {
        status,
        limit,
        offset
      }
    })
    console.log(`Fetched ${response.result.length} tasks with status ${status}`)
    return response.result
  } catch (error) {
    console.error(`Error fetching tasks with status ${status}:`, error)
    throw error
  }
}

// Update task status and position
export const updateTaskStatusAndPosition = async (
  taskId: string,
  sourceStatus: string | number,
  destinationStatus: string | number,
  destinationIndex: number
) => {
  try {
    console.log(`Updating task ${taskId} from status ${sourceStatus} to ${destinationStatus} at position ${destinationIndex}`)
    
    const response = await apiClient.put<ApiResponse<any>>('/design/update-tasks', {
      taskId,
      sourceStatus,
      destinationStatus,
      destinationIndex
    })
    
    return response.result
  } catch (error) {
    console.error('Error updating task status and position:', error)
    throw error
  }
}
