from database.connect_database import connect_database
from datetime import datetime
from bson import ObjectId
import json
import os
from flask import  request, jsonify
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = '/home/skynet3/ECOM/backend/data/mockups_image'  # Update this path as necessary
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

PRODUCT_TYPES_FILE = 'data/product_types.json'  # Đường dẫn tệp JSON cho product types

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def get_table_products():
    exp_ecom_database = connect_database()
    if exp_ecom_database is not None:
        try:
            table_products = exp_ecom_database['product']
            table_products.create_index("id", unique = True)
            return table_products
        except Exception as exception:
            return f"Error get table products: {exception}"
    else:
        return None
    
def auto_create_id():
    table_products = get_table_products()
    if table_products is not None:
        try:
            last_product = table_products.find_one(sort = [("id", -1)])
            if last_product:
                new_id = last_product["id"] + 1
                return new_id
            else:
                return 1
        except Exception as exception:
            return f"Error get table products: {exception}"
    else:
        return "Error: table products not found!"
    
def show(type, value):
    table_products = get_table_products()
    if table_products is not None:
        try:
            if type == "_id":
                get_product = table_products.find_one({"_id": ObjectId(value)})
            else:
                get_product = table_products.find_one({type: value})
            if get_product:
                get_product["_id"] = str(get_product["_id"])
                return get_product
            else:
                return "Error: product not found!"
        except Exception as exception:
            return f"Error: create product is failed: {exception}"
    else:
        return "Error: table products not found!"   
    
def check_title(data):
    try:
        with open('data/data.json', 'r', encoding='utf-8') as f:
            keywords_data = json.load(f)
        keywords = [item['name'].lower() for item in keywords_data]
        result = {}
        for key, value in data.items():
            result[key] = {}
            title_before = value['title']
            title = value['title'].lower()
            title_words = set(title.split())
            check_product = show("product_provider_id", "etsy_"+key)
            if check_product == "Error: product not found!":
                result[key]["exists"] = False
            elif check_product == "Error: table products not found!":
                return []
            else:
                result[key]["exists"] = True
            result[key]["restrict"] = []
            result[key]["status"] = ""
            result[key]["replace"] = ""
            for keyword in keywords:
                keyword_words = set(keyword.split())
                if keyword_words.issubset(title_words):
                    result[key]["restrict"].append(keyword)
            if len(result[key]["restrict"]) != 0:
                for keyword in result[key]["restrict"]:
                    title_before = title_before.replace(keyword, "")
            result[key]["replace"] = title_before
        return result  
    except Exception as exception:
        return f"Error: check products is failed: {exception}"
    
def get_product_types():
    try:
        with open('data/product_types.json', 'r', encoding='utf-8') as f:
            types_data = json.load(f)
        return types_data
    except Exception as exception:
        return f"Error: get product type is failed: {exception}"
# PRODUCT TYPE
def read_product_types():
    with open(PRODUCT_TYPES_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)

def write_product_types(types_data):
    with open(PRODUCT_TYPES_FILE, 'w', encoding='utf-8') as f:
        json.dump(types_data, f, ensure_ascii=False, indent=4)

def validate_product_type(data):
    return data and 'name' in data

def add_product_type(data):
    try:
        if not validate_product_type(data):
            return {"error": "Invalid input"}
        types_data = read_product_types()
        new_id = str(max(map(int, types_data.keys()), default=0) + 1) 
        types_data[new_id] = data['name']
        write_product_types(types_data)
        return {"success": True, "id": new_id}
    except Exception as e:
        return {"error": str(e)}

def edit_product_type(id, data):
    try:
        if not validate_product_type(data):
            return {"error": "Invalid input"}
        types_data = read_product_types()
        if id not in types_data:
            return {"error": "Product type not found"},
        types_data[id] = data['name']
        write_product_types(types_data)
        return {"success": True}
    except Exception as e:
        return {"error": str(e)}

def delete_product_type(id):
    try:
        types_data = read_product_types()
        if id not in types_data:
            return {"error": "Product type not found"}
        del types_data[id]
        write_product_types(types_data)
        return {"success": True}
    except Exception as e:
        return {"error": str(e)}
#-------------------------------------------------------#

def store(data):
    table_products = get_table_products()
    if table_products is not None:
        try:
            create_data = data.copy()
            if 'type_request' in create_data and create_data['type_request'] == "hey_etsy":
                create_data["product_provider_id"] = "etsy_"+str(create_data["listing_id"])
            else:
                create_data["product_provider_id"] = "etsy_"+str(create_data["id"])
            get_product = show("product_provider_id", create_data["product_provider_id"])
            if get_product == "Error: product not found!":
                new_id = auto_create_id()
                if new_id:
                    create_data["created_at"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                    create_data["updated_at"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                    if 'type_request' in create_data and create_data['type_request'] == "hey_etsy":
                        create_data["data_hey_etsy"] = data.copy()
                        table_products.insert_one(
                            {
                                "product_provider_id": create_data["product_provider_id"],
                                "data_hey_etsy": create_data["data_hey_etsy"],
                                "created_at": create_data["created_at"],
                                "updated_at": create_data["updated_at"],
                            }
                        )
                    else:
                        create_data["data_hey_etsy"] = "empty"
                        table_products.insert_one(create_data)
                    new_product = show("product_provider_id", create_data["product_provider_id"])
                    if new_product:
                        new_product["_id"] = str(new_product["_id"])
                        return new_product
                    else:
                        return "Error: product not found!"
                else:
                    return "Error: auto create id failed!"
            else:
                updated_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                if 'type_request' in create_data and create_data['type_request'] == "hey_etsy":
                    update_data = {}
                    update_data["data_hey_etsy"] = data.copy()
                    update_data["updated_at"] = updated_at
                else:
                    update_data = {}
                    update_data = data.copy()
                    update_data["updated_at"] = updated_at
                    if get_product['data_hey_etsy'] == "empty":
                        update_data["data_hey_etsy"] = "empty"
                    else:
                        update_data["data_hey_etsy"] = get_product['data_hey_etsy']
                table_products.update_one(
                    {"product_provider_id": create_data["product_provider_id"]},
                    {"$set": update_data}
                )
                product = show("product_provider_id", create_data["product_provider_id"])
                if product:
                    product["_id"] = str(product["_id"])
                    return product
                else:
                    return "Error: product not found!"
        except Exception as exception:
            return f"Error: create product is failed: {exception}"
    else:
        return "Error: table products not found!"
    
def lists(page, limit, search=None, sort_asc=None, sort_desc=None):
    table_products = get_table_products()
    if table_products is not None:
        try:
            # Số items trên mỗi trang
            per_page = limit
            skip = (int(page) - 1) * per_page
            
            # Tạo query filter cho search
            query = {}
            if search:
                query = {
                    "$or": [
                        {"title": {"$regex": search, "$options": "i"}},
                        # {"description": {"$regex": search, "$options": "i"}},
                        # {"product_provider_id": {"$regex": search, "$options": "i"}}
                    ]
                }
            
            # Xử lý sort
            sort_options = []
            if sort_asc:
                sort_options.append((sort_asc, 1))
            if sort_desc:
                sort_options.append((sort_desc, -1))
            
            # Đếm tổng số products theo điều kiện search
            total = table_products.count_documents(query)
            
            # Lấy products có phân trang, search và sort
            products = table_products.find(query)
            if sort_options:
                products = products.sort(sort_options)
            products = products.skip(skip).limit(per_page)
            
            data = []
            for product in products:
                if 'images' in product:
                    product['_id'] = str(product['_id'])
                    data.append(product)
            return {
                "data": data,
                "total": total,
                "per_page": per_page,
                "current_page": int(page),
                "last_page": (total + per_page - 1) // per_page
            }
        except Exception as exception:
            return f"Error: Get all products failed! {exception}"
    else:
        return "Error: table products not found!"
    
def list_mockups(page, user_id, search=None, sort_asc=None, sort_desc=None):
    table_products = get_table_products()
    if table_products is not None:
        try:
            # Số items trên mỗi trang
            per_page = 25
            skip = (int(page) - 1) * per_page
            
            # Tạo query filter với điều kiện bắt buộc có tag_mockup_user
            query = {
                "tag_mockup_user": user_id  # Điều kiện bắt buộc
            }
            
            # Thêm điều kiện search nếu có
            if search:
                query = {
                    "$and": [
                        {"tag_mockup_user": user_id},  # Giữ điều kiện bắt buộc
                        {
                            "$or": [
                                {"title": {"$regex": search, "$options": "i"}},
                                {"description": {"$regex": search, "$options": "i"}},
                                {"product_provider_id": {"$regex": search, "$options": "i"}}
                            ]
                        }
                    ]
                }
            
            # Xử lý sort
            sort_options = []
            if sort_asc:
                sort_options.append((sort_asc, 1))
            if sort_desc:
                sort_options.append((sort_desc, -1))
            if not sort_options:  # Mặc định sắp xếp theo thời gian cập nhật
                sort_options.append(('updated_at', -1))
            
            # Đếm tổng số products theo điều kiện
            total = table_products.count_documents(query)
            
            # Lấy products có phân trang, search và sort
            products = table_products.find(query)
            if sort_options:
                products = products.sort(sort_options)
            products = products.skip(skip).limit(per_page)
            
            data = []
            for product in products:
                if 'images' in product:
                    product['_id'] = str(product['_id'])
                    data.append(product)
            
            return {
                "data": data,
                "total": total,
                "per_page": per_page,
                "current_page": int(page),
                "last_page": (total + per_page - 1) // per_page
            }
        except Exception as exception:
            print(f"Error in list_mockups function: {exception}")  # Log lỗi để debug
            return {
                "data": [],
                "total": 0,
                "per_page": per_page,
                "current_page": int(page),
                "last_page": 0
            }
    else:
        return {
            "data": [],
            "total": 0,
            "per_page": 25,
            "current_page": int(page),
            "last_page": 0
        }
    
def update(data):
    table_products = get_table_products()
    if table_products is not None:
        try:
            if isinstance(data['dataRequest'], str):
                update_data = json.loads(data['dataRequest'])  
            else:
                update_data = data['dataRequest'].copy()
                
            updated_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            if 'type_request' in update_data and update_data['type_request'] == "user_update_categories":
                get_product = show("_id", ObjectId(update_data["product_id"]))
                if get_product:
                    table_products.update_one(
                        {"_id": ObjectId(update_data["product_id"])},
                        {
                            "$set": {
                                "type": update_data['categories'],
                                "updated_at": updated_at
                            }
                        }
                    )
                    get_product = show("_id", update_data["product_id"])
                    return get_product
                else:
                    return "Error: product not found!"
            elif 'type_request' in update_data and update_data['type_request'] == "user_sync_product_mockup":
                get_product = show("_id", update_data["product_id"])
                if get_product:
                    table_products.update_one(
                        {"_id": ObjectId(update_data["product_id"])},
                        {
                            "$set": {
                                "tag_mockup_user": update_data['user_id'],
                                "updated_at": updated_at
                            }
                        }
                    )
                    get_product = show("_id", update_data["product_id"])
                    return get_product
                else:
                    return "Error: product not found!"
            else:
                # update_product = table_products.update_one({"_id": ObjectId(data['_id'])}, {"$set": data})
                get_product = show("_id", update_data["product_id"])
                return get_product
        except Exception as exception:
            return f"Error: update product is failed: {exception}"
    else:
        return "Error: table products not found!"

def delete(id):
    table_products = get_table_products()
    if table_products is not None:
        try:
            get_product = table_products.find_one({"_id": ObjectId(id)})
            if get_product:
                delete_product = table_products.delete_one({"_id": ObjectId(id)})
                if delete_product == 0:
                    return "Error: delete product is failed!"
                else:
                    return "Done: delete product is success!"
            else:
                return "Error: product not found!"
        except Exception as exception:
            return f"Error: create product is failed: {exception}"
    else:
        return "Error: table products not found!"    