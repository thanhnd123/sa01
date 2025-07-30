from database.connect_database import connect_database
from datetime import datetime
import random

def seed_mockups():
    try:
        db = connect_database()
        
        # Xóa collection cũ nếu tồn tại
        db.drop_collection('mockups')
        
        # Lấy danh sách teams và users để gán team_id và user_id
        teams = list(db.teams.find())
        users = list(db.users.find())
        product_types = list(db.product_types.find())
        
        if not teams or not users or not product_types:
            print("Không tìm thấy teams, users hoặc product_types trong database!")
            return False
            
        # Tạo dữ liệu mẫu
        poster = db.product_types.find_one({'name': 'Poster Horizontal'})
        mockups = [
            {
                "name": "Poster_1",
                "status": "active",
                "team_id": teams[0]["_id"],
                "user_id": users[0]["_id"],
                "product_type": poster["_id"],
                "images": [
                    "https://example.com/mockup1_1.jpg",
                    "https://example.com/mockup1_2.jpg"
                ],
                "created_at": datetime.now(),
                "updated_at": datetime.now()
            }
        ]
        
        # Thêm dữ liệu vào database
        result = db.mockups.insert_many(mockups)
        
        if result.inserted_ids:
            print(f"Đã thêm {len(result.inserted_ids)} mockups thành công!")
            return True
        return False
        
    except Exception as e:
        print(f"Lỗi khi tạo mockup data: {str(e)}")
        return False 