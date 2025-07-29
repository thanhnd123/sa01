import axios, { type AxiosRequestConfig, type AxiosResponse, type AxiosInstance } from 'axios'
import { getSession } from 'next-auth/react'

// API base URL
// const API_URL = 'https://apiecom.teamexp.net/api/authenticated'
const API_URL_AUTHENTICATED = `${process.env.NEXT_PUBLIC_API_URL}/api/authenticated`
export const  API_URL = `${process.env.NEXT_PUBLIC_API_URL}`

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL_AUTHENTICATED,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// Request interceptor - chạy trước khi request được gửi đi
axiosInstance.interceptors.request.use(
  async (config) => {
    // Lấy session từ NextAuth
    const session = await getSession()
    
    // Nếu session tồn tại và có token, thêm vào header
    if (session?.user?.accessToken) {
      config.headers.Authorization = `Bearer ${session.user.accessToken}`
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - xử lý response trước khi trả về
axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Xử lý các lỗi chung như 401, 403, 500...
    if (error.response) {
      // Xử lý token expired
      if (error.response.status === 401) {
        console.error('Unauthorized: Token may be invalid or expired')
        // Có thể thêm logic redirect đến trang login
      }
      // Xử lý các trường hợp lỗi khác
    }
    return Promise.reject(error)
  }
)

// API Client utilities
const apiClient = {
  // Thiết lập token
  setToken: (token: string) => {
    // This method is no longer used with the new approach
  },

  // Xóa token
  clearToken: () => {
    // This method is no longer used with the new approach
  },

  // GET request
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await axiosInstance.get(url, config)
      return response.data
    } catch (error) {
      console.error(`Error in GET request to ${url}:`, error)
      throw error
    }
  },

  // POST request
  post: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await axiosInstance.post(url, data, config)
      return response.data
    } catch (error) {
      console.error(`Error in POST request to ${url}:`, error)
      throw error
    }
  },

  // PUT request
  put: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await axiosInstance.put(url, data, config)
      return response.data
    } catch (error) {
      console.error(`Error in PUT request to ${url}:`, error)
      throw error
    }
  },

  // DELETE request
  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await axiosInstance.delete(url, config)
      return response.data
    } catch (error) {
      console.error(`Error in DELETE request to ${url}:`, error)
      throw error
    }
  }
}

export default apiClient 