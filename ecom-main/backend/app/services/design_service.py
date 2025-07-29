from database.connect_database import connect_database  
from datetime import datetime
from bson import ObjectId 
from bson.errors import InvalidId
import os
import uuid
from werkzeug.utils import secure_filename
import boto3
from botocore.exceptions import ClientError
from app.services.aws_service import aws
from flask import Flask, request, jsonify

db = connect_database()

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'pdf', 'psd', 'ai'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def get_name(user_id):
    if not user_id:
        return None
    user = db['teamexp_users'].find_one({"_id": ObjectId(user_id)})
    if user and 'name' in user:
        return user['name']
    return "Unknown"

def get_product_type_name(product_type_ids):
    product_type_names = []
    for product_type_id in product_type_ids:
        product_type = db['product_types'].find_one({'_id': ObjectId(product_type_id)})
        if product_type and 'name' in product_type:
            product_type_names.append(product_type['name'])
        else:
            product_type_names.append("Unknown")
    return product_type_names

def get_designs():    
    designs = db['designs'].find()
    result = []
    for design in designs:
        design['_id'] = str(design['_id']) 
        status_map = {1: "New", 2: "Processing", 3: "Submit", 4: "Done", 5: "Fail"}
        # design['status'] = status_map.get(design['status'], "Unknown")
        design['designer_id'] = get_name(design.get('designer_id'))
        design['seller_id'] = get_name(design.get('seller_id'))
        product_type_ids = design.get('product_type', [])
        design['product_type'] = get_product_type_name(product_type_ids)
        result.append(design)
    return result

def get_design_list():
    designs = db['designs'].find()
    result = []
    for design in designs:
        design['_id'] = str(design['_id']) 
        status_map = {1: "New", 2: "Processing", 3: "Submit", 4: "Done", 5: "Fail"}
        design['status'] = status_map.get(design['status'], "Unknown")
        design['designer_id'] = get_name(design.get('designer_id'))
        design['seller_id'] = get_name(design.get('seller_id'))
        # design['product_type'] = get_product_type_name(design.get('product_type'))
        result.append(design)
    return result

def create_designs(data):
    # Handle case where only title, banner and seller_note are provided
    if all(key in data for key in ['title', 'banner', 'seller_note', "status"]) and len(data) == 4:
        design_data = {
            'banner': data.get('banner', ''),
            'design_links': [],
            'image': [],
            'designer_id': None,
            'product_ideal_id': None,
            'seller_id': None,
            'seller_note': data.get('seller_note', ''),
            'status': 1,
            'product_type': [],
            'template_link': [],
            'title': data.get('title', ''),
            'comments': [],
            'iscompleted': 0,
            'mockup_selects': [],
            'mockup_renders': [],
            'created_at': datetime.now().strftime('%d-%m-%Y %H:%M:%S'),
            'updated_at': datetime.now().strftime('%d-%m-%Y %H:%M:%S'),
        }
        
        insert_result = db['teamexp_designs'].insert_one(design_data)
        result_id = str(insert_result.inserted_id)
        add_task_to_column(result_id, data.get('status'))  
        return [result_id]
####
    # Original logic for full data
    product_ideal = data.get('product_ideal', {})
    templates = data.get('templates', [])
    seller_note = data.get('seller_note', '')
    user_id = data.get('user_id')
    mockup_selects = data.get('mockup_selects', [])
    
    mockup_renders = []
    product_types = []
    template_links = []
    
    for template in templates:
        product_type = template.get('product_type')
        template_link = template.get('template_link', '')

        if product_type and product_type not in product_types:
            product_types.append(product_type)
            mockup_renders.append({
                'product_type': product_type,
                'mockup_links': []
            })
        if template_link and template_link not in template_links:
            template_links.append(template_link)

    max_order = db['designs'].find_one(sort=[("order", -1)])
    next_order = (max_order['order'] + 1000) if max_order and 'order' in max_order else 1000

    design_data = {
        'banner': product_ideal.get('banner', ''),
        'design_links': [],
        'image': product_ideal.get('images', []),
        'designer_id': None,
        'product_ideal_id': product_ideal.get('_id'),
        'seller_id': user_id,
        'seller_note': seller_note,
        'status': 1,
        # 'order': next_order,  
        'product_type': product_types,
        'template_link': template_links,
        'title': product_ideal.get('title', ''),
        'comments': [],
        'iscompleted': 0,
        'mockup_selects': mockup_selects,
        'mockup_renders': mockup_renders,
        'created_at': datetime.now().strftime('%d-%m-%Y %H:%M:%S'),
        'updated_at': datetime.now().strftime('%d-%m-%Y %H:%M:%S'),
    }
    
    insert_result = db['designs'].insert_one(design_data)
    result_id = str(insert_result.inserted_id)
    add_task_to_column(result_id)  
    return [result_id]


def update_design(id, data, complete=False):      
    if db is None:
        raise Exception("Database connection is not established.")  
    
    update_data = {}
    if 'status' in data:
        update_data["status"] = data['status']
    if 'designer_id' in data:
        update_data["designer_id"] = data['designer_id']
    if 'images' in data:
        update_data["dropbox"] = data['images']
    if 'design_links' in data:
        update_data["design_links"] = data['design_links']
    if 'mockup_renders' in data:
        update_data["mockup_renders"] = data['mockup_renders']
    if 'title' in data:
        update_data["title"] = data['title']
    if 'badge' in data:
        update_data["badgeText"] = data['badge']
    if 'comments' in data:
        update_data["comments"] = data['comments']
    if 'description' in data:
        update_data["description"] = data['description']
    # Thêm cập nhật seller_note và required_tasks
    if 'seller_note' in data:
        update_data["seller_note"] = data['seller_note']
    if 'required_tasks' in data:
        update_data["required_tasks"] = data['required_tasks']
    #--------------update status----------    
    if complete:
        update_data["iscompleted"] = 1
    # -----------------------------------
    
    update_data["updated_at"] = datetime.utcnow() 
    if update_data:
        result = db['designs'].update_one(
            {"_id": ObjectId(id)},
            {"$set": update_data}
        )
        return result.modified_count  
    else:
        return 0


def delete_design(id):    
    result = db['designs'].delete_one({"_id": ObjectId(id)})
    return result.deleted_count 

def get_columns():
    print(db)
    columns = db['teamexp_design_columns'].find()
    result = []
    for column in columns:
        column['_id'] = str(column['_id'])
        result.append(column)
    return result


def create_column(data):   
    if 'taskIds' not in data:
        data['taskIds'] = []        
    result = db['teamexp_design_columns'].insert_one(data)
    return str(result.inserted_id)


def update_column(id, title, taskIds, status):    
    if db is None:
        raise Exception("Database connection is not established.")
    
    update_data = {}    
    if title is not None:
        update_data["title"] = title
    if taskIds is not None:
        update_data["taskIds"] = taskIds
    if status is not None:
        update_data["status"] = status
    
    if update_data:
        result = db['teamexp_design_columns'].update_one(
            {"_id": ObjectId(id)},
            {"$set": update_data}
        )
        return result.modified_count
    else:
        return 0


def delete_column(id):    
    result = db['teamexp_design_columns'].delete_one({"_id": ObjectId(id)})
    return result.deleted_count 

def update_column_task_ids(column_id, taskIds):    
    if db is None:
        raise Exception("Database connection is not established.")

    db['teamexp_design_columns'].update_many(
        {
            "_id": {"$ne": ObjectId(column_id)},  
            "taskIds": {"$in": taskIds}      
        },
        {
            "$pull": {"taskIds": {"$in": taskIds}}  
        }
    )
    result = db['teamexp_design_columns'].update_one(
        {"_id": ObjectId(column_id)},
        {"$set": {"taskIds": taskIds}}
    )

    column = db['teamexp_design_columns'].find_one({"_id": ObjectId(column_id)})
    if column and "status" in column:
        new_status = column["status"]
        db['designs'].update_many(
            {"_id": {"$in": [ObjectId(tid) for tid in taskIds]}},
            {"$set": {"status": new_status}}
        )
    return result.modified_count

###### Kanban F2
def update_task_status_and_position(task_id, source_status, destination_status, destination_index):
    if db is None:
        raise Exception("Database connection is not established.")

    db['designs'].update_one(
        {"_id": ObjectId(task_id)},
        {"$set": {"status": destination_status, "order": destination_index}}
    )
    
    return 1


def get_tasks_by_status(status, limit=50, offset=0):
    status_map = {"New": 1, "Processing": 2, "Submit": 3, "Done": 4, "Fail": 5}

    if isinstance(status, str):
        if status.isdigit():
            # Nếu status là chuỗi số, chuyển thành số nguyên
            status = int(status)
        elif status in status_map:
            # Nếu status là tên, chuyển sang giá trị số tương ứng
            status = status_map[status]
    
    tasks = db['designs'].find(
        {'status': status}
    ).sort('order', 1).skip(offset).limit(limit)
    
    result = []
    for task in tasks:
        # Chuyển đổi ObjectId sang chuỗi
        task['_id'] = str(task['_id'])
        
        task['designer_id'] = get_name(task.get('designer_id'))
        task['seller_id'] = get_name(task.get('seller_id'))
        product_type_ids = task.get('product_type', [])
        task['product_type'] = get_product_type_name(product_type_ids)
        
        result.append(task)
    
    return result

#####

def add_task_to_column(task_id, column_id=None):
    if db is None:
        raise Exception("Database connection is not established.")
    if column_id is None:
        column_id = "680310969300e3048ba99eb2"
    column_id = ObjectId(column_id)
    result = db['teamexp_design_columns'].update_one(
        {"_id": column_id},
        {"$addToSet": {"taskIds": task_id}}
    )
    return result.modified_count


def create_product(data):
    filtered_data = {
        'title': data.get('title', ''),
        'banner': data.get('banner', ''),
        'description': data.get('description',''),
        'design_links': data.get('design_links', []),
        'product_type': data.get('product_type', ''),
        'product_ideal_id': data.get('product_ideal_id', ''),
        'image': data.get('image', []),
        'seller_id': data.get('seller', ''),
        'designer_id': data.get('designer', ''),
        'team_id': data.get('designer', ''),
        'created_at': datetime.now().strftime('%d-%m-%Y %H:%M:%S'),
        'updated_at': datetime.now().strftime('%d-%m-%Y %H:%M:%S'),
    }
    result = db['teamexp_products'].insert_one(filtered_data)
    return str(result.inserted_id)

def remove_task_from_all_columns(task_id):
    if db is None:
        raise Exception("Database connection is not established.")
    
    db['teamexp_design_columns'].update_many(
        {"taskIds": task_id},
        {"$pull": {"taskIds": task_id}}
    )


def get_products():
    return db['teamexp_products'].find()

def get_designer(role, team_id):
    result = db['users'].find({"role_id": role, "team_id": team_id})   
    users = list(result) 
    for user in users:
        user['_id'] = str(user['_id']) 
    return users


#############Upload FILE FNG To S3
def get_unique_filename(original_filename):
    timestamp = datetime.now().strftime('%H%M%S_%d%m%Y')
    secure_name = secure_filename(original_filename)
    return f"{timestamp}_{secure_name}"

def to_slug(text):
    return text.lower().strip().replace(' ', '-')

def upload_file_to_s3(file,design_folder, name=None):
    if not file or not allowed_file(file.filename):
        raise ValueError("Invalid file type. Allowed types: " + ", ".join(ALLOWED_EXTENSIONS))
    
    try:
        current_date = datetime.now().strftime('%Y-%m-%d')
        filename = secure_filename(file.filename)
        folder_name = to_slug(filename.split('.')[0])

        if name:
            slug_name = to_slug(name)
            s3_filepath = f"{design_folder}/{current_date}/{folder_name}/{slug_name}/{uuid.uuid4()}-{filename}"
        else:
            s3_filepath = f"{design_folder}/{current_date}/{folder_name}/{uuid.uuid4()}-{filename}"
            
        content_type = file.content_type or 'application/octet-stream'

        file_url = aws.upload_file(file, s3_filepath, content_type)
        
        return file_url
    except Exception as e:
        raise ValueError(f"Failed to upload to S3: {str(e)}")
    
    
def delete_file_from_s3(file_path):
    try:
        if 's3.amazonaws.com/' in file_path:
            object_key = file_path.split('s3.amazonaws.com/')[1]
        else:
            object_key = file_path

        result = aws.delete_file(object_key)
        return result
        
    except Exception as e:
        raise ValueError(f"Failed to delete file from S3: {str(e)}")


#IDEA TO GEN BANNER
def create_design_action_with_file(action_data, file=None):
    try:
        if file and file.filename != '':
            name = action_data.get('name', '')
            design_folder = "designs"
            file_url = upload_file_to_s3(file, design_folder, name)
            action_data['png'] = file_url
            
        if 'created_at' not in action_data:
            action_data['created_at'] = datetime.now().isoformat()

        from app.modules.teamexp.model import create
        result = create(action_data, 'design_actions')
        
        return result
    except Exception as e:
        raise ValueError(f"Failed to create design action: {str(e)}")
    
def get_mockup_links_by_design_id(design_id):
    try:
        design = db['designs'].find_one({"_id": ObjectId(design_id)})
        if not design:
            raise ValueError(f"Design with ID {design_id} not found")
            
        mockup_renders = design.get('mockup_renders', [])
        result = [link for render in mockup_renders for link in render.get('mockup_links', [])]
        return result
    except InvalidId:
        raise ValueError(f"Invalid design ID format: {design_id}")
    except Exception as e:
        raise ValueError(f"Error retrieving mockup links: {str(e)}")
