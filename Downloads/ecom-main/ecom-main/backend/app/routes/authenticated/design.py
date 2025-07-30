from flask import Flask, Blueprint, request, jsonify
from app.modules.teamexp.model import find, create, update, delete, getDataJson, pluck, truncate
from flask_jwt_extended import get_jwt_identity
from flask_bcrypt import Bcrypt
from bson import ObjectId
from app.services.gen_banners_service import get_random_mockups_by_event
from app.services.design_service import (
    create_product,
    get_products,
    get_designs, 
    get_design_list,
    update_design, 
    create_designs, 
    delete_design, 
    get_columns, 
    create_column,
    update_column, 
    delete_column, 
    update_column_task_ids,
    remove_task_from_all_columns,
    get_designer,
    get_mockup_links_by_design_id,
    delete_file_from_s3,
    upload_file_to_s3,
    get_tasks_by_status,
)
from app.services.aws_service import aws
import json
import os
import time
from datetime import datetime
from app.services.helpers import model_to_dict
from database.connect_database import connect_database
from werkzeug.utils import secure_filename
import tempfile
import shutil

bcrypt = Bcrypt()

design_bp = Blueprint('designs', __name__)

UPLOAD_FOLDER = 'uploads/designs'
CHUNK_FOLDER = 'uploads/chunks'

# Ensure upload directories exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(CHUNK_FOLDER, exist_ok=True)

            
            
####################################################
@design_bp.route("/complete/list", methods=["GET"]) 
def lists_design_kanban():
    result = get_design_list()
    return jsonify({"result": result})

@design_bp.route("/create", methods=["POST"]) 
def create_design():
    data = request.get_json()  
    try:
        db = connect_database()
        product_ideal = data.get('product_ideal')
        seller_note = data.get('seller_note')
        required_tasks = data.get('required_tasks')
        user_id = get_jwt_identity()
        user = db.users.find_one({'_id': ObjectId(user_id)})
        if not product_ideal:
            return jsonify({
                "success": False,
                "message": "Missing product_ideal information"
            }), 400

        # Create new design
        status = "new"
        # Kiểm tra role content_trainer
        if user.get("role") == "content_trainer":
            status = "pending approval"
        # Get product_ideal_id - handle both string ID and object cases
        if isinstance(product_ideal, dict):
            product_ideal_id = product_ideal.get('_id') or product_ideal.get('id')
        else:
            product_ideal_id = product_ideal
            
        # Convert to ObjectId if needed
        if isinstance(product_ideal_id, str):
            product_ideal_id = ObjectId(product_ideal_id)

        design_data = {
            "product_ideal_id": product_ideal_id,
            "seller_note": seller_note,
            "status": status,
            "team_id": user.get("team_id"),
            "order_by_user_id": user_id,
            "created_at": int(time.time()),
            "updated_at": int(time.time()),
            'banner': product_ideal.get('banner') if isinstance(product_ideal, dict) else '',
            'images': product_ideal.get('images', []) if isinstance(product_ideal, dict) else [],
            'required_tasks': required_tasks
        }
        #check trùng
        check_design = db['designs'].find_one(
            {
                "product_ideal_id": product_ideal_id,
                "order_by_user_id": get_jwt_identity(),
                "required_tasks.png": required_tasks.get('png', False),
                "required_tasks.productBanner.enabled": required_tasks.get('productBanner', {}).get('enabled', False),
                "required_tasks.productBanner.productTypes": required_tasks.get('productBanner', {}).get('productTypes', []),
                "required_tasks.other.enabled": required_tasks.get('other', {}).get('enabled', False),
                "required_tasks.other.note": required_tasks.get('other', {}).get('note', '')
            }
        )
        if check_design:
            return jsonify({
                "success": False,
                "message": "Design already exists"
            }), 400
        result = db['designs'].insert_one(design_data)
        
        # Create response data with serializable ObjectIds
        response_data = {
            "_id": str(result.inserted_id),
            "product_ideal_id": str(product_ideal_id),
            "seller_note": seller_note,
            "status": status,
            "team_id": user.get("team_id"),
            "order_by_user_id": user_id,
            "created_at": design_data["created_at"],
            "updated_at": design_data["updated_at"],
            'banner': design_data['banner'],
            'images': design_data['images'],
            'required_tasks': required_tasks
        }

        return jsonify({
            "success": True,
            "message": "Design created successfully",
            "data": response_data
        }), 200

    except Exception as e:
        return jsonify({
            "success": False,
            "message": f"Error creating design: {str(e)}"
        }), 500

# Removed duplicate endpoint - using the new one below

@design_bp.route("/<id>/delete", methods=["DELETE"])
def delete_design_kanban(id):
    result = delete_design(id)
    return jsonify({"result": result}), 200


@design_bp.route("/<id>/mockups", methods=["GET"])
def get_design_mockups(id):

    try:
        result = get_mockup_links_by_design_id(id)
        return jsonify({
            "success": True,
            "result": result
        }), 200
    except ValueError as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 404
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"An unexpected error occurred: {str(e)}"
        }), 500
        
# Column APIs
@design_bp.route("/columns", methods=["GET"])
def list_columns_design():
    result = get_columns()
    return jsonify({"result": result})

@design_bp.route("/column/create", methods=["POST"])
def create_column_design():
    data = request.get_json()
    result = create_column(data)
    return jsonify({"result": result}), 201

@design_bp.route("/column/<id>/update", methods=["PUT"])
def update_column_design(id):
    req_data = request.get_json()
    title = req_data.get('title')
    taskIds = req_data.get('taskIds')
    status = req_data.get('status')
    
    if id is None:
        return jsonify({"error": "Missing column id"}), 400
    
    result = update_column(id, title, taskIds, status)
    return jsonify({"result": result})


@design_bp.route("/column/<id>/delete", methods=["DELETE"])
def delete_column_design(id):
    result = delete_column(id)
    return jsonify({"result": result}), 200


########  KANBAN APIs
@design_bp.route("/column/<id>/update-tasks", methods=["PUT"])
def update_column_tasks_design(id):
    req_data = request.get_json()
    taskIds = req_data.get('taskIds')
    if id is None or taskIds is None:
        return jsonify({"error": "Missing column id or taskIds"}), 400
    
    result = update_column_task_ids(id, taskIds)
    return jsonify({"result": result})

@design_bp.route("/kanban", methods=["GET"])
def get_kanban_data():
    columns = get_columns()
    designs = get_designs()
    return jsonify({
        "columns": columns,
        "tasks": designs
    })


#add product
@design_bp.route("/addproduct", methods=["POST"]) 
def product_create():
    data = request.get_json()  
    task_id = data.get('task_id')  # Extract task_id from the request data
    if data.get('status') == "Done" or data.get('status') == 4:
        result = create_product(data)  
        
        # update_design(task_id, {"complete": 1}) 
        # remove_task_from_all_columns(task_id)
        return jsonify({"result": result}), 201
    else:
        return jsonify({"error": "Invalid status. Status must be 'done' or 4."}), 400    


@design_bp.route("/users/designers", methods=["GET"]) 
def get_designer_user():
    role = request.args.get('role')
    team_id = request.args.get('team_id')
    result = get_designer(role, team_id)
    return jsonify({"result": result}), 201



##############UPlOAD FILE
@design_bp.route('/upload', methods=['POST'])
def upload_file_design():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400    
    file = request.files['file']    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    try:
        design_folder = "designs"
        name = request.form.get('description', None)
        file_url = upload_file_to_s3(file, design_folder, name)
        result = {'file_url': file_url}
        return jsonify({
            'success': True,
            'result': result,
        }), 200
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# Delete file from S3
@design_bp.route('/file/delete', methods=['DELETE'])
def delete_file_design():
    data = request.get_json()
    file_path = data.get('file_path')
    
    if not file_path:
        return jsonify({'error': 'No file path provided'}), 400
        
    try:
        result = delete_file_from_s3(file_path)
        
        if result:
            return jsonify({
                'success': True,
                'message': 'File deleted successfully'
            }), 200
        else:
            return jsonify({
                'success': False,
                'error': 'Failed to delete file'
            }), 400
            
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@design_bp.route("/tasks", methods=["GET"])
def get_tasks():
    #status: Filter tasks by status (1=New, 2=Processing, 3=Submit, 4=Done, 5=Fail)
    status = request.args.get('status', 1)
    limit = int(request.args.get('limit', 50))
    offset = int(request.args.get('offset', 0))
    
    # Get tasks from service
    tasks = get_tasks_by_status(status, limit, offset)
    
    return jsonify({
        "result": tasks,
        # "total": len(tasks),
        # "limit": limit,
        # "offset": offset
    })




@design_bp.route("/actions", methods=["GET"])
def list_design_actions():
    try:
        db = connect_database()
        user_id = get_jwt_identity()
        limit_str = request.args.get('limit', '50')
        page_str = request.args.get('page', '1')
        search = request.args.get('search', None)
        sort_param = request.args.get('sort', 'created_at')
        sortBy = request.args.get('sort-by', 'desc')

        try:
            limit = int(limit_str)
            page = int(page_str)
        except ValueError:
            return jsonify({"error": "Invalid limit or page number"}), 400

        if limit <= 0:
            limit = 50
        if page <= 0:
            page = 1

        skip = (page - 1) * limit
        
        base_query_conditions = []
        if search:
            base_query_conditions.append({"name": {"$regex": search, "$options": "i"}})
        user_id = get_jwt_identity()
        user = db.users.find_one({"_id": ObjectId(user_id)})
        if user and 'team_id' in user:
            base_query_conditions.append({"team_id": str(user['team_id'])})
        final_base_query = {}
        if base_query_conditions:
            if len(base_query_conditions) > 1:
                final_base_query = {"$and": base_query_conditions}
            else:
                final_base_query = base_query_conditions[0]

        collection = db['design_actions']
        
        pipeline = []

        if final_base_query:
            pipeline.append({"$match": final_base_query})

        sort_stage_dict = {}
        if sort_param and sortBy:
            sort_order = 1 if sortBy.lower() == 'asc' else -1
            sort_stage_dict[sort_param] = sort_order
        else:
            sort_stage_dict['created_at'] = -1

        facet_pipeline = {
            "$facet": {
                "paginated_results": [
                    {"$sort": sort_stage_dict},
                    {"$skip": skip},
                    {"$limit": limit}
                ],
                "total_count": [
                    {"$count": "count"}
                ]
            }
        }

        pipeline.append(facet_pipeline)
        
        aggregation_result = list(collection.aggregate(pipeline))

        processed_data = []
        total_documents = 0

        if aggregation_result and aggregation_result[0]['paginated_results']:
            paginated_data = aggregation_result[0]['paginated_results']
            for item in paginated_data:
                processed_data.append(model_to_dict(item))
            
            if aggregation_result[0]['total_count']:
                total_documents = aggregation_result[0]['total_count'][0]['count']
        
        total_pages = (total_documents + limit - 1) // limit

        return jsonify({
            "data": processed_data,
            "total": total_documents,
            "page": page,
            "limit": limit,
            "total_pages": total_pages
        })
    except Exception as e:
        import traceback
        return jsonify({
            "error": f"An error occurred: {str(e)}",
            "line": traceback.format_exc(),
            "details": str(e) 
        }), 500


@design_bp.route("/actions/update", methods=["POST"])
def update_design_action():
    data = request.get_json()
    db = connect_database()
    action_id = data['_id']
    del data['_id']
    result = db.design_actions.update_one(
        {"_id": ObjectId(action_id)},
        {"$set": data}
    )

    return jsonify({ 'success': True,
            'message': 'Design action updated successfully'
        }), 200



@design_bp.route("/actions/delete", methods=["DELETE"])
def delete_design_action():
    data = request.get_json()
    action_id = data['_id']
    db = connect_database()
    result = db.design_actions.delete_one({"_id": ObjectId(action_id)})
    return jsonify({'success': True, 'message': 'Design action deleted successfully'}), 200


@design_bp.route("/actions/bulk-create", methods=["POST"])
def bulk_create_design_action():
    try:
        selected_ideal_ids = json.loads(request.form.get('selectedIdealIds', '[]'))
        selected_product_types = json.loads(request.form.get('selectedProductTypes', '[]'))

        if not selected_ideal_ids:
            return jsonify({
                'success': False,
                'message': 'Please select at least one ideal'
            }), 400

        if not selected_product_types:
            return jsonify({
                'success': False,
                'message': 'Please select at least one product type'
            }), 400

        db = connect_database()
                    

        selected_ideal_ids = [ObjectId(id) for id in selected_ideal_ids]
        ideals = list(db['product_ideals'].find({"_id": {"$in": selected_ideal_ids}}))
        
        if not ideals:
            return jsonify({
                'success': False,
                'message': 'No ideals found'
            }), 404

        design_actions = []
        user_id = get_jwt_identity()
        user = db['users'].find_one({"_id": ObjectId(user_id)})
        for ideal in ideals:
            for product_type in selected_product_types:
                product_type_obj = db['product_types'].find_one({"_id": ObjectId(product_type.get("id"))})
                mockups = get_random_mockups_by_event(db, product_type_obj.get("_id", ""), product_type.get("events", []), product_type.get("banner_count", 5))
                design_action = {
                    "type": "generate_banner",
                    "ideal_id": str(ideal["_id"]),
                    "name": ideal.get("title", ""),
                    "ideal_banner": ideal.get("banner", ""),
                    "created_at": datetime.utcnow(),
                    "updated_at": datetime.utcnow(),
                    "png": ideal.get("png", ""),
                    "status": "pending",
                    "title": ideal.get("title", ""),
                    "product_type": product_type_obj.get("name", ""),
                    "product_type_id": product_type_obj.get("_id", ""),
                    "banners": [],
                    "main_image": "",
                    "status": "pending",
                    "mockups": mockups,
                    "created_by": user_id,
                    "team_id": user.get("team_id", 0),
                    "events": product_type.get("events", [])
                }     
                result = db.design_actions.insert_one(design_action)
                design_action["_id"] = str(result.inserted_id)
                design_actions.append(design_action)

        return jsonify({
            'success': True,
            'message': 'Design actions created successfully',
            'data': {
                'design_actions': [action["_id"] for action in design_actions]
            }
        })

    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error creating design actions: {str(e)}'
        }), 500



@design_bp.route("/new", methods=["GET"])
def get_new_designs():
    try:
        db = connect_database()
        user_id = get_jwt_identity()    
        user = db['users'].find_one({"_id": ObjectId(user_id)})
        designs = db['designs'].find({"status": "new", "team_id": user.get("team_id")})
        result = []
        for design in designs:
            design_dict = model_to_dict(design)
            # Lấy thông tin người tạo từ collection users
            creator = db['users'].find_one({"_id": ObjectId(design.get('order_by_user_id'))})
            if creator:
                design_dict['created_by_user_name'] = creator.get('name', creator.get('username', 'Unknown'))
            else:
                design_dict['created_by_user_name'] = 'Unknown'
            result.append(design_dict)
        return jsonify({
            "success": True,
            "message": "New designs fetched successfully",
            "data": result
        }) ,200
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e),
        }), 500


@design_bp.route("/my", methods=["GET"])
def get_my_designs():
    try:
        db = connect_database()
        user_id = get_jwt_identity()
        user = db['users'].find_one({"_id": ObjectId(user_id)})
        
        if user.get("role") == "manager" or user.get("role") == "admin":
            return get_manager_designs(db, user)
        else:
            return get_user_designs(db, user)
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e),
        }), 500

def get_manager_designs(db, user):
    """Hàm lấy designs cho admin và manager"""
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 25, type=int)
        skip = (page - 1) * per_page
        status = request.args.get('status', None)
        user_filter = request.args.get('user_id', None)
        query = {}
        
        if(status == "" or status == None):
            # Nếu không filter status, loại bỏ deleted và rejected
            query["status"] = {"$nin": ["deleted", "rejected"]}
        elif status == "deleted":
            query["status"] = "deleted"
        else:
            query["status"] = status
        
        # Filter theo user nếu có
        if user_filter:
            query["order_by_user_id"] = user_filter
            
        # Admin/Manager chỉ thấy designs của team mình
        query["team_id"] = user.get("team_id")
            
        designs = db['designs'].find(query).skip(skip).limit(per_page)
        
        # Tính total count với cùng query
        total = db.designs.count_documents(query)
        
        result = []
        for design in designs:
            design_dict = model_to_dict(design)
            # Lấy thông tin người tạo từ collection users
            creator = db['users'].find_one({"_id": ObjectId(design.get('order_by_user_id'))})
            if creator:
                design_dict['created_by_user_name'] = creator.get('name', creator.get('username', 'Unknown'))
            else:
                design_dict['created_by_user_name'] = 'Unknown'
            
            # Lấy thông tin designer
            if design.get('designer_id'):
                designer = db['users'].find_one({"_id": ObjectId(design.get('designer_id'))})
                design_dict['designer_name'] = designer.get('name', designer.get('username', 'Unknown')) if designer else 'Unknown'
            else:
                design_dict['designer_name'] = 'Unknown'
                
            result.append(design_dict)
            
        return jsonify({
            "success": True,
            "data": result,
            "total": total,
            "status": status,
            'message': 'Admin/Manager designs fetched successfully'
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e),
        }), 500

def get_user_designs(db, user):
    """Hàm lấy designs cho user thường (designer, content_trainer, etc.)"""
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 25, type=int)
        skip = (page - 1) * per_page
        status = request.args.get('status', None)
        user_id = get_jwt_identity()
        query = {}
        
        if(status == "" or status == None):
            # Nếu không filter status, loại bỏ deleted và rejected
            query["status"] = {"$nin": ["deleted", "rejected"]}
        else:
            query["status"] = status
        
        # User thường chỉ thấy designs mình tạo hoặc được assign
        query["$or"] = [
            {"designer_id": user_id},
            {"order_by_user_id": user_id}
        ]
        query["team_id"] = user.get("team_id")
            
        designs = db['designs'].find(query).skip(skip).limit(per_page)
        
        # Tính total count với cùng query
        total = db.designs.count_documents(query)
        
        result = []
        for design in designs:
            design_dict = model_to_dict(design)
            # Lấy thông tin người tạo từ collection users
            creator = db['users'].find_one({"_id": ObjectId(design.get('order_by_user_id'))})
            if creator:
                design_dict['created_by_user_name'] = creator.get('name', creator.get('username', 'Unknown'))
            else:
                design_dict['created_by_user_name'] = 'Unknown'
            
            # Lấy thông tin designer
            if design.get('designer_id'):
                designer = db['users'].find_one({"_id": ObjectId(design.get('designer_id'))})
                design_dict['designer_name'] = designer.get('name', designer.get('username', 'Unknown')) if designer != None else 'Unknown'
            else:
                design_dict['designer_name'] = 'Unknown'
                
            result.append(design_dict)
            
        return jsonify({
            "success": True,
            "data": result,
            "total": total,
            "status": status,
            "query": query['status'],
            'message': 'User designs fetched successfully'
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e),
        }), 500

@design_bp.route("/<id>", methods=["DELETE"])
def delete_design(id):
    try:
        db = connect_database()
        result = db.designs.update_one(
            {"_id": ObjectId(id)},
            {"$set": {"status": "deleted"}}
        )
        return jsonify({
            "success": True,
            "message": "Design deleted successfully"
        }), 200
    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500

@design_bp.route("/<id>/submit/chunk", methods=["PUT"])
def submit_design_chunk(id):
    if 'chunk' not in request.files:
        return jsonify({"success": False, "message": "No chunk file provided"}), 400

    chunk = request.files['chunk']
    chunk_index = int(request.form.get('chunkIndex', 0))
    total_chunks = int(request.form.get('totalChunks', 1))
    file_id = request.form.get('fileId')
    file_name = secure_filename(request.form.get('fileName', ''))
    file_type = request.form.get('fileType', '')

    if not all([file_id, file_name, file_type]):
        return jsonify({"success": False, "message": "Missing required file information"}), 400

    # Create temporary directory for this file's chunks
    temp_dir = os.path.join(CHUNK_FOLDER, file_id)
    os.makedirs(temp_dir, exist_ok=True)

    # Save chunk
    chunk_path = os.path.join(temp_dir, f'chunk_{chunk_index}')
    chunk.save(chunk_path)

    # If this is the last chunk, combine all chunks and upload to S3
    if chunk_index == total_chunks - 1:
        final_path = os.path.join(UPLOAD_FOLDER, f"{file_id}_{file_name}")
        with open(final_path, 'wb') as outfile:
            for i in range(total_chunks):
                chunk_path = os.path.join(temp_dir, f'chunk_{i}')
                with open(chunk_path, 'rb') as infile:
                    outfile.write(infile.read())

        # Clean up temporary chunks
        shutil.rmtree(temp_dir)

        # Upload to S3
        s3_path = f"designs/{id}/{file_id}_{id}_{chunk_index}"
        with open(final_path, 'rb') as file:
            file_url = aws.upload_file(file, s3_path, file_type)

        # Clean up local file
        os.remove(final_path)

        # Update database with file information
        db = connect_database()
        update_data = {}
        
        if file_id == 'png_file':
            update_data['designer_result.png'] = file_url            
        elif file_id.startswith('product_banner_'):
            # Extract product type ID and index from file_id
            parts = file_id.split('_')
            if len(parts) >= 3:
                product_type_id = parts[2]  # Lấy phần tử thứ 3
                index = parts[-1]  # Lấy phần tử cuối cùng
                
                # Chỉ reset toàn bộ banners của product type này khi upload ảnh đầu tiên
                if index == "0" or index == 0:
                    db.designs.update_one(
                        {"_id": ObjectId(id)},
                        {"$unset": {f"designer_result.product_banners.{product_type_id}": ""}}
                    )
                # Thêm banner mới
                update_data[f'designer_result.product_banners.{product_type_id}.{index}'] = file_url
            else:
                return jsonify({"success": False, "message": "Invalid file_id format for product banner"}), 400

        if update_data:
            if(file_id == 'png_file'):
                design = db.designs.find_one({"_id": ObjectId(id)})
                db.product_ideals.update_one(
                    {"_id": ObjectId(design.get("product_ideal_id").get("_id"))},
                    {"$set": {"png": file_url}}
                )
            db.designs.update_one(
                {"_id": ObjectId(id)},
                {"$set": update_data}
            )
        return jsonify({"success": True, "message": "Chunk uploaded successfully", "data": update_data})
    else:
        # Return success for intermediate chunks
        return jsonify({"success": True, "message": f"Chunk {chunk_index + 1}/{total_chunks} uploaded successfully"})


@design_bp.route("/file/download-extension", methods=["GET"])
def download_extension():
    return send_file(os.path.join(UPLOAD_FOLDER, "crawl_ideal_v3_1.zip"), as_attachment=True)


@design_bp.route("/<id>/submit/finalize", methods=["PUT"])
def submit_design_finalize(id):
    try:
        db = connect_database()
        update_data = {
            "status": "completed"
        }

        # Add note if provided
        if 'note' in request.form:
            update_data['designer_result.note'] = request.form['note']

        # Add other result if provided
        if 'other_result' in request.form:
            update_data['designer_result.other_result'] = request.form['other_result']

        if 'image' in request.form:
            update_data['designer_result.png'] = request.form['image']

        result = db.designs.update_one(
            {"_id": ObjectId(id)},
            {"$set": update_data}
        )

        if result.modified_count > 0:
            return jsonify({"success": True, "message": "Design submitted successfully"})
        else:
            return jsonify({"success": False, "message": "No changes to update"}), 200

    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500


@design_bp.route("/<id>/assign", methods=["PUT"])
def assign_design(id):
    try:
        db = connect_database()
        designer_id = get_jwt_identity()
        status = request.json.get('status')
        design = db.designs.find_one({"_id": ObjectId(id)})
        if not design:
            return jsonify({"success": False, "message": "Design not found"}), 404
            
        # Kiểm tra xem design đã được assign cho designer khác chưa
        if design.get('designer_id') and design.get('designer_id') != designer_id:
            return jsonify({
                "success": False, 
                "message": "Design đã được assign cho designer khác"
            }), 400
        if not designer_id or not status:
            return jsonify({"success": False, "message": "Missing designer_id or status"}), 400

        result = db.designs.update_one(
            {"_id": ObjectId(id)},
            {"$set": {"designer_id": designer_id, "status": status}}
        )

        if result.modified_count > 0:
            return jsonify({"success": True, "message": "Design assigned successfully"}), 200
        else:
            return jsonify({"success": False, "message": "Failed to assign design"}), 400
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500


@design_bp.route("/<id>/show", methods=["GET"])
def show_design(id):
    try:
        db = connect_database()
        design = db.designs.find_one({"_id": ObjectId(id)})
        created_by_user = db.users.find_one({"_id": ObjectId(design.get('order_by_user_id'))})
        design = model_to_dict(design)
        design['created_by_user_name'] = created_by_user.get('name', created_by_user.get('username', 'Unknown'))
        design['created_by'] = model_to_dict(created_by_user)
        return jsonify({"success": True, "data": design}), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

@design_bp.route("/<id>/update", methods=["PUT"])
def update_design_status(id):
    """Update design status or other fields"""
    try:
        db = connect_database()
        user_id = get_jwt_identity()
        data = request.get_json()
        
        # Validate design exists
        design = db.designs.find_one({"_id": ObjectId(id)})
        if not design:
            return jsonify({"success": False, "message": "Design not found"}), 404
        
        # Check permissions - user must be the creator, assigned designer, or admin/manager
        user = db.users.find_one({"_id": ObjectId(user_id)})
        can_update = (
            design.get('order_by_user_id') == user_id or  # Creator
            design.get('designer_id') == user_id or       # Assigned designer
            user.get('role') in ['admin', 'manager']      # Admin/Manager
        )
        
        if not can_update:
            return jsonify({
                "success": False, 
                "message": "You don't have permission to update this design"
            }), 403
        
        # Prepare update data
        update_data = {}
        
        # Handle status update
        if 'status' in data:
            new_status = data['status']
            valid_statuses = ['new', 'processing', 'submitted', 'completed', 'rejected', 'deleted']
            
            if new_status not in valid_statuses:
                return jsonify({
                    "success": False,
                    "message": f"Invalid status. Valid statuses: {', '.join(valid_statuses)}"
                }), 400
            
            update_data['status'] = new_status
        
        # Handle other fields
        if 'seller_note' in data:
            update_data['seller_note'] = data['seller_note']
        
        if 'designer_id' in data:
            update_data['designer_id'] = data['designer_id']
        
        # Add updated timestamp
        update_data['updated_at'] = int(time.time())
        
        # Update design
        result = db.designs.update_one(
            {"_id": ObjectId(id)},
            {"$set": update_data}
        )
        
        if result.modified_count > 0:
            return jsonify({
                "success": True,
                "message": "Design updated successfully",
                "data": update_data
            }), 200
        else:
            return jsonify({
                "success": False,
                "message": "No changes made"
            }), 200
            
    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500

@design_bp.route("/pending-approval", methods=["GET"])
def get_pending_approval_designs():
    try:
        db = connect_database()
        user_id = get_jwt_identity()
        user = db['users'].find_one({"_id": ObjectId(user_id)})
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 25))
        skip = (page - 1) * per_page

        query = {
            "status": "pending approval",
            "team_id": user.get("team_id")
        }
        designs = db['designs'].find(query).skip(skip).limit(per_page)
        total = db['designs'].count_documents(query)
        result = []
        for design in designs:
            design_dict = model_to_dict(design)
            creator = db['users'].find_one({"_id": ObjectId(design.get('order_by_user_id'))})
            print(creator)
            if creator:
                design_dict['created_by_user_name'] = creator.get('username', 'Unknown')
            else:
                design_dict['created_by_user_name'] = 'Unknown'
            design_dict['designer_name'] = ''
            result.append(design_dict)
        return jsonify({
            "success": True,
            "data": result,
            "total": total,
            "message": "Pending approval designs fetched successfully"
        }), 200
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e),
        }), 500

@design_bp.route("/status-counts", methods=["GET"])
def get_design_status_counts():
    """API lấy thống kê số lượng designs theo status"""
    try:
        db = connect_database()
        user_id = get_jwt_identity()
        user = db['users'].find_one({"_id": ObjectId(user_id)})
        
        # Base query theo role
        if user.get("role") == "manager" or user.get("role") == "admin":
            # Admin/Manager thấy tất cả designs của team
            base_query = {"team_id": user.get("team_id")}
        else:
            # User thường chỉ thấy designs mình tạo hoặc được assign
            base_query = {
                "$or": [
                    {"designer_id": user_id},
                    {"order_by_user_id": user_id}
                ],
                "team_id": user.get("team_id")
            }
        
        # Pipeline để đếm theo status
        pipeline = [
            {"$match": base_query},
            {
                "$group": {
                    "_id": "$status",
                    "count": {"$sum": 1}
                }
            }
        ]
        
        result = list(db.designs.aggregate(pipeline))
        
        # Chuyển đổi kết quả thành object
        status_counts = {
            "all": 0,
            "new": 0,
            "processing": 0,
            "submitted": 0,
            "completed": 0,
            "rejected": 0,
            "deleted": 0
        }
        
        for item in result:
            status = item["_id"] if item["_id"] else "new"
            status_counts[status] = item["count"]
            status_counts["all"] += item["count"]
        
        return jsonify({
            "success": True,
            "data": status_counts,
            "message": "Status counts fetched successfully"
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e),
        }), 500