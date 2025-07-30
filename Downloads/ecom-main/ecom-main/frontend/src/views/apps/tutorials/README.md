# Tutorial Page - Hướng dẫn sử dụng

## Tổng quan

Page Tutorial cung cấp hướng dẫn chi tiết cho người dùng về cách sử dụng hệ thống, bao gồm:

1. **Hướng dẫn cài đặt Extension**
2. **Hướng dẫn tạo Banner từ PNG và Ideal**

## Tính năng

### 1. Accordion Layout
- Hiển thị các tutorial dưới dạng accordion có thể mở rộng
- Mỗi tutorial có thông tin: tiêu đề, mô tả, độ khó, thời gian
- Nội dung được chia thành các bước chi tiết

### 2. Hướng dẫn cài đặt Extension
- **Bước 1**: Tải extension
- **Bước 2**: Cài đặt vào Adobe Photoshop
- **Bước 3**: Cấu hình ban đầu
- Có nút "Download Extension" để tải file

### 3. Hướng dẫn tạo Banner
- **Bước 1**: Chuẩn bị file PNG
- **Bước 2**: Tạo Ideal mới
- **Bước 3**: Chọn template banner
- **Bước 4**: Tạo banner tự động
- **Bước 5**: Kiểm tra và xuất bản

### 4. Thao tác nhanh
- Nút "Cài đặt Extension" - chuyển đến trang cài đặt
- Nút "Tạo Banner" - chuyển đến trang tạo banner

## Cấu trúc

```
tutorials/
├── index.tsx    # Component chính
└── README.md    # File hướng dẫn này
```

## Sử dụng

Page này được thiết kế đơn giản, không cần API calls hay state management phức tạp. Tất cả nội dung được hard-code trong component để tránh lỗi import và dependencies.

## Tương lai

Có thể mở rộng thêm:
- Video tutorials
- Interactive guides
- Download links thực tế
- Navigation đến các trang khác 