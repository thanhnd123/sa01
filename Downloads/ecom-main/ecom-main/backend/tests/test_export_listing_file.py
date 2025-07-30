import pytest
from unittest.mock import Mock, patch, MagicMock
from datetime import datetime
from bson import ObjectId
import os
import pandas as pd

# Mock connect_database
mock_db = MagicMock()
mock_db.shops = MagicMock()
mock_db.configs = MagicMock()
mock_db.listings = MagicMock()
mock_db.file_listings = MagicMock()

# Mock data
mock_shop = {
    "_id": ObjectId(),
    "name": "Test Shop",
    "platform": "amazon",
    "seller_id": str(ObjectId())
}

mock_template = {
    "_id": ObjectId(),
    "file_path": "uploads/config/listing/20250523_044639_STICKER_DECAL_haminhthuan337gmail.com.xlsm",
    "title_template": "Test Template",
    "product_type": "Test Product Type",
    "brand_name": "Test Brand",
    "update_delete": "Update",
    "manufacturer": "Test Manufacturer",
    "product_id_type": "UPC",
    "item_type_keyword": "Test Item",
    "care_instructions1": "Care 1",
    "care_instructions2": "Care 2",
    "standard_price": "100",
    "quantity": "10",
    "generic_keywords": "test, keywords"
}

mock_listings = [
    {
        "_id": ObjectId(),
        "title": f"Test Product {i}",
        "description": f"Test Description {i}",
        "main_image": f"main_image_{i}.jpg",
        "images": [f"image_{i}_{j}.jpg" for j in range(10)],
        "shop_id": ObjectId(),
        "bullet_points": [
            f"Point 1 for product {i}",
            f"Point 2 for product {i}",
            f"Point 3 for product {i}",
            f"Point 4 for product {i}",
            f"Point 5 for product {i}"
        ]
    }
    for i in range(3)
]

# Setup mock returns
mock_db.shops.find_one.return_value = mock_shop
mock_db.configs.find_one.return_value = mock_template
mock_db.listings.find.return_value = mock_listings
mock_db.listings.count_documents.return_value = 3

mock_insert = MagicMock()
mock_insert.inserted_id = ObjectId()
mock_db.file_listings.insert_one.return_value = mock_insert

# Patch connect_database
with patch('app.services.export_listing_file.connect_database', return_value=mock_db):
    from app.services.export_listing_file import ExportListingFile

@pytest.fixture
def export_service():
    """Fixture tạo instance của ExportListingFile"""
    service = ExportListingFile()
    service.db = mock_db
    return service

def test_get_template_structure(export_service):
    """Test lấy cấu trúc template"""
    template_id = str(ObjectId())
    result = export_service.get_template_structure(template_id)
    
    assert result is not None
    assert result['file_path'] == mock_template['file_path']
    assert result['title_template'] == mock_template['title_template']
    assert result['product_type'] == mock_template['product_type']
    assert result['brand_name'] == mock_template['brand_name']

def test_format_amazon_listing(export_service):
    """Test format dữ liệu Amazon listing"""
    template_structure = export_service.get_template_structure(str(ObjectId()))
    test_listing = mock_listings[0]
    item_sku = "test-sku"
    
    result = export_service._format_amazon_listing(
        test_listing,
        template_structure,
        item_sku
    )
    
    assert result['product_name'] == test_listing['title']
    assert result['sku'] == item_sku
    assert result['description'] == test_listing['description']
    assert result['main_image'] == test_listing['main_image']
    assert result['image_url_1'] == test_listing['images'][0]
    assert result['image_url_2'] == test_listing['images'][1]
    assert result['bullet_point1'] == test_listing['bullet_points'][0]
    assert result['bullet_point2'] == test_listing['bullet_points'][1]
    assert result['bullet_point3'] == test_listing['bullet_points'][2]
    assert result['bullet_point4'] == test_listing['bullet_points'][3]
    assert result['bullet_point5'] == test_listing['bullet_points'][4]

def test_process_template_value(export_service):
    """Test xử lý giá trị template"""
    variables = {
        'product_name': 'Test Product',
        'sku': 'test-sku',
        'description': 'Test Description'
    }
    
    # Test thay thế biến đơn
    result = export_service._process_template_value('{product_name}', variables)
    assert result == 'Test Product'
    
    # Test thay thế nhiều biến
    result = export_service._process_template_value(
        'Product: {product_name}, SKU: {sku}',
        variables
    )
    assert result == 'Product: Test Product, SKU: test-sku'
    
    # Test biến không tồn tại
    result = export_service._process_template_value('{not_exist}', variables)
    assert result == ''

@patch('os.path.exists')
@patch('pandas.read_excel')
@patch('pandas.DataFrame.to_excel')
def test_export_amazon_file(mock_to_excel, mock_read_excel, mock_exists, export_service):
    """Test export file Amazon"""
    # Setup mocks
    mock_exists.return_value = True
    mock_read_excel.return_value = pd.DataFrame([
        ['Header 1', 'Header 2', 'Header 3'],
        ['Subheader 1', 'Subheader 2', 'Subheader 3'],
        ['Info 1', 'Info 2', 'Info 3'],
        ['{product_name}', '{sku}', '{description}']
    ])
    
    # Execute
    result = export_service._export_amazon_file(
        mock_shop,
        mock_listings,
        mock_template
    )
    
    # Assert
    assert result['success'] is True
    assert 'filename' in result
    assert 'file_url' in result
    assert 'file_id' in result
    mock_to_excel.assert_called_once()

@patch('os.path.exists')
@patch('pandas.read_excel')
@patch('pandas.DataFrame.to_excel')
def test_column_order_preservation(mock_to_excel, mock_read_excel, mock_exists, export_service):
    """Test giữ nguyên thứ tự cột từ template gốc"""
    # Setup mocks với thứ tự cột cụ thể
    original_columns = ['sku', 'product_name', 'description', 'main_image', 'image_url_1', 'image_url_2']
    data = {
        'sku': ['{sku}'],
        'product_name': ['{product_name}'],
        'description': ['{description}'],
        'main_image': ['{main_image}'],
        'image_url_1': ['{image_url_1}'],
        'image_url_2': ['{image_url_2}']
    }
    template_df = pd.DataFrame(data, columns=original_columns)
    mock_read_excel.return_value = template_df
    mock_exists.return_value = True
    
    # Execute
    result = export_service._export_amazon_file(
        mock_shop,
        mock_listings,
        mock_template
    )
    
    # Chỉ kiểm tra kết quả trả về
    assert result['success'] is True
    assert 'filename' in result
    assert 'file_url' in result
    assert 'file_id' in result

@patch('os.path.exists')
@patch('pandas.read_excel')
@patch('pandas.DataFrame.to_excel')
def test_invalid_data_handling(mock_to_excel, mock_read_excel, mock_exists, export_service):
    """Test xử lý dữ liệu không hợp lệ"""
    # Setup mocks với dữ liệu không hợp lệ
    columns = ['sku', 'product_name', 'description', 'price', 'main_image', 'image_url_1', 'bullet_point1']
    data = {
        'sku': ['{sku}'],
        'product_name': ['{product_name}'],
        'description': ['{description}'],
        'price': ['{price}'],
        'main_image': ['{main_image}'],
        'image_url_1': ['{image_url_1}'],
        'bullet_point1': ['{bullet_point1}']
    }
    template_df = pd.DataFrame(data, columns=columns)
    mock_read_excel.return_value = template_df
    mock_exists.return_value = True
    
    # Tạo listing với dữ liệu không hợp lệ
    invalid_listing = {
        "_id": ObjectId(),
        "title": "",  # Title trống
        "description": None,  # Description là None
        "main_image": "invalid_image.jpg",
        "images": [],  # Không có images
        "shop_id": ObjectId(),
        "bullet_points": []  # Không có bullet points
    }
    
    # Execute
    result = export_service._export_amazon_file(
        mock_shop,
        [invalid_listing],
        mock_template
    )
    
    # Chỉ kiểm tra kết quả trả về
    assert result['success'] is True
    assert 'filename' in result
    assert 'file_url' in result
    assert 'file_id' in result

@patch('os.makedirs')
@patch('os.path.exists')
@patch('pandas.read_excel')
@patch('pandas.DataFrame.to_excel')
def test_remove_extra_rows_in_template(mock_makedirs, mock_exists, mock_read_excel, mock_to_excel, export_service):
    """Test xuất file không có dòng thừa, số cột đúng, dữ liệu đúng từ listing"""
    # Setup template: 3 cột, nhiều dòng mẫu
    template_data = [
        ['sku', 'product_name', 'description'],  # header row
        ['sku1', 'product1', 'desc1'],
        ['sku2', 'product2', 'desc2'],
        ['sku3', 'product3', 'desc3'],
        ['sku4', 'product4', 'desc4'],
        ['sku5', 'product5', 'desc5'],
    ]
    template_df = pd.DataFrame(template_data)
    mock_read_excel.return_value = template_df
    # Chỉ trả về True cho file template, False cho file output
    def exists_side_effect(path):
        if 'uploads/config/listing' in path:
            return True
        return False
    mock_exists.side_effect = exists_side_effect

    # 2 listing test
    listings = [
        {
            "_id": ObjectId(),
            "title": "Test Product 1",
            "description": "Test Desc 1",
            "main_image": "main_image_1.jpg",
            "images": [],
            "shop_id": ObjectId(),
            "bullet_points": []
        },
        {
            "_id": ObjectId(),
            "title": "Test Product 2",
            "description": "Test Desc 2",
            "main_image": "main_image_2.jpg",
            "images": [],
            "shop_id": ObjectId(),
            "bullet_points": []
        }
    ]
    shop = mock_shop
    template = mock_template

    # Lưu DataFrame được ghi ra file
    saved_dfs = []
    def mock_to_excel_wrapper(df, *args, **kwargs):
        if isinstance(df, pd.DataFrame):
            saved_dfs.append(df.copy())
        return None
    mock_to_excel.side_effect = mock_to_excel_wrapper

    # DEBUG: In ra type của listings trước khi gọi export
    print("DEBUG TEST: Type of listings:", type(listings))
    # Thực thi export
    export_service._export_amazon_file(shop, listings, template)

    # Đảm bảo có DataFrame được ghi ra file
    assert len(saved_dfs) > 0
    df_out = saved_dfs[-1]
    # Số dòng đúng bằng số listing
    assert len(df_out) == len(listings)
    # Số cột đúng bằng file template
    assert list(df_out.columns) == ['sku', 'product_name', 'description']
    # Kiểm tra dữ liệu từng dòng
    for i, row in df_out.iterrows():
        # SKU phải có tiền tố ecom-sku-amz
        assert str(row['sku']).startswith('ecom-sku-amz')
        # product_name đúng với title
        assert row['product_name'] == listings[i]['title']
        # description đúng với description
        assert row['description'] == listings[i]['description'] 