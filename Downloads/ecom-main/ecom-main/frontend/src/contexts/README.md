# UserContext Documentation

## Tổng quan

UserContext là một React Context được tạo ra để quản lý thông tin user một cách tập trung trong toàn bộ ứng dụng. Nó tích hợp với NextAuth để đồng bộ session và cung cấp các hooks tiện ích.

## Cài đặt

UserContext đã được tích hợp vào `ClientWrapper` và sẽ tự động có sẵn trong toàn bộ ứng dụng.

## Cách sử dụng

### 1. Hook cơ bản - useUser

```tsx
import { useUser } from '@/contexts/UserContext'

const MyComponent = () => {
  const { user, loading, isAuthenticated, updateUser, logout } = useUser()

  if (loading) return <div>Loading...</div>
  if (!isAuthenticated) return <div>Please login</div>

  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>
    </div>
  )
}
```

### 2. Hook kiểm tra Admin - useAdmin

```tsx
import { useAdmin } from '@/contexts/UserContext'

const AdminComponent = () => {
  const isAdmin = useAdmin()

  if (!isAdmin) {
    return <div>Access denied</div>
  }

  return <div>Admin dashboard</div>
}
```

### 3. Hook kiểm tra Authentication - useAuth

```tsx
import { useAuth } from '@/contexts/UserContext'

const ProtectedComponent = () => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) return <div>Loading...</div>
  if (!isAuthenticated) return <div>Please login</div>

  return <div>Protected content</div>
}
```

## API Reference

### User Interface

```tsx
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
```

### UserContextType Interface

```tsx
interface UserContextType {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
  isAdmin: boolean
  updateUser: (userData: Partial<User>) => void
  logout: () => void
  refreshUserData: () => Promise<void>
}
```

### Methods

#### updateUser(userData: Partial<User>)

Cập nhật thông tin user

```tsx
const { updateUser } = useUser()
updateUser({ name: 'New Name', email: 'new@email.com' })
```

#### logout()

Đăng xuất user

```tsx
const { logout } = useUser()
logout()
```

#### refreshUserData()

Refresh thông tin user từ server

```tsx
const { refreshUserData } = useUser()
await refreshUserData()
```

## Ví dụ sử dụng thực tế

### Component hiển thị thông tin user

```tsx
import { useUser } from '@/contexts/UserContext'
import { Avatar, Typography, Box } from '@mui/material'

const UserProfile = () => {
  const { user, isAuthenticated } = useUser()

  if (!isAuthenticated || !user) {
    return <div>Please login</div>
  }

  return (
    <Box className='flex items-center gap-3'>
      <Avatar src={user.avatar} alt={user.name}>
        {user.name?.charAt(0)}
      </Avatar>
      <Box>
        <Typography variant='h6'>{user.name}</Typography>
        <Typography variant='body2' color='textSecondary'>
          {user.email}
        </Typography>
      </Box>
    </Box>
  )
}
```

### Component bảo vệ route

```tsx
import { useAuth } from '@/contexts/UserContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, loading, router])

  if (loading) return <div>Loading...</div>
  if (!isAuthenticated) return null

  return <>{children}</>
}
```

## Lưu ý

1. UserContext tự động sync với NextAuth session
2. Tất cả components sử dụng UserContext phải được wrap trong UserProvider
3. UserProvider đã được tích hợp vào ClientWrapper
4. Context sẽ tự động cập nhật khi session thay đổi

## Troubleshooting

### Lỗi "useUser must be used within a UserProvider"

Đảm bảo component được wrap trong UserProvider. Kiểm tra xem ClientWrapper đã được sử dụng đúng cách.

### User không cập nhật sau khi login

UserContext tự động sync với NextAuth session. Nếu có vấn đề, kiểm tra NextAuth configuration.

### Loading state không dừng

Kiểm tra NextAuth session status và đảm bảo session được load đúng cách.
