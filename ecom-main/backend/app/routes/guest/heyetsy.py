from flask import Blueprint, request, jsonify
from app.modules.teamexp.model import find, create, update, delete, all, paginate, getDataJson, pluck, truncate

heyetsy_bp = Blueprint('heyetsy', __name__)

@heyetsy_bp.route('/get-token-hey-etsy', methods = ['GET'])
def getTokenHeyEtsy():
    return jsonify({
        "result": 'KD4ToHY91NzTkaPFztw07m4dmh9IsbVgAeSDbo42'
    })