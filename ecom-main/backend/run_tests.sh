#!/bin/bash

# Kích hoạt conda env ecom
source ~/miniconda3/etc/profile.d/conda.sh
conda activate ecom

# Cài đặt các dependencies cần thiết cho test
pip install pytest pytest-cov pandas openpyxl

# Chạy test với coverage report
python -m pytest tests/test_export_listing_file.py -v --cov=app.services.export_listing_file --cov-report=term-missing

# Hiển thị kết quả coverage
echo "Test coverage report:"
coverage report 