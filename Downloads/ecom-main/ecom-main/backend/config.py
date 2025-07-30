import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    MONGO_URI = os.environ.get('MONGO_URI', 'mongodb://localhost:27017/exp_ecom_db')
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'your-secret-key')
    TESTING = False

class TestConfig(Config):
    TESTING = True
    MONGO_URI = 'mongodb://localhost:27017/exp_ecom_test_db' 