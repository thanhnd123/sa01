from flask import Flask, request, jsonify, Blueprint

app = Blueprint('heyetsy', __name__)

@app.route('/api/heyetsy/me', methods = ["GET"])
def me():
    return jsonify({
        "id": "01g6s9zjd92as9e2zsqdtdgzay",
        "name": "VI ANH TU",
        "email": "thienduongvangem.ntt@gmail.com",
        "subscription_type": "basic",
        "subscription_days_left": 999999
    })