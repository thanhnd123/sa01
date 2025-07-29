from flask import Blueprint, request, jsonify
from flask_jwt_extended import get_jwt_identity
from database.connect_database import connect_database
from bson.objectid import ObjectId
from app.services.helpers import model_to_dict
from datetime import datetime
import time

tags_bp = Blueprint('tags', __name__)

@tags_bp.route('/tags/suggestions', methods=['GET'])
def get_tag_suggestions():
    """Get tag suggestions based on search term"""
    try:
        search = request.args.get('search', '').strip()
        limit = request.args.get('limit', default=10, type=int)
        
        db = connect_database()
        userId = get_jwt_identity()
        user = db.users.find_one({"_id": ObjectId(userId)})
        
        # Build query for tags collection
        mongo_query = {}
        if user and 'team_id' in user:
            mongo_query['team_id'] = str(user['team_id'])
        
        if search:
            mongo_query['name'] = {"$regex": search.lower(), "$options": "i"}
        
        # Get tags from tags collection
        tags_collection = db['tags']
        cursor = tags_collection.find(mongo_query).sort([('usage_count', -1), ('name', 1)]).limit(limit)
        existing_tags = [doc['name'] for doc in cursor]
        
        # Also get tags from existing ideals for backward compatibility
        ideals_query = {}
        if user and 'team_id' in user:
            ideals_query['team_ids'] = {"$in": [str(user['team_id'])]}
        
        ideals = list(db['product_ideals'].find(ideals_query))
        all_tags = set()
        
        for ideal in ideals:
            if 'hey_etsy_tags' in ideal and ideal['hey_etsy_tags']:
                if isinstance(ideal['hey_etsy_tags'], str):
                    tags = ideal['hey_etsy_tags'].split(',')
                else:
                    tags = ideal['hey_etsy_tags']
                
                for tag in tags:
                    tag_clean = tag.strip()
                    if tag_clean:
                        all_tags.add(tag_clean)
        
        # Filter existing tags based on search
        filtered_tags = []
        if search:
            search_lower = search.lower()
            filtered_tags = [tag for tag in all_tags if search_lower in tag.lower()]
        else:
            filtered_tags = list(all_tags)
        
        # Limit results
        filtered_tags = filtered_tags[:limit]
        
        # Add Amazon suggestions if search is provided
        amazon_suggestions = []
        if search:
            try:
                from keywordamz import get_amazon_suggestions
                amazon_suggestions = get_amazon_suggestions(search)
                # Limit Amazon suggestions
                amazon_suggestions = amazon_suggestions[:5]
            except Exception as e:
                print(f"Error getting Amazon suggestions: {e}")
        
        # Combine and deduplicate suggestions
        all_suggestions = list(set(existing_tags + filtered_tags + amazon_suggestions))
        
        return jsonify({
            'success': True,
            'data': all_suggestions,
            'total': len(all_suggestions)
        })
        
    except Exception as exception:
        return jsonify({
            "error": f"Error when getting tag suggestions: {str(exception)}"
        }), 500

@tags_bp.route('/tags', methods=['POST'])
def create_tag():
    """Create a new tag"""
    try:
        data = request.get_json()
        tag_name = data.get('name', '').strip()
        
        if not tag_name:
            return jsonify({
                'success': False,
                'message': 'Tag name is required'
            }), 400
        
        db = connect_database()
        userId = get_jwt_identity()
        user = db.users.find_one({"_id": ObjectId(userId)})
        
        # Check if tag already exists
        existing_tag = db['tags'].find_one({
            'name': tag_name.lower(),
            'team_id': str(user['team_id'])
        })
        
        if existing_tag:
            return jsonify({
                'success': False,
                'message': 'Tag already exists'
            }), 400
        
        # Create new tag
        tag_data = {
            'name': tag_name.lower(),
            'display_name': tag_name,
            'team_id': str(user['team_id']),
            'user_id': userId,
            'usage_count': 0,
            'created_at': int(time.time()),
            'updated_at': int(time.time())
        }
        
        result = db['tags'].insert_one(tag_data)
        
        return jsonify({
            'success': True,
            'message': 'Tag created successfully',
            'data': {
                'id': str(result.inserted_id),
                'name': tag_name
            }
        })
        
    except Exception as exception:
        return jsonify({
            "error": f"Error when creating tag: {str(exception)}"
        }), 500

@tags_bp.route('/tags', methods=['GET'])
def list_tags():
    """Get all tags for the current team"""
    try:
        limit = request.args.get('limit', default=50, type=int)
        page = request.args.get('page', default=1, type=int)
        search = request.args.get('search', '').strip()
        
        db = connect_database()
        userId = get_jwt_identity()
        user = db.users.find_one({"_id": ObjectId(userId)})
        
        # Build query
        mongo_query = {'team_id': str(user['team_id'])}
        if search:
            mongo_query['name'] = {"$regex": search.lower(), "$options": "i"}
        
        # Get total count
        total = db['tags'].count_documents(mongo_query)
        
        # Get paginated results
        skip = (page - 1) * limit
        cursor = db['tags'].find(mongo_query).sort([('usage_count', -1), ('name', 1)]).skip(skip).limit(limit)
        results = [model_to_dict(doc) for doc in cursor]
        
        return jsonify({
            'success': True,
            'data': results,
            'total': total,
            'page': page,
            'limit': limit,
            'total_pages': (total + limit - 1) // limit
        })
        
    except Exception as exception:
        return jsonify({
            "error": f"Error when getting tags: {str(exception)}"
        }), 500

@tags_bp.route('/tags/<string:tag_id>', methods=['PUT'])
def update_tag(tag_id):
    """Update a tag"""
    try:
        data = request.get_json()
        new_name = data.get('name', '').strip()
        
        if not new_name:
            return jsonify({
                'success': False,
                'message': 'Tag name is required'
            }), 400
        
        db = connect_database()
        userId = get_jwt_identity()
        user = db.users.find_one({"_id": ObjectId(userId)})
        
        # Check if tag exists and belongs to user's team
        existing_tag = db['tags'].find_one({
            '_id': ObjectId(tag_id),
            'team_id': str(user['team_id'])
        })
        
        if not existing_tag:
            return jsonify({
                'success': False,
                'message': 'Tag not found'
            }), 404
        
        # Check if new name already exists
        duplicate_tag = db['tags'].find_one({
            'name': new_name.lower(),
            'team_id': str(user['team_id']),
            '_id': {'$ne': ObjectId(tag_id)}
        })
        
        if duplicate_tag:
            return jsonify({
                'success': False,
                'message': 'Tag name already exists'
            }), 400
        
        # Update tag
        update_data = {
            'name': new_name.lower(),
            'display_name': new_name,
            'updated_at': int(time.time())
        }
        
        result = db['tags'].update_one(
            {'_id': ObjectId(tag_id)},
            {'$set': update_data}
        )
        
        if result.modified_count > 0:
            return jsonify({
                'success': True,
                'message': 'Tag updated successfully'
            })
        else:
            return jsonify({
                'success': False,
                'message': 'Failed to update tag'
            }), 500
        
    except Exception as exception:
        return jsonify({
            "error": f"Error when updating tag: {str(exception)}"
        }), 500

@tags_bp.route('/tags/<string:tag_id>', methods=['DELETE'])
def delete_tag(tag_id):
    """Delete a tag"""
    try:
        db = connect_database()
        userId = get_jwt_identity()
        user = db.users.find_one({"_id": ObjectId(userId)})
        
        # Check if tag exists and belongs to user's team
        existing_tag = db['tags'].find_one({
            '_id': ObjectId(tag_id),
            'team_id': str(user['team_id'])
        })
        
        if not existing_tag:
            return jsonify({
                'success': False,
                'message': 'Tag not found'
            }), 404
        
        # Delete tag
        result = db['tags'].delete_one({'_id': ObjectId(tag_id)})
        
        if result.deleted_count > 0:
            return jsonify({
                'success': True,
                'message': 'Tag deleted successfully'
            })
        else:
            return jsonify({
                'success': False,
                'message': 'Failed to delete tag'
            }), 500
        
    except Exception as exception:
        return jsonify({
            "error": f"Error when deleting tag: {str(exception)}"
        }), 500

@tags_bp.route('/tags/increment-usage', methods=['POST'])
def increment_tag_usage():
    """Increment usage count for tags"""
    try:
        data = request.get_json()
        tag_names = data.get('tags', [])
        
        if not tag_names:
            return jsonify({
                'success': False,
                'message': 'Tags are required'
            }), 400
        
        db = connect_database()
        userId = get_jwt_identity()
        user = db.users.find_one({"_id": ObjectId(userId)})
        
        # Increment usage count for each tag
        for tag_name in tag_names:
            tag_name_lower = tag_name.strip().lower()
            if tag_name_lower:
                # Try to find existing tag
                existing_tag = db['tags'].find_one({
                    'name': tag_name_lower,
                    'team_id': str(user['team_id'])
                })
                
                if existing_tag:
                    # Increment usage count
                    db['tags'].update_one(
                        {'_id': existing_tag['_id']},
                        {'$inc': {'usage_count': 1}}
                    )
                else:
                    # Create new tag
                    tag_data = {
                        'name': tag_name_lower,
                        'display_name': tag_name.strip(),
                        'team_id': str(user['team_id']),
                        'user_id': userId,
                        'usage_count': 1,
                        'created_at': int(time.time()),
                        'updated_at': int(time.time())
                    }
                    db['tags'].insert_one(tag_data)
        
        return jsonify({
            'success': True,
            'message': 'Tag usage updated successfully'
        })
        
    except Exception as exception:
        return jsonify({
            "error": f"Error when updating tag usage: {str(exception)}"
        }), 500 