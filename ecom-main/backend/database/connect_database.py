from pymongo import MongoClient
from config import Config, TestConfig
def connect_database():
    try:
        mongodb = MongoClient(Config.MONGO_URI)
        database = mongodb.get_database()
        return database
    except Exception as e:
        print(f"Database connection error: {e}")
        return None