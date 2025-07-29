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

events_bp = Blueprint('events', __name__)
mongo = connect_database()

@events_bp.route('/list', methods=['GET'])
def list():
    try:
        limit = request.args.get('limit', default=None)
        if limit is None:
            limit = 50
        
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
        table = connect_database()['events']
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


@events_bp.route('/all', methods=['GET'])
def all():
    try:
        search = request.args.get('search', "").strip()
        
        mongo_query = {
            'status': {'$ne': 'deleted'}
        }
        
        if search:
            mongo_query['title'] = {"$regex": search.lower(), "$options": "i"}
            
        table = connect_database()['events']
        cursor = table.find(mongo_query)
        results = [doc for doc in cursor]
        
        # Convert ObjectId to string
        data = []
        for item in results:
            data.append(model_to_dict(item))
            
        return jsonify(data)
    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500


@events_bp.route('/show/<id>', methods=['GET'])
def show(id):
    try:
        event = mongo['events'].find_one({'_id': ObjectId(id)})
        if not event:
            return jsonify({
                "error": "Event not found"
            }), 404
        return jsonify({
            "result": model_to_dict(event)
        })
    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500

@events_bp.route('/store', methods=['POST'])
def store():
    try:
        data = request.form.to_dict()
        required_fields = ['title']
        
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({
                    "error": f"Missing required field: {field}"
                }), 400
                
        data['status'] = 'active'
        data['user_id'] = get_jwt_identity()
        data['created_at'] = datetime.utcnow()
        data['updated_at'] = datetime.utcnow()
        
        # Set default values for optional fields if not provided
        if 'description' not in data:
            data['description'] = ''
        if 'start_time' not in data:
            data['start_time'] = None
        if 'end_time' not in data:
            data['end_time'] = None
        
        # Kiểm tra trùng tên event
        existing_event = mongo['events'].find_one({
            'title': data['title'],
            'status': {'$ne': 'deleted'}
        })
        
        if existing_event:
            return jsonify({
                "error": "Event title already exists"
            }), 400
            
        event = create(data, 'events')
        return jsonify({
            "message": "Event created successfully",
            "result": model_to_dict(event)
        }), 201
        
    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500

@events_bp.route('/<id>', methods=['PUT'])
def update_event(id):
    try:
        data = request.form.to_dict()
        event = mongo['events'].find_one({'_id': ObjectId(id)})
        if not event:
            return jsonify({
                "error": "Event not found"
            }), 404
            
        # Kiểm tra quyền cập nhật
        if str(event['user_id']) != str(get_jwt_identity()):
            return jsonify({
                "error": "You don't have permission to update this event"
            }), 403
            
        data['updated_at'] = datetime.utcnow()
        mongo['events'].update_one({'_id': ObjectId(id)}, {'$set': data})
        
        updated_event = mongo['events'].find_one({'_id': ObjectId(id)})
        return jsonify({
            "message": "Event updated successfully",
            "result": model_to_dict(updated_event)
        })
    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500

@events_bp.route('/destroy/<id>', methods=['DELETE'])
def delete(id):
    try:
        event = mongo['events'].find_one({'_id': ObjectId(id)})
        if not event:
            return jsonify({
                "error": "Event not found"
            }), 404
            
        # Kiểm tra quyền xóa
        if str(event['user_id']) != str(get_jwt_identity()):
            return jsonify({
                "error": "You don't have permission to delete this event"
            }), 403
            
        result = update('events', {"status": 'deleted'}, None, id)
        return jsonify({
            "message": "Event deleted successfully",
            "result": model_to_dict(result)
        })
    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500
