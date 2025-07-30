from flask import Blueprint, request, jsonify
from app.modules.teamexp.model import find, create, update, delete, all, paginate, getDataJson, pluck, truncate

test_gpt = Blueprint('test_gpt', __name__)

@test_gpt.route('/test-gpt/<product_id>', methods = ["GET"])
def testGPT(product_id):
    try:
        result = 'done'
    except Exception as e:
        result = f"Error when test gpt: {e}"
    return jsonify({
        "result": result
    })