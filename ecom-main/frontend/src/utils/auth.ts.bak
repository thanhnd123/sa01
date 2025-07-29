import apiClient from '@/services/apiClient'

// Tên key lưu token trong localStorage
const TOKEN_KEY = 'auth_token'
const USER_DATA_KEY = 'user_data'

// Lưu token vào localStorage và cập nhật apiClient
export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token)
  apiClient.setToken(token)
}

// Lấy token từ localStorage
export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY)
}

// Xóa token khỏi localStorage và apiClient
export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY)
  apiClient.clearToken()
}

// Lưu thông tin người dùng
export const setUserData = (userData: any) => {
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData))
}

// Lấy thông tin người dùng
export const getUserData = () => {
  const userData = localStorage.getItem(USER_DATA_KEY)
  return userData ? JSON.parse(userData) : null
}

// Xóa thông tin người dùng
export const clearUserData = () => {
  localStorage.removeItem(USER_DATA_KEY)
}

// Thực hiện đăng xuất
export const logout = () => {
  clearToken()
  clearUserData()
  // Có thể thêm logic chuyển hướng hoặc xử lý khác khi đăng xuất
}

// Kiểm tra xem người dùng đã đăng nhập chưa
export const isAuthenticated = (): boolean => {
  return !!getToken()
}

// Tải lại token từ localStorage khi ứng dụng khởi động
export const initializeAuth = () => {
  const token = getToken()
  if (token) {
    apiClient.setToken(token)
  }
}

const authUtils = {
  initializeAuth,
  getAuthToken: getToken,
  setAuthToken: setToken,
  removeAuthToken: clearToken,
  isAuthenticated,
  getAuthHeaders: () => ({
    Authorization: `Bearer ${getToken()}`
  }),
  setUserData,
  getUserData,
  clearUserData,
  logout
}

export default authUtils