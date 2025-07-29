from flask import Blueprint, request, jsonify
from app.modules.teamexp.model import find, create, update, delete, all, paginate, getDataJson, pluck, truncate
from app.services.template_service import (
    get_templates,
    create_template,
    update_template,
    delete_template,
    get_all_templates,
)

template_bp = Blueprint('templates', __name__, url_prefix='/template')

# @template_bp.route('/all', methods=['GET'])
# def all_templates():
#     result = get_all_templates()
#     return jsonify(result)

@template_bp.route('/list', methods=['GET'])
def list_templates(team_id):
    page = int(request.args.get('page', 1))
    limit = int(request.args.get('limit', 25))
    product_type = request.args.get('product_type')
    user_id = get_jwt_identity()
    search = request.args.get('search')
    user = db['users'].find_one({"_id": ObjectId(user_id)})
    filters = {
        'team_id': user.get('team_id')
    }
    if product_type:
        filters['product_type'] = product_type
    if search:
        filters['search'] = search    
    result = get_templates(filters, limit, page)    
    return jsonify(result)

@template_bp.route('/create', methods=['POST'])
def create_new_template():
    data = request.json
    if not data:
        return jsonify({'status': 'error', 'message': 'No data provided'})
    result = create_template(data)
    return jsonify(result)

@template_bp.route('/update/<template_id>', methods=['PUT'])
def update_existing_template(template_id):
    data = request.json    
    if not data:
        return jsonify({'status': 'error', 'message': 'No data provided'})    
    result = update_template(template_id, data)    
    return jsonify(result)

@template_bp.route('/delete/<template_id>', methods=['DELETE'])
def delete_existing_template(template_id): 
    result = delete_template(template_id)    
    return jsonify(result)

@template_bp.route('/bulk-create', methods=['POST'])
def bulk_create_templates():
    data = request.json
    
    if not data or not isinstance(data, list):
        return jsonify({'status': 'error', 'message': 'Invalid data format. Expected a list of templates'})
    
    results = []
    for template_data in data:
        results.append(create_template(template_data))
    
    return jsonify({
        'status': 'success',
        'message': f'Processed {len(results)} templates',
        'results': results
    })

