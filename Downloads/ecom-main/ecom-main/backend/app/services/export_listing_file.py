from database.connect_database import connect_database
from bson.objectid import ObjectId
from datetime import datetime, timedelta
import os
import shutil
import pandas as pd
import uuid
import time
import threading
import re
import logging
from typing import List, Dict, Any, Optional

class ExportListingFile:
    BATCH_SIZE = 100  # Số lượng listings xử lý mỗi lần
    CACHE_TTL = {
        'template': 3600,  # 1 giờ
        'listing': 300     # 5 phút
    }
    
    def __init__(self):
        self.db = connect_database()
        self.BASE_DIR = '/app'
        self.STORAGE_DIR = os.path.abspath(self.BASE_DIR)
        self.logger = logging.getLogger(__name__)
        self._template_cache = {}
        self._listing_cache = {}

    def _validate_input(self, shop_id: str, template_id: str, listing_ids: List[str]) -> None:
        """
        Validate input parameters theo rule mới
        """
        # Validate shop
        shop = self.db.shops.find_one({"_id": ObjectId(shop_id)})
        if not shop:
            raise Exception("Shop không tồn tại hoặc không có quyền truy cập")

        # Validate template
        template = self.db.configs.find_one({"_id": ObjectId(template_id)})
        if not template:
            raise Exception("Template không tồn tại")
        if template.get('platform', '').lower() != 'amazon':
            raise Exception("Template không thuộc platform Amazon")

        # Validate listings
        listings_count = self.db.listings.count_documents({
            "_id": {"$in": [ObjectId(id) for id in listing_ids]},
            "shop_id": ObjectId(shop_id)
        })
        if listings_count != len(listing_ids):
            raise Exception("Một số listing không tồn tại hoặc không thuộc shop được chỉ định")

    def _get_template_structure(self, template_id: str) -> Dict[str, Any]:
        """
        Lấy và phân tích cấu trúc template Amazon
        """
        template = self.db.configs.find_one({"_id": ObjectId(template_id)})
        if not template:
            raise Exception("Template không tồn tại")

        # Đọc file template để phân tích cấu trúc
        template_file = template.get('file_path')
        if not template_file:
            raise Exception("Template file path not found")

        if template_file.startswith('/'):
            TEMPLATE_FILE = template_file
        else:
            TEMPLATE_FILE = os.path.join(self.BASE_DIR, template_file)

        if not os.path.exists(TEMPLATE_FILE):
            raise FileNotFoundError(f"Template file not found: {TEMPLATE_FILE}")

        # Đọc template để lấy cấu trúc header
        df = pd.read_excel(TEMPLATE_FILE, sheet_name='Template', engine='openpyxl', header=None)
        
        # Phân tích cấu trúc header
        headers = {
            'primary_headers': df.iloc[0].tolist(),  # Row 1: Primary headers
            'sub_headers': df.iloc[1].tolist(),      # Row 2: Sub-headers
            'variables': df.iloc[2].tolist()         # Row 3: Variables
        }

        return {
            'file_path': TEMPLATE_FILE,
            'headers': headers,
            'template_data': template,
            'columns': template.get('columns', [])  # Lấy mảng columns từ template config
        }

    def _process_amazon_variables(self, listing: Dict[str, Any]) -> Dict[str, Any]:
        """
        Xử lý các biến Amazon theo rule mới
        """
        # Lấy danh sách images an toàn
        images = listing.get('images', [])
        main_image = images[0] if len(images) > 0 else ''
        swatch_image = images[1] if len(images) > 1 else ''

        variables = {
            'product_title': listing.get('title', '')[:150],  # Max 150 chars
            'description': re.sub(r'<[^>]+>', '', listing.get('description', ''))[:2000],  # Strip HTML, max 2000 chars
            'price': str(listing.get('price', '')).replace('$', ''),  # Remove currency symbols
            'currency': listing.get('currency', 'USD'),
            'main_image': main_image,
            'swatch_image': swatch_image,
            'brand': listing.get('brand', ''),
            'manufacturer': listing.get('manufacturer', ''),
            'category': listing.get('amazon_category_node', ''),
            'sku': listing.get('sku', ''),
            'asin': listing.get('asin', ''),
            'upc': listing.get('upc', ''),
            'weight': f"{listing.get('weight', '')} {listing.get('weight_unit', 'kg')}",
            'dimensions': f"{listing.get('length', '')}x{listing.get('width', '')}x{listing.get('height', '')}"
        }

        return variables

    def export_file(self, shop_id: str, listing_ids: List[str], template_id: str) -> Dict[str, Any]:
        """
        Hàm chính để export file theo rule mới
        """
        try:
            start_time = time.time()
            
            # Validate input
            self._validate_input(shop_id, template_id, listing_ids)
            
            # Kiểm tra số lượng listing
            if len(listing_ids) > 1000:
                raise Exception("Vượt quá giới hạn 1000 listings cho 1 lần export")
            
            # Lấy cấu trúc template
            template_structure = self._get_template_structure(template_id)
            
            # Lấy dữ liệu listings
            listings = list(self.db.listings.find({
                "_id": {"$in": [ObjectId(id) for id in listing_ids]}
            }))
            
            # Xử lý dữ liệu
            processed_data = []
            validation_errors = []
            validation_warnings = []
            for listing in listings:
                # Xử lý biến Amazon
                variables = self._process_amazon_variables(listing)
                
                # Tạo row data với số lượng cột bằng template
                row_data = []
                
                # Fill dữ liệu vào các cột tương ứng dựa trên columns từ template config
                for column in template_structure['columns']:
                    try:
                        var_name = column.get('name', '')
                        defaultValue = column.get('defaultValue', '')
                        
                        # Kiểm tra nếu defaultValue chứa biến dạng {var_name}
                        if isinstance(defaultValue, str) and '{' in defaultValue and '}' in defaultValue:
                            # Tìm tất cả các biến trong defaultValue
                            var_matches = re.finditer(r'\{([^}]+)\}', defaultValue)
                            for match in var_matches:
                                var_in_default = match.group(1)
                                # Thay thế biến bằng giá trị từ listing
                                defaultValue = defaultValue.replace(
                                    f'{{{var_in_default}}}', 
                                    str(variables.get(var_in_default, ''))
                                )
                        
                        if var_name:
                            value = variables.get(var_name, defaultValue)
                        else:
                            value = defaultValue
                            
                        row_data.append(str(value))  # Convert tất cả giá trị thành string
                    except Exception as e:
                        print(f"Error processing column {column.get('name', '')}: {str(e)}")
                        row_data.append('')  # Thêm giá trị rỗng nếu có lỗi
                
                # Đảm bảo số lượng cột khớp với template
                if len(row_data) < len(template_structure['columns']):
                    row_data.extend([''] * (len(template_structure['columns']) - len(row_data)))
                elif len(row_data) > len(template_structure['columns']):
                    row_data = row_data[:len(template_structure['columns'])]
                
                processed_data.append(row_data)

            
            # Tạo DataFrame với 3 dòng header từ template
            header_df = pd.DataFrame([
                template_structure['headers']['primary_headers'],
                template_structure['headers']['sub_headers'],
                template_structure['headers']['variables']
            ])
            
            print(processed_data)
            # Tạo DataFrame cho dữ liệu listings
            data_df = pd.DataFrame(processed_data)
            
            # Kết hợp header và data
            df = pd.concat([header_df, data_df], ignore_index=True)
            
            # Tạo file
            filename = f"amazon_listings_export_{datetime.now().strftime('%Y%m%d_%H%M%S')}.xlsx"
            file_path = os.path.join('/tmp/listing_files', filename)
            
            # Tạo thư mục nếu chưa tồn tại
            os.makedirs(os.path.dirname(file_path), exist_ok=True)
            
            with pd.ExcelWriter(file_path, engine='openpyxl') as writer:
                df.to_excel(writer, sheet_name='Template', index=False, header=False)
            
            # Tạo URL và metadata
            file_url = f"/file/download-file/{filename}"
            
            # Lưu thông tin file
            file_listing = {
                "template_id": template_id,
                "shop_id": shop_id,
                "filename": filename,
                "file_path": file_path,
                "file_url": file_url,
                "platform": "amazon",
                "created_at": datetime.now(),
                "expires_at": datetime.now() + timedelta(days=7),
                "download_count": 0,
                "download_limit": 5,
                "total_records": len(processed_data),
                "validation_summary": {
                    "errors": len(validation_errors),
                    "warnings": len(validation_warnings),
                    "ready_for_upload": len(validation_errors) == 0
                }
            }
            
            self.db.file_listings.insert_one(file_listing)
            
            return file_url

        except Exception as e:
            self.logger.error(f"Lỗi trong export_file: {str(e)}")
            self.logger.error(f"Chi tiết lỗi: {e.__class__.__name__}")
            self.logger.error(f"Vị trí lỗi: {e.__traceback__.tb_lineno}")
            self.logger.error(f"File: {e.__traceback__.tb_frame.f_code.co_filename}")
            raise Exception(f"Lỗi trong export_file: {str(e)}") 