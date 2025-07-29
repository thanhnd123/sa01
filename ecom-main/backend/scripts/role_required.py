from functools import wraps
from flask import jsonify
from flask_jwt_extended import get_jwt

def role_required(required_roles):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            claims = get_jwt()  # Lấy payload từ token đã được xác thực
            user_role = claims.get("role")

            if user_role not in required_roles:
                return jsonify({"message": "Access denied!"}), 403

            return f(*args, **kwargs)

        return decorated_function
    return decorator
