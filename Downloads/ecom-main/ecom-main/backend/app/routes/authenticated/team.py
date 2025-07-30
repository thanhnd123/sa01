from flask import Blueprint, request, jsonify
from app.services.helpers import model_to_dict
from app.modules.teamexp.model import find, create, update, delete, all, paginate, getDataJson, pluck, truncate
from .decorators import admin_required
from flask_jwt_extended import get_jwt_identity
from database.connect_database import connect_database
from bson.objectid import ObjectId
from datetime import datetime

team_bp = Blueprint('teams', __name__)

@team_bp.route('/teams/list', methods = ["GET"])
@admin_required
def list():
    try:
        pluckCall = request.args.get('pluck', None)
        if pluckCall is not None:
            data = pluck('teams', 'name')
        else:
            data = all('teams')
        result = []
        for item in data:
            result.append(model_to_dict(item))
        return jsonify({
            "result": result,
            "status": "success"
        })
    except Exception as excep:
        return jsonify({
            "result": f"/teams/list error {excep}",
        })


@team_bp.route('/teams', methods = ["GET"])
@admin_required
def list_team():
    try:
        # Lấy tham số phân trang từ request
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 10))
        pluckCall = request.args.get('pluck', None)

        # Kết nối database
        db = connect_database()
        if db is None:
            return jsonify({
                "result": "Không thể kết nối database",
                "success": False
            }), 500

        if pluckCall is not None:
            # Nếu chỉ cần lấy tên teams
            cursor = db.teams.find({}, {'name': 1})
            result = [{'name': doc['name']} for doc in cursor]
            return jsonify({
                "result": result,
                "success": True
            })
        else:
            # Tính toán skip cho phân trang
            skip = (page - 1) * per_page
            
            # Lấy tổng số teams
            total = db.teams.count_documents({})
            
            # Lấy danh sách teams với phân trang
            cursor = db.teams.find().skip(skip).limit(per_page)
            result = []
            for doc in cursor:
                result.append(model_to_dict(doc))
            
            # Tính toán tổng số trang
            total_pages = (total + per_page - 1) // per_page
            
            return jsonify({
                "data": result,
                "pagination": {
                    "current_page": page,
                    "per_page": per_page,
                    "total": total,
                    "total_pages": total_pages
                },
                "success": True
            })
    except Exception as excep:
        return jsonify({
            "result": f"/teams/list error {excep}",
            "success": False
        }), 500


@team_bp.route('/teams/create', methods = ["POST"])
@admin_required
def create_team():
    try:
        data = request.get_json()
        name = data.get('name')
        description = data.get('description', '')
        
        if not name:
            return jsonify({
                "result": "Team name is required",
                "status": "error"
            }), 400
            
        db = connect_database()
        
        # Kiểm tra team đã tồn tại chưa
        existing_team = db.teams.find_one({"name": name})
        if existing_team:
            return jsonify({
                "result": "Team name already exists",
                "status": "error"
            }), 400
            
        # Tạo team mới
        new_team = {
            "name": name,
            "description": description,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
        
        result = db.teams.insert_one(new_team)
        
        return jsonify({
            "result": "Team created successfully",
            "status": "success",
            "team_id": str(result.inserted_id)
        })
        
    except Exception as excep:
        return jsonify({
            "result": f"/teams/create error {excep}",
            "status": "error"
        }), 500

@team_bp.route('/teams/update/<team_id>', methods = ["PUT"])
@admin_required
def update_team(team_id):
    try:
        data = request.get_json()
        name = data.get('name')
        description = data.get('description')
        
        if not name:
            return jsonify({
                "result": "Team name is required",
                "status": "error"
            }), 400
            
        db = connect_database()
        
        # Kiểm tra team có tồn tại không
        team = db.teams.find_one({"_id": ObjectId(team_id)})
        if not team:
            return jsonify({
                "result": "Team not found",
                "status": "error"
            }), 404
            
        # Kiểm tra tên mới có bị trùng không
        if name != team.get('name'):
            existing_team = db.teams.find_one({"name": name})
            if existing_team:
                return jsonify({
                    "result": "Team name already exists",
                    "status": "error"
                }), 400
        
        # Cập nhật team
        update_data = {
            "name": name,
            "updated_at": datetime.utcnow()
        }
        if description is not None:
            update_data["description"] = description
            
        db.teams.update_one(
            {"_id": ObjectId(team_id)},
            {"$set": update_data}
        )
        
        return jsonify({
            "result": "Team updated successfully",
            "status": "success"
        })
        
    except Exception as excep:
        return jsonify({
            "result": f"/teams/update error {excep}",
            "status": "error"
        }), 500

@team_bp.route('/teams/delete/<team_id>', methods = ["DELETE"])
@admin_required
def delete_team(team_id):
    try:
        db = connect_database()
        
        # Kiểm tra team có tồn tại không
        team = db.teams.find_one({"_id": ObjectId(team_id)})
        if not team:
            return jsonify({
                "result": "Team not found",
                "status": "error"
            }), 404
            
        # Kiểm tra xem có user nào đang thuộc team này không
        users_in_team = db.users.count_documents({"team_id": team_id})
        if users_in_team > 0:
            return jsonify({
                "result": "Cannot delete team with existing members",
                "status": "error"
            }), 400
            
        # Xóa team
        db.teams.delete_one({"_id": ObjectId(team_id)})
        
        return jsonify({
            "result": "Team deleted successfully",
            "status": "success"
        })
        
    except Exception as excep:
        return jsonify({
            "result": f"/teams/delete error {excep}",
            "status": "error"
        }), 500

@team_bp.route('/teams/switch', methods = ["POST"])
@admin_required
def switch():
    try:
        data = request.get_json()
        team_id = data.get('team_id')
        current_user_id = get_jwt_identity()
        db = connect_database()
        
        if not team_id:
            return jsonify({
                "result": "Team ID is required",
                "status": "error"
            }), 400
            
        # Kiểm tra team có tồn tại không
        team = db.teams.find_one({"_id": ObjectId(team_id)})
        if not team:
            return jsonify({
                "result": "Team not found",
                "status": "error"
            }), 404
            
        # Cập nhật team_id trong database
        db.users.update_one(
            {"_id": ObjectId(current_user_id)},
            {
                "$set": {
                    "team_id": team_id,
                    "team_name": team.get('name')
                }
            }
        )
        
        # Lấy thông tin user đã cập nhật
        updated_user = db.users.find_one({"_id": ObjectId(current_user_id)})
        
        return jsonify({
            "result": "Team switched successfully",
            "status": "success",
        })
        
    except Exception as excep:
        return jsonify({
            "result": f"/teams/switch error {excep}",
            "status": "error"
        }), 500

@team_bp.route('/teams/<team_id>', methods = ["GET"])
@admin_required
def get_team(team_id):
    try:
        db = connect_database()
        
        # Lấy thông tin team
        team = db.teams.find_one({"_id": ObjectId(team_id)})
        if not team:
            return jsonify({
                "result": "Team not found",
                "status": "error"
            }), 404
            
        # Lấy danh sách thành viên trong team
        members = list(db.users.find(
            {"team_id": team_id},
            {"password": 0}  # Không lấy password
        ))
        
        # Chuyển ObjectId thành string
        team["_id"] = str(team["_id"])
        for member in members:
            member["_id"] = str(member["_id"])
            
        return jsonify({
            "result": {
                "team": team,
                "members": members
            },
            "status": "success"
        })
        
    except Exception as excep:
        return jsonify({
            "result": f"/teams/get error {excep}",
            "status": "error"
        }), 500