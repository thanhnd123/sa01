from flask import Flask, request, jsonify, Blueprint
from app.modules import user
from flask_jwt_extended import jwt_required
from scripts.role_required import role_required
from flask_jwt_extended import get_jwt_identity
app = Blueprint('users', __name__)

@app.route('/api/users/', defaults={'page': 1})
@app.route('/api/users/<page>', methods = ["GET"])
@jwt_required()
def list_users(page):
    # Lấy các tham số từ query string
    search = request.args.get('search', None)
    sort_asc = request.args.get('sort_asc', None)
    sort_desc = request.args.get('sort_desc', None)
    
    response = user.lists(page, search, sort_asc, sort_desc)
    return jsonify({
        "result": response["data"],
        "total": response["total"],
        "per_page": response["per_page"],
        "current_page": response["current_page"],
        "last_page": response["last_page"]
    })

@app.route('/api/user/create', methods = ["POST"])
@jwt_required()
@role_required(['admin'])  
def create_user():
    data = request.get_json()
    users = user.store(data)
    return jsonify({
        "result": users
    })

@app.route('/api/user/<id>/show', methods = ["GET"])
@jwt_required()
def get_user(id):
    users = user.show(id)
    return jsonify({
        "result": users
    })

@app.route('/api/user/<id>/update', methods = ["PUT"])
@jwt_required()
@role_required(['admin'])  
def update_user(id):
    data = request.get_json()
    data['_id'] = id
    result = user.update(data)
    return jsonify({
        "result": result
    })

@app.route('/api/user/<id>/delete', methods = ["DELETE"])
@jwt_required()
@role_required(['admin'])  
def delete_user(id):
    result = user.delete(id)
    return jsonify({
        "result": result
    })