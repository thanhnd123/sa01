import unittest
from app import app, mongo
from app.modules.teamexp.model import paginate

class TestIdeals(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True
        
    def test_get_ideals_pagination(self):
        """Test getting 10 ideals from product_ideals collection"""
        # Get ideals from product_ideals collection with pagination
        limit = 10
        page = 1
        data = paginate(mongo.db.product_ideals, page, limit)
        
        # Assert we got 10 or fewer items
        self.assertLessEqual(len(data['result']['data']), limit)