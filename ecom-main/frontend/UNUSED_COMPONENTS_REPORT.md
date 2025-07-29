# Báo Cáo Các Thành Phần Không Sử Dụng

## Tổng Quan
Báo cáo này liệt kê các thành phần (components) trong dự án không được import hoặc sử dụng ở bất kỳ đâu.

## Các Thành Phần Không Sử Dụng

### 1. Components Chính
- **`Form.tsx`** - Component form cơ bản
- **`GenerateMenu.tsx`** - Component tạo menu
- **`LangRedirect.tsx`** - Component chuyển hướng ngôn ngữ
- **`UserInfo.tsx`** - Component thông tin người dùng
- **`Providers.tsx`** - Component providers

### 2. Card Statistics Components
- **`Horizontal.tsx`** - Card thống kê ngang
- **`Vertical.tsx`** - Card thống kê dọc

### 3. Dialog Components
- **`dialogDefault.tsx`** - Dialog mặc định
- **`refer-earn/index.tsx`** - Dialog giới thiệu kiếm tiền
- **`share-project/index.tsx`** - Dialog chia sẻ dự án
- **`two-factor-auth/index.tsx`** - Dialog xác thực 2 yếu tố
- **`upgrade-plan/index.tsx`** - Dialog nâng cấp gói

### 4. Stepper Components
- **`stepper-dot/index.tsx`** - Component stepper với dots
- **`stepper-dot/styles.module.css`** - CSS cho stepper

### 5. Thư Mục Rỗng
- **`SelectElement/`** - Thư mục trống
- **`DebouncedInput/`** - Thư mục trống (có file DebouncedInput.tsx ở ngoài)

### 6. File Backup
- **`middleware.ts.bak`** - File backup của middleware
- **`mergedTheme.ts.bak`** - File backup của merged theme
- **`types.ts.bak`** - File backup của types
- **`userTheme.ts.bak`** - File backup của user theme
- **`favicon_bak.ico`** - File backup của favicon

## Các Thành Phần Được Sử Dụng

### Card Statistics Components Được Sử Dụng
- **`HorizontalWithSubtitle.tsx`** - Được sử dụng trong UserListCards.tsx
- **`CardStatsSquare.tsx`** - Có import type nhưng không thấy sử dụng trực tiếp
- **`CustomerStats.tsx`** - Có import type nhưng không thấy sử dụng trực tiếp
- **`HorizontalWithAvatar.tsx`** - Có import type nhưng không thấy sử dụng trực tiếp
- **`HorizontalWithBorder.tsx`** - Có import type nhưng không thấy sử dụng trực tiếp
- **`StatsWithAreaChart.tsx`** - Có import type nhưng không thấy sử dụng trực tiếp

### Layout Components Được Sử Dụng
- **`Logo.tsx`** - Được sử dụng trong Login, Register, ForgotPassword
- **`UserDropdown.tsx`** - Được sử dụng trong NavbarContent
- **`LanguageDropdown.tsx`** - Được sử dụng trong NavbarContent
- **`ModeDropdown.tsx`** - Được sử dụng trong NavbarContent
- **`NotificationsDropdown.tsx`** - Được sử dụng trong NavbarContent
- **`ShortcutsDropdown.tsx`** - Được sử dụng trong NavbarContent

### Dialog Components Được Sử Dụng
- **`DialogCloseButton.tsx`** - Được sử dụng trong nhiều dialog khác
- **`OpenDialogOnElementClick.tsx`** - Được sử dụng trong nhiều component

## Khuyến Nghị

### 1. Xóa Các Thành Phần Không Sử Dụng
- Xóa các file backup (.bak)
- Xóa các thư mục rỗng
- Xóa các component không sử dụng

### 2. Kiểm Tra Lại
- Một số component có import type nhưng không thấy sử dụng trực tiếp
- Cần kiểm tra kỹ hơn trước khi xóa

### 3. Tối Ưu Hóa
- Có thể gộp các component tương tự
- Xem xét việc sử dụng lại các component không sử dụng

## Lưu Ý
- Báo cáo này dựa trên việc tìm kiếm import statements
- Có thể có một số component được sử dụng động hoặc thông qua dynamic imports
- Nên kiểm tra kỹ trước khi xóa bất kỳ component nào 