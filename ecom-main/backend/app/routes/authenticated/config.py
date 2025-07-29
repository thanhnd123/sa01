from typing import List
from pydantic import BaseModel, Field
from datetime import datetime
from bson import ObjectId
from database.connect_database import connect_database
from flask import jsonify
from flask_jwt_extended import get_jwt_identity
from flask import Blueprint, request
from app.services.helpers import model_to_dict
from werkzeug.exceptions import HTTPException, NotFound, BadRequest
import json
import os
from werkzeug.utils import secure_filename

config_bp = Blueprint('config', __name__)


@config_bp.route("/ai-configs", methods=["GET"])
def get_ai_configs():
    """
    Get all AI configs for the current user
    """
    try:
        db = connect_database()
        user_id = get_jwt_identity()
        configs = db.configs.find(
            {"type": "ai-listing", "user_id": user_id}
        )
        result = []
        for config in configs:
            result.append(model_to_dict(config))
        return jsonify({
            "success": True,
            "message": "AI configs fetched successfully",
            "data": result
        })
    except Exception as e:
        print(e)
        return jsonify({
            "success": False,
            "message": "Failed to fetch AI configs",
            "error": str(e)
        }), 500


@config_bp.route("/ai-configs", methods=["POST"])
def store_ai_config():
    """
    Create a new AI config
    """
    try:
        # Check if name already exists for this user
        db = connect_database()
        data = request.get_json()
        user_id = get_jwt_identity()
        existing = db.configs.find_one({
            "user_id": user_id,
            "name": data["name"],
            "type": "ai-listing"
        })
        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Configuration name already exists"
            )

        now = datetime.utcnow()
        config_data = {
            "type": "ai-listing",
            "name": data["name"],
            "base_description": data["base_description"],
            "user_id": user_id,
            "created_at": now,
            "updated_at": now
        }
        
        result = db.configs.insert_one(config_data)
        config_data["_id"] = result.inserted_id
        config_result = model_to_dict(config_data)
        return jsonify({
            "success": True,
            "message": "AI config created successfully",            
            "data": config_result
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "message": "Failed to create AI config",
            "error": str(e)
        })


@config_bp.route("/ai-configs/<config_id>", methods=["PUT"])
def update_ai_config(config_id):
    """
    Update an existing AI config
    """ 
    try:
        db = connect_database()
        data = request.get_json()
        user_id = get_jwt_identity()
        config = db.configs.find_one({
            "user_id": user_id,
            "type": "ai-listing",
            "_id": ObjectId(config_id)
        })
        if not config:
            raise NotFound("Configuration not found")

        config["name"] = data["name"]
        config["base_description"] = data["base_description"]
        config["updated_at"] = datetime.utcnow()  

        db.configs.update_one(
            {"_id": config["_id"]},
            {"$set": config}
        )

        return jsonify({
            "success": True,
            "message": "AI config updated successfully",
            "data": model_to_dict(config)
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "message": "Failed to update AI config",
            "error": str(e)
        }), 500


@config_bp.route("/ai-configs/<config_id>", methods=["DELETE"])
def delete_ai_config(config_id):
    """
    Delete an existing AI config
    """
    try:    
        db = connect_database()
        user_id = get_jwt_identity()
        config = db.configs.find_one({
            "user_id": user_id,
            "type": "ai-listing",
            "_id": ObjectId(config_id)
        })
        if not config:
            raise NotFound("Configuration not found")
            
        db.configs.delete_one({"_id": config["_id"]})

        return jsonify({
            "success": True,
            "message": "AI config deleted successfully"
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': 'Failed to delete AI config',
            'error': str(e)
        }), 500



@config_bp.route("/listing-templates", methods=["GET"])
def get_listing_templates():
    """
    Get all listing templates for the current user
    """
    try:
        db = connect_database()
        user_id = get_jwt_identity()
        
        # Lấy tham số phân trang từ request
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 25))
        search = request.args.get('search', '')
        skip = (page - 1) * limit
        
        # Đếm tổng số templates
        total = db.configs.count_documents({
            "user_id": user_id,
            "type": "listing-template",
            "$or": [
                {"name": {"$regex": search, "$options": "i"}},
                {"description": {"$regex": search, "$options": "i"}},
                {"market": {"$regex": search, "$options": "i"}},
                {"product_type": {"$regex": search, "$options": "i"}}
            ]
        })
        
        # Lấy templates với phân trang
        templates = db.configs.find({
            "user_id": user_id,
            "type": "listing-template",
            "$or": [
                {"name": {"$regex": search, "$options": "i"}},
                {"description": {"$regex": search, "$options": "i"}},
                {"market": {"$regex": search, "$options": "i"}},
                {"product_type": {"$regex": search, "$options": "i"}}
            ]
        }, {"columns": 0}).skip(skip).limit(limit)
        product_types = db.product_types.find({})
        product_types_dict = {str(product_type['_id']): product_type['name'] for product_type in product_types}
        result = []
        for template in templates:
            if(template['product_type']):
                template['product_type_name'] = product_types_dict[str(template['product_type'])]
            else:
                template['product_type_name'] = ''
            result.append(model_to_dict(template))
            
        return jsonify({
            "success": True,
            "message": "Listing templates fetched successfully",
            "data": {
                "templates": result,
                "pagination": {
                    "page": page,
                    "limit": limit,
                    "total": total,
                    "total_pages": (total + limit - 1) // limit
                }
            }
        })
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({
            "success": False,
            "message": "Failed to fetch listing templates " + str(e),
            "error": str(e)
        }), 500


@config_bp.route("/listing-templates/<template_id>", methods=["GET"])
def get_listing_template(template_id):
    try:
        db = connect_database()
        template = db.configs.find_one({
            "_id": ObjectId(template_id)
        })
        return jsonify({
            "success": True,
            "message": "Listing template fetched successfully",
            "data": model_to_dict(template)
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "message": "Failed to fetch listing template",
            "error": str(e)
        }), 500


@config_bp.route("/listing-templates/get-by-product-type", methods=["GET"])
def get_listing_templates_by_product_type():
    """
    Get listing templates by product type
    """
    try:
        db = connect_database()
        product_type_id = request.args.get('product_type_id')
        user_id = get_jwt_identity()
        templates = db.configs.find({
            "user_id": user_id,
            "type": "listing-template",
            "product_type": product_type_id
        })
        result = []
        for template in templates:
            result.append(model_to_dict(template))
        return jsonify({
            "success": True,
            "message": "Listing templates fetched successfully",
            "data": result
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "message": "Failed to fetch listing templates",
            "error": str(e)
        }), 500


@config_bp.route("/listing-templates/store", methods=["POST"])
def store_listing_template():
    try:
        # Get form data
        name = request.form.get('name')
        description = request.form.get('description')
        status = request.form.get('status')
        platform = request.form.get('platform')
        product_type = request.form.get('product_type')
        listing_type = request.form.get('listing_type')
        # Get template file if exists
        template_file = request.files.get('template_file')
        file_path = None
        if template_file:
            # Create upload directory if not exists
            upload_dir = 'uploads/config/listing/templates'
            os.makedirs(upload_dir, exist_ok=True)
            
            # Generate unique filename
            timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
            original_filename = secure_filename(template_file.filename)
            file_extension = os.path.splitext(original_filename)[1]
            new_filename = f"{timestamp}_{original_filename}"
            file_path = os.path.join(upload_dir, new_filename)
            
            # Save file
            template_file.save(file_path)
        
        # Get columns data
        columns_data = request.form.get('columns')
        columns = json.loads(columns_data) if columns_data else []
        variant_config = {}
        if listing_type == 'variant' or listing_type == 'grouped':
            variant_config = transform_columns(columns)

        db = connect_database()
        user_id = get_jwt_identity()
        user = db.users.find_one({"_id": ObjectId(user_id)})
        team_id = user["team_id"]
        
        # Create template
        template = {
            "type": "listing-template",
            'name': name,
            'user_id': user_id,
            'team_id': team_id,
            'description': description,
            'status': status,
            'platform': platform,
            'product_type': product_type,
            'columns': columns,
            "listing_type": listing_type,
            'variant_config': variant_config,
            'file_name': template_file.filename if template_file else None,
            'file_path': file_path,
            'created_at': datetime.utcnow(),
            'updated_at': datetime.utcnow()
        }
        
        # Save to database
        result = db.configs.insert_one(template)
        inserted_id = str(result.inserted_id)
        return jsonify({
            'success': True,
            'message': 'Template created successfully',
            'data': {
                'id': inserted_id
            }
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': 'Failed to create template',
            'error': str(e)
        }), 500


def transform_columns(columns):
    """
    Chuyển đổi cấu trúc dữ liệu từ mảng columns thành object parent và childs
    
    Args:
        columns (list): Danh sách các cột với format:
            [
                {
                    "name": "parent.feed_product_type",
                    "type": "parent",
                    "required": true,
                    "description": "Feed Product Type",
                    "defaultValue": "Feed Product Type"
                },
                {
                    "name": "child[1-5].bullet_point_1",
                    "type": "child",
                    "required": true,
                    "description": "Product Title",
                    "defaultValue": "Product Title"
                }
            ]
    
    Returns:
        dict: Object với cấu trúc:
            {
                "parent": [list các cột parent],
                "childs": {
                    "child1": [list các cột child 1],
                    "child2": [list các cột child 2],
                    ...
                }
            }
    """
    result = {
        "parent": [],
        "childs": {}
    }
    
    # Tách các cột parent và child
    for column in columns:
        if column["type"] == "parent":
            # Thêm vào mảng parent
            result["parent"].append(column)
        elif column["type"] == "child":
            # Lấy số thứ tự của child từ tên cột
            # Ví dụ: child[1].bullet_point_1 -> 1
            child_number = column["name"].split("[")[1].split("]")[0]
            child_key = f"child{child_number}"
            
            # Khởi tạo mảng cho child nếu chưa có
            if child_key not in result["childs"]:
                result["childs"][child_key] = []
                
            # Thêm cột vào mảng tương ứng
            result["childs"][child_key].append(column)
    
    return result


@config_bp.route("/listing-templates/<template_id>", methods=["PUT"])
def update_listing_template(template_id):
    """
    Update a listing template by ID
    """
    try:
        name = request.form.get('name')
        description = request.form.get('description')
        status = request.form.get('status')
        platform = request.form.get('platform')
        product_type = request.form.get('product_type')
        template_file = request.files.get('template_file')
        file_path = None

        if template_file:
            # Create upload directory if not exists
            upload_dir = 'uploads/config/listing/templates'
            os.makedirs(upload_dir, exist_ok=True)
            
            # Generate unique filename
            timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
            original_filename = secure_filename(template_file.filename)
            file_extension = os.path.splitext(original_filename)[1]
            new_filename = f"{timestamp}_{original_filename}"
            file_path = os.path.join(upload_dir, new_filename)
            
            # Save file
            template_file.save(file_path)

        # Get columns data
        columns_data = request.form.get('columns')
        columns = json.loads(columns_data) if columns_data else []

        db = connect_database()
        user_id = get_jwt_identity()
        user = db.users.find_one({"_id": ObjectId(user_id)})
        team_id = user["team_id"] if user else None
        listing_type = request.form.get('listing_type')
        variant_config = {}
        if listing_type == 'variant' or listing_type == 'grouped':
            variant_config = transform_columns(columns)
        # Update template
        template = {
            "type": "listing-template",
            'user_id': user_id,
            'team_id': team_id,
            'name': name,
            'description': description,
            'status': status,
            'platform': platform,
            'product_type': product_type,
            'columns': columns,
            'listing_type': listing_type,
            'variant_config': variant_config,
            'file_name': template_file.filename if template_file else None,
            'file_path': file_path,
            'updated_at': datetime.utcnow()
        }

        # Update in database
        result = db.configs.update_one(
            {"_id": ObjectId(template_id)},
            {"$set": template}
        )

        if result.modified_count == 0:
            raise NotFound("Template not found")

        return jsonify({
            'success': True,
            'message': 'Template updated successfully',
            'data': model_to_dict(template)
        })
    except Exception as e:
        print('Error updating template:', str(e))
        return jsonify({
            'success': False,
            'message': 'Failed to update template',
            'error': str(e)
        }), 500


@config_bp.route("/listing-templates/<template_id>", methods=["DELETE"])
def delete_listing_template(template_id):
    """
    Delete a listing template by ID
    """
    try:
        db = connect_database()
        user_id = get_jwt_identity()
        template = db.configs.find_one({
            "user_id": user_id, 
            "_id": ObjectId(template_id)
        })
        if not template:
            raise NotFound("Template not found")
            
        db.configs.delete_one({"_id": template["_id"]})
            
        return jsonify({
            "success": True,
            "message": "Template deleted successfully"
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "message": "Failed to delete template",
            "error": str(e)
        }), 500