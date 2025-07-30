#!/bin/bash

# Kích hoạt môi trường Conda
source ~/miniconda3/bin/activate ecom  # Đảm bảo môi trường conda được kích hoạt

# Tải các biến môi trường từ .env (nếu có)
export $(cat .env | xargs)

# Chạy Flask
python3 app.py