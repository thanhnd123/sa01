from flask import Blueprint
from app.routes.Api.design import designs_bp

api_bp = Blueprint('api', __name__)

api_bp.register_blueprint(designs_bp, url_prefix='/designs')
