from flask import Flask, request, jsonify, Blueprint, send_from_directory
from app.modules import product

app = Blueprint('product', __name__)
UPLOAD_FOLDER = '/home/skynet3/ECOM/backend/data/mockups_image'  

@app.route('/api/products/check', methods = ["POST"])
def check():
    data = request.get_json()
    result = product.check_title(data['ids'])
    return jsonify({
        "result": result
    })

@app.route('/api/product/store', methods = ["POST"])
def store():
    data = request.get_json()
    result = product.store(data)
    return jsonify({
        "result": result
    })


@app.route('/api/product/get-catalog', methods = ["GET"])
def get_catalog():
    data = product.get_product_types()
    return jsonify({
        "result": data
    })
    
@app.route('/api/product-type/add', methods = ["POST"])
def add_product_type():
    data = request.get_json()
    result = product.add_product_type(data)
    return jsonify({
        "result": result
    })

@app.route('/api/product-type/<id>/edit', methods = ["PUT"])
def edit_product_type(id):
    data = request.get_json()
    result = product.edit_product_type(id, data)
    return jsonify({
        "result": result
    })
    
@app.route('/api/product-type/<id>/delete', methods = ["DELETE"])
def delete_product_type(id):
    result = product.delete_product_type(id)
    return jsonify({
        "result": result
    })

# @app.route('/api/products', defaults={'page': 1})
@app.route('/api/products', methods = ["GET"])
def list_products():
    # Lấy các tham số từ query string
    page = request.args.get('page', default=1, type=int)
    limit = request.args.get('limit', default=25, type=int)
    search = request.args.get('search', None)
    sort_asc = request.args.get('sort_asc', None)
    sort_desc = request.args.get('sort_desc', None)
    
    response = product.lists(page, limit, search, sort_asc, sort_desc)
    return jsonify({
        "result": response["data"],
        "total": response["total"],
        "per_page": response["per_page"],
        "current_page": response["current_page"],
        "last_page": response["last_page"]
    })
    
@app.route('/api/mockup-products/<user_id>/<page>', methods=["GET"])
def list_mockup_products(user_id, page):  
    search = request.args.get('search', None)
    sort_asc = request.args.get('sort_asc', None)
    sort_desc = request.args.get('sort_desc', None)
    
    response = product.list_mockups(page, user_id, search, sort_asc, sort_desc)
    return jsonify({
        "result": response["data"],
        "total": response["total"],
        "per_page": response["per_page"],
        "current_page": response["current_page"],
        "last_page": response["last_page"]
    })

@app.route('/api/product/<id>/show', methods = ["GET"])
def get_product(id):
    products = product.show("_id", id)
    return jsonify({
        "success": True,
        "data": products
    })

@app.route('/api/product/<id>/update', methods = ["PUT"])
def update_product(id):
    if request.content_type == "application/json":
        data = request.get_json()
    else:
        data = request.form.to_dict() 
    data['_id'] = id
    result = product.update(data)
    return jsonify({
        "result": result
    })

@app.route('/api/product/<id>/delete', methods = ["DELETE"])
def delete_product(id):
    result = product.delete(id)
    return jsonify({
        "result": result
    })

@app.route('/api/product/test', methods = ["POST"])
def test():
    data = request.get_json()
    return jsonify({
        "result": data
    })

@app.route('/data/mockups_image/<path:filename>', methods=['GET'])
def send_mockup_image(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)
    
    