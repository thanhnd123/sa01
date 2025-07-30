## 📦 Giai đoạn 1: Crawl sản phẩm từ các nền tảng (Etsy, Amazon, v.v.)

---

### 🧠 1. Mô Tả Logic Xử Lý

Mục tiêu chính của giai đoạn này là:

- Tự động thu thập danh sách sản phẩm số lượng lớn từ các nền tảng thương mại điện tử.
- Chuẩn hóa về cấu trúc dữ liệu thống nhất (dùng cho tất cả nguồn).
- Đảm bảo dữ liệu có thể được phân tích, xử lý ảnh, mapping và listing về sau.

Các bước logic:

1. Crawl HTML từ danh sách các URL hoặc danh mục đã định trước.
2. Trích xuất các thông tin sản phẩm cần thiết (title, images, tags, shop, v.v.).
3. Chuẩn hóa dữ liệu theo schema chuẩn của hệ thống.
4. Gắn các thuộc tính phân loại như `type`, `site`, `shop`, `badge`.
5. Xác định `product_provider_id` duy nhất để tránh trùng lặp.
6. Gắn dấu thời gian `created_at` và `updated_at`.
7. Tự động liên kết `tag_mockup_user` (người gán mockup sau này).
8. Lưu dữ liệu vào MongoDB.

---

### 📥 2. Dữ Liệu Vào / Ra

#### Dữ Liệu Đầu Vào (Input)

- Danh sách các trang danh mục sản phẩm từ các nền tảng như Etsy, Amazon, v.v.
- Một số config crawl:
  - Nền tảng (`site`)
  - Số lượng sản phẩm cần lấy
  - Danh mục/keyword lọc

#### Dữ Liệu Đầu Ra (Output)

Định dạng JSON mỗi sản phẩm bao gồm các trường chính như sau:

```json
{
  "_id": "auto_generated_by_mongodb",
  "id": "product_id_from_platform",
  "title": "Tên sản phẩm",
  "images": {
    "main": "URL ảnh chính",
    "images": []
  },
  "tags": [ "tag1", "tag2", ... ],
  "shop": {
    "id": "tên_shop",
    "name": "Tên hiển thị của shop",
    "url": "URL đến shop"
  },
  "type": [ "4", "6" ],
  "site": "etsy.com",
  "badge": {},
  "product_provider_id": "etsy_1042867485",
  "created_at": "ISO datetime",
  "updated_at": "ISO datetime",
}
