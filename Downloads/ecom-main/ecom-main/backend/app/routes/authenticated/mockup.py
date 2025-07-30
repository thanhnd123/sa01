from flask import Blueprint, request, jsonify
from database.connect_database import connect_database
from app.modules.teamexp.model import find, create, update, delete, all, paginate, getDataJson, pluck, truncate
from datetime import datetime
import uuid
from app.services.helpers import to_slug
from werkzeug.utils import secure_filename
from app.services.aws_service import aws
from flask_jwt_extended import get_jwt_identity
from bson import ObjectId
from app.services.helpers import model_to_dict
mockup_bp = Blueprint('mockup', __name__)
mongo = connect_database()

@mockup_bp.route('/list', methods = ['GET'])
def list():
    try:
        limit = request.args.get('limit', default=None)
        if limit is None:
            limit = 50;
        
        query = None
        sort = None
        page = request.args.get('page', default=1)
        search = request.args.get('search', "").strip()
        sort = request.args.get('sort', '').strip()
        sortBy = request.args.get('sort-by', '').strip()
        userId = get_jwt_identity()
        user = find(userId, 'users', 'user_id')
        query = {}
        if search:
            query = {
                "query": "title",
                "value": search.lower(),
            }
        if sort and sortBy:
            sort = {
                "query": sort,
                "value": sortBy
            }
        table = connect_database()['mockups']
        skip = (int(page) - 1) * int(limit)
        
        # Build query
        mongo_query = {}
        if query:
            mongo_query[query['query']] = {"$regex": query['value'].lower(), "$options": "i"}
        if user and 'team_id' in user:
            mongo_query['team_ids'] = str(user['team_id'])
            
        # Build sort
        mongo_sort = [('_id', 1)]  # Default sort by _id
        if sort and sortBy:
            mongo_sort = [(sort['query'], 1 if sort['value'] == 'asc' else -1)]
            
        # Get total count
        total = table.count_documents(mongo_query)
        
        # Get paginated results
        mongo_query['status'] = {"$ne": "deleted"}
        cursor = table.find(mongo_query).sort(mongo_sort).skip(skip).limit(int(limit))
        results = [doc for doc in cursor]
        
        # Convert ObjectId to string
        data = []
        for item in results:
            item['product_type_name'] = mongo['product_types'].find_one({'_id': ObjectId(item['product_type'])})['name']
            data.append(model_to_dict(item))
        result = {
            'data': data,
            'total': total,
            'page': int(page),
            'limit': int(limit),
            'total_pages': (total + int(limit) - 1) // int(limit)
        }
        return jsonify(result)
    except Exception as e:
        return jsonify({
            "error": str(e),
            'line': e.__traceback__.tb_lineno
        }), 500


@mockup_bp.route('/show/<id>', methods = ['GET'])
def show(id):
    try:
        data = request.get_json()
        mockup = mongo.find('mockups', data)
        return jsonify({
            "result": mockup
        })
    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500 
    

@mockup_bp.route('/store', methods=['POST'])
def store():
    try:
        data = request.form.to_dict()
        required_fields = ['name', 'product_type']
        # print(required_fields)
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({
                    "error": f"Missing required field: {field}"
                }), 400
        data['status'] = 'active'
        data['team_id'] = 0
        data['user_id'] = get_jwt_identity()
        product_type_ett = mongo['product_types'].find_one({'name': data['product_type']})
        if(product_type_ett):
            data['product_type'] = product_type_ett['_id']
        else:
            return jsonify({
                "error": "Product type not found"
            }), 400
        images = request.files.getlist('images')
        # Upload images to AWS and get URLs
        image_urls = []
        current_date = datetime.now().strftime('%Y-%m-%d')
        for image in images:
            if image:
                # Generate unique filename with date format
                mockup_folder_name = to_slug(data['name'].strip().replace(' ', '-'))
                filename = f"mockups/{current_date}/{mockup_folder_name}/{uuid.uuid4()}-{secure_filename(image.filename)}"
                content_type = image.content_type
                image_url = aws.upload_file(image, filename, content_type)
                image_urls.append(image_url)
        # Add image URLs to data
        data['images'] = image_urls
        events = request.form.getlist('events')
        if len(events) > 0:
            data['events'] = events
        # Kiểm tra trùng tên mockup
        existing_mockup = mongo['mockups'].find_one({
            'name': data['name'],
            'status': {'$ne': 'deleted'}
        })
        
        if existing_mockup:
            return jsonify({
                "error": "Mockup name already exists"
            }), 400
        mockup = create(data, 'mockups')
        return jsonify({
            "message": "Mockup created successfully"
        }), 201
        
    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500

@mockup_bp.route('/list-all', methods=['GET'])
def list_all(Req):
    try:
        mockups = mongo.mockups.find_one({'_id': ObjectId(id)})
        data = model_to_dict(mockups)
        return jsonify({
            "result": data
        })
    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500


@mockup_bp.route('/<id>', methods = ['PUT'])
def item_update(id):
    try:
        data = request.form.to_dict()
        print(data)
        mockup = mongo.mockups.find_one({'_id': ObjectId(id)})
        if not mockup:
            return jsonify({
                "error": "Mockup not found"
            }), 404
        images = request.files.getlist('images')
        # Upload images to AWS and get URLs
        image_urls = []
        current_date = datetime.now().strftime('%Y-%m-%d')
        for image in images:
            if image:
                # Generate unique filename with date format
                mockup_folder_name = to_slug(data['name'].strip().replace(' ', '-'))
                filename = f"mockups/{current_date}/{mockup_folder_name}/{uuid.uuid4()}-{secure_filename(image.filename)}"
                content_type = image.content_type
                image_url = aws.upload_file(image, filename, content_type)
                image_urls.append(image_url)
        
        # Add image URLs to data
        if len(image_urls) > 0:
            data['images'] = image_urls
        else:
            data['images'] = mockup['images']
        events = request.form.getlist('events')
        if len(events) > 0:
            data['events'] = events
        mongo.mockups.update_one({'_id': ObjectId(id)}, {'$set': data})
        return jsonify({
            "result": model_to_dict(mockup)
        })
    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500


@mockup_bp.route('/destroy/<id>', methods = ['DELETE'])
def delete(id):
    try:
        mockup = update('mockups', {"status": 'deleted'}, None, id)
        return jsonify({
            "result": model_to_dict(mockup)
        })
    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500

@mockup_bp.route('/<product_type_name>/list', methods=['GET'])
def list_by_product_type(product_type_name):
    try:
        # Bước 1: Tìm ObjectId từ tên product_type
        product_type_obj = mongo['product_types'].find_one({"$or": [
            {"name": {"$regex": product_type_name, "$options": "i"}},
            {"_id": product_type_name}  # Kiểm tra nếu product_type_name là ObjectId
        ]})

        if not product_type_obj:
            return jsonify({"result": [], "message": "Product type not found"}), 404
        
        product_type_id = product_type_obj['_id']

        # Bước 2: Sử dụng ObjectId để tìm kiếm trong bảng mockups
        queryFilter = {
            "product_type": product_type_id,
            "status": {"$ne": "deleted"}
        }        
        table = connect_database()['mockups']
        items = table.find(queryFilter)
        data = []
        
        for item in items:
            item['_id'] = str(item['_id'])  # Chuyển đổi ObjectId thành chuỗi
            item['product_type'] = str(item['product_type'])  # Chuyển đổi product_type thành chuỗi nếu cần
            data.append(item)  
        
        return jsonify({"result": data}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@mockup_bp.route('/product-type/<product_type>', methods=['GET'])
def getMockupByProductType(product_type):
    try:
        userId = get_jwt_identity()
        user = find(userId, 'users', 'user_id')
        
        # Build query
        mongo_query = {
            "product_type": product_type,
            "status": {"$ne": "deleted"}
        }
        
        # if user and 'team_id' in user:
        #     mongo_query['team_ids'] = str(user['team_id'])
            
        table = connect_database()['mockups']
        print(mongo_query)
        cursor = table.find(mongo_query)
        results = [doc for doc in cursor]
        
        # Convert ObjectId to string
        for item in results:
            user = mongo['users'].find_one({'_id': ObjectId(item['user_id'])})
            item['_id'] = str(item['_id'])
            item['user_id'] = str(item['user_id'])
            item['team_id'] = str(item['team_id'])
            product_type = mongo['product_types'].find_one({'_id': ObjectId(item['product_type'])})
            item['product_type'] = product_type['name']
            item['created_by'] = user.get('name', user.get('username', ''))
            
        return jsonify({
            "data": results,
        }), 200
        
    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500
    

