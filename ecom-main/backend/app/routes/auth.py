from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from datetime import timedelta
from app import mongo, jwt, bcrypt
import logging
from bson import ObjectId

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        logger.debug(f"Register attempt with data: {data}")
        
        # Check if required fields exist
        if not all(k in data for k in ['email', 'password', 'username']):
            return jsonify({'error': 'Missing required fields'}), 400
        
        # Check if user already exists
        if mongo.db.users.find_one({'email': data['email']}):
            return jsonify({'error': 'Email already registered'}), 409
        
        # Hash password with specific rounds
        try:
            hashed_password = bcrypt.generate_password_hash(data['password'], rounds=12).decode('utf-8')
            logger.debug("Password hashed successfully")
        except Exception as e:
            logger.error(f"Password hashing error: {str(e)}")
            return jsonify({'error': 'Error hashing password'}), 500
        
        # Create new user
        new_user = {
            'email': data['email'],
            'password': hashed_password,
            'username': data['username'],
            'role': 'user'  # Default role
        }
        
        mongo.db.users.insert_one(new_user)
        logger.debug("User registered successfully")
        
        return jsonify({'message': 'User registered successfully'}), 201
        
    except Exception as e:
        logger.error(f"Registration error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        logger.debug(f"Login attempt with data: {data}")
        
        # Check if required fields exist
        if not all(k in data for k in ['email', 'password']):
            logger.debug("Missing email or password")
            return jsonify({'error': 'Missing email or password'}), 400
        
        # Find user by email or username
        user = mongo.db.users.find_one({
            '$or': [
                {'email': data['email']},
                {'username': data['email']}
            ]
        })
            
        if not user:
            logger.debug("User not found")
            return jsonify({'error': 'Invalid email or username'}), 401
            
        # Get stored password and check
        stored_password = user['password']
        input_password = data['password']
        
        # Debug log
        logger.debug(f"Stored password hash: {stored_password}")
        logger.debug(f"Input password: {input_password}")
        
        is_valid = bcrypt.check_password_hash(stored_password, input_password)
        logger.debug(f"Password validation result: {is_valid}")
        
        if not is_valid:
            logger.debug("Invalid password")
            return jsonify({'error': 'Invalid email or password'}), 401
        
        # Create tokens
        access_token = create_access_token(
            identity=str(user['_id']),
            expires_delta=timedelta(hours=24)
        )
        refresh_token = create_refresh_token(
            identity=str(user['_id']),
            expires_delta=timedelta(days=30)
        )

        # Check if user has team_id
        if not user.get('team_id'):
            return jsonify({'error': 'User is not active. Please contact administrator.'}), 402

        my_team = mongo.db.teams.find_one({'_id': ObjectId(user['team_id'])})
        if not my_team:
            return jsonify({'error': 'User team not found. Please contact administrator.'}), 402

        user= {
            'access_token': access_token,
            'refresh_token': refresh_token,
            'id': str(user['_id']),
            'email': user['email'],
            'name': user.get('username', ''),
            'username': user.get('username', ''),
            'role': user.get('role', 'user'),
            'picture': user.get('avatar', ''),
            'team_id': str(user.get('team_id', '')),
            'token_user': user.get('token_user', ''),
            'team_name': my_team.get('name', '')
        }
        if user.get('role') == 'admin':
            teams = mongo.db.teams.find()
            teams_list = []
            for team in teams:
                team['_id'] = str(team['_id'])
                if team['_id'] == user['team_id']:
                    user['team_name'] = team.get('name', '')
                teams_list.append(team)
            user['teams'] = teams_list
        return jsonify(user), 200
    except Exception as e:
        logger.error(f"Login error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    try:
        current_user = get_jwt_identity()
        access_token = create_access_token(identity=current_user)
        return jsonify({'access_token': access_token}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    user = mongo.db.users.find_one({'_id': current_user})
    return jsonify({'logged_in_as': user['email']}), 200 

@auth_bp.route('/get-users', methods=['GET'])
def getusers():
    users = mongo.db.teamexp_users.find()
    users_list = []
    for user in users:
        user['_id'] = str(user['_id'])
        users_list.append(user)
    return jsonify(users_list), 200


@auth_bp.route('/get-user', methods=['GET'])
def getuser():
    try:
        current_user = get_jwt_identity()
        user = mongo.db.teamexp_users.find_one({'_id': current_user})
        if user:
            user['_id'] = str(user['_id'])
            access_token = create_access_token(identity=str(user['_id']))
            refresh_token = create_refresh_token(identity=str(user['_id']))
            user['access_token'] = access_token
            user['refresh_token'] = refresh_token
            return jsonify(user), 200
        return jsonify({'error': 'User not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500
