from flask import Blueprint, request, jsonify
from app.modules.teamexp.model import find, create, update, delete, all, paginate, getDataJson, pluck, truncate
from flask_bcrypt import Bcrypt
from database.connect_database import connect_database
from app.services.helpers import model_to_dict
from flask_jwt_extended import get_jwt_identity
from bson import ObjectId
bcrypt = Bcrypt()

user_bp = Blueprint('users', __name__)

@user_bp.route('/users', methods=['GET'])
def get_users():
    try:
        db = connect_database()
        limit = request.args.get('limit', default=None)
        
        if limit is None:
            limit = 50
        page = int(request.args.get('page', default=1))
        search = request.args.get('search', '').strip()
        sort = request.args.get('sort', '').strip()
        sortBy = request.args.get('sort-by', '').strip()
        user_id = get_jwt_identity()
        user = db.users.find_one({"_id": ObjectId(user_id)})
        
        if user is None:
            return jsonify({
                "error": "User not found"
            }), 404
        # Build query
        query = {
            "team_id": {"$eq": user['team_id']},
            "_id": {"$ne": ObjectId(user_id)}
        }
        if user['role'] == 'admin':
            query = {
                "_id": {"$ne": ObjectId(user_id)}
            }
        if search:
            query["username"] = {"$regex": search, "$options": "i"}
            query["email"] = {"$regex": search, "$options": "i"}

        # Get total count
        total = db.users.count_documents(query)

        # Calculate skip
        skip = (page - 1) * int(limit)

        # Build sort
        sort_query = []
        if sort:
            direction = 1 if sortBy == "asc" else -1
            sort_query.append((sort, direction))

        # Get data with pagination
        cursor = db.users.find(query)
        if sort_query:
            cursor = cursor.sort(sort_query)
        data = list(cursor.skip(skip).limit(int(limit)))
        
        # Get all teams and convert to list
        teams_cursor = db.teams.find({})
        teams = list(teams_cursor)
        
        # Convert ObjectId to string and add team data
        result = []
        for item in data:
            # Convert ObjectId to string for comparison
            item['_id'] = str(item['_id'])
            team_id = str(item.get('team_id', '')) if item.get('team_id') else None
            item['team_id'] = team_id
            
            # Find matching team
            team = None
            if team_id:
                for team_item in teams:
                    if str(team_item['_id']) == team_id:
                        team = {
                            '_id': str(team_item['_id']),
                            'name': team_item.get('name', ''),
                            'description': team_item.get('description', '')
                        }
                        break
            
            # Add team data to item
            item['team'] = team
            
            # Set status
            item['status'] = 'active' if item.get('status') == 'active' else 'inactive'
            
            result.append(item)

        return jsonify({
            "data": result,
            "total": total,
            "per_page": int(limit),
            "current_page": page,
            "last_page": (total + int(limit) - 1) // int(limit)
        })
            
    except Exception as exception:
        print(exception)
        return jsonify({
            "error": "Error when get users"
        }), 500

@user_bp.route('/users/<string:id>', methods = ["PUT"])
def userUpdate(id):
    try:
        db = connect_database()
        dataUser = request.get_json()
        if dataUser.get('new_password') and dataUser['new_password'] != "":
            newPassword =  bcrypt.generate_password_hash(dataUser['new_password']).decode('utf-8')
            db.users.update_one({"_id": ObjectId(dataUser['_id'])}, {"$set": {"password": newPassword}})
            return jsonify({
                "result": "Password updated successfully"
            })
        
        dataRecord = {
            "name": dataUser['name'],
            "email": dataUser['email'],
            "role": dataUser['role'],
            "team_id": dataUser['team_id'],
            "status": dataUser['status'],
            "username": dataUser.get('username', '')
        }
        
        # Update user
        result = update('users', dataRecord, None, dataUser['_id'])
        
        if result:
            # Get updated user with team information
            updated_user = db.users.find_one({"_id": ObjectId(dataUser['_id'])})
            if updated_user:
                # Get team information
                team = None
                if updated_user.get('team_id'):
                    team_doc = db.teams.find_one({"_id": ObjectId(updated_user['team_id'])})
                    if team_doc:
                        team = {
                            '_id': str(team_doc['_id']),
                            'name': team_doc.get('name', ''),
                            'description': team_doc.get('description', '')
                        }
                
                # Format response
                response_data = {
                    '_id': str(updated_user['_id']),
                    'name': updated_user.get('name', ''),
                    'email': updated_user.get('email', ''),
                    'username': updated_user.get('username', ''),
                    'role': updated_user.get('role', ''),
                    'team_id': str(updated_user.get('team_id', '')) if updated_user.get('team_id') else '',
                    'status': updated_user.get('status', 'inactive'),
                    'team': team
                }
                
                return jsonify({
                    "result": "User updated successfully",
                    "user": response_data
                })
        
        return jsonify({
            "result": "Failed to update user"
        }), 400
        
    except Exception as exception:
        print(f"Error updating user: {exception}")
        return jsonify({
            "result": f"Error when update data in table users: {exception}"
        }), 500
        
@user_bp.route('/users/show', methods = ["POST"])
def userShow():
    try:
        data = request.get_json()
        userToken = data['token_user'] if 'token_user' in data else None
        userId = data['_id'] if '_id' in data else None
        if userToken is not None:
            result = find(userToken, 'users', 'token_user')
        elif userId is not None:
            result = find(userId, 'users')
        else:
            return jsonify({
                "result": "Token or id is required"
            })
        if result is None:
            return jsonify({
                "result": "User not found"
            })
        else:
            role = find(result['role_id'], 'roles')
            team = find(result['team_id'], 'teams')
            result['role'] = role.get('name', '') if role else ''
            result['team'] = team.get('name', '') if team else ''
            return jsonify({
                "result": result
            })
    except Exception as exception:
        result = f"Error when get user: {exception}"
        return jsonify({
            "result": result
        })

@user_bp.route('/users', methods = ["POST"])
def userStore():
    try:
        db = connect_database()
        data = request.get_json()
        user_id = get_jwt_identity()
        data.pop('_id')
        user = db.users.find_one({"_id": ObjectId(user_id)})
        if user is None:
            return jsonify({
                "error": "User not found"
            }), 403
        
        data['team_id'] = user['team_id']
        newPassword = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        data['password'] = newPassword
        newUser = db.users.insert_one(data)
        inserted_user = db.users.find_one({"_id": newUser.inserted_id})
        return jsonify({
            "result": model_to_dict(inserted_user)
        })
    except Exception as exception:
        import traceback
        result = f"Lỗi khi tạo user: {str(exception)}\nChi tiết lỗi: {type(exception).__name__}\nTraceback: {traceback.format_exc()}"
        return jsonify({
            "error": result
        }), 500
        
@user_bp.route('/users/delete', methods = ["POST"])
def userDestroy():
    try:
        data = request.get_json()
        userEmail = data['email']
        deleteUser = delete(userEmail, 'users', 'email')
        return jsonify({
            "result": deleteUser
        })
    except Exception as exception:
        result = f"Error when delete user: {exception}"
        return jsonify({
            "result": result
        }) 

@user_bp.route('/users/change-password', methods = ["POST"])
def userChangePassword():
    try:
        db = connect_database()
        data = request.get_json()
        user_id = get_jwt_identity()
        user = db.users.find_one({"_id": ObjectId(user_id)})
        if user_id is None:
            return jsonify({
                "result": "User not found"
            })
        else:
            user_change_id = data['_id']
            user_change = db.users.find_one({"_id": ObjectId(user_change_id)})
            if(user_change is None):
                return jsonify({
                    "result": "User not found"
                })
            if user['team_id'] != user_change['team_id']:
                return jsonify({
                    "result": "You are not allowed to change this user's password"
                }), 403
            newPassword = bcrypt.generate_password_hash(data['password']).decode('utf-8')
            data['password'] = newPassword
            db.users.update_one({"_id": ObjectId(user_change_id)}, {"$set": {"password": newPassword}})
            return jsonify({
                "result": result
            })
    except Exception as exception:
        result = f"Error when change password: {exception}"
        return jsonify({
            "result": result
        })