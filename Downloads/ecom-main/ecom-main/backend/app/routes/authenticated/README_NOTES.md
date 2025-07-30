# Notes System - Trello-like Collaboration

## Overview
Hệ thống notes dạng log giống Trello cho phép người dùng comment và upload ảnh file. Hệ thống này được tích hợp vào cả PushToDesigner và ShowDesign để tạo môi trường collaboration tốt hơn.

## Database Schema

### Collection: `notes`
```javascript
{
  _id: ObjectId,
  content: String,           // Nội dung note
  ideal_id: String,          // ID của ideal (optional)
  design_id: String,         // ID của design (optional)
  user_id: String,           // User tạo note
  team_id: String,           // Team ID cho isolation
  note_type: String,         // comment, task, bug, feature
  image_url: String,         // URL ảnh (optional)
  created_at: Number,        // Unix timestamp
  updated_at: Number         // Unix timestamp
}
```

## API Endpoints

### 1. Create Note
```
POST /api/authenticated/notes
```
**Form Data:**
- `content` (required): Nội dung note
- `ideal_id` (optional): ID của ideal
- `design_id` (optional): ID của design
- `note_type` (optional): comment, task, bug, feature (default: comment)
- `image` (optional): File ảnh

**Response:**
```json
{
  "success": true,
  "message": "Note created successfully",
  "data": {
    "_id": "note_id",
    "content": "Note content",
    "ideal_id": "ideal_id",
    "design_id": "design_id",
    "user_id": "user_id",
    "team_id": "team_id",
    "note_type": "comment",
    "image_url": "https://...",
    "created_at": 1234567890,
    "updated_at": 1234567890
  }
}
```

### 2. Get Notes by Ideal
```
GET /api/authenticated/notes/{ideal_id}
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "note_id",
      "content": "Note content",
      "ideal_id": "ideal_id",
      "user_id": "user_id",
      "team_id": "team_id",
      "note_type": "comment",
      "image_url": "https://...",
      "created_at": 1234567890,
      "updated_at": 1234567890
    }
  ],
  "total": 1
}
```

### 3. Get Notes by Design
```
GET /api/authenticated/notes/design/{design_id}
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "note_id",
      "content": "Note content",
      "design_id": "design_id",
      "user_id": "user_id",
      "team_id": "team_id",
      "note_type": "comment",
      "image_url": "https://...",
      "created_at": 1234567890,
      "updated_at": 1234567890
    }
  ],
  "total": 1
}
```

### 4. Update Note
```
PUT /api/authenticated/notes/{note_id}
```
**Form Data:**
- `content` (required): Nội dung note mới
- `note_type` (optional): Loại note mới
- `image` (optional): File ảnh mới

### 5. Delete Note
```
DELETE /api/authenticated/notes/{note_id}
```

### 6. Delete Note Image
```
DELETE /api/authenticated/notes/{note_id}/image
```

## Frontend Components

### NotesLog Component
```typescript
import NotesLog from '@components/common/NotesLog'

// For ideals
<NotesLog 
  idealId={idealId}
  onNoteAdded={(note) => console.log('Note added:', note)}
  onNoteUpdated={(note) => console.log('Note updated:', note)}
  onNoteDeleted={(noteId) => console.log('Note deleted:', noteId)}
/>

// For designs
<NotesLog 
  designId={designId}
  onNoteAdded={(note) => console.log('Note added:', note)}
  onNoteUpdated={(note) => console.log('Note updated:', note)}
  onNoteDeleted={(noteId) => console.log('Note deleted:', noteId)}
/>
```

### Features

#### 1. Note Types
- **Comment** 💬: Ghi chú thông thường
- **Task** 📋: Công việc cần làm
- **Bug** 🐛: Báo cáo lỗi
- **Feature** ✨: Yêu cầu tính năng mới

#### 2. Image Upload
- Hỗ trợ PNG, JPG, JPEG
- Giới hạn 5MB
- Tự động resize ảnh (max 800x600)
- Preview trước khi upload
- Drag & drop support

#### 3. Real-time Collaboration
- Hiển thị avatar và tên user
- Timestamp cho mỗi note
- Edit/Delete permissions
- Team isolation

#### 4. UI/UX Features
- Card-based layout giống Trello
- Color-coded note types
- Responsive design
- Loading states
- Error handling

## Integration

### PushToDesigner
- **Simple Notes**: Chỉ có một input text đơn giản để nhập notes
- **Purpose**: Ghi chú nhanh khi tạo task cho designer

### ShowDesign
- **Full Notes System**: Sử dụng NotesLog component đầy đủ
- **Purpose**: Collaboration chi tiết giữa seller và designer
- **Features**: Upload ảnh, phân loại note types, edit/delete

### Workflow
1. Seller tạo task với notes đơn giản trong PushToDesigner
2. Designer nhận task và xem chi tiết trong ShowDesign
3. Cả seller và designer có thể thêm comments/notes với ảnh
4. Tất cả communication được lưu lại theo design

## Usage Examples

### Creating a Note with Image
```typescript
import { createNote } from '@/utils/noteUtils'

const handleCreateNote = async () => {
  const result = await createNote({
    content: 'Please make the background more vibrant',
    ideal_id: 'ideal_id', // or design_id: 'design_id'
    note_type: 'task',
    image: imageFile // optional
  })
  
  if (result.success) {
    console.log('Note created:', result.data)
  }
}
```

### Getting Notes for an Ideal
```typescript
import { getNotesByIdeal } from '@/utils/noteUtils'

const loadNotes = async () => {
  const result = await getNotesByIdeal('ideal_id')
  
  if (result.success) {
    setNotes(result.data || [])
  }
}
```

### Getting Notes for a Design
```typescript
import { getNotesByDesign } from '@/utils/noteUtils'

const loadDesignNotes = async () => {
  const result = await getNotesByDesign('design_id')
  
  if (result.success) {
    setNotes(result.data || [])
  }
}
```

### Updating a Note
```typescript
import { updateNote } from '@/utils/noteUtils'

const handleUpdateNote = async (noteId: string) => {
  const result = await updateNote(noteId, {
    content: 'Updated content',
    note_type: 'bug',
    image: newImageFile // optional
  })
  
  if (result.success) {
    console.log('Note updated:', result.data)
  }
}
```

## Security Features

### Team Isolation
- Notes chỉ hiển thị cho team của user
- Không thể truy cập notes của team khác
- Validation ở backend level

### File Upload Security
- Validate file type (chỉ cho phép images)
- Giới hạn file size (5MB)
- Sanitize filename
- Upload to AWS S3 với unique path

### User Permissions
- Chỉ user tạo note mới có thể edit/delete
- Admin có thể quản lý tất cả notes
- Team-based access control

## Performance Optimizations

### Image Processing
- Tự động resize ảnh để giảm storage
- Convert to JPEG để giảm size
- Lazy loading cho ảnh
- CDN cho image delivery

### Database Queries
- Index trên ideal_id, design_id và team_id
- Sort by created_at để hiển thị mới nhất trước
- Pagination cho large datasets

### Frontend Optimizations
- Debounced search
- Virtual scrolling cho large lists
- Image preview caching
- Optimistic updates

## Migration Strategy

Hệ thống notes mới hoàn toàn độc lập:
- Không ảnh hưởng đến existing data
- Có thể sử dụng song song với text notes cũ
- Gradual migration path
- Backward compatibility

## Future Enhancements

### Planned Features
- Real-time notifications
- @mentions support
- Rich text editor
- File attachments (PDF, DOC)
- Note templates
- Advanced filtering
- Export functionality