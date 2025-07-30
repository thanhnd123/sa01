from flask import Blueprint, request, jsonify
from app.modules.teamexp.model import find, create, update, delete, all, paginate, getDataJson, pluck, truncate, export_listing_to_xlsm, download_file_listing
from flask_jwt_extended import get_jwt_identity
from database.connect_database import connect_database
from bson.objectid import ObjectId
from app.services.helpers import model_to_dict
import math
from datetime import datetime
from app.services.export_listing_file import ExportListingFile
import random
import string

listing_bp = Blueprint('listing', __name__)

@listing_bp.route('/create-teamplate', methods=['POST'])
def createTeamplate():
    try:
        requestData = request.form.to_dict()
        result = create(requestData, 'template_listing')
    except Exception as e:
        result = f"Error when create template: {e}"
    return jsonify({
            "result": result
        })

@listing_bp.route('/get-template', methods=['GET'])
def getTeamplate():
    try:
        user_id = get_jwt_identity()
        user = db['users'].find_one({"_id": ObjectId(user_id)})
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 25))
        product_type = request.args.get('product_type')
        search = request.args.get('search')
        skip = (page - 1) * limit
        query = {
            'team_id': user.get('team_id')
        }
        if product_type:
            query['product_type'] = product_type
        if search:
            query['search'] = search
        data = db['template_listing'].find(query).skip(skip).limit(limit)
        result = [model_to_dict(item) for item in data]
    except Exception as e:
        result = f"Error when create template: {e}"
    return jsonify({
            "result": result
        })

# @listing_bp.route('/processing-template', methods=['POST'])
# def processingTemplate():
#     try:
#         shop_id = request.form.get('shop_id')
#         template_id = request.form.get('template_id')
#         product_ids = request.form.getlist('product_ids[]')
#         result = export_listing_to_xlsm(template_id, shop_id, product_ids)
#     except Exception as e:
#         result = f"Error when create template: {e}"
#     return jsonify({
#             "result": result
#         })

@listing_bp.route('/get-files-listing', methods=['GET'])
def getFileListing():
    try:
        seller_id = request.args.get('seller_id', '').strip()
        result = all('file_listings', {"query": "seller_id", "value": seller_id})
    except Exception as e:
        result = f"Error when get template: {e}"
    return jsonify({
            "result": result
        })

@listing_bp.route('/download-file/<filename>', methods=['GET'])
def processingDownloadTemplate(filename):
    try:
        download_file_listing(filename)
    except Exception as e:
        result = f"Error when create template: {e}"
        return jsonify({
                "result": result
            })

@listing_bp.route('/create', methods=['POST'])
def create_listing_from_design():
    try:
        # Lấy dữ liệu từ request JSON
        requestData = request.get_json()
        
        # Validate required fields
        required_fields = ['shop_ids', 'source', 'design_id', 'product_type_id']
        for field in required_fields:
            if field not in requestData:
                return jsonify({
                    'success': False,
                    'message': f'Missing required field: {field}'
                }), 400

        shop_ids = requestData['shop_ids']
        source = requestData['source']
        design_id = requestData['design_id']
        product_type_id = requestData['product_type_id']
        # Validate shop_ids là mảng
        if not isinstance(shop_ids, list):
            return jsonify({
                'success': False,
                'message': 'shop_ids must be an array'
            }), 400

        # Kết nối database
        db = connect_database()
        user_id = get_jwt_identity()
        current_user = db.users.find_one({"_id": ObjectId(user_id)})

        # Validate shops exist and user has access
        shop_object_ids = [ObjectId(shop_id) for shop_id in shop_ids]
        shops = list(db.shops.find({"_id": {"$in": shop_object_ids}}))
        if len(shops) != len(shop_ids):
            return jsonify({
                'success': False,
                'message': 'One or more shops not found'
            }), 404

        # Check if user has access to all shops
        for shop in shops:
            if shop['seller_id'] != user_id:
                return jsonify({
                    'success': False,
                    'message': f'You do not have access to shop: {shop["name"]}'
                }), 403

        # Validate design exists
        design = db.designs.find_one({"_id": ObjectId(design_id)})
        if not design:
            return jsonify({
                'success': False,
                'message': 'Design not found'
            }), 404

        # Validate product type exists
        product_type = db.product_types.find_one({"_id": ObjectId(product_type_id)})

        if not product_type:
            return jsonify({
                'success': False,
                'message': 'Product type not found'
            }), 404

        # Create listings for each shop
        created_listings = []
        # Lấy product banners từ designer_result dựa trên product_type_id
        product_banners = design.get('designer_result', {}).get('product_banners', {}).get(product_type_id, {})
        
        # Tạo danh sách images từ product banners
        images = []
        main_image = None
        if product_banners:
            for key, image_url in product_banners.items():
                if key == 0:
                    main_image = image_url
                else:
                    images.append(image_url)
        
        # Cập nhật main_image và images cho listing
        main_image = images[0] if images else None
        for shop_id in shop_ids:
            # Check for existing listing
            sku = generate_sku(shop_id, product_type_id)
            existing_listing = db.listings.find_one({
                "shop_id": ObjectId(shop_id),
                "product_ideal_id": design['product_ideal_id'],
                "product_type_id": ObjectId(product_type_id)
            })

            if existing_listing:
                print(f"Listing already exists for shop {shop_id}")
                continue

            new_listing = {
                "shop_id": ObjectId(shop_id),
                "source": source,
                "design_id": ObjectId(design_id),
                "product_type_id": ObjectId(product_type_id),
                "product_ideal_id": design['product_ideal_id'],
                "status": "new",

                "title": design['product_ideal_id']['title'],
                "short_description": "",
                "description": "",
                "main_image": main_image,
                "images": images,
                "sku": sku,

                "created_by": ObjectId(user_id),
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow(),

            }
            result = db.listings.insert_one(new_listing)
            created_listings.append(str(result.inserted_id))

        if not created_listings:
            return jsonify({
                'success': False,
                'message': 'All listings already exist for these shops'
            }), 400

        return jsonify({
            'success': True,
            'message': f'Successfully created {len(created_listings)} listings',
            'data': {
                'listing_ids': created_listings
            }
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': 'Failed to create listing',
            'error': str(e)
        }), 500

@listing_bp.route('/create-listing-from-action', methods=['POST'])
def create_listing_from_action():
    try:
        # Lấy dữ liệu từ request JSON
        requestData = request.get_json()
        
        # Validate required fields
        required_fields = ['shops', 'actions']
        for field in required_fields:
            if field not in requestData:
                return jsonify({
                    'success': False,
                    'message': f'Missing required field: {field}'
                }), 400

        shop_ids = requestData['shops']
        actions_received = requestData['actions']
        source = 'action'

        # Validate shop_ids là mảng
        if not isinstance(shop_ids, list):
            return jsonify({
                'success': False,
                'message': 'shop_ids must be an array'
            }), 400

        # Kết nối database
        db = connect_database()
        user_id = get_jwt_identity()
        current_user = db.users.find_one({"_id": ObjectId(user_id)})

        # Validate shops exist and user has access
        shop_object_ids = [ObjectId(shop_id) for shop_id in shop_ids]
        shops = list(db.shops.find({"_id": {"$in": shop_object_ids}}))
        if len(shops) != len(shop_ids):
            return jsonify({
                'success': False,
                'message': 'One or more shops not found'
            }), 404

        # Check if user has access to all shops
        for shop in shops:
            if shop['seller_id'] != user_id:
                return jsonify({
                    'success': False,
                    'message': f'You do not have access to shop: {shop["name"]}'
                }), 403

        actions = db.design_actions.find({"_id": {"$in": [ObjectId(action_id) for action_id in actions_received]}})
        # Lặp qua từng action để tạo listing
        for action in actions:
            
            # Tạo listing cho từng shop
            for shop_id in shop_ids:
                listing = {
                    'source': source,
                    'shop_id': ObjectId(shop_id),
                    'design_id': ObjectId(action.get('_id', '')),
                    'product_type_id': ObjectId(action.get('product_type_id', '')),
                    'product_ideal_id': ObjectId(action.get('ideal_id', '')),
                    'title': action.get('name', ''),
                    'description': f"Product type: {action.get('product_type', '')}",
                    'status': 'new',
                    "main_image": action.get('main_image', ''),
                    "images": action.get('banners', []),
                    'created_by': ObjectId(user_id),
                    'created_at': datetime.utcnow(),
                    'updated_at': datetime.utcnow()
                }
                
                # Thêm listing vào database
                db.listings.insert_one(listing)
        
        return jsonify({
            'success': True,
            'message': 'Listings created successfully'
        }), 200
        
    except Exception as e:
        print(f"Error creating listing: {str(e)}")
        print(f"Error at line {e.__traceback__.tb_lineno}: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'Failed to create listing'
        }), 500

@listing_bp.route('/list', methods=["GET"])
def listListing():
    try:
        # Lấy các tham số từ query
        page = int(request.args.get('page', default=1))
        limit = int(request.args.get('limit', default=10))
        search = request.args.get('search', '').strip()
        sort_field = request.args.get('sort', default='created_at')
        sort_order = request.args.get('sort-by', default='desc')
        shop_id = request.args.get('shop_id', '').strip()
        status = request.args.get('status', '').strip()
        product_type_id = request.args.get('product_type_id', '').strip()
        parent_child = request.args.get('parent_child', '').strip()

        # Kết nối database
        db = connect_database()
        user_id = get_jwt_identity()

        # Xây dựng query
        query = {}
        
        # Thêm điều kiện tìm kiếm
        if search:
            query['$or'] = [
                {'title': {'$regex': search, '$options': 'i'}},
                {'description': {'$regex': search, '$options': 'i'}}
            ]

        # Thêm điều kiện shop_id
        if shop_id and shop_id != 'all':
            query['shop_id'] = ObjectId(shop_id)

        # Thêm điều kiện product_type_id
        if product_type_id and product_type_id != 'all':
            query['product_type_id'] = ObjectId(product_type_id)

        # Thêm điều kiện status
        if status and status != 'all':
            query['status'] = status

        # Thêm điều kiện parent_child
        if parent_child and parent_child != 'all':
            if parent_child == 'parent':
                query['$and'] = [
                    {'children_ids': {'$exists': True, '$ne': []}},
                    {'parent_id': None}
                ]
            elif parent_child == 'child':
                query['$and'] = [
                    {'parent_id': {'$exists': True, '$ne': None}},
                    {'children_ids': {'$exists': False}}
                ]

        # Thêm điều kiện user_id
        query['created_by'] = ObjectId(user_id)

        # Xây dựng sort
        sort = [(sort_field, -1 if sort_order == 'desc' else 1)]

        # Tính toán skip
        skip = (page - 1) * limit

        # Lấy tổng số records
        total = db.listings.count_documents(query)

        # Lấy data với phân trang
        listings = list(db.listings.find(query)
                       .sort(sort)
                       .skip(skip)
                       .limit(limit))

        result = []
        # Populate thông tin liên quan
        for listing in listings:
            # Populate shop info
            shop = db.shops.find_one({'_id': listing['shop_id']})
            listing['shop'] = {
                '_id': str(shop['_id']),
                'name': shop['name']
            } if shop else None

            # Convert ObjectId to string
            result.append(model_to_dict(listing))

        return jsonify({
                'success': True,
                'data': {
                    'listings': listings,
                    'pagination': {
                        'total': total,
                        'page': page,
                        'limit': limit,
                        'total_pages': math.ceil(total / limit)
                    }
                }
            })

    except Exception as e:
        print(f"Error getting listings: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'Failed to get listings'
        }), 500


@listing_bp.route('/delete', methods=['POST'])
def deleteListing():
    try:
        listing_ids = request.json.get('listing_ids', [])
        db = connect_database()
        db.listings.delete_many({'_id': {'$in': [ObjectId(listing_id) for listing_id in listing_ids]}})
        return jsonify({
            'success': True,
            'message': 'Successfully deleted listing'
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': 'Failed to delete listing'
        }), 500

@listing_bp.route('/update', methods=['POST'])
def updateListing():
    try:
        # Lấy dữ liệu từ request JSON
        requestData = request.get_json()
        
        # Validate required fields
        if 'listing_id' not in requestData:
            return jsonify({
                'success': False,
                'message': 'Missing required field: listing_id'
            }), 400

        listing_id = requestData['listing_id']
        update_fields = {}

        # Kiểm tra và thêm các trường cần update
        if 'title' in requestData:
            update_fields['title'] = requestData['title']
        if 'bullet_points' in requestData:
            update_fields['bullet_points'] = requestData['bullet_points']
        if 'description' in requestData:
            update_fields['description'] = requestData['description']

        # Nếu không có trường nào cần update
        if not update_fields:
            return jsonify({
                'success': False,
                'message': 'No fields to update'
            }), 400

        # Kết nối database
        db = connect_database()
        user_id = get_jwt_identity()

        # Kiểm tra listing tồn tại và user có quyền update
        listing = db.listings.find_one({
            '_id': ObjectId(listing_id),
            'created_by': ObjectId(user_id)
        })

        if not listing:
            return jsonify({
                'success': False,
                'message': 'Listing not found or you do not have permission to update'
            }), 404

        # Thêm thời gian update
        update_fields['updated_at'] = datetime.utcnow()

        # Update listing
        result = db.listings.update_one(
            {'_id': ObjectId(listing_id)},
            {'$set': update_fields}
        )

        if result.modified_count == 0:
            return jsonify({
                'success': False,
                'message': 'No changes were made'
            }), 400

        return jsonify({
            'success': True,
            'message': 'Successfully updated listing',
            'data': {
                'listing_id': listing_id,
                'updated_fields': list(update_fields.keys())
            }
        })

    except Exception as e:
        print(f"Error updating listing: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'Failed to update listing'
        }), 500


@listing_bp.route('/create_file_listing', methods=['POST'])
def createFileListing():
    try:
        # Validate input data
        data = request.get_json()
        shop_id = data.get('shop_id')
        template_id = data.get('template_id')
        listing_ids = data.get('listing_ids')

        if not shop_id:
            return jsonify({
                "success": False,
                "message": "Shop ID is required"
            }), 400

        if not template_id:
            return jsonify({
                "success": False,
                "message": "Template ID is required"
            }), 400

        if not listing_ids:
            return jsonify({
                "success": False,
                "message": "Listing IDs are required"
            }), 400
        print('starting')
        # Khởi tạo service
        export_service = ExportListingFile()
        
        # Gọi hàm export file
        file_url = export_service.export_file(shop_id, listing_ids, template_id)
        return jsonify({
            "success": True,
            "message": "Successfully created file listing",
            "file_url": file_url
        })

    except Exception as e:
        error_message = str(e)
        error_code = 500
        
        # Xử lý các lỗi cụ thể
        if "Shop not found" in error_message:
            error_code = 404
        elif "Template not found" in error_message:
            error_code = 404
        elif "No valid listings found" in error_message:
            error_code = 400
        elif "Unsupported platform" in error_message:
            error_code = 400
            
        return jsonify({
            "success": False,
            "message": f"Error when create file listing: {error_message}",
            "error_code": error_code
        }), error_code

def generate_sku(shop_id, product_type_id):
    try:
        # Kết nối database
        db = connect_database()
        product_type = db.product_types.find_one({"_id": ObjectId(product_type_id)})
        if not product_type:
            raise Exception("Product type not found")
        product_name = product_type.get('name', '')
        # Lấy thông tin shop
        shop = db.shops.find_one({"_id": ObjectId(shop_id)})
        if not shop:
            raise Exception("Shop not found")
            
        # Lấy 3 ký tự đầu của email shop
        shop_email_prefix = shop.get('email', '')[:3].upper()
        
        # Tạo viết tắt từ product name
        words = product_name.split()
        product_prefix = ''.join(word[0].upper() for word in words)
        
        # Tạo số ngẫu nhiên 4 chữ số
        random_number = ''.join(random.choices(string.digits, k=4))
        
        # Tạo SKU với độ dài 10 ký tự
        sku = f"{shop_email_prefix}{product_prefix}{random_number}"
        
        # Kiểm tra SKU đã tồn tại chưa
        while db.listings.find_one({"sku": sku}):
            random_number = ''.join(random.choices(string.digits, k=4))
            sku = f"{shop_email_prefix}{product_prefix}{random_number}"
            
        return sku
        
    except Exception as e:
        raise Exception(f"Error generating SKU: {str(e)}")

@listing_bp.route('/update-from-generated', methods=['POST'])
def update_listing_from_generated():
    try:
        # Lấy dữ liệu từ request JSON
        requestData = request.get_json()
        
        # Validate required fields
        if 'generated_items' not in requestData:
            return jsonify({
                'success': False,
                'message': 'Missing required field: generated_items'
            }), 400

        generated_items = requestData['generated_items']
        
        # Kết nối database
        db = connect_database()
        user_id = get_jwt_identity()

        updated_listings = []
        for item in generated_items:
            # Validate required fields for each item
            required_fields = ['listing_id', 'title', 'description', 'bullet_points']
            for field in required_fields:
                if field not in item:
                    return jsonify({
                        'success': False,
                        'message': f'Missing required field: {field} in generated item'
                    }), 400

            listing_id = item['listing_id']
            
            # Kiểm tra listing tồn tại và user có quyền update
            listing = db.listings.find_one({
                '_id': ObjectId(listing_id),
            })

            if not listing:
                return jsonify({
                    'success': False,
                    'message': f'Listing not found or you do not have permission to update: {listing_id}'
                }), 404

            # Update listing với dữ liệu mới
            update_fields = {
                'title': item['title'],
                'description': item['description'],
                'bullet_points': item['bullet_points'],
                'updated_at': datetime.utcnow()
            }

            result = db.listings.update_one(
                {'_id': ObjectId(listing_id)},
                {'$set': update_fields}
            )

            if result.modified_count > 0:
                updated_listings.append(listing_id)

        if not updated_listings:
            return jsonify({
                'success': False,
                'message': 'No listings were updated'
            }), 400

        return jsonify({
            'success': True,
            'message': f'Successfully updated {len(updated_listings)} listings',
            'data': {
                'updated_listing_ids': updated_listings
            }
        })

    except Exception as e:
        print(f"Error updating listings from generated items: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'Failed to update listings'
        }), 500

@listing_bp.route('/available-children', methods=['GET'])
def get_available_children():
    try:
        parent_id = request.args.get('parent_id')
        product_type_id = request.args.get('product_type_id')
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 10))
        db = connect_database()
        user_id = get_jwt_identity()

        # Lấy thông tin parent
        parent = db.listings.find_one({"_id": ObjectId(parent_id)})
        if not parent:
            return jsonify({
                'success': False,
                'message': 'Parent product not found'
            }), 404

        # Lấy danh sách sản phẩm đã là con của parent
        existing_children_query = {
            "parent_id": ObjectId(parent_id),
            "_id": {"$ne": ObjectId(parent_id)},
            "product_type_id": ObjectId(product_type_id),
            "$or": [
                {"children_ids": {"$exists": False}},
                {"children_ids": []}
            ]
        }

        # Lấy danh sách sản phẩm có thể làm con
        available_children_query = {
            "product_type_id": ObjectId(product_type_id),
            "parent_id": None,
            "_id": {"$ne": ObjectId(parent_id)},
            "_id": {"$nin": [ObjectId(child_id) for child_id in (parent.get('children_ids', []) or [])]},
            "$or": [
                {"children_ids": {"$exists": False}},
                {"children_ids": []}
            ]
        }

        # Lọc thêm một lần nữa để đảm bảo không có parent
        def is_valid_child(listing):
            # Kiểm tra không phải là parent hiện tại
            if str(listing['_id']) == parent_id:
                return False
            # Kiểm tra không có children_ids hoặc children_ids rỗng
            if listing.get('children_ids') and len(listing.get('children_ids', [])) > 0:
                return False
            return True

        # Lấy tổng số records cho mỗi loại
        total_existing = db.listings.count_documents(existing_children_query)
        total_available = db.listings.count_documents(available_children_query)

        # Tính toán skip cho phân trang
        skip_existing = (page - 1) * limit
        skip_available = (page - 1) * limit

        # Lấy data với phân trang
        existing_children = list(db.listings.find(existing_children_query)
                               .skip(skip_existing)
                               .limit(limit))

        available_children = list(db.listings.find(available_children_query)
                                .skip(skip_available)
                                .limit(limit))

        # Lọc lại cả hai danh sách
        existing_children = [child for child in existing_children if is_valid_child(child)]
        available_children = [child for child in available_children if is_valid_child(child)]

        # Chuyển đổi ObjectId thành string
        existing_children = [model_to_dict(child) for child in existing_children]
        available_children = [model_to_dict(child) for child in available_children]

        return jsonify({
            'success': True,
            'data': {
                'existing_children': {
                    'items': existing_children,
                    'pagination': {
                        'total': total_existing,
                        'page': page,
                        'limit': limit,
                        'total_pages': math.ceil(total_existing / limit)
                    }
                },
                'available_children': {
                    'items': available_children,
                    'pagination': {
                        'total': total_available,
                        'page': page,
                        'limit': limit,
                        'total_pages': math.ceil(total_available / limit)
                    }
                }
            },
            'message': 'Successfully fetched available children'
        })

    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500


