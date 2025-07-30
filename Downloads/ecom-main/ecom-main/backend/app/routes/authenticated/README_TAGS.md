# Tags Management System

## Overview
Hệ thống quản lý tags mới được tách riêng thành một collection và route riêng để có thể tái sử dụng ở nhiều nơi trong ứng dụng.

## Database Schema

### Collection: `tags`
```javascript
{
  _id: ObjectId,
  name: String,           // Tag name (lowercase for search)
  display_name: String,   // Original tag name (preserve case)
  team_id: String,        // Team ID for isolation
  user_id: String,        // User who created the tag
  usage_count: Number,    // How many times this tag is used
  created_at: Number,     // Unix timestamp
  updated_at: Number      // Unix timestamp
}
```

## API Endpoints

### 1. Get Tag Suggestions
```
GET /api/authenticated/tags/suggestions
```
**Query Parameters:**
- `search` (optional): Search term for filtering tags
- `limit` (optional): Maximum number of suggestions (default: 10)

**Response:**
```json
{
  "success": true,
  "data": ["tag1", "tag2", "tag3"],
  "total": 3
}
```

### 2. Create Tag
```
POST /api/authenticated/tags
```
**Request Body:**
```json
{
  "name": "New Tag Name"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Tag created successfully",
  "data": {
    "id": "tag_id",
    "name": "New Tag Name"
  }
}
```

### 3. List Tags
```
GET /api/authenticated/tags
```
**Query Parameters:**
- `limit` (optional): Number of tags per page (default: 50)
- `page` (optional): Page number (default: 1)
- `search` (optional): Search term

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "tag_id",
      "name": "tag_name",
      "display_name": "Tag Name",
      "usage_count": 5,
      "created_at": 1234567890,
      "updated_at": 1234567890
    }
  ],
  "total": 100,
  "page": 1,
  "limit": 50,
  "total_pages": 2
}
```

### 4. Update Tag
```
PUT /api/authenticated/tags/{tag_id}
```
**Request Body:**
```json
{
  "name": "Updated Tag Name"
}
```

### 5. Delete Tag
```
DELETE /api/authenticated/tags/{tag_id}
```

### 6. Increment Tag Usage
```
POST /api/authenticated/tags/increment-usage
```
**Request Body:**
```json
{
  "tags": ["tag1", "tag2", "tag3"]
}
```

## Frontend Components

### TagAutocomplete Component
```typescript
import TagAutocomplete from '@components/common/TagAutocomplete'

<TagAutocomplete
  value={tags}
  onChange={(newTags) => setTags(newTags)}
  placeholder="Add tag and press Enter"
  label="Tags"
  disabled={false}
  error={false}
  helperText=""
/>
```

## Features

### 1. Tag Suggestions
- Tự động gợi ý tags từ collection `tags`
- Tương thích ngược với tags từ `product_ideals.hey_etsy_tags`
- Tích hợp Amazon keyword suggestions
- Sắp xếp theo tần suất sử dụng

### 2. Tag Usage Tracking
- Tự động tăng `usage_count` khi tag được sử dụng
- Tạo tag mới nếu chưa tồn tại
- Phân tách theo team để bảo mật

### 3. Search and Filter
- Tìm kiếm theo tên tag
- Phân trang cho danh sách tags
- Sắp xếp theo tần suất sử dụng

### 4. Team Isolation
- Tags được phân tách theo team
- Chỉ hiển thị tags của team hiện tại
- Bảo mật dữ liệu giữa các team

## Migration from Old System

Hệ thống mới vẫn tương thích với hệ thống cũ:
- Vẫn đọc tags từ `product_ideals.hey_etsy_tags`
- Tự động tạo tags mới trong collection `tags`
- Không ảnh hưởng đến dữ liệu hiện có

## Usage Examples

### Creating an Ideal with Tags
```typescript
// Frontend
const handleSubmit = async () => {
  const formData = new FormData()
  formData.append('title', title)
  formData.append('tags', tags.join(','))
  
  const response = await axiosInstance.post('/api/authenticated/ideals/create', formData)
  
  if (response.data.response === 'success') {
    // Increment tag usage
    await axiosInstance.post('/api/authenticated/tags/increment-usage', {
      tags: tags
    })
  }
}
```

### Getting Tag Suggestions
```typescript
const fetchSuggestions = async (searchTerm: string) => {
  const response = await axiosInstance.get('/api/authenticated/tags/suggestions', {
    params: { search: searchTerm, limit: 10 }
  })
  return response.data.data
}
``` 