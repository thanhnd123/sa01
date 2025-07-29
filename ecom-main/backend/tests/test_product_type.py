import unittest
import json
from flask import Flask
from routes.Api.Product.product import app
# from routes.Api.Product.product import app  # Đảm bảo đường dẫn đúng đến app

class ProductTypeAPITestCase(unittest.TestCase):
    def setUp(self):
        """Thiết lập môi trường kiểm tra."""
        self.app = app.test_client()
        self.app.testing = True

    def test_add_product_type(self):
        """Kiểm tra việc thêm mới product type."""
        response = self.app.post('/api/product-type/add', json={'name': 'New Product Type'})
        self.assertEqual(response.status_code, 201)
        self.assertIn('id', json.loads(response.data))

    def test_edit_product_type(self):
        """Kiểm tra việc chỉnh sửa product type."""
        # Giả sử ID 1 đã tồn tại
        response = self.app.post('/api/product-type/1/edit', json={'name': 'Updated Product Type'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.data)['success'], True)

    def test_delete_product_type(self):
        """Kiểm tra việc xóa product type."""
        # Giả sử ID 1 đã tồn tại
        response = self.app.post('/api/product-type/1/delete')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.data)['success'], True)

    def test_add_product_type_invalid(self):
        """Kiểm tra việc thêm mới product type với dữ liệu không hợp lệ."""
        response = self.app.post('/api/product-type/add', json={})  # Dữ liệu không hợp lệ
        self.assertEqual(response.status_code, 400)

    def test_edit_product_type_not_found(self):
        """Kiểm tra việc chỉnh sửa product type không tồn tại."""
        response = self.app.post('/api/product-type/999/edit', json={'name': 'Non-existent Product Type'})
        self.assertEqual(response.status_code, 404)

    def test_delete_product_type_not_found(self):
        """Kiểm tra việc xóa product type không tồn tại."""
        response = self.app.post('/api/product-type/999/delete')
        self.assertEqual(response.status_code, 404)

if __name__ == '__main__':
    unittest.main()