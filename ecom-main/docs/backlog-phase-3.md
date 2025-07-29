## 🧾 Giai đoạn 3: Mapping Product – Content Render – Listing

---

### 🧠 Mô Tả Logic Xử Lý

Giai đoạn này đóng vai trò chuẩn bị sản phẩm để sẵn sàng đăng bán (listing), bao gồm:

---

### 🗂️ 1. Mapping Product (Type, Art)

- Dựa vào `tags`, `title`, `shop`, hoặc `type` từ bước crawl để xác định:
  - **Loại sản phẩm** (ví dụ: Poster, Printable, T-shirt)
  - **Style nghệ thuật** (Art Style): Minimalist, Boho, Abstract, Vintage...
- Kết quả mapping sẽ được gắn vào trường:
  - `product_type`
  - `art_style`
  - `mapped_type`
- Thường dùng tập rule mapping hoặc mô hình AI (nếu đủ dữ liệu học).

---

### ✍️ 2. Content Render (Title, Description)

- Sinh **tiêu đề** và **mô tả sản phẩm** tự động, theo format chuẩn SEO:
  - Có từ khóa chính từ `tags`, `art_style`, `room`, `tone`.
  - Tuân thủ giới hạn ký tự marketplace (ví dụ Etsy, Amazon).
- Ví dụ:
  - `title`: “Boho Abstract Wall Art Printable – Beige Modern Home Decor”
  - `description`: 
    - Bao gồm mô tả ý tưởng nghệ thuật, chất lượng file, cách tải, sử dụng.
    - Có thể chèn bullet points hoặc CTA (Call to Action).

---

### 📦 3. Listing

Mục tiêu là tổng hợp tất cả asset và metadata cần thiết để sản phẩm có thể **đăng lên sàn thương mại** hoặc **tạo chiến dịch quảng cáo**.

#### Các thành phần:

| Thành Phần     | Mô Tả |
|----------------|-------|
| **Mockup**     | Ảnh ghép PNG vào nền (frame) có thể có nhiều phiên bản |
| **Photo**      | Ảnh chính đã xử lý (PNG, JPEG) |
| **Video**      | Video giới thiệu sản phẩm (nếu có), sinh tự động hoặc upload |
| **Art**        | File art gốc để download/in ấn |
| **Title**      | Tên sản phẩm đã render SEO |
| **Bullet Point** | Các đặc điểm nổi bật, dùng cho Amazon hoặc nội dung mô tả nhanh |
| **Description** | Mô tả chi tiết sản phẩm + hướng dẫn sử dụng |

#### Ví dụ JSON listing:

```json
{
  "title": "Minimalist Green Abstract Wall Art – Instant Digital Download",
  "bullet_points": [
    "High-resolution 300 DPI file",
    "Instant download after purchase",
    "Perfect for living rooms, offices, and bedrooms"
  ],
  "description": "A modern and minimal digital artwork designed to bring calm and style to your space. Instantly downloadable and ready to print.",
  "images": {
    "mockups": [
      "https://domain.com/mockups/product_1_mock1.jpg",
      "https://domain.com/mockups/product_1_mock2.jpg"
    ],
    "photo": "https://domain.com/photos/product_1_main.jpg"
  },
  "video": "https://domain.com/videos/product_1_preview.mp4",
  "art_file": "https://domain.com/downloads/product_1_art.png"
}
```
#### Luồng Xử Lý & Xác Thực
    1. Nhận sản phẩm đã xử lý ảnh →
    2. Mapping: tags → type + art_style →
    3. Render nội dung: title + description →
    4. Sinh mockup, photo, video →
    5. Tập hợp tất cả asset →
    6. Gắn metadata listing →
    7. Gửi sang module listing hoặc ad campaig