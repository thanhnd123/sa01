# from flask import Flask, jsonify, Blueprint, request
# from app.services.template_service import (
#     get_templates,
#     create_template,
#     update_template,
#     delete_template,
# )

# app = Blueprint('template', __name__)


# @app.route('/api/templates/<team_id>/list', methods=['GET'])
# def list_templates(team_id):
#     page = int(request.args.get('page', 1))
#     limit = int(request.args.get('limit', 10))
#     product_type = request.args.get('product_type')
#     user_id = request.args.get('user_id')
#     search = request.args.get('search')
    
#     filters = {}
#     if product_type:
#         filters['product_type'] = product_type
#     if user_id:
#         filters['user_id'] = user_id
#     if team_id:
#         filters['team_id'] = team_id
#     if search:
#         filters['search'] = search
    
#     result = get_templates(filters, limit, page)
    
#     return jsonify(result)

# @app.route('/api/templates/create', methods=['POST'])
# def create_new_template():
#     data = request.json
#     if not data:
#         return jsonify({'status': 'error', 'message': 'No data provided'})
#     result = create_template(data)
#     return jsonify(result)

# @app.route('/api/templates/update/<template_id>', methods=['PUT'])
# def update_existing_template(template_id):
#     data = request.json    
#     if not data:
#         return jsonify({'status': 'error', 'message': 'No data provided'})    
#     result = update_template(template_id, data)    
#     return jsonify(result)

# @app.route('/api/templates/delete/<template_id>', methods=['DELETE'])
# def delete_existing_template(template_id): 
#     result = delete_template(template_id)    
#     return jsonify(result)

# @app.route('/api/templates/bulk-create', methods=['POST'])
# def bulk_create_templates():
#     data = request.json
    
#     if not data or not isinstance(data, list):
#         return jsonify({'status': 'error', 'message': 'Invalid data format. Expected a list of templates'})
    
#     results = []
#     for template_data in data:
#         results.append(create_template(template_data))
    
#     return jsonify({
#         'status': 'success',
#         'message': f'Processed {len(results)} templates',
#         'results': results
#     })

