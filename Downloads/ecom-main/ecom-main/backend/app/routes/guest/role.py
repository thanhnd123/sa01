from flask import Blueprint, request, jsonify
from app.modules.teamexp.model import find, create, update, delete, all, paginate, getDataJson, pluck, truncate
from database.seeders.productTypeSeeder import roles

role_bp = Blueprint('roles', __name__)

@role_bp.route('/roles/seed-roles', methods = ["GET"])
def roleStore():
    truncate('roles')
    dataRoles = roles()
    for _, name in dataRoles.items():
        dataRecord = {
            "name": name,
            "function": "void"
        }
        create(dataRecord, 'roles')
    allData = all('roles')
    return jsonify({
        "result": allData
    })