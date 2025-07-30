from flask_bcrypt import Bcrypt
from datetime import datetime
from app.modules.teamexp.model import find, truncate
bcrypt = Bcrypt()

def users():
    from database.connect_database import connect_database

    def seed_users():
        db = connect_database()
        users_collection = db['users']
        
        # Check if users already exist
        if users_collection.count_documents({}) > 0:
            print("Users already seeded")
            truncate('users')
        
        team = db['teams'].find_one({
            'name': 'Giran'
        })
        users = [
            {
                "email": "admin@ecom.com",
                "password": bcrypt.generate_password_hash("eecom").decode('utf-8'),
                "username": "Admin", 
                "role": "admin",
                "team_id": team['_id'],
                "created_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                "updated_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            },
            {
                "email": "user@example.com",
                "password": bcrypt.generate_password_hash("user123").decode('utf-8'),
                "username": "User",
                "role": "user", 
                "team_id": team['_id'],
                "created_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                "updated_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            },
            {
                "email": "editor@example.com",
                "password": bcrypt.generate_password_hash("editor123").decode('utf-8'),
                "username": "Editor",
                "role": "editor",
                "team_id": team['_id'],
                "created_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                "updated_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            }
        ]
        
        try:
            result = users_collection.insert_many(users)
            print(f"Successfully seeded {len(result.inserted_ids)} users")
            return result.inserted_ids
        except Exception as e:
            print(f"Error seeding users: {str(e)}")
            return None

    return seed_users()