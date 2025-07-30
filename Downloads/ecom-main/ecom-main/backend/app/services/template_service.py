from database.connect_database import connect_database  
from datetime import datetime
from bson import ObjectId 
from bson.errors import InvalidId

db = connect_database()


def get_name(user_id):
    if not user_id:
        return None
    user = db['teamexp_users'].find_one({"_id": ObjectId(user_id)})
    if user and 'name' in user:
        return user['name']
    return "Unknown"

def get_product_type_name(product_type_id):
    if not product_type_id:
        return "Unknown"
    try:
        product_type = db['product_types'].find_one({"_id": ObjectId(product_type_id)})
        if product_type and 'name' in product_type:
            return product_type['name']
    except:
        pass
    return "Unknown"

def get_all_templates():
    result = db['teamexp_templates'].find() 
    templates = list(result)
    for template in templates:
        if '_id' in template:
            template['_id'] = str(template['_id'])
    return templates

def get_templates(filters=None, limit=10, page=1):
    try:
        skip = (page - 1) * limit
        query = {}
        
        if filters:
            if 'product_type' in filters and filters['product_type']:
                query['product_type'] = filters['product_type']
            
            if 'user_id' in filters and filters['user_id']:
                query['user_id'] = filters['user_id']
                
            if 'team_id' in filters and filters['team_id']:
                query['team_id'] = filters['team_id']
                
            if 'search' in filters and filters['search']:
                query['$or'] = [
                    {'product_type': {'$regex': filters['search'], '$options': 'i'}},
                    {'fields.template_link': {'$regex': filters['search'], '$options': 'i'}},
                    {'fields.color': {'$regex': filters['search'], '$options': 'i'}},
                    {'fields.size': {'$regex': filters['search'], '$options': 'i'}}
                ]
        
        total = db.teamexp_templates.count_documents(query)
        templates = list(db.teamexp_templates.find(query).skip(skip).limit(limit))
        for template in templates:
            if '_id' in template:
                template['_id'] = str(template['_id'])

            if 'user_id' in template and template['user_id']:
                template['user_name'] = get_name(template['user_id'])
            else:
                template['user_name'] = "Unknown"
                
            if 'product_type' in template and template['product_type']:
                template['product_type_name'] = get_product_type_name(template['product_type'])

            
        
        result = {
            'data': templates,
            'total': total,
            'page': page,
            'last_page': (total // limit) + (1 if total % limit > 0 else 0),
            'per_page': limit
        }
        return {'status': 'success', 'result': result}
    
    except Exception as e:
        return {'status': 'error', 'message': str(e)}

def create_template(data):
    try:
        if not data.get('product_type'):
            return {'status': 'error', 'message': 'Product type is required'}
        
        fields = data.get('fields', {})
        template_data = {
            'user_id': data.get('user_id', ''),
            'team_id':  data.get('team_id', ''),
            'product_type': data.get('product_type'),
            'fields': {
                # 'color': fields.get('color', ''),
                # 'size': fields.get('size', ''),
                'template_link': fields.get('template_link', '')
            },
            'teamplate_name': fields.get('template_name', ''),
            'description': fields.get('description', ''),
            'created_at': datetime.now(),
            'updated_at': datetime.now()
        }        
        result = db.teamexp_templates.insert_one(template_data)        
        return {
            'status': 'success', 
            'message': 'Template created successfully',
            'id': str(result.inserted_id)
        }    
    except Exception as e:
        return {'status': 'error', 'message': str(e)}

def update_template(template_id, data):
    try:
        template = db.teamexp_templates.find_one({'_id': ObjectId(template_id)})        
        if not template:
            return {'status': 'error', 'message': 'Template not found'}
        
        update_data = {}        
        if 'product_type' in data:
            update_data['product_type'] = data['product_type']
        if 'fields' in data:
            update_data['fields'] = {
                'color': data['fields'].get('color', ''),
                'size': data['fields'].get('size', ''),
                'template_link': data['fields'].get('template_link', '')
            }
        
        update_data['updated_at'] = datetime.now()
        
        db.teamexp_templates.update_one(
            {'_id': ObjectId(template_id)},
            {'$set': update_data}
        )        
        return {'status': 'success', 'message': 'Template updated successfully'}
    
    except InvalidId:
        return {'status': 'error', 'message': 'Invalid template ID format'}
    except Exception as e:
        return {'status': 'error', 'message': str(e)}


def delete_template(template_id):
    try:
        result = db.teamexp_templates.delete_one({'_id': ObjectId(template_id)})
        
        if result.deleted_count == 0:
            return {'status': 'error', 'message': 'Template not found'}
        
        return {'status': 'success', 'message': 'Template deleted successfully'}
    
    except InvalidId:
        return {'status': 'error', 'message': 'Invalid template ID format'}
    except Exception as e:
        return {'status': 'error', 'message': str(e)}
