# Shopify Extension Fixes

## Vấn đề đã được sửa

### 1. Lỗi "The message port closed before a response was received"

**Nguyên nhân:**
- Service worker có 2 listener trùng lặp cho `chrome.runtime.onMessage`
- Không return `true` đúng cách để giữ port mở cho async responses
- Thiếu timeout và error handling cho message port

**Giải pháp:**
- Gộp tất cả message listeners vào một listener duy nhất
- Thêm `return true` cho các async operations
- Thêm timeout (30 giây) cho tất cả message calls
- Thêm error handling với `chrome.runtime.lastError`

### 2. Cải thiện Service Worker (`service-worker-loader.js`)

**Thay đổi:**
- Gộp 2 `chrome.runtime.onMessage.addListener` thành 1
- Thêm logging để debug
- Cải thiện async function handling cho `push_products`
- Thêm proper error handling

### 3. Cải thiện Shopify Content Script (`shopify.js`)

**Thay đổi:**
- Thêm timeout và error handling cho `getProduct()` và `ajaxLoadProduct()`
- Thêm try-catch cho button click event
- Thêm error handling cho `getProducts()`, `pushProduct()`, và `_pushProduct()`

### 4. Sửa Helper Function (`helpers.js`)

**Thay đổi:**
- Sửa id element từ `"exp-snackbar"` thành `"exp-spy-snackbar"`
- Thêm null check để tránh lỗi khi element không tồn tại
- **Thêm auto-create element:** Tự động tạo element `exp-spy-snackbar` nếu chưa có

### 5. Thêm Helpers vào Manifest và Dọn dẹp Code

**Thay đổi:**
- Thêm `spyer/js/helpers.js` vào tất cả content scripts trong manifest
- Xóa các hàm `expToast` thừa trong các file sites:
  - `prezzybox.js`
  - `store_front.js`
  - `vitelegacy.js`
  - `klaviyo.js`
  - `shopify.js`

### 6. Sửa lỗi "Toast element not found"

**Nguyên nhân:**
- Element `exp-spy-snackbar` chưa được tạo khi `expToast` được gọi
- Timing issue giữa việc tạo element và sử dụng function

**Giải pháp:**
- Sửa function `expToast` trong `helpers.js` để tự động tạo element nếu chưa có
- Thêm CSS cho toast element trong file test
- Cải thiện error handling cho toast notifications

### 7. Cải thiện CSS cho Toast (Popup Style)

**Thay đổi:**
- **Modern Design:** Thêm gradient backgrounds, border radius, và shadow
- **Smooth Animation:** Sử dụng CSS transitions thay vì keyframes
- **Icon Support:** Thêm icons cho từng loại toast (success, error, info, warning)
- **Hover Effects:** Thêm hover animation
- **Responsive Design:** Tối ưu cho mobile và tablet
- **Better Typography:** Cải thiện font weight và line height
- **Backdrop Filter:** Thêm blur effect cho modern look

**Features mới:**
- ✅ 4 loại toast: success, error, info, warning
- ✅ Icons cho từng loại
- ✅ Smooth slide-up animation
- ✅ Hover effects
- ✅ Responsive design
- ✅ Modern gradient backgrounds

### 8. Sửa lỗi CSS không được nhúng

**Nguyên nhân:**
- CSS từ manifest không được inject đúng cách
- Timing issue giữa content script và CSS loading
- Chrome extension có thể không inject CSS file từ manifest

**Giải pháp:**
- **Thêm CSS injection trực tiếp:** Inject CSS qua JavaScript trong `helpers.js`
- **Auto-inject:** CSS được inject tự động khi file `helpers.js` được load
- **Fallback mechanism:** Đảm bảo CSS luôn có sẵn khi cần
- **Duplicate prevention:** Kiểm tra và tránh inject CSS nhiều lần

**Implementation:**
- ✅ Thêm function `injectCSS()` trong `helpers.js`
- ✅ Auto-inject CSS khi file được load
- ✅ Kiểm tra duplicate với `data-extension-css` attribute
- ✅ Cải thiện file test để kiểm tra CSS injection

## Cách test

1. **Load extension vào Chrome:**
   - Mở Chrome Extensions (chrome://extensions/)
   - Bật Developer mode
   - Load unpacked extension từ thư mục `extensions/spy_crawl_ideal`

2. **Test trên Shopify site:**
   - Truy cập một Shopify product page
   - Extension sẽ hiển thị button "+ Sync"
   - Click button để test functionality

3. **Test với file test:**
   - Mở file `test_shopify.html` trong browser
   - Sử dụng các button test để kiểm tra message port và toast

## Debug Tips

1. **Kiểm tra Console:**
   - Mở Developer Tools (F12)
   - Xem tab Console để check logs và errors

2. **Kiểm tra Service Worker:**
   - Vào chrome://extensions/
   - Click "service worker" link cho extension
   - Xem console logs của service worker

3. **Common Issues:**
   - Nếu vẫn có lỗi message port, kiểm tra xem service worker có đang chạy không
   - Nếu toast không hiển thị, kiểm tra xem element `exp-spy-snackbar` có được tạo không

## Files đã được sửa

1. `service-worker-loader.js` - Sửa message handling
2. `spyer/sites/shopify.js` - Thêm error handling và timeout
3. `spyer/js/helpers.js` - Sửa toast function
4. `manifest.json` - Thêm helpers.js vào content scripts
5. `spyer/sites/prezzybox.js` - Xóa expToast thừa
6. `spyer/sites/store_front.js` - Xóa expToast thừa
7. `spyer/sites/vitelegacy.js` - Xóa expToast thừa
8. `spyer/sites/klaviyo.js` - Xóa expToast thừa
9. `test_shopify.html` - File test mới
10. `README_FIXES.md` - File này

## Lưu ý

- Tất cả async operations đều có timeout 30 giây
- Error messages được hiển thị qua toast notifications
- Console logs được thêm để debug
- Service worker được tối ưu để tránh memory leaks
- Tất cả sites giờ đều sử dụng chung function `expToast` từ `helpers.js` 