from flask import Blueprint, request, jsonify
from flask_jwt_extended import get_jwt_identity
from app.modules.teamexp.model import find, create, update, delete, all, paginate, getDataJson, pluck, truncate
from database.connect_database import connect_database
from bson.objectid import ObjectId
from app.services.helpers import model_to_dict
from app.services.aws_service import aws
import time
from datetime import datetime

ideal_bp = Blueprint('ideals', __name__)
from app.services.helpers import model_to_dict
from database.connect_database import connect_database



@ideal_bp.route('/ideals/create', methods = ["POST"])
def createIdeal():
    db = connect_database()
    user_id = get_jwt_identity()
    try:
        # Xử lý FormData thay vì JSON
        data = {}
        
        # Lấy các field text
        if request.form.get('title'):
            data['title'] = request.form.get('title')
        if request.form.get('tags'):
            data['tags'] = request.form.get('tags')
        if request.form.get('user_id'):
            data['user_id'] = request.form.get('user_id')
        # Thêm dòng này để lấy description
        if request.form.get('description'):
            data['description'] = request.form.get('description')
            
        # Xử lý file upload
        data['item_id'] = user_id+"_"+str(int(time.time()))
        images = []  # Array để lưu URLs của images
        
        if 'banner' in request.files:
            banner_file = request.files['banner']
            if banner_file and banner_file.filename:
                # Upload banner lên AWS S3
                # Chuyển ảnh về JPG và resize về 1000x1000 trước khi upload
                from PIL import Image
                import io

                # Đọc file ảnh từ request
                img = Image.open(banner_file.stream)
                # Resize về 1000x1000 (giữ tỉ lệ, thêm padding nếu cần)
                img = img.convert("RGB")
                img.thumbnail((1000, 1000), Image.LANCZOS)
                new_img = Image.new("RGB", (1000, 1000), (255, 255, 255))
                offset_x = (1000 - img.width) // 2
                offset_y = (1000 - img.height) // 2
                new_img.paste(img, (offset_x, offset_y))
                # Lưu vào buffer dưới dạng JPG
                buffer = io.BytesIO()
                new_img.save(buffer, format="JPEG", quality=90)
                buffer.seek(0)
                # Tạo file-like object cho AWS upload
                class FileObj(io.BytesIO):
                    filename = "banner.jpg"
                banner_file_jpg = FileObj(buffer.read())
                banner_file_jpg.seek(0)
                banner_url = aws.upload_file(banner_file_jpg, 'ideals/manual/'+user_id+'/'+data['item_id']+"/banner.jpg")
                data['banner'] = banner_url
                
        if 'png' in request.files:
            png_file = request.files['png']
            if png_file and png_file.filename:
                # Upload PNG lên AWS item_id
                png_url = aws.upload_file(png_file, 'ideals/manual/'+user_id+'/'+data['item_id'].replace(" ", "_")+"/png.png")
                data['png'] = png_url
        
        # Xử lý multiple images
        for key in request.files.keys():
            if key.startswith('images['):
                image_file = request.files[key]
                if image_file and image_file.filename:
                    # Upload image lên AWS S3
                    image_index = key.replace('images[', '').replace(']', '')
                    image_url = aws.upload_file(image_file, f'ideals/manual/{user_id}/{data["item_id"]}/images/image_{image_index}.jpg')
                    images.append(image_url)
        
        data['seller_id'] = user_id
        now = datetime.now()
        user = db.users.find_one({"_id": ObjectId(user_id)})
        product_data = {
            "banner": data.get('banner', ''),
            "images": images,  # Thêm images array vào database
            "campaign_ids": [],
            "png": data.get('png', ''),
            "item_id": data['item_id'],
            "market": 'custom',
            "store": user['username'],
            "title": data['title'],
            "tags": data.get('tags', []),
            "hey_etsy_tags": data.get('tags', []),
            # Thêm dòng này để lưu description
            "description": data.get('description', ''),
            "product_type": data.get('product_type', ''),
            "type_item": "ideal",
            "daily_views": 0,
            "views_24h": 0,
            "total_views": 0,
            "estimated_revenue": 0,
            "rate_favorite": 0,
            "total_farvorites": 0,
            'team_ids': [str(user['team_id'])],
            'user_ids': [str(user_id)],
            "last_modified": int(now.timestamp()),
            "original_creation": int(now.timestamp()),
            "created_at": int(now.timestamp()),
            "updated_at": int(now.timestamp())
        }
        result = db.product_ideals.insert_one(product_data)        
        return jsonify({
            "response": "success",
            "message": "Create ideal success",
        }) 
    except Exception as exception:
        result = f"Error when create ideal: {exception}"    
        return jsonify({
            "response": "error",
            "message": f"Error when create ideal: {exception}",
            "line": exception.__traceback__.tb_lineno
        }), 500

@ideal_bp.route('/ideals/list', methods = ["GET"])
def list():
    db = connect_database()
    try:
        limit = request.args.get('limit', default=None)
        if limit is None:
            limit = 25
        
        query = None
        sort = None
        page = request.args.get('page', default=1)
        search = request.args.get('search', "").strip()
        sort = request.args.get('sort', '').strip()
        sortBy = request.args.get('sort-by', '').strip()
        my_ideals = request.args.get('my_ideals', '').strip()
        userId = get_jwt_identity()
        user = db.users.find_one({"_id": ObjectId(userId)})
        if search:
            query = {
                "query": "title",
                "value": search.lower()
            }
        if sort and sortBy:
            sort = {
                "query": sort,
                "value": sortBy
            }
        
        table = connect_database()['product_ideals']
        skip = (int(page) - 1) * int(limit)
        
        # Build query
        mongo_query = {}
        if query:
            mongo_query[query['query']] = {"$regex": query['value'].lower(), "$options": "i"}
        if user and 'team_id' in user:            
            mongo_query['team_ids'] = {"$in": [str(user['team_id'])]}
            
        # Thêm filter My Ideals
        if my_ideals == 'true':
            mongo_query['user_ids'] = {"$in": [str(userId)]}
            
        # Build sort
        mongo_sort = [('created_at', -1)]
        if sort and sortBy:
            mongo_sort = [(sort['query'], 1 if sort['value'] == 'asc' else -1)]
            
        # Get total count
        total = table.count_documents(mongo_query)
        
        # Get paginated results
        cursor = table.find(mongo_query).sort(mongo_sort).skip(skip).limit(int(limit))
        results = [doc for doc in cursor]
        
        # Convert ObjectId to string
        for item in results:
            item['_id'] = str(item['_id'])
            
        result = {
            'data': results,
            'total': total,
            'page': int(page),
            'limit': int(limit),
            'total_pages': (total + int(limit) - 1) // int(limit)
        }
        return jsonify(result)
    except Exception as exception:
        return jsonify({
            "error": f"Error when get data: {str(exception)}"
        }), 500

@ideal_bp.route('/ideals/delete', methods = ["GET"])
def destroy():
    id = request.args.get('id')
    try:
        result = delete(id, 'product_ideals')
    except Exception as exception:
        result = f"Error when delete {id} data in table product_ideals: {exception}"
    return jsonify({
        "response": result
    })
    
@ideal_bp.route('/ideals/add-to-favorite', methods = ["POST"])
def addToFavorite():
    data = request.get_json()
    try:
        result = create(data, 'product_ideals_ref_users')
    except Exception as exception:
        result = f"Error when add to favorite: {exception}"
    return jsonify({
        "response": result
    })
    
@ideal_bp.route('/ideals/product-ideals-ref-users/list', methods = ["GET"])
def listProductIdealsRefUsers():
    limit = request.args.get('limit', default=None)
    if limit is None:
        try:
            result = all('product_ideals_ref_users')
        except Exception as exception:
            result = f"Error when get all data in table product_ideals: {exception}"
        return jsonify({
            "response": result
        })
    else:
        query = None
        sort = None
        page = request.args.get('page', default=1)
        search = request.args.get('search', '').strip()
        sort = request.args.get('sort', '').strip()
        sortBy = request.args.get('sort-by', '').strip()
        userId = request.args.get('user_id', '').strip()
        try:
            if search:
                query = {
                    "query": "title",
                    "value": search
                }
            if sort and sortBy:
                sort = {
                    "query": sort,
                    "value": sortBy
                }
            result = paginate('product_ideals_ref_users', page=page, limit=limit, query=query, sort=sort, userId=userId)
            return jsonify(result)
        except Exception as exception:
            result = f"Error when get paginate data in table product_ideals_ref_users: {exception}"
            return jsonify({
                "response": result
            })
            
@ideal_bp.route('/ideals/product-ideals-ref-users/remove-favorite', methods = ["GET"])
def removeFavorite():
    id = request.args.get('_id')
    try:
        result = delete(id, 'product_ideals_ref_users')
        if result == f"Delete {id} in table product_ideals_ref_users success!":
            result = 'done'
    except Exception as exception:
        result = f"Error when remove favorite: {exception}"
    return jsonify({
        "response": result
    })
    
@ideal_bp.route('/ideals/product-ideals-ref-users/sync-to-design', methods = ["POST"])
def syncToDesign():
    data = request.get_json()
    try:
        productIdealIds = data['product_ideal_id']
        productType = data['product_type']
        sellerNote = data['seller_note']
        refId = data['seller_id']
        findData = find(refId, 'product_ideals_ref_users', 'user_id')
        if findData is None:
            dataRequest = {
                'type_request': 'add_to_favorite',
                'user_id': refId,
                'product_ideal_id': productIdealIds,
                "product_type": productType,
                "seller_note": sellerNote
            }
            findData = create(dataRequest, 'product_ideals_ref_users')
        setData = {
            "product_type": productType,
            "seller_note": sellerNote
        }
        findData['_id'] = str(findData['_id'])
        update('product_ideals_ref_users', setData, pushData=None, _id=findData['_id'])
        findData = find(refId, 'product_ideals_ref_users', 'user_id')
        result = "Sync to design success!"
    except Exception as exception:
        result = f"Error when sync to design: {exception}"
    return jsonify({
        "response": result
    })



@ideal_bp.route('/ideals/show', methods = ["GET"])
def getIdealById():
    _id = request.args.get('id')
    try:
        db = connect_database()
        print(_id)
        result = db['product_ideals'].find_one({"_id": ObjectId(_id)})
        result = model_to_dict(result)
        return jsonify({
            "success": True,
            "data": result,
            "message": "Get ideal by id success!"
        })
    except Exception as exception:
        result = f"Error when get ideal by id: {exception}"
        return jsonify({
            "success": False,
            "message": result
        })


@ideal_bp.route('/ideals/update-png', methods = ["POST"])
def updatePng():
    try:
        # Lấy file và ideal_id từ FormData
        if 'png' not in request.files:
            return jsonify({
                "success": False,
                "message": "No file uploaded"
            }), 400

        file = request.files['png']
        ideal_id = request.form.get('ideal_id')

        if not ideal_id:
            return jsonify({
                "success": False,
                "message": "No ideal_id provided"
            }), 400

        if file.filename == '':
            return jsonify({
                "success": False,
                "message": "No file selected"
            }), 400

        # Kiểm tra file type
        if not file.content_type.startswith('image/'):
            return jsonify({
                "success": False,
                "message": "File must be an image"
            }), 400

        # Upload file lên S3
        try:
            s3_path = f'ideals/png/{ideal_id}/{ideal_id}'+str(int(time.time()))
            s3_url = aws.upload_file(file, s3_path)
        except Exception as e:
            print(e)
            return jsonify({
                "success": False,
                "message": f"Failed to upload file to S3: {str(e)}"
            }), 500

        # Cập nhật đường dẫn file trong database
        try:
            update_data = {
                "png": s3_url
            }
            db = connect_database()
            result = db['product_ideals'].update_one({"_id": ObjectId(ideal_id)}, {"$set": update_data})
            if result.modified_count > 0:
                return jsonify({
                    "success": True,
                    "message": "PNG updated successfully",
                    "data": {
                        "png_url": s3_url
                    }
                })
            else:
                return jsonify({
                    "success": False,
                    "message": "Failed to update database"
                }), 500
        except Exception as e:
            # Nếu update DB thất bại, xóa file trên S3
            try:
                aws.delete_file(s3_path)
            except:
                pass
            return jsonify({
                "success": False,
                "message": f"Failed to update database: {str(e)}"
            }), 500

    except Exception as e:
        return jsonify({
            "success": False,
            "message": f"Error updating PNG: {str(e)}"
        }), 500


@ideal_bp.route('/ideals/<string:id>/update', methods = ["PUT"])
def updateIdeal(id):
    db = connect_database()
    user_id = get_jwt_identity()
    try:
        # Xử lý FormData thay vì JSON
        data = {}
        
        # Lấy các field text
        if request.form.get('title'):
            data['title'] = request.form.get('title')
        if request.form.get('description'):
            data['description'] = request.form.get('description')
        if request.form.get('tags'):
            data['tags'] = request.form.get('tags')
            
        # Kiểm tra ideal tồn tại
        ideal = db.product_ideals.find_one({"_id": ObjectId(id)})
        if not ideal:
            return jsonify({
                "response": "error",
                "message": "Ideal not found"
            }), 404
            
        # Kiểm tra quyền edit (user phải thuộc team_ids hoặc user_ids)
        if str(user_id) not in ideal.get('user_ids', []):
            return jsonify({
                "response": "error",
                "message": "You don't have permission to edit this ideal"
            }), 403
            
        # Xử lý file upload
        update_data = {}
        
        if 'banner' in request.files:
            banner_file = request.files['banner']
            if banner_file and banner_file.filename:
                # Upload banner lên AWS S3
                from PIL import Image
                import io

                # Đọc file ảnh từ request
                img = Image.open(banner_file.stream)
                # Resize về 1000x1000 (giữ tỉ lệ, thêm padding nếu cần)
                img = img.convert("RGB")
                img.thumbnail((1000, 1000), Image.LANCZOS)
                new_img = Image.new("RGB", (1000, 1000), (255, 255, 255))
                offset_x = (1000 - img.width) // 2
                offset_y = (1000 - img.height) // 2
                new_img.paste(img, (offset_x, offset_y))
                # Lưu vào buffer dưới dạng JPG
                buffer = io.BytesIO()
                new_img.save(buffer, format="JPEG", quality=90)
                buffer.seek(0)
                # Tạo file-like object cho AWS upload
                class FileObj(io.BytesIO):
                    filename = "banner.jpg"
                banner_file_jpg = FileObj(buffer.read())
                banner_file_jpg.seek(0)
                banner_url = aws.upload_file(banner_file_jpg, f'ideals/manual/{user_id}/{ideal["item_id"]}/banner.jpg')
                update_data['banner'] = banner_url
                
        if 'png' in request.files:
            png_file = request.files['png']
            if png_file and png_file.filename:
                # Upload PNG lên AWS
                png_url = aws.upload_file(png_file, f'ideals/manual/{user_id}/{ideal["item_id"]}/png.png')
                update_data['png'] = png_url
        
        # Xử lý multiple images
        new_images = []
        existing_images = []
        
        # Lấy existing images từ form
        for key in request.form.keys():
            if key.startswith('existing_images['):
                image_url = request.form.get(key)
                if image_url:
                    existing_images.append(image_url)
        
        # Upload new images
        for key in request.files.keys():
            if key.startswith('images['):
                image_file = request.files[key]
                if image_file and image_file.filename:
                    # Upload image lên AWS S3
                    image_index = key.replace('images[', '').replace(']', '')
                    image_url = aws.upload_file(image_file, f'ideals/manual/{user_id}/{ideal["item_id"]}/images/image_{image_index}.jpg')
                    new_images.append(image_url)
        
        # Combine existing and new images
        all_images = existing_images + new_images
        if all_images:
            update_data['images'] = all_images
        
        # Update text fields
        if data.get('title'):
            update_data['title'] = data['title']
        if data.get('description'):
            update_data['description'] = data['description']
        if data.get('tags'):
            update_data['tags'] = data['tags'].split(',') if isinstance(data['tags'], str) else data['tags']
            update_data['hey_etsy_tags'] = data['tags'].split(',') if isinstance(data['tags'], str) else data['tags']
        
        # Add updated timestamp
        update_data['updated_at'] = int(time.time())
        
        # Update in database
        result = db.product_ideals.update_one(
            {"_id": ObjectId(id)},
            {"$set": update_data}
        )
        
        if result.modified_count > 0:
            return jsonify({
                "response": "success",
                "message": "Ideal updated successfully",
            })
        else:
            return jsonify({
                "response": "error",
                "message": "No changes made to ideal"
            }), 400
            
    except Exception as exception:
        return jsonify({
            "response": "error",
            "message": f"Error when update ideal: {exception}",
            "line": exception.__traceback__.tb_lineno
        }), 500


@ideal_bp.route('/ideals/<string:id>/tags', methods = ["PUT"])
def updateTags(id):
    data = request.get_json()
    try:
        db = connect_database()
        result = db['product_ideals'].update_one({"_id": ObjectId(id)}, {"$set": {"hey_etsy_tags": data['keywords']}})
    except Exception as exception:
        result = f"Error when update tags: {exception}"
    
    ideal = db.product_ideals.find_one({"_id": ObjectId(id)})
    return jsonify({
        "success": True,
        "message": "Tags updated successfully",
        "ideal": model_to_dict(ideal)
    })