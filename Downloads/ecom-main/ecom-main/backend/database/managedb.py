from extensions import mongo
from datetime import datetime

def init_db():
    """Initialize database with required collections and indexes"""
    try:
        # Create users collection with validation
        if 'users' not in mongo.db.list_collection_names():
            mongo.db.create_collection('users', validator={
                '$jsonSchema': {
                    'bsonType': 'object',
                    'required': ['username', 'email', 'password_hash'],
                    'properties': {
                        'username': {'bsonType': 'string'},
                        'email': {'bsonType': 'string'},
                        'password_hash': {'bsonType': 'string'},
                        'role': {'bsonType': 'string', 'enum': ['user', 'admin']},
                        'created_at': {'bsonType': 'date'}
                    }
                }
            })
            
            # Create indexes
            mongo.db.users.create_index('username', unique=True)
            mongo.db.users.create_index('email', unique=True)
            
            print("Database initialized successfully")
    except Exception as e:
        print(f"Error initializing database: {str(e)}")

def seed_db():
    """Seed database with initial data"""
    try:
        # Add admin user if not exists
        if not mongo.db.users.find_one({'role': 'admin'}):
            from flask_bcrypt import Bcrypt
            bcrypt = Bcrypt()
            admin_user = {
                'username': 'admin',
                'email': 'admin@example.com',
                'password_hash': bcrypt.generate_password_hash('admin123').decode('utf-8'),
                'role': 'admin',
                'created_at': datetime.utcnow()
            }
            mongo.db.users.insert_one(admin_user)
            print("Admin user created")
            
        print("Database seeded successfully")
    except Exception as e:
        print(f"Error seeding database: {str(e)}")

def reset_db():
    """Reset database (for development)"""
    try:
        mongo.db.users.drop()
        init_db()
        seed_db()
        print("Database reset successfully")
    except Exception as e:
        print(f"Error resetting database: {str(e)}")

if __name__ == "__main__":
    import sys
    from flask import Flask
    from dotenv import load_dotenv
    import os

    # Load environment variables
    load_dotenv()

    # Create Flask app context
    app = Flask(__name__)
    app.config['MONGO_URI'] = os.environ['MONGO_URI']
    mongo.init_app(app)

    with app.app_context():
        if len(sys.argv) > 1:
            if sys.argv[1] == 'init':
                init_db()
            elif sys.argv[1] == 'seed':
                seed_db()
            elif sys.argv[1] == 'reset':
                reset_db()
        else:
            print("Available commands: init, seed, reset") 