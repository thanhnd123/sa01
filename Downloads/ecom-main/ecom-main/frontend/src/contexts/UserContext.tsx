'use client'

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { useSession } from 'next-auth/react'

// Định nghĩa interface cho User
interface User {
  id: string
  email: string
  name: string
  role: string
  accessToken?: string
  refreshToken?: string
  team_id?: string
  team_name?: string
  teams?: Array<{ _id: string; name: string }>
  token_user?: string
  avatar?: string
  username?: string
}

// Định nghĩa interface cho UserContext
interface UserContextType {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
  isAdmin: boolean
  updateUser: (userData: Partial<User>) => void
  logout: () => void
  refreshUserData: () => Promise<void>
  // Role check functions
  isManager: boolean
  isMember: boolean
  isDesigner: boolean
  isContent: boolean
  isListing: boolean
  hasRole: (role: string) => boolean
  hasAnyRole: (roles: string[]) => boolean
  hasAllRoles: (roles: string[]) => boolean
}

// Tạo context
const UserContext = createContext<UserContextType | undefined>(undefined)

// Props cho UserProvider
interface UserProviderProps {
  children: ReactNode
}

// UserProvider component
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { data: session, status } = useSession()
  
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)

  // Kiểm tra xem user có phải admin không
  const isAdmin = user?.role === 'admin'

  // Kiểm tra xem user đã đăng nhập chưa
  const isAuthenticated = status === 'authenticated' && !!user

  // Role check functions
  const isManager = user?.role === 'manager'
  const isMember = user?.role === 'member'
  const isDesigner = user?.role === 'designer'
  const isContent = user?.role === 'content'
  const isListing = user?.role === 'listing'

  // Check if user has specific role
  const hasRole = useCallback((role: string): boolean => {
    return user?.role === role
  }, [user?.role])

  // Check if user has any of the specified roles
  const hasAnyRole = useCallback((roles: string[]): boolean => {
    return user?.role ? roles.includes(user.role) : false
  }, [user?.role])

  // Check if user has all of the specified roles (mainly for admin who might have multiple roles)
  const hasAllRoles = useCallback((roles: string[]): boolean => {
    return user?.role ? roles.includes(user.role) : false
  }, [user?.role])

  // Cập nhật thông tin user
  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      // Lưu vào localStorage
      if (isClient) {
        localStorage.setItem('user', JSON.stringify(updatedUser))
      }
    }
  }

  // Logout
  const logout = () => {
    setUser(null)
    // Xóa khỏi localStorage
    if (isClient) {
      localStorage.removeItem('user')
    }
  }

  // Refresh user data
  const refreshUserData = async () => {
    if (session?.user) {
      try {
        // Có thể gọi API để refresh thông tin user nếu cần
        const userData = session.user as User
        setUser(userData)
        // Lưu vào localStorage
        if (isClient) {
          localStorage.setItem('user', JSON.stringify(userData))
        }
      } catch (error) {
        console.error('Error refreshing user data:', error)
      }
    }
  }

  // Effect để set isClient khi component mount
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Effect chính để quản lý user state
  useEffect(() => {
    if (status === 'loading') {
      setLoading(true)
      return
    }

    if (status === 'authenticated' && session?.user) {
      const userData = session.user as User
      setUser(userData)
      // Lưu vào localStorage
      if (isClient) {
        localStorage.setItem('user', JSON.stringify(userData))
      }
      setLoading(false)
    } else if (status === 'unauthenticated') {
      setLoading(false)
      // Không xóa user ngay, để effect khác xử lý
    }
  }, [session, status, isClient])

  // Effect để khôi phục user từ localStorage khi client sẵn sàng
  useEffect(() => {
    if (isClient && !user) {
      const savedUser = localStorage.getItem('user')
      if (savedUser) {
        try {
          const userData = JSON.parse(savedUser)
          setUser(userData)
          setLoading(false)
        } catch (error) {
          console.error('UserContext - Error parsing user from localStorage:', error)
          localStorage.removeItem('user')
        }
      } else {
        setLoading(false)
      }
    }
  }, [isClient, user])

  // Effect để xử lý logout khi session unauthenticated và không có user trong localStorage
  useEffect(() => {
    if (isClient && status === 'unauthenticated' && !user) {
      const savedUser = localStorage.getItem('user')
      if (!savedUser) {
        setUser(null)
        setLoading(false)
      }
    }
  }, [isClient, status, user])

  // Context value
  const contextValue: UserContextType = {
    user,
    loading,
    isAuthenticated,
    isAdmin,
    updateUser,
    logout,
    refreshUserData,
    // Role check functions
    isManager,
    isMember,
    isDesigner,
    isContent,
    isListing,
    hasRole,
    hasAnyRole,
    hasAllRoles
  }

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
}

// Custom hook để sử dụng UserContext
export const useUser = (): UserContextType => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

// Hook để kiểm tra quyền admin
export const useAdmin = (): boolean => {
  const { isAdmin } = useUser()
  return isAdmin
}

// Hook để kiểm tra authentication
export const useAuth = (): { isAuthenticated: boolean; loading: boolean } => {
  const { isAuthenticated, loading } = useUser()
  return { isAuthenticated, loading }
}

// Custom hooks cho từng role
export const useManager = (): boolean => {
  const { isManager } = useUser()
  return isManager
}

export const useMember = (): boolean => {
  const { isMember } = useUser()
  return isMember
}

export const useDesigner = (): boolean => {
  const { isDesigner } = useUser()
  return isDesigner
}

export const useContent = (): boolean => {
  const { isContent } = useUser()
  return isContent
}

export const useListing = (): boolean => {
  const { isListing } = useUser()
  return isListing
}

// Hook để kiểm tra quyền truy cập
export const useAccess = () => {
  const { hasRole, hasAnyRole, hasAllRoles } = useUser()
  return { hasRole, hasAnyRole, hasAllRoles }
}

export default UserContext
