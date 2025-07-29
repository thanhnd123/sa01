# API Kanban - Tài liệu

## Giới thiệu

Tài liệu này mô tả chi tiết các API cần thiết để triển khai tính năng Kanban board, bao gồm quản lý columns và tasks (designs).

---

## Tasks API (Designs)

### 1. Lấy danh sách Tasks

**Endpoint:** `GET /api/designs`

**Mô tả:** Lấy tất cả các task (design) hiện có.

**Response:**
```json
{
  "result": [
    {
      "_id": "680205fdbb2765059021d1bf",
      "banner": "https://i.etsystatic.com/35578284/r/il/85a895/6041284452/il_300x300.6041284452_o5ge.jpg",
      "created_at": "18-04-2025 07:56:28",
      "design_links": {
        "phone_case": {
          "design_link": null
        },
        "poster": {
          "design_link": null
        }
      },
      "designer_id": null,
      "mockup_renders": {
        "phone_case": {
          "mockup_link": null
        },
        "poster": {
          "mockup_link": null
        }
      },
      "product_ideal_id": "67fe20331345827b08d78ad9",
      "seller_id": "680130aecdafdcc7fde28db1",
      "seller_note": "Tôi muốn từ ideal này làm thành 200 cái phone case và mockup cho poster",
      "status": 1,
      "title": "200+ White Ceramic Mug Mockup Bundle, Plain Coffee Mug Mockup, 11oz White Cup, Boho White Mug, Lifestyle Home Office Mug, Digital Download",
      "updated_at": "18-04-2025 07:56:28"
    },
    // ...thêm task
  ]
}
```

### 2. Tạo Task mới

**Endpoint:** `POST /api/design/create`

**Mô tả:** Tạo một task (design) mới.

**Request Body:**
```json
{
  "banner": "https://example.com/image.jpg",
  "title": "New Design Task",
  "seller_id": "680130aecdafdcc7fde28db1",
  "seller_note": "Mô tả chi tiết về task",
  "status": "1",
  "product_ideal_id": "67fe20331345827b08d78ad9",
  "design_links": {
    "phone_case": {
      "design_link": null
    }
  },
  "mockup_renders": {
    "phone_case": {
      "mockup_link": null
    }
  }
}
```

**Response:**
```json
{
  "result": "680205fdbb2765059021d1bf" // ID của task vừa tạo
}
```

### 3. Cập nhật Task

**Endpoint:** `PUT /api/design/{id}/update`

**Mô tả:** Cập nhật thông tin của một task (design).

**Request Body:**
```json
{
  "status": "2", // Trạng thái mới của task
  "designer_id": "680205fdbb2765059021d1c0", // ID của designer đảm nhận task
  "images": {
    "url": "https://example.com/update-image.jpg"
  }
}
```

**Response:**
```json
{
  "result": 1 // Số lượng documents đã được cập nhật (thường là 1)
}
```

### 4. Xóa Task

**Endpoint:** `DELETE /api/design/{id}/delete`

**Mô tả:** Xóa một task (design).

**Response:**
```json
{
  "result": 1 // Số lượng documents đã được xóa (thường là 1)
}
```

---

## Columns API

### 1. Lấy danh sách Columns

**Endpoint:** `GET /api/columns`

**Mô tả:** Lấy tất cả các cột hiện có.

**Response:**
```json
{
  "result": [
    {
      "_id": "680205fdbb2765059021d1c1",
      "title": "New",
      "taskIds": ["680205fdbb2765059021d1bf", "680205fdbb2765059021d1c2"]
    },
    {
      "_id": "680205fdbb2765059021d1c3",
      "title": "Processing",
      "taskIds": ["680205fdbb2765059021d1c4"]
    },
    // ...thêm columns
  ]
}
```

### 2. Tạo Column mới

**Endpoint:** `POST /api/column/create`

**Mô tả:** Tạo một cột mới.

**Request Body:**
```json
{
  "title": "New Column",
  "taskIds": [] // Có thể không cần cung cấp, mặc định là mảng rỗng
}
```

**Response:**
```json
{
  "result": "680205fdbb2765059021d1c5" // ID của column vừa tạo
}
```

### 3. Cập nhật Column

**Endpoint:** `PUT /api/column/{id}/update`

**Mô tả:** Cập nhật thông tin của một cột.

**Request Body:**
```json
{
  "title": "Updated Column Title", // Tiêu đề mới của cột
  "taskIds": ["680205fdbb2765059021d1bf", "680205fdbb2765059021d1c2"] // Danh sách ID các task
}
```

**Response:**
```json
{
  "result": 1 // Số lượng documents đã được cập nhật (thường là 1)
}
```

### 4. Cập nhật thứ tự Task trong Column

**Endpoint:** `PUT /api/column/{id}/update-tasks`

**Mô tả:** Cập nhật chỉ danh sách và thứ tự các task trong một cột (dùng khi kéo thả).

**Request Body:**
```json
{
  "taskIds": ["680205fdbb2765059021d1c2", "680205fdbb2765059021d1bf"] // Danh sách ID các task với thứ tự mới
}
```

**Response:**
```json
{
  "result": 1 // Số lượng documents đã được cập nhật (thường là 1)
}
```

### 5. Xóa Column

**Endpoint:** `DELETE /api/column/{id}/delete`

**Mô tả:** Xóa một cột.

**Response:**
```json
{
  "result": 1 // Số lượng documents đã được xóa (thường là 1)
}
```

---

## Kanban Combined API

### 1. Lấy toàn bộ dữ liệu Kanban

**Endpoint:** `GET /api/kanban`

**Mô tả:** Lấy đồng thời tất cả cột và task để khởi tạo Kanban board.

**Response:**
```json
{
  "columns": [
    {
      "_id": "680205fdbb2765059021d1c1",
      "title": "New",
      "taskIds": ["680205fdbb2765059021d1bf", "680205fdbb2765059021d1c2"]
    },
    // ...thêm columns
  ],
  "tasks": [
    {
      "_id": "680205fdbb2765059021d1bf",
      "banner": "https://i.etsystatic.com/35578284/r/il/85a895/6041284452/il_300x300.6041284452_o5ge.jpg",
      "created_at": "18-04-2025 07:56:28",
      "design_links": {
        "phone_case": {
          "design_link": null
        }
      },
      "designer_id": null,
      "mockup_renders": {
        "phone_case": {
          "mockup_link": null
        }
      },
      "product_ideal_id": "67fe20331345827b08d78ad9",
      "seller_id": "680130aecdafdcc7fde28db1",
      "seller_note": "Mô tả chi tiết về task",
      "status": 1,
      "title": "200+ White Ceramic Mug Mockup Bundle",
      "updated_at": "18-04-2025 07:56:28"
    },
    // ...thêm tasks
  ]
}
```

---

## Cấu trúc Dữ liệu

### 1. Collection: designs (Tasks)

```json
{
  "_id": "680205fdbb2765059021d1bf",
  "banner": "https://i.etsystatic.com/35578284/r/il/85a895/6041284452/il_300x300.6041284452_o5ge.jpg",
  "created_at": "18-04-2025 07:56:28",
  "design_links": {
    "phone_case": {
      "design_link": null
    },
    "poster": {
      "design_link": null
    }
  },
  "designer_id": null,
  "mockup_renders": {
    "phone_case": {
      "mockup_link": null
    },
    "poster": {
      "mockup_link": null
    }
  },
  "product_ideal_id": "67fe20331345827b08d78ad9",
  "seller_id": "680130aecdafdcc7fde28db1",
  "seller_note": "Mô tả chi tiết về task",
  "status": "1",
  "title": "Tiêu đề task",
  "updated_at": "18-04-2025 07:56:28"
}
```

### 2. Collection: teamexp_design_columns (Columns)

```json
{
  "_id": "680205fdbb2765059021d1c1",
  "title": "Tiêu đề cột",
  "taskIds": ["680205fdbb2765059021d1bf", "680205fdbb2765059021d1c2"] // Danh sách ID các task thuộc cột này
}
```

---

## Ghi chú triển khai

1. **Các tasks trong Kanban là designs**: API designs hiện có được sử dụng làm tasks trong Kanban.

2. **Cấu trúc của Column**: Mỗi column chứa title và mảng taskIds tham chiếu đến các task.

3. **Quan hệ giữa Columns và Tasks**: Columns chứa danh sách tham chiếu (reference) đến các Tasks thông qua trường taskIds. Điều này cho phép một task chỉ thuộc về một cột.

4. **Xử lý drag-and-drop**: Khi người dùng kéo và thả tasks, sử dụng API `/api/column/{id}/update-tasks` để cập nhật thứ tự mới của tasks. 