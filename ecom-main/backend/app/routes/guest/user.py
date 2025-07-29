from flask import Blueprint, request, jsonify
from app.modules.teamexp.model import find, create, update, delete, all, paginate, getDataJson, pluck, truncate
from flask_bcrypt import Bcrypt
from database.seeders.productTypeSeeder import users
import time
import jwt
bcrypt = Bcrypt()

user_bp = Blueprint('users', __name__)

@user_bp.route('/users/seed-users', methods = ["GET"])
def seedUsers():
    try:
        truncate('users')
        dataUsers = users()
        usersList = dataUsers.get('users', [])
        
        # Get all roles and teams
        roles = all('roles')
        teams = all('teams')
        
        # Find Giran team id
        giran_team = next((team for team in teams if team['name'] == 'Giran'), None)
        if not giran_team:
            raise Exception("Giran team not found")
            
        for user in usersList:
            # Find matching role by name
            matching_role = next((role for role in roles if role['name'] == user['name']), None)
            if not matching_role:
                raise Exception(f"Role not found for user {user['name']}")
                
            user['password'] = bcrypt.generate_password_hash(user['password']).decode('utf-8')
            user['role_id'] = matching_role['_id']
            user['team_id'] = giran_team['_id']
            SECRETKEY = user['email']
            token = jwt.encode({
                "name": user['name'],
                "email": user['email'],
                "password": user['password']
            }, SECRETKEY, algorithm='HS256')
            user['function'] = 'void'
            user['token_user'] = token
            create(user, 'users')
            
        allData = all('users')
        return jsonify({
            "result": allData,
            "message": "Users seeded successfully"
        })
    except Exception as exception:
        result = f"Error when seeding users: {exception}"
        return jsonify({
            "response": result
        })
        
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