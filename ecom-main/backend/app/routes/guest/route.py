from flask import Blueprint
from app.routes.guest.product import product_bp
from app.routes.guest.user import user_bp
from app.routes.guest.team import team_bp
from app.routes.guest.role import role_bp
from app.routes.guest.design import design_bp
from app.routes.guest.ideal import ideal_bp
from app.routes.guest.heyetsy import heyetsy_bp
from app.routes.guest.file import file_bp


guest_bp = Blueprint('guest', __name__)
# guest_bp.register_blueprint(role_bp, url_prefix='/role')
# guest_bp.register_blueprint(team_bp, url_prefix='/team')
# guest_bp.register_blueprint(user_bp, url_prefix='/user')
# guest_bp.register_blueprint(route_bp, url_prefix='/route')
# guest_bp.register_blueprint(design_bp, url_prefix='/design')
guest_bp.register_blueprint(ideal_bp, url_prefix='/ideals')
guest_bp.register_blueprint(heyetsy_bp, url_prefix='/heyetsy')
guest_bp.register_blueprint(product_bp)
guest_bp.register_blueprint(file_bp, url_prefix='/file') 
@guest_bp.route('/')
def home():
    print("Home route accessed")
    return {
        'message': 'Welcome to the eCommerce API',
        'status': 'running'
    }