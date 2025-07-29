# Ideal Management Features

## Tính năng mới: Add Ideal

### Mô tả
Tính năng cho phép người dùng thêm Ideal mới thông qua dialog form với giao diện thân thiện.

### Cách sử dụng

#### 1. Mở Dialog Add Ideal
- Vào trang Ideals (`/apps/ideals`)
- Click nút **"Add Ideal"** (màu xanh) bên cạnh nút "Bulk Generate Banner"
- Dialog sẽ mở ra với form nhập thông tin

#### 2. Điền thông tin cơ bản
**Thông tin bắt buộc:**
- **Title**: Tên của Ideal (bắt buộc)
- **Market**: Chọn thị trường (Amazon, Etsy, TikTok, eBay)

**Thông tin tùy chọn:**
- **Description**: Mô tả chi tiết về Ideal
- **Store**: Tên cửa hàng

#### 3. Cấu hình nâng cao (tùy chọn)
- **Banner URL**: Link đến hình ảnh banner
- **PNG URL**: Link đến hình ảnh PNG
- **Etsy Tags**: Các tag cho thị trường Etsy (phân cách bằng dấu phẩy)

#### 4. Tạo Ideal
- Click nút **"Create Ideal"** để lưu
- Hệ thống sẽ validate và gửi dữ liệu lên server
- Nếu thành công: Hiển thị thông báo và đóng dialog
- Nếu có lỗi: Hiển thị thông báo lỗi chi tiết

## Tính năng cải tiến: Ideal Filters

### Mô tả
Hệ thống filter được tối ưu hóa với component riêng biệt, giao diện gọn gàng và dễ sử dụng hơn.

### Cách sử dụng

#### 1. Sort Filters
- **Views**: Sắp xếp theo lượt xem (High to Low / Low to High)
- **Avg Views**: Sắp xếp theo lượt xem trung bình
- **Sold**: Sắp xếp theo số lượng bán
- **Favorites**: Sắp xếp theo lượt yêu thích

#### 2. Filter Options
- **My Favorites**: Chỉ hiển thị ideals đã yêu thích
- **My Ideals**: Chỉ hiển thị ideals của user hiện tại

#### 3. Active Filters
- Hiển thị chips cho các filter đang active
- Có thể xóa từng filter riêng lẻ bằng cách click X
- Button "Clear All" để xóa tất cả filters

### Tính năng kỹ thuật

#### Validation
- Title: Bắt buộc nhập
- Market: Bắt buộc chọn
- Hiển thị error message dưới field tương ứng
- Clear error khi user bắt đầu nhập

#### Responsive Design
- Desktop: 2 cột (Basic Info + Advanced Config)
- Mobile: 1 cột (stacked layout)
- Dialog fullWidth với maxWidth='md'
- Filters: xs=1, sm=2, md=3 cột

#### State Management
- Form data được quản lý local
- Loading state khi submit
- Error handling cho API calls
- Auto refresh danh sách sau khi tạo thành công
- Filter state được quản lý tập trung

#### API Integration
- Endpoint: `POST /api/authenticated/ideals/create`
- Headers: Authorization token
- Body: formData + user_id

### File Components

#### AddIdealDialog.tsx
- Location: `src/components/dialogs/ideals/AddIdealDialog.tsx`
- Props:
  - `open`: Boolean để mở/đóng dialog
  - `onClose`: Callback khi đóng dialog
  - `onSuccess`: Callback khi tạo thành công

#### IdealFilters.tsx
- Location: `src/views/apps/ideals/components/IdealFilters.tsx`
- Props:
  - `sortValues`: State của các sort filters
  - `valueFavorites`: State của filter favorites
  - `valueMyIdeal`: State của filter my ideals
  - `onSortChange`: Callback khi thay đổi filter
  - `onClearFilters`: Callback khi xóa tất cả filters

#### IdealBlock.tsx
- Location: `src/views/apps/ideals/IdealBlock.tsx`
- Đã được cập nhật để tích hợp AddIdealDialog và IdealFilters
- Thêm nút "Add Ideal" và state management
- Sử dụng component IdealFilters thay vì Grid filter cũ

### Rules và Guidelines

#### UI/UX Rules
- Dialog có title rõ ràng: "Add New Ideal"
- Form chia làm 2 phần với layout responsive
- Alert info ở cuối form để hướng dẫn user
- Loading state với disable button
- Toast notifications cho success/error
- Filter chips với khả năng xóa từng cái
- Button "Clear All" chỉ hiển thị khi có filter active

#### Code Rules
- Sử dụng Material-UI components
- TypeScript với proper interfaces
- Error handling comprehensive
- Performance optimization với useCallback
- Accessibility với ARIA labels
- Component separation để dễ maintain

### Testing

#### Manual Testing
1. Test form validation
2. Test responsive behavior
3. Test API integration
4. Test error scenarios
5. Test success flow
6. Test filter functionality
7. Test clear filters
8. Test active filters display

#### Automated Testing (Future)
- Unit tests cho validation logic
- Integration tests cho API calls
- E2E tests cho complete user flow
- Component tests cho IdealFilters

### Troubleshooting

#### Common Issues
1. **Dialog không mở**: Kiểm tra state `openAddIdealDialog`
2. **Validation không hoạt động**: Kiểm tra `validateForm` function
3. **API error**: Kiểm tra network và server logs
4. **Form không reset**: Kiểm tra `handleClose` function
5. **Filter không hoạt động**: Kiểm tra `handleSelectChange` callback
6. **Clear filters không hoạt động**: Kiểm tra `handleClearFilters` function

#### Debug Tips
- Console logs cho API calls
- Network tab để check requests
- React DevTools để inspect state
- Browser DevTools để check errors

### Future Enhancements

#### Planned Features
1. File upload cho banner/PNG
2. Rich text editor cho description
3. Auto-save draft
4. Bulk import từ CSV/Excel
5. Template system cho common ideals
6. Advanced filter options (date range, price range)
7. Filter presets
8. Export filtered results

#### Performance Improvements
1. Lazy loading cho dialog
2. Memoization cho form components
3. Optimistic updates
4. Caching cho market options
5. Debounced filter changes
6. Virtual scrolling cho danh sách dài 