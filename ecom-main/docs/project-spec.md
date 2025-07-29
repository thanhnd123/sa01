# Project-Spec - Hệ Thống eCommerce

## 1. **Mục Tiêu Dự Án**

Hệ thống eCommerce được thiết kế để tự động hóa quy trình từ quản lý dữ liệu sản phẩm đến việc đăng tải sản phẩm lên các nền tảng thương mại điện tử lớn. Mục tiêu chính của hệ thống là:
- **Quản lý dữ liệu sản phẩm** một cách hiệu quả.
- **Tạo hình ảnh và mô tả sản phẩm hấp dẫn**, tối ưu hóa cho SEO.
- **Đăng tải sản phẩm** lên các nền tảng bán hàng lớn một cách nhanh chóng và chính xác.
- **Quản lý sản phẩm**, theo dõi hiệu quả bán hàng và tối ưu chiến dịch quảng cáo.

## 2. **Stack Sử Dụng**

### **Frontend:**
- **Next.js**: Framework React cho phép render phía server (SSR) và tạo ra các trang tĩnh (SSG), tối ưu hóa hiệu suất cho ứng dụng.
- **Tailwind CSS**: Framework CSS utility-first giúp xây dựng giao diện nhanh chóng và dễ dàng tùy chỉnh.
- **Axios**: Dùng để gửi các yêu cầu HTTP từ frontend tới backend hoặc các API bên ngoài.

### **Backend:**
- **Flask**: Framework Python nhẹ, thích hợp để xây dựng các API RESTful cho hệ thống.
- Flask-JWT-Extended
- **JWT (JSON Web Token)**: Dùng để bảo mật và xác thực người dùng qua các token trong các yêu cầu HTTP.
- **MongoDB**: Cơ sở dữ liệu NoSQL được sử dụng để lưu trữ thông tin sản phẩm và người dùng.

### **Container & Orchestration:**
- **Docker**: Nền tảng container hóa giúp đóng gói ứng dụng và các phụ thuộc của nó.
- **Docker Compose**: Công cụ để định nghĩa và chạy các ứng dụng Docker đa container.

### **Các Công Cụ Khác:**
- **OpenCV / PIL**: Các thư viện Python dùng để xử lý và chỉnh sửa hình ảnh sản phẩm.
- **TensorFlow / PyTorch (tuỳ chọn)**: Các công cụ học máy để tối ưu hóa mô tả và hình ảnh sản phẩm.

## 3. **Danh Sách Chức Năng**

### **3.1 Quản Lý Dữ Liệu Sản Phẩm**
- Nhập và quản lý thông tin sản phẩm thông qua giao diện người dùng.
- Phân loại sản phẩm theo các danh mục khác nhau.
- Lưu trữ thông tin vào cơ sở dữ liệu (MongoDB).

### **3.2 Xử Lý Dữ Liệu và Hình Ảnh**
- **Mapping** thông tin sản phẩm (tên, mô tả, loại, v.v.) cho dễ dàng quản lý.
- **Xử lý hình ảnh sản phẩm**: Cắt, chỉnh sửa, và tạo các mockup sản phẩm.
- **Tối ưu hóa SEO** cho các mô tả sản phẩm.

### **3.3 Quản Lý Sản Phẩm và Quảng Cáo**
- Quản lý và hiển thị danh sách sản phẩm cho người dùng qua giao diện frontend.
- **Quản lý chiến dịch quảng cáo**: Tự động tạo và quản lý các chiến dịch quảng cáo trên các nền tảng như Google Ads và Facebook Ads.
- Cung cấp **báo cáo hiệu suất bán hàng** và hiệu quả quảng cáo.

### **3.4 Đăng Sản Phẩm (Listing)**
- Đăng sản phẩm lên các nền tảng thương mại điện tử như Amazon, Etsy.
- Đồng bộ hóa thông tin sản phẩm trên hệ thống với các nền tảng bán hàng.

### **3.5 Duy Trì và Cập Nhật Sản Phẩm**
- Cập nhật thường xuyên thông tin sản phẩm.
- Kiểm tra và đảm bảo tính chính xác của thông tin sản phẩm đã đăng.

## 4. **Kiến Trúc Thư Mục Dự Kiến**

### **4.1 Cấu Trúc Thư Mục Backend (Flask)**
```
backend/
├── main.py
├── config.py
├── app/
│   ├── __init__.py
│   ├── routes/
│   ├── models/
│   ├── services/
│   └── utils/
├── tests/
├── requirements.txt
└── README.md
```

### **4.2 Cấu Trúc Thư Mục Frontend (Next.js)**
```
frontend/
│
├── app/                      # App Router - định nghĩa các route
│   ├── layout.tsx            # Layout chính của toàn bộ app
│   ├── page.tsx              # Trang chủ ("/")
│   ├── products/             # Trang danh sách sản phẩm
│   │   └── page.tsx          # Route "/products"
│   ├── ad-campaign/          # Trang quản lý chiến dịch quảng cáo
│   │   └── page.tsx          # Route "/ad-campaign"
│   └── globals.css           # Global CSS
│
├── components/               # Các component tái sử dụng
│   ├── Navbar.tsx            # Thanh điều hướng
│   ├── ProductCard.tsx       # Hiển thị sản phẩm
│   └── Footer.tsx            # Chân trang
│
├── lib/                      # Thư viện utils (call API, format, auth, ...)
│   └── axios.ts              # Cấu hình axios instance
│
├── types/                    # Định nghĩa các type và interface toàn cục
│   ├── product.ts            # Interface cho sản phẩm
│   └── user.ts               # Interface cho người dùng
│
├── public/                   # Tệp tĩnh (ảnh, favicon, mockup)
│
├── tailwind.config.ts        # Cấu hình Tailwind CSS
├── postcss.config.js         # Cấu hình PostCSS
├── tsconfig.json             # Cấu hình TypeScript
└── package.json              # Cấu hình các dependency
```

### **4.3 Cấu Trúc Thư Mục Tổng Quan**
```
project/
├── frontend/                 # Mã nguồn frontend (Next.js)
├── backend/                  # Mã nguồn backend (Flask)
├── docker-compose.yml        # Cấu hình Docker Compose
└── .env                      # Biến môi trường cho Docker Compose
```

## 5. **Docker Integration**

### **5.1 Cấu Trúc Docker**
- **Container hóa**: Tách biệt các container cho frontend, backend, database và các dịch vụ bổ sung
- **Docker Compose**: Để điều phối nhiều container và định nghĩa mối quan hệ giữa chúng
- **Quản lý Volume**: Để lưu trữ dữ liệu bền vững (dữ liệu MongoDB, hình ảnh đã upload)

### **5.2 Chiến Lược Container Hóa**

#### **Frontend Container**
- Base image: Node.js Alpine
- Build process: Cài đặt dependencies, build ứng dụng Next.js
- Sử dụng Nginx để phục vụ các file tĩnh đã build cho hiệu suất tối ưu

#### **Backend Container**
- Base image: Python Alpine
- Cài đặt dependencies qua pip từ requirements.txt
- Ứng dụng Flask chạy với Gunicorn cho triển khai production

#### **Database Container**
- Sử dụng image chính thức của MongoDB
- Volume bền vững để lưu trữ dữ liệu
- Được cấu hình với xác thực và cách ly mạng phù hợp

#### **Các Container Dịch Vụ Bổ Sung**
- **Image Processing Service**: Container với OpenCV/PIL để xử lý hình ảnh sản phẩm
- **ML Service (Tùy chọn)**: Container cho TensorFlow/PyTorch nếu cần

### **5.3 Các File Cấu Hình Docker**

#### **5.3.1 docker-compose.yml**
```yaml
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    depends_on:
      - backend
    volumes:
      - ./frontend:/app
      - /app/node_modules
    environment:
      - NEXT_PUBLIC_API_URL=http://backend:5000/api

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    depends_on:
      - mongodb
    volumes:
      - ./backend:/app
    environment:
      - MONGODB_URI=mongodb://mongo_user:mongo_password@mongodb:27017/ecommerce
      - JWT_SECRET=your_jwt_secret
      - FLASK_ENV=development

  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
    environment:
      - MONGO_INITDB_ROOT_USERNAME=mongo_user
      - MONGO_INITDB_ROOT_PASSWORD=mongo_password

  image_processor:
    build:
      context: ./backend
      dockerfile: Dockerfile.image
    depends_on:
      - backend
    volumes:
      - ./backend:/app
      - product_images:/app/images

volumes:
  mongodb_data:
  product_images:
```

#### **5.3.2 Dockerfile cho Frontend**
```dockerfile
# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/out /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### **5.3.3 Dockerfile cho Backend**
```dockerfile
FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "run:app"]
```

#### **5.3.4 Dockerfile cho Image Processing Service**
```dockerfile
FROM python:3.10-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

VOLUME /app/images

CMD ["python", "app/image_processor/service.py"]
```

### **5.4 Quy Trình Phát Triển với Docker**

1. **Phát Triển Cục Bộ**:
   - Sử dụng `docker-compose up` để khởi động tất cả các dịch vụ
   - Thay đổi code trong các volume được mount sẽ được phản ánh ngay lập tức (hot-reloading)
   - Biến môi trường phát triển được cấu hình cho kiểm thử cục bộ

2. **Kiểm Thử**:
   - Có thể chỉ định các container kiểm thử chuyên dụng trong docker-compose
   - Pipeline kiểm thử tự động sử dụng Docker

3. **Triển Khai Sản Phẩm**:
   - Xây dựng các image container đã được tối ưu hóa
   - Sử dụng cấu hình docker-compose dành riêng cho sản phẩm