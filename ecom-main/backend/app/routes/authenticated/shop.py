from flask import Blueprint, request, jsonify
from app.modules.teamexp.model import find, create, update, delete, all, paginate, getDataJson, pluck, truncate
from flask_jwt_extended import get_jwt_identity
from database.connect_database import connect_database
from bson.objectid import ObjectId
import math
from app.services.helpers import model_to_dict
shop_bp = Blueprint('shops', __name__)


@shop_bp.route('/shops/list', methods=['GET'])
def list():
    # try:
    db = connect_database()
    limit = request.args.get('limit', default=50)
    page = request.args.get('page', default=1, type=int)
    search = request.args.get('search', default=None, type=str)
    sort = request.args.get('sort', default=None, type=str)
    sort_by = request.args.get('sort-by', default='created_at', type=str)
    user_id = get_jwt_identity()
    sellerId = request.args.get('seller', default=None)
    user = db.users.find_one({'_id': ObjectId(user_id)})

    # Build filter
    if user['role'] == 'manager' or user['role'] == 'admin':
        filter_query = {'team_id': user['team_id']}
    else:
        filter_query = {'seller_id': user_id}

    if search:
        filter_query['$or'] = [
            {'name': {'$regex': search, '$options': 'i'}},
            {'email': {'$regex': search, '$options': 'i'}}
        ]

    # Build sort
    sort_list = []
    if sort and sort_by:
        sort_direction = 1 if sort_by.lower() == 'asc' else -1
        sort_list.append((sort, sort_direction))
    else:
        sort_list.append(('created_at', -1))

    # Pagination
    skip = (page - 1) * int(limit)

    # Query MongoDB
    collection = db['shops']
    total = collection.count_documents(filter_query)
    data_cursor = collection.find(filter_query).sort(sort_list).skip(skip).limit(int(limit))
    data = []
    team = db.teams.find_one({'_id': ObjectId(user['team_id'])})
    for item in data_cursor:
        item['_id'] = str(item['_id'])
        if 'user_id' in item:
            item['user_id'] = str(item['user_id'])
        if 'seller_id' in item:
            item['seller_id'] = str(item['seller_id'])
            seller = db.users.find_one({'_id': ObjectId(item['seller_id'])}) or {}
            item['seller_name'] = seller.get('username', 'Unknown Seller')
        if 'team_id' in item:
            item['team_id'] = str(item['team_id'])
            item['team_name'] = team['name']
        data.append(item)

    result = {
        'data': data,
        'total': total,
        'current_page': page,
        'per_page': int(limit),
        'last_page': math.ceil(total / int(limit)) if int(limit) > 0 and total > 0 else 0
    }

    return jsonify({"result": result})

    # except Exception as exception:
    #     print(exception)
    #     result = f"Error when get paginate data in table shops: {exception}"
    #     return jsonify({
    #         "response": result,
    #         "line": exception.__traceback__.tb_lineno
    #     }), 500
        
@shop_bp.route('/shops/store', methods = ['POST'])
def store():
    try:
        db = connect_database()
        data = request.get_json()
        userId = data['user_id'] if 'user_id' in data else None
        updateCall = data['update'] if 'update' in data else None
        if userId is None:
            return jsonify({
                "result": 'Not found user! Please login with account has role management before processing!'
            })
        user_id = get_jwt_identity()
        if updateCall is not None:
            data.pop('update')
            dataUpdate = {
                'name': data['name'],
                'email': data['email'],
                'platform': data['platform'],
                'seller_id': data['seller_id'],
                'team_id': data['team_id']
            }
            processing = update('shops', dataUpdate, None, updateCall)
            return jsonify({
                "result": processing
            })
        data.pop('user_id')
        data['seller_id'] = str(user_id)
        user = db.users.find_one({'_id': ObjectId(user_id)})
        data['team_id'] = user['team_id']
        shop = create(data, 'shops')
        shop['_id'] = str(shop['_id'])
        shop['seller_id'] = str(shop['seller_id'])
        shop['team_id'] = str(shop['team_id'])
        
        return jsonify({
            "message": 'Create new shop success!',
            "data": shop
        })
    except Exception as exception:
        result = f"Error when create data in table shops: {exception}"
        return jsonify({
            "result": result,
            "line": exception.__traceback__.tb_lineno
        }), 500


@shop_bp.route('/shops/my', methods = ['GET'])
def my():
    try:
        db = connect_database()
        user_id = get_jwt_identity()
        result = db['shops'].find({'seller_id': user_id})
        _result = []
        for item in result:
            _result.append(model_to_dict(item))
        return jsonify({"data": _result, "success": True})
    except Exception as exception:
        result = f"Error when get paginate data in table shops: {exception}"
        return jsonify({
            "success": False,
            "message": result,
            "line": exception.__traceback__.tb_lineno
        }), 500


@shop_bp.route('/shops/delete/<shop_id>', methods=['DELETE'])
def delete_shop(shop_id):
    try:
        db = connect_database()
        db['shops'].delete_one({'_id': ObjectId(shop_id)})
        return jsonify({'success': True, 'message': 'Shop deleted successfully'})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500