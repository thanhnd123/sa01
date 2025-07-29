## 📦 Listing Plugin: CSV/Excel -> Update -> Account

---

### 🧠 Mô Tả Logic Xử Lý

Listing Plugin cho phép quản lý sản phẩm, đồng bộ và cập nhật thông tin sản phẩm từ các file **CSV** hoặc **Excel** vào hệ thống quản lý và sau đó cập nhật lên các nền tảng thương mại điện tử như **Etsy**, **Amazon**, **Shopify**, v.v.

#### Các bước chính:
1. **Nhận file CSV/Excel** chứa dữ liệu sản phẩm (bao gồm title, description, giá, hình ảnh, v.v.).
2. **Parse** file CSV/Excel để trích xuất thông tin và chuyển đổi thành dữ liệu cấu trúc có thể sử dụng.
3. **Update** thông tin sản phẩm trong hệ thống hoặc trực tiếp lên các nền tảng bán hàng.
4. **Cập nhật tài khoản**: Lưu trạng thái các sản phẩm đã cập nhật, thành công hay thất bại.

---

### 📥 Dữ Liệu Vào

#### Dữ Liệu Từ File CSV/Excel:

File **CSV/Excel** chứa thông tin sản phẩm dưới các cột chuẩn sau:

| Cột                | Mô Tả                                  |
|--------------------|----------------------------------------|
| **ID**             | Mã sản phẩm (product_id)               |
| **Title**          | Tên sản phẩm                           |
| **Description**    | Mô tả sản phẩm                         |
| **Price**          | Giá bán                                |
| **Tags**           | Các từ khóa tìm kiếm (keywords)        |
| **Images**         | URL ảnh chính và ảnh mô phỏng         |
| **Category**       | Loại sản phẩm (ví dụ: T-shirt, Poster) |
| **Stock**          | Số lượng còn lại                      |

#### Dữ Liệu Ra:

- **Status**: Trạng thái của sản phẩm (Đã được cập nhật thành công, lỗi, v.v.)
- **Product URL**: URL của sản phẩm trên nền tảng sau khi đăng thành công.
- **Error logs**: Nếu có lỗi khi xử lý hoặc đăng, ghi lại thông tin chi tiết lỗi (ví dụ: thiếu ảnh, thiếu giá, v.v.)

---

### 🔄 Luồng Xử Lý

---

### 🔐 Xác Thực & Ràng Buộc

- **Xác thực dữ liệu**: Kiểm tra dữ liệu trong file CSV/Excel có đúng định dạng không (ví dụ: ID sản phẩm không trùng, giá trị price phải là số).
- **Xác thực API**: Cần token xác thực hợp lệ khi gửi dữ liệu lên các nền tảng.
- **Quy tắc mapping**: Mapping các trường dữ liệu từ CSV/Excel vào hệ thống cần phải tuân thủ cấu trúc.
- **Giới hạn file**: Kiểm tra dung lượng file CSV/Excel không vượt quá giới hạn cho phép (ví dụ: 10MB).

---

### ✅ Output

- **Trạng thái cập nhật**: Thành công, lỗi, đang xử lý.
- **Báo cáo chi tiết**: Nếu có lỗi, hệ thống sẽ gửi thông báo chi tiết với thông tin lỗi.
- **Thông tin sản phẩm**: Các sản phẩm đã được cập nhật thành công kèm theo URL và các metadata.

---

### 🌐 Hướng Mở Rộng

- **Tích hợp API**: Tạo kết nối trực tiếp với API của các nền tảng bán hàng để tự động hóa quá trình đăng sản phẩm.
- **Hỗ trợ nhiều định dạng**: Tích hợp thêm các định dạng khác ngoài CSV/Excel (JSON, API calls).
- **Tạo báo cáo chi tiết**: Báo cáo thống kê quá trình đăng sản phẩm, thời gian hoàn thành, sản phẩm lỗi.
- **Cập nhật hàng tồn kho**: Tự động điều chỉnh số lượng sản phẩm dựa trên cập nhật từ hệ thống.

---

