from flask import Blueprint, request, jsonify
from app.modules.teamexp.model import find, create, update, delete, all, paginate, getDataJson, pluck, truncate
from database.seeders.productTypeSeeder import productType

product_bp = Blueprint('products', __name__)

@product_bp.route('/products/seed-product-types', methods = ["GET"])
def storeProductTypes():
    try:
        truncate('product_types')
        dataProductTypes = productType()
        for _, name in dataProductTypes.items():
            dataRecord = {
                "name": name,
                "function": "void"
            }
            create(dataRecord, 'product_types')
        allData = all('product_types')
        return jsonify({
            "result": allData
        })
    except Exception as exception:
        result = f"Error when sync to product types: {exception}"
        return jsonify({
            "response": result
        })

@product_bp.route('/products/product-types', methods = ["GET"])
def showProductTypes():
    data = pluck('product_types', 'name')
    return jsonify({
        "result": data
    })
    
@product_bp.route('/products/product-types/create/<name>', methods = ["GET"])
def createProductTypes(name):
    newData = {
        'name': name,
        'function': 'void'
    }
    create(newData, 'product_types')
    findData = find(name, 'product_types', 'name')
    return jsonify({
        "result": findData
    })
    
@product_bp.route('/products/check-products', methods = ["POST"])
def checkProducts():
    dataRequests = request.get_json()
    dataItems = dataRequests['ids']
    dataKeywordErrors = getDataJson('data.json')
    keywords = [item['name'].lower() for item in dataKeywordErrors]
    result = {}
    for key, value in dataItems.items():
        result[key] = {}
        titleBefore = value['title']
        titleLower = value['title'].lower()
        titleArray = set(titleLower.split())
        checkIssueIdeal = find(key, 'product_ideals', 'item_id')
        if checkIssueIdeal:
            result[key]["exists"] = True
        else:
            result[key]["exists"] = False
        result[key]["restrict"] = []
        result[key]["status"] = ""
        result[key]["replace"] = ""
        for keyword in keywords:
            keywordArray = set(keyword.split())
            if keywordArray.issubset(titleArray):
                result[key]["restrict"].append(keyword)
        if len(result[key]["restrict"]) != 0:
            for keyword in result[key]["restrict"]:
                titleBefore = titleBefore.replace(keyword, "")
        result[key]["replace"] = titleBefore
    return jsonify({
        "result": result
    })