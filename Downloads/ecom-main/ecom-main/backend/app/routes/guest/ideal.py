from flask import Blueprint, request, jsonify
from app.modules.teamexp.model import find, create, update, delete, all, paginate, getDataJson, pluck, truncate
from database.connect_database import connect_database
from datetime import datetime

ideal_bp = Blueprint('ideals', __name__)


@ideal_bp.route('/create', methods = ["POST"])
def store():
    try:
        data = request.get_json()
        products_data = data['products']
        session = data['session']
        for product in products_data:
            product['seller_id'] = session['user']['id']

        data['products'] = products_data
        db = connect_database()
        table = db.product_ideals
        now = datetime.now()
        user = session['user']
        ideals = []
        for item in products_data:
            item_id = item.get('item_id',None)
            if item_id is None:
                raise Exception('Item id is required')
            banner = item.get('banner', '')
            images = item.get('images', [])
            shop = item.get('store', '')
            checkProductIdeal = find(item_id, 'product_ideals', 'item_id')
            if checkProductIdeal is None:
                newData = {
                    "banner": banner,
                    "images": images,
                    "item_id": item_id,
                    "market": item['market'],
                    "store": shop,
                    "title": item['title'],
                    "tags": item.get('tags', []),
                    "product_type": item.get('product_type', ''),
                    "type_item": "ideal",
                    "daily_views": item.get('daily_views', 0),
                    "views_24h": item.get('views_24h', 0),
                    "total_views": item.get('total_views', 0),
                    "estimated_revenue": item.get('estimated_revenue', 0),
                    "rate_favorite": item.get('rate_favorite', 0),
                    "total_farvorites": item.get('total_farvorites', 0),
                    "last_modified": item.get('last_modified', ''),
                    "original_creation": item.get('original_creation', ''),
                    "sold_24h": item.get('sold_24h', 0),
                    "total_sold": item.get('total_sold', 0),
                    "hey_etsy_tags": item.get('hey_etsy_tags', []),
                    "created_at": int(now.timestamp()),
                    "updated_at": now.strftime("%d-%m-%Y %H:%M:%S"),
                    'team_ids': [str(user['team_id'])],
                    'user_ids': [str(user['id'])]
                }
                result = table.insert_one(newData)
                ideal = table.find_one({"_id": result.inserted_id})
                ideal["_id"] = str(ideal["_id"])
                ideals.append(newData)
            else:
                updateData = {
                    "banner": banner,
                    "images": images,
                    "market": item['market'],
                    "store": shop,
                    "title": item['title'],
                    "tags": item.get('tags', []),
                    "product_type": item.get('product_type', ''),
                    "type_item": "ideal",
                    "daily_views": item.get('daily_views', 0), 
                    "views_24h": item.get('views_24h', 0),
                    "total_views": item.get('total_views', 0),
                    "estimated_revenue": item.get('estimated_revenue', 0),
                    "rate_favorite": item.get('rate_favorite', 0),
                    "total_farvorites": item.get('total_farvorites', 0),
                    "last_modified": item.get('last_modified', ''),
                    "original_creation": item.get('original_creation', ''),
                    "sold_24h": item.get('sold_24h', 0),
                    "total_sold": item.get('total_sold', 0),
                    "hey_etsy_tags": item.get('hey_etsy_tags', []),
                    "updated_at": now.strftime("%d-%m-%Y %H:%M:%S"),
                }
                
                newTeamId = str(user['team_id'])
                newSellerId = str(user['id'])
                
                if len(updateData['images']) <= len(checkProductIdeal['images']):
                    updateData.pop('images', None)
                    updateData.pop('banner', None)
                print(checkProductIdeal['team_ids'])
                if newTeamId not in checkProductIdeal['team_ids']:
                    update('product_ideals', updateData, {"team_ids": newTeamId}, checkProductIdeal['_id'])
                    
                if newSellerId not in checkProductIdeal['user_ids']:
                    update('product_ideals', updateData, {"user_ids": newSellerId}, checkProductIdeal['_id'])
                else:
                    update('product_ideals', updateData, None, checkProductIdeal['_id'])
                checkProductIdeal["_id"] = str(checkProductIdeal["_id"])
                ideals.append(checkProductIdeal)         
        return jsonify({
            "status": "success",
            "message": "Create ideal success",
        
        })
    except Exception as exception:
        return jsonify({
            "status": "error",
            "message": str(exception),
            "line": exception.__traceback__.tb_lineno
        }), 500