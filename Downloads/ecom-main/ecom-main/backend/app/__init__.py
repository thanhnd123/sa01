from flask import Flask
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_pymongo import PyMongo
from dotenv import load_dotenv
from flask_cors import CORS
import os
from datetime import timedelta
import logging

# Configure logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024
app.config.update(
    TESTING=os.environ.get('TESTING', False),
    MONGO_URI=os.environ.get('MONGO_URI', 'mongodb://mongodb:27017/exp_ecom_db'),
    JWT_SECRET_KEY=os.environ.get('JWT_SECRET_KEY', 'your-secret-key'),
    JWT_ACCESS_TOKEN_EXPIRES=timedelta(hours=1),
    JWT_REFRESH_TOKEN_EXPIRES=timedelta(days=30)
)

uploads_dir = os.path.join(os.getcwd(), 'uploads')
if not os.path.exists(uploads_dir):
    os.makedirs(uploads_dir)

# Initialize extensions directly
mongo = PyMongo(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app, 
     resources={r"/*": {
         "origins": "*",
         "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
         "allow_headers": ["Content-Type", "Authorization", "multipart/form-data", "application/json"],
         "supports_credentials": True
     }}
)

# Import and register routes
# Import routes
from app.routes.auth import auth_bp
from app.routes.authenticated.route import authenticated_bp
from app.routes.guest.route import guest_bp
from app.routes.Api.route import api_bp
# Register blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(authenticated_bp, url_prefix='/api/authenticated')
app.register_blueprint(api_bp, url_prefix='/api')
app.register_blueprint(guest_bp)
# JWT error handlers
@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_payload):
    return {'message': 'The token has expired'}, 401

@jwt.invalid_token_loader
def invalid_token_callback(error):
    return {'message': 'Invalid token'}, 401

@jwt.unauthorized_loader
def missing_token_callback(error):
    return {'message': 'Missing token'}, 401

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)