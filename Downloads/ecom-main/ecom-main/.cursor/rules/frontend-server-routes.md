# Server-Side Routes Rules

## Cấu trúc thư mục
```
src/app/api/
├── auth/                    # Authentication related routes
│   ├── [...nextauth]/      # NextAuth configuration
│   ├── login/              # Login endpoints
│   └── logout/             # Logout endpoints
├── authenticated/          # Protected routes requiring authentication
└── public/                 # Public routes
```

## Quy tắc chung

### 1. Route Handlers
- Sử dụng Route Handlers của Next.js 13+ (`app/api/route.ts`)
- Mỗi route handler nên export các HTTP methods cần thiết (GET, POST, PUT, DELETE)
- Luôn sử dụng `NextResponse` để trả về response

### 2. Error Handling
```typescript
try {
  // Logic xử lý
  return NextResponse.json(response.data, { status: response.status })
} catch (err: any) {
  const status = err.response?.status || 500
  const message = err.response?.data?.error || err.message
  return NextResponse.json({
    result: [],
    message,
    success: false
  }, { status })
}
```

### 3. Authentication
- Sử dụng `getServerSession` cho các protected routes
- Kiểm tra session trước khi xử lý request
- Trả về 401 nếu không có session hợp lệ

### 4. Response Format
```typescript
// Success Response
{
  success: true,
  result: data,
  message?: string
}

// Error Response
{
  success: false,
  message: string,
  result?: null | []
}
```

### 5. Status Codes
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

### 6. Validation
- Validate input data trước khi xử lý
- Sử dụng Zod hoặc Joi cho validation
- Trả về 400 với message chi tiết nếu validation fail

### 7. Rate Limiting
- Implement rate limiting cho các public routes
- Sử dụng middleware để xử lý rate limiting
- Trả về 429 khi vượt quá giới hạn

### 8. Logging
- Log tất cả errors
- Log các request quan trọng
- Không log sensitive data

### 9. Security
- Implement CORS policy
- Validate và sanitize input
- Sử dụng HTTPS
- Không expose sensitive data trong response

### 10. Performance
- Implement caching khi cần thiết
- Sử dụng edge runtime cho các routes cần performance cao
- Tối ưu response size

## Ví dụ Route Handler

```typescript
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/libs/auth'
import { z } from 'zod'

// Validation schema
const requestSchema = z.object({
  // Define validation rules
})

export async function GET(request: Request) {
  try {
    // 1. Check authentication
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({
        success: false,
        message: 'Unauthorized'
      }, { status: 401 })
    }

    // 2. Get and validate query params
    const { searchParams } = new URL(request.url)
    const param = searchParams.get('param')

    // 3. Process request
    const result = await processRequest(param)

    // 4. Return response
    return NextResponse.json({
      success: true,
      result
    })

  } catch (error) {
    console.error('Route error:', error)
    return NextResponse.json({
      success: false,
      message: 'Internal server error'
    }, { status: 500 })
  }
}
```

## Best Practices

1. **Code Organization**
   - Tách business logic ra khỏi route handlers
   - Sử dụng services cho logic phức tạp
   - Tách validation logic thành riêng

2. **Error Handling**
   - Xử lý lỗi một cách nhất quán
   - Log đầy đủ thông tin lỗi
   - Trả về message phù hợp cho client

3. **Testing**
   - Viết unit tests cho route handlers
   - Test các edge cases
   - Test error handling

4. **Documentation**
   - Comment rõ ràng cho các route handlers
   - Document API endpoints
   - Mô tả request/response format

5. **Monitoring**
   - Implement error tracking
   - Monitor performance
   - Track usage patterns 