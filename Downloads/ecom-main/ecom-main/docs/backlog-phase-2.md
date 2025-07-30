## 🎨 Giai đoạn 2: List Session

---

### 🧠 Mô Tả Logic Xử Lý

Giai đoạn này xử lý sản phẩm đã crawl bằng 3 bước chính:

#### 1. Mapping
- Phân tích `tags`, `title`, `shop` để ánh xạ sản phẩm sang các loại nội bộ (`type`).
- Sinh tự động:
  - `title_seo`: Tiêu đề chuẩn SEO
  - `description_seo`: Mô tả sản phẩm ngắn, giàu từ khóa
- Tạo metadata bổ sung phục vụ cho các bước sau như creative scaling và listing.

#### 2. PNG Processor
- Tải ảnh gốc từ `images.main`.
- Resize về kích thước chuẩn (ví dụ: 4000x4000px).
- Chuyển đổi định dạng nếu cần (WebP → PNG).
- Làm sạch ảnh (nền trắng, căn giữa).
- Xuất file PNG chuẩn để dùng cho in ấn hoặc listing.

#### 3. Mockup Processor
- Lấy ảnh PNG đã xử lý và chèn vào các mockup nền có sẵn (frame PSD/PNG).
- Có thể có nhiều phiên bản mockup cho mỗi sản phẩm (vị trí khác nhau, màu nền khác...).
- Tạo mockup đa dạng để phục vụ A/B testing và creative scaling sau này.

---

### 📥 Dữ Liệu Vào / Ra

#### Dữ Liệu Vào:

- Dữ liệu sản phẩm đã crawl (có `title`, `tags`, `images.main`, `shop`, `type`)
- Bộ file mockup (.png hoặc .psd có khung)
- Rule mapping nội bộ từ tag → type
- Config định dạng ảnh (kích thước, padding, chất lượng)

#### Dữ Liệu Ra:

- File PNG đã xử lý: dùng để in hoặc lưu trữ
- File mockup đã tạo: dùng để list, ads
- Metadata mới được sinh ra: `title_seo`, `description_seo`, `mockup_url`, `png_url`
- Cập nhật sản phẩm trong DB

```json
{
  "title_seo": "Minimalist Abstract Wall Art - Instant Digital Download",
  "description_seo": "Modern printable art for your living space. Ready to download and use instantly.",
  "mockup_urls": [
    "https://domain.com/mockups/etsy_123_mock1.jpg",
    "https://domain.com/mockups/etsy_123_mock2.jpg"
  ],
  "png_processed_url": "https://domain.com/processed/etsy_123_final.png"
}
