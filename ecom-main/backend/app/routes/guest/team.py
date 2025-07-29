from flask import Blueprint, request, jsonify
from app.modules.teamexp.model import find, create, update, delete, all, paginate, getDataJson, pluck, truncate
from database.seeders.productTypeSeeder import teams

team_bp = Blueprint('teams', __name__)

@team_bp.route('/teams/seed-teams', methods = ["GET"])
def teamStore():
    truncate('teams')
    dataTeams = teams()
    for _, name in dataTeams.items():
        dataRecord = {
            "name": name,
            "function": "void"
        }
        create(dataRecord, 'teams')
    allData = all('teams')
    return jsonify({
        "result": allData
    })