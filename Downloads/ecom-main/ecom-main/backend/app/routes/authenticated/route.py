from flask import Blueprint, request, jsonify
from flask_jwt_extended import verify_jwt_in_request
from datetime import timedelta
import logging
from app.routes.authenticated.team import team_bp
from app.routes.authenticated.ideal import ideal_bp
from app.routes.authenticated.user import user_bp
from app.routes.authenticated.design import design_bp
from app.routes.authenticated.template import template_bp
from app.routes.authenticated.shop import shop_bp
from app.routes.authenticated.product import product_bp
from app.routes.authenticated.mockup import mockup_bp
from app.routes.authenticated.listing import listing_bp
from app.routes.authenticated.config import config_bp
from app.routes.authenticated.events import events_bp
from app.routes.authenticated.tags import tags_bp
from app.routes.authenticated.notes import notes_bp

authenticated_bp = Blueprint('authenticated', __name__)

authenticated_bp.register_blueprint(team_bp)
authenticated_bp.register_blueprint(ideal_bp)
authenticated_bp.register_blueprint(user_bp)
authenticated_bp.register_blueprint(design_bp, url_prefix='/design')
authenticated_bp.register_blueprint(template_bp)
authenticated_bp.register_blueprint(shop_bp)
authenticated_bp.register_blueprint(product_bp)
authenticated_bp.register_blueprint(mockup_bp, url_prefix='/mockup')
authenticated_bp.register_blueprint(listing_bp, url_prefix='/listing')
authenticated_bp.register_blueprint(config_bp, url_prefix='/config')
authenticated_bp.register_blueprint(events_bp, url_prefix='/events')
authenticated_bp.register_blueprint(tags_bp)
authenticated_bp.register_blueprint(notes_bp)

@authenticated_bp.before_request
def require_jwt():
    verify_jwt_in_request()
