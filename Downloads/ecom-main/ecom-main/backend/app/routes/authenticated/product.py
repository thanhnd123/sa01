from flask import Blueprint, request, jsonify
from app.modules.teamexp.model import find, create, update, delete, all, paginate, getDataJson, pluck, truncate
from database.seeders.productTypeSeeder import productType
from app.services.aws_service import aws
from datetime import datetime
import uuid

product_bp = Blueprint('products', __name__)

@product_bp.route('/products/add-product-types', methods = ["GET"])
def addProductTypes():
    name = request.args.get('name')
    dataRecord = {
        "name": name,
        "function": "void"
    }
    create(dataRecord, 'product_types')
    allData = all('product_types')
    return jsonify({
        "result": allData
    })
    
@product_bp.route('/products/list', methods = ["GET"])
def listProducts():
    limit = request.args.get('limit', default=None)
    if limit is None:
        data = all('products')
        return jsonify({
            "result": data
        })
    else:
        query = None
        sort = None
        page = request.args.get('page', default=1)
        search = request.args.get('search', '').strip()
        sort = request.args.get('sort', '').strip()
        sortBy = request.args.get('sort-by', '').strip()
        userId = request.args.get('user_id', '').strip()
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
        try:
            result = paginate('products', page=page, limit=limit, query=query, sort=sort, userId=userId)
            return jsonify(result)
        except Exception as exception:
            result = f"Error when get paginate data in table products: {exception}"
            return jsonify({
                "response": result
            })

@product_bp.route('/products/create', methods = ['POST'])
def productCreate():
    try:
        requestData = request.form.to_dict()
        files = request.files.getlist('files[]')
        newFiles = []
        if len(files) > 0:
            title_slug = requestData.get('title', 'untitled').strip().replace(' - ', '-')
            title_slug_1 = title_slug.replace(' ', '-')
            title_slug_2 = title_slug_1.replace(',', '-')
            title_slug_3 = title_slug_2.replace("'", "-")
            now = datetime.now()
            date_path = now.strftime('%d-%m-%Y')
            countImage = 0
            for file in files:
                countImage += 1
                fileName = f"products/{date_path}/{title_slug_3}/image-number-{countImage}-uuid4-{uuid.uuid4()}"
                newFiles.append(aws.upload_file(file, fileName, file.content_type))
            requestData['images'] = newFiles
        else:
            return jsonify({
                "result": 'Field files not found in data request'
            })
        result = create(requestData, 'products')
        return jsonify({
            "result": result
        })
    except Exception as exception:
        result = f"Error when create data in table products: {exception}"
        return jsonify({
            "result": result
        })
    
@product_bp.route('/products/deletes', methods = ['POST'])
def deleteAllSelect():
    try:
        requestData = request.get_json()
        productIds = requestData['product_ids'] if 'product_ids' in requestData else None
        if productIds:
            for productId in productIds:
                delete(productId, 'products', None, 'void')
            result = "done"
        else:
            result = f"Products is null"
    except Exception as e:
        result = f"Error when delete selected data in table products: {e}"
    return jsonify({
        "result": result
    })