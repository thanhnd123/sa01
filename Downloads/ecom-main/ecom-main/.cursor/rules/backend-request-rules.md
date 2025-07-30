# Quy tắc gửi request với backend

## 1. Sử dụng axiosInstance
- Luôn sử dụng `axiosInstance` thay vì `apiClient` hoặc `axios` trực tiếp
- `axiosInstance` đã được cấu hình sẵn với:
  - Headers cần thiết
  - Authentication
  - Interceptors
  - Base URL

```typescript
// ✅ Đúng
const response = await axiosInstance.post('/api/endpoint', data)

// ❌ Sai
const response = await apiClient.post('/api/endpoint', data)
const response = await axios.post('/api/endpoint', data)
```

## 2. Xử lý FormData
- Khi gửi file hoặc FormData, luôn thêm header `Content-Type: multipart/form-data`
- Đảm bảo tên field trong FormData khớp với API

```typescript
// ✅ Đúng
const formData = new FormData()
formData.append('file', file)
formData.append('type', 'png')

const response = await axiosInstance.post('/api/endpoint', formData, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
})

// ❌ Sai
const response = await axiosInstance.post('/api/endpoint', formData)
```

## 3. Xử lý Response
- Kiểm tra `response.data.success` trước khi xử lý dữ liệu
- Sử dụng try-catch để bắt lỗi
- Hiển thị thông báo lỗi từ server nếu có

```typescript
// ✅ Đúng
try {
    const response = await axiosInstance.post('/api/endpoint', data)
    if (response.data?.success) {
        // Xử lý thành công
    } else {
        throw new Error(response.data?.message || 'Failed')
    }
} catch (error) {
    console.error('Error:', error)
    toast.error(error instanceof Error ? error.message : 'Failed')
}

// ❌ Sai
const response = await axiosInstance.post('/api/endpoint', data)
// Xử lý response trực tiếp mà không kiểm tra success
```

## 4. Loading State
- Luôn sử dụng loading state khi gửi request
- Disable các nút tương tác khi đang loading
- Hiển thị loading indicator

```typescript
// ✅ Đúng
const [isLoading, setIsLoading] = useState(false)

const handleSubmit = async () => {
    setIsLoading(true)
    try {
        // Gửi request
    } finally {
        setIsLoading(false)
    }
}

// ❌ Sai
const handleSubmit = async () => {
    // Gửi request mà không có loading state
}
```

## 5. Cleanup
- Luôn cleanup các resources khi component unmount
- Đặc biệt là với file preview URLs

```typescript
// ✅ Đúng
useEffect(() => {
    return () => {
        if (filePreview?.preview) {
            URL.revokeObjectURL(filePreview.preview)
        }
    }
}, [filePreview])

// ❌ Sai
// Không cleanup file preview URLs
```

## 6. Error Handling
- Sử dụng toast để hiển thị thông báo lỗi
- Log lỗi ra console để debug
- Hiển thị message lỗi từ server nếu có

```typescript
// ✅ Đúng
try {
    // Gửi request
} catch (error) {
    console.error('Error:', error)
    toast.error(error instanceof Error ? error.message : 'Failed')
}

// ❌ Sai
try {
    // Gửi request
} catch (error) {
    // Không xử lý lỗi
}
```

## 7. AWS Service
- Luôn sử dụng `aws` service từ `app.services.aws_service` để tương tác với S3
- Cấu trúc thư mục S3 nên rõ ràng và có tổ chức
- Xử lý cleanup khi upload thất bại

```python
# ✅ Đúng
from app.services.aws_service import aws

# Upload file
s3_path = f'ideals/png/{ideal_id}/{file.filename}'
s3_url = aws.upload_file(file, s3_path)

# Xóa file
aws.delete_file(s3_path)

# ❌ Sai
from app.services.s3_service import upload_to_s3, delete_from_s3
# Hoặc sử dụng AWS SDK trực tiếp
```

### Cấu trúc thư mục S3
- Sử dụng cấu trúc thư mục rõ ràng: `{module}/{type}/{id}/{filename}`
- Ví dụ: `ideals/png/123456/image.png`
- Tránh lưu file ở root directory
- Sử dụng ID trong đường dẫn để tránh trùng tên

### Error Handling với AWS
```python
try:
    s3_path = f'ideals/png/{ideal_id}/{file.filename}'
    s3_url = aws.upload_file(file, s3_path)
except Exception as e:
    # Log lỗi
    print(f"Failed to upload file to S3: {str(e)}")
    # Cleanup nếu cần
    try:
        aws.delete_file(s3_path)
    except:
        pass
    # Trả về lỗi cho client
    return jsonify({
        "success": False,
        "message": f"Failed to upload file: {str(e)}"
    }), 500
``` 