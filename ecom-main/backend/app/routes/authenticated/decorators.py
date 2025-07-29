from functools import wraps
from flask import jsonify
from flask_jwt_extended import get_jwt_identity
from database.connect_database import connect_database
from bson.objectid import ObjectId

def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        current_user = get_jwt_identity()
        db = connect_database()
        user = db.users.find_one({"_id": ObjectId(current_user)})
        if not user:
            return jsonify({
                "result": "Unauthorized",
                "status": "error"
            }), 401
            
        if user.get('role') != 'admin':
            return jsonify({
                "result": "Forbidden - Admin access required",
                "status": "error"
            }), 403
            
        return f(*args, **kwargs)
    return decorated_function 