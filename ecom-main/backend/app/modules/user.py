from database.connect_database import connect_database
from datetime import datetime
from flask_bcrypt import Bcrypt
from bson import ObjectId

bcrypt = Bcrypt()

def get_table_users():
    exp_ecom_database = connect_database()
    if exp_ecom_database is not None:
        try:
            table_users = exp_ecom_database['users']
            table_users.create_index("id", unique = True)
            table_users.create_index("email", unique = True)
            return table_users
        except Exception as exception:
            return f"Error get table users: {exception}"
    else:
        return None
    
def auto_create_id():
    table_users = get_table_users()
    if table_users is not None:
        try:
            last_user = table_users.find_one(sort = [("id", -1)])
            if last_user:
                new_id = last_user["id"] + 1
                return new_id
            else:
                return 1
        except Exception as exception:
            return f"Error get table users: {exception}"
    else:
        return "Error: table users not found!"
    
def store(data):
    table_users = get_table_users()
    if table_users is not None:
        try:
            new_id = auto_create_id()
            if new_id:
                data["id"] = new_id
                data["role"] = "user"
                if "password" in data:
                    data["password"] = bcrypt.generate_password_hash(data['password']).decode('utf-8')
                data["created_at"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                data["updated_at"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                create_user = table_users.insert_one(data)
                inserted_id = create_user.inserted_id
                if inserted_id:
                    get_user = table_users.find_one({"_id": inserted_id})
                    if get_user:
                        get_user["_id"] = str(get_user["_id"])
                        return get_user
                    else:
                        return "Error: user not found!"
            else:
                return "Error: auto create id failed!"
        except Exception as exception:
            return f"Error: create user is failed: {exception}"
    else:
        return "Error: table users not found!"
    
def show(id):
    table_users = get_table_users()
    if table_users is not None:
        try:
            get_user = table_users.find_one({"_id": ObjectId(id)})
            if get_user:
                get_user["_id"] = str(get_user["_id"])
                return get_user
            else:
                return "Error: user not found!"
        except Exception as exception:
            return f"Error: create user is failed: {exception}"
    else:
        return "Error: table users not found!"
    
def update(data):
    table_users = get_table_users()
    if table_users is not None:
        try:
            update_data = data.copy()
            if '_id' in update_data:
                del update_data['_id']
            # update_data["role"] = "user"
            if "password" in update_data and update_data["password"]:
                update_data["password"] = bcrypt.generate_password_hash(update_data['password']).decode('utf-8')
            update_data["updated_at"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            update_user = table_users.update_one({"_id": ObjectId(data['_id'])}, {"$set": update_data})
            get_user = show(data["_id"])
            return get_user
        except Exception as exception:
            return f"Error: update user failed: {exception}"
    else:
        return "Error: table users not found!"
    
def delete(id):
    table_users = get_table_users()
    if table_users is not None:
        try:
            get_user = table_users.find_one({"_id": ObjectId(id)})
            if get_user:
                delete_user = table_users.delete_one({"_id": ObjectId(id)})
                if delete_user == 0:
                    return "Error: delete user is failed!"
                else:
                    return "Done: delete user is success!"
            else:
                return "Error: user not found!"
        except Exception as exception:
            return f"Error: create user is failed: {exception}"
    else:
        return "Error: table users not found!"    

def lists(page, search=None, sort_asc=None, sort_desc=None):
    table_users = get_table_users()
    if table_users is not None:
        try:
            per_page = 10
            skip = (int(page) - 1) * per_page
            
            # Tạo query filter cho search
            query = {}
            if search:
                query = {
                    "$or": [
                        {"name": {"$regex": search, "$options": "i"}},
                        {"email": {"$regex": search, "$options": "i"}},
                        {"phone": {"$regex": search, "$options": "i"}}
                    ]
                }
            
            # Xử lý sort
            sort_options = []
            if sort_asc:
                sort_options.append((sort_asc, 1))
            if sort_desc:
                sort_options.append((sort_desc, -1))
            
            # Đếm tổng số users theo điều kiện search
            total = table_users.count_documents(query)
            # Lấy users có phân trang, search và sort
            users = table_users.find(query)
            if sort_options:
                users = users.sort(sort_options)
            users = users.skip(skip).limit(per_page)
            
            data = []
            for user in users:
                user['_id'] = str(user['_id'])
                data.append(user)
                
            return {
                "data": data,
                "total": total,
                "per_page": per_page,
                "current_page": int(page),
                "last_page": (total + per_page - 1) // per_page
            }
        except Exception as exception:
            return f"Error: Get all users failed! {exception}"
    else:
        return "Error: table users not found!"    