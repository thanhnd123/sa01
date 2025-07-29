from pymongo import MongoClient
import sys
import time

def test_mongodb_connection():
    """
    Test kết nối MongoDB và các operations cơ bản
    Returns: True nếu tất cả tests pass, False nếu có lỗi
    """
    try:
        # 1. Thử kết nối
        print("🔄 Đang thử kết nối tới MongoDB...")
        client = MongoClient('mongodb://mongodb:27017/', serverSelectionTimeoutMS=5000)
        
        # 2. Kiểm tra kết nối
        client.admin.command('ping')
        print("✅ Kết nối thành công!")

        # 3. Lấy thông tin server
        server_info = client.server_info()
        print(f"📊 Thông tin MongoDB Server:")
        print(f"   - Version: {server_info['version']}")
        print(f"   - Connection: {client.address}")

        # 4. Thử operations cơ bản
        db = client.test_database
        collection = db.test_collection
        
        # 4.1 Insert
        print("\n🔄 Thử insert document...")
        test_doc = {"name": "test", "status": "ok", "timestamp": time.time()}
        insert_result = collection.insert_one(test_doc)
        print(f"✅ Insert thành công: {insert_result.inserted_id}")

        # 4.2 Find
        print("\n🔄 Thử query document...")
        found_doc = collection.find_one({"name": "test"})
        print(f"✅ Query thành công: {found_doc}")

        # 4.3 Update
        print("\n🔄 Thử update document...")
        update_result = collection.update_one(
            {"name": "test"},
            {"$set": {"status": "updated"}}
        )
        print(f"✅ Update thành công: {update_result.modified_count} document được update")

        # 4.4 Delete
        print("\n🔄 Thử delete document...")
        delete_result = collection.delete_one({"name": "test"})
        print(f"✅ Delete thành công: {delete_result.deleted_count} document đã xóa")

        # 5. Liệt kê databases
        print("\n📋 Danh sách databases:")
        databases = client.list_database_names()
        for db_name in databases:
            print(f"   - {db_name}")
        # 6. Liệt kê collections trong exp_ecom_db
        print("\n📋 Danh sách collections trong exp_ecom_db:")
        exp_ecom_db = client.exp_ecom_db
        collections = exp_ecom_db.list_collection_names()
        for collection in collections:
            if collection == 'teamexp_users':
                users = exp_ecom_db[collection].find()
                print(f"   - {collection}:")
                for user in users:
                    print(f"     * {user.get('email', 'No email')} - {user.get('username', 'No username')} - {user.get('password', 'No password')}")
            else:
                print(f"   - {collection}")
        return True

    except Exception as e:
        print(f"\n❌ Lỗi kết nối MongoDB: {str(e)}")
        return False

    finally:
        if 'client' in locals():
            client.close()
            print("\n🔒 Đã đóng kết nối MongoDB")

if __name__ == "__main__":
    print("=== Bắt đầu test kết nối MongoDB ===\n")
    
    success = test_mongodb_connection()
    
    print("\n=== Kết thúc test ===")
    # Exit với status code 0 nếu thành công, 1 nếu thất bại
    sys.exit(0 if success else 1)
