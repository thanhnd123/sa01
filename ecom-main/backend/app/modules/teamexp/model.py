from database.connect_database import connect_database
from flask import Flask, request, jsonify, send_from_directory
from bson import ObjectId
from datetime import datetime
import os
import base64
import uuid
import json
import jwt
import shutil


exp_ecom_database = connect_database()
now = datetime.now()

def saveBase64Image(base64String, saveFolder="data/teamexp/images_crawl_tool_spy"):
    os.makedirs(saveFolder, exist_ok=True)
    if "," in base64String:
        header, encoded = base64String.split(",", 1)
    else:
        encoded = base64String
        header = "data:image/jpeg;base64"
    if "image/jpeg" in header:
        ext = "jpg"
    elif "image/png" in header:
        ext = "png"
    elif "image/webp" in header:
        ext = "webp"
    else:
        ext = "jpg"
    filename = f"{uuid.uuid4()}.{ext}"
    filepath = os.path.join(saveFolder, filename)
    with open(filepath, "wb") as f:
        f.write(base64.b64decode(encoded))
    return filepath

def find(id, tableName, query=None, all=False):
    table = exp_ecom_database[tableName]
    if query:
        tableFind = table.find_one({query: id})
    else:
        tableFind = table.find_one({"_id": ObjectId(id)})
    if all:
        tableFind = table.find({
            query: {
                "$regex": str(id),
                "$options": "i"
            }
        })
        results = []
        for item in tableFind:
            item["_id"] = str(item["_id"])
            results.append(item)
        return results
    if tableFind:
        tableFind["_id"] = str(tableFind["_id"])
        return tableFind
    else:
        return None
    
def all(tableName, query=None):
    table = exp_ecom_database[tableName]
    if query:
        queryFilter = {
            f"{query['query']}": {
                "$regex": query['value'],
                "$options": "i"
            }
        }
        all = list(table.find(queryFilter))
    else:
        all = list(table.find())
    for p in all:
        p["_id"] = str(p["_id"])
    return all
    
def create(data, tableName):
    table = exp_ecom_database[tableName]
    # type_request: tool_spy_crawl
    if 'type_request' in data and data['type_request'] == 'tool_spy_crawl':
        items = data['products']
        ideals = []
        seller_id = ObjectId(items[0]['seller_id'])
        user = exp_ecom_database['users'].find_one({"_id": seller_id})
        for item in items:
            checkProductIdeal = find(item['id'], 'product_ideals', 'item_id')
            if checkProductIdeal is None:
                
                newData = {
                    "banner": item['banner'],
                    "images": item['images']['images'],
                    "item_id": item['id'],
                    "market": item['market'],
                    "store": item['shop']['name'],
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
                    'user_ids': [str(user['_id'])]
                }
                result = table.insert_one(newData)
                ideal = table.find_one({"_id": result.inserted_id})
                ideal["_id"] = str(ideal["_id"])
                ideals.append(newData)
            else:
                updateData = {
                    "banner": item['images']['main'],
                    "images": item['images']['images'],
                    "market": item['market'],
                    "store": item['shop']['name'],
                    "title": item['title'],
                    "tags": item['tags'],
                    "product_type": item['product_type'],
                    "type_item": "ideal",
                    "daily_views": item['daily_views'], 
                    "views_24h": item['views_24h'],
                    "total_views": item['total_views'],
                    "estimated_revenue": item['estimated_revenue'],
                    "rate_favorite": item['rate_favorite'],
                    "total_farvorites": item['total_farvorites'],
                    "last_modified": item['last_modified'],
                    "original_creation": item['original_creation'],
                    "sold_24h": item['sold_24h'],
                    "total_sold": item['total_sold'],
                    "hey_etsy_tags": item['hey_etsy_tags'],
                    "updated_at": now.strftime("%d-%m-%Y %H:%M:%S"),
                }
                
                newTeamId = str(user['team_id'])
                newSellerId = str(user['_id'])
                
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
        return ideals
    # type_request: tool_profulfill_etsy
    elif 'type_request' in data and data['type_request'] == 'tool_profulfill_etsy_crawl':
        newData = {
            "banner": data['images']['main'],
            "campaign_ids": [],
            "images": data['images']['images'],
            "item_id": data['id'],
            "market": 'Etsy',
            "store": data['shop']['name'],
            "title": data['title'],
            "tags": data['tags'],
            "product_type": data['type'],
            "type_item": "ideal",
            "daily_views": data['daily_views'],
            "views_24h": data['views_24h'],
            "total_views": data['total_views'],
            "estimated_revenue": data['estimated_revenue'],
            "rate_favorite": data['rate_favorite'],
            "total_farvorites": data['total_farvorites'],
            "last_modified": data['last_modified'],
            "original_creation": data['original_creation'],
            "sold_24h": data['sold_24h'],
            "total_sold": data['total_sold'],
            "hey_etsy_tags": data['hey_etsy_tags'],
            "created_at": now.strftime("%d-%m-%Y %H:%M:%S"),
            "updated_at": now.strftime("%d-%m-%Y %H:%M:%S")
        }
        table.insert_one(newData)
    elif 'type_request' in data and data['type_request'] == 'create_user':
        data['created_at'] = now.strftime("%d-%m-%Y %H:%M:%S")
        data['updated_at'] = now.strftime("%d-%m-%Y %H:%M:%S")
        if data['token_admin'] and data['token_admin'] == "$2y$12$UqTmw4c437JJpWwsLBFBaOv4tKJoLTnpWZqcuzon5amDHLAk6RPim":
            checkEmail = find(data['email'], 'users', 'email')
            if checkEmail is None:
                SECRETKEY = data['email']
                token = jwt.encode({
                    "name": data['name'],
                    "email": data['email'],
                    "password": data['password']
                }, SECRETKEY, algorithm='HS256')
                data['token_user'] = token
                table.insert_one(data)
                findData = find(data['email'], 'users', 'email')
                return findData
            else:
                result = f"This email has using! Please choice other email!"
        else:
            result = f"Token admin is not correct!"
        return result
    elif 'type_request' in data and data['type_request'] == 'add_to_favorite':
        # findData = find(data['user_id'], 'product_ideals_ref_users', 'user_id')
        data['created_at'] = now.strftime("%d-%m-%Y %H:%M:%S")
        data['updated_at'] = now.strftime("%d-%m-%Y %H:%M:%S")
        
        # if findData is None:
        newData = {
            "seller_id": data['user_id'],
            "ideal_id": data['product_ideal_id'],
            "product_type": data['product_type'],
            "seller_note": data['seller_note'],
            "created_at": data['created_at'],
            "updated_at": data['updated_at']
        }
        result = table.insert_one(newData)
        findData = find(result.inserted_id, 'product_ideals_ref_users')
            # findData['_id'] = str(findData['_id'])
        return findData
        # else:
        #     if data['product_ideal_id'] not in findData['product_ideal_ids']:
        #         update('product_ideals_ref_users', {}, {"product_ideal_ids": data['product_ideal_id']}, findData['_id'])
        #         findData = find(data['user_id'], 'product_ideals_ref_users', 'user_id')
        #         findData['_id'] = str(findData['_id'])
                # return findData
            # else:
                # return f"Product already in favorites!"
    elif 'type_request' in data and data['type_request'] == 'sync_to_design':
        data_to_insert = data.copy()
        data_to_insert.pop('type_request')
        data_to_insert['created_at'] = now.strftime("%d-%m-%Y %H:%M:%S")
        data_to_insert['updated_at'] = now.strftime("%d-%m-%Y %H:%M:%S")
        result = table.insert_one(data_to_insert)
        findData = find(result.inserted_id, 'designs')
        findData['_id'] = str(findData['_id'])
        return findData
    elif 'function' in data and data['function'] == 'void':
        data['created_at'] = now.strftime("%d-%m-%Y %H:%M:%S")
        data['updated_at'] = now.strftime("%d-%m-%Y %H:%M:%S")
        data.pop('function')
        table.insert_one(data)
    elif 'type_request' in data and data['type_request'] == 'create_product':
        data.pop('type_request')
        now_str = now.strftime("%d-%m-%Y %H:%M:%S")
        data['created_at'] = now_str
        data['updated_at'] = now_str
        # data.pop('files[]')
        result = table.insert_one(data)
        newProduct = find(str(result.inserted_id), 'products')
        return newProduct
    else:
        data['created_at'] = now.strftime("%d-%m-%Y %H:%M:%S")
        data['updated_at'] = now.strftime("%d-%m-%Y %H:%M:%S")
        result = table.insert_one(data)
        data['_id'] = str(result.inserted_id)
        return data

def update(tableName, setData, pushData, _id):
    table = exp_ecom_database[tableName]
    updatedAt = now.strftime("%d-%m-%Y %H:%M:%S")
    setData.update({"updated_at": updatedAt})
    
    update_operation = {"$set": setData}
    if pushData:
        update_operation["$push"] = pushData
    
    table.update_one({"_id": ObjectId(_id)}, update_operation)
    tableFind = find(_id, tableName)
    if tableFind:
        tableFind["_id"] = str(tableFind["_id"])
        return tableFind
    return None
    
def delete(id, tableName, query=None, void=None):
    table = exp_ecom_database[tableName]
    if query:
        tableDelete = table.delete_one({query: id})
    else:
        tableDelete = table.delete_one({"_id": ObjectId(id)})
    if void is None:
        if tableDelete.deleted_count:
            return f"Delete {id} in table {tableName} success!"
        else:
            return f"Delete {id} in table {tableName} failed!"

def safe_int(val, default=0):
    try:
        if isinstance(val, str):
            val = val.replace(",", "")
        return int(val)
    except (ValueError, TypeError):
        return default

def paginate(tableName, page, limit, query, sort, userId):
    if userId is None:
        return "Get paginate data table error: User Id not found!"
    table = exp_ecom_database[tableName]
    perPage = int(limit)
    skip = (int(page) - 1) * perPage
    queryFilter = {}
    data = []
    if query and query.get('query') and query.get('value'):
        queryFilter = {
            query['query']: {
                "$regex": query['value'],
                "$options": "i"
            }
        }
    if tableName == 'product_ideals_ref_users':
        total = table.count_documents(queryFilter)
        if userId:
            queryFilter['seller_id'] = userId
        total = table.count_documents(queryFilter)
        items = table.find() \
            .skip(skip) \
            .limit(perPage)
        for item in items:
            item['_id'] = str(item['_id'])
            dataProductIdeal = find(item['ideal_id'], 'product_ideals')
            item['total_views'] = safe_int(dataProductIdeal.get('total_views', 0))
            item['daily_views'] = safe_int(dataProductIdeal.get('daily_views', 0))
            item['total_sold'] = safe_int(dataProductIdeal.get('total_sold', 0))
            item['total_farvorites'] = safe_int(dataProductIdeal.get('total_farvorites', 0))
            item['banner'] = dataProductIdeal.get('banner', '')
            item['campaign_ids'] = dataProductIdeal.get('campaign_ids', [])
            item['images'] = dataProductIdeal.get('images', [])
            item['item_id'] = dataProductIdeal.get('item_id', '')
            item['market'] = dataProductIdeal.get('market', '')
            item['store'] = dataProductIdeal.get('store', '')
            item['title'] = dataProductIdeal.get('title', '')
            item['tags'] = dataProductIdeal.get('tags', [])
            item['product_type'] = dataProductIdeal.get('product_type', '')
            item['type_item'] = dataProductIdeal.get('type_item', '')
            item['views_24h'] = dataProductIdeal.get('views_24h', 0)
            item['estimated_revenue'] = dataProductIdeal.get('estimated_revenue', 0)
            item['rate_favorite'] = dataProductIdeal.get('rate_favorite', 0)
            item['last_modified'] = dataProductIdeal.get('last_modified', '')
            item['original_creation'] = dataProductIdeal.get('original_creation', '')
            item['sold_24h'] = dataProductIdeal.get('sold_24h', 0)
            item['hey_etsy_tags'] = dataProductIdeal.get('hey_etsy_tags', [])
            item['created_at'] = dataProductIdeal.get('created_at', '')
            item['updated_at'] = dataProductIdeal.get('updated_at', '')
            data.append(item)
        if query and query.get('query') and query.get('value'):
            data = [item for item in data if query['value'].lower() in item["title"].lower()]
    elif tableName == 'products':
        if userId:
            user = find(userId, 'users')
            queryFilter['seller_id'] = userId
        total = table.count_documents(queryFilter)
        items = table.find(queryFilter) \
            .sort([('created_at', -1)]) \
            .skip(skip) \
            .limit(perPage)
        for item in items:
            if userId == item['seller_id']:
                item['_id'] = str(item['_id'])
                product_type_id = item.get('product_type')
                if product_type_id and isinstance(product_type_id, str) and len(product_type_id) == 24:
                    product_type = find(product_type_id, 'product_types')
                    item['product_type'] = product_type.get('name', '') if product_type else ''
                else:
                    item['product_type'] = ''

                if 'designer_id' in item:
                    designer_id = item.get('designer_id')
                    if designer_id and isinstance(designer_id, str) and len(designer_id) == 24:
                        designer = find(designer_id, 'users')
                        item['designer'] = designer.get('name', '') if designer else ''
                        item.pop('designer_id')
                    else:
                        item['designer'] = ''
                else:
                    item['designer'] = ''
                # if 'team_id' in item:
                team_id = user.get('team_id')
                if team_id and isinstance(team_id, str) and len(team_id) == 24:
                    team = find(team_id, 'teams')
                    item['team'] = team.get('name', '') if team else ''
                else:
                    item['team'] = ''
                seller_id = item.get('seller_id')
                if seller_id and isinstance(seller_id, str) and len(seller_id) == 24:
                    seller = find(seller_id, 'users')
                    item['seller'] = seller.get('name', '') if seller else ''
                else:
                    item['seller'] = ''
                
                # item.pop('team_id')
                item.pop('seller_id')
                data.append(item)
    elif tableName == 'product_ideals':
        if userId:
            user = find(userId, 'users')
            queryFilter['team_ids'] = user['team_id']
        if sort and sort['query'] == 'user_ids':
            queryFilter['user_ids'] = sort['value']
        total = table.count_documents(queryFilter)
        items = table.find(queryFilter) \
            .sort([('created_at', -1)]) \
            .skip(skip) \
            .limit(perPage)
        for item in items:
            if user['team_id'] in item['team_ids']:
                item['_id'] = str(item['_id'])
                item['total_views'] = safe_int(item.get('total_views', 0))
                item['daily_views'] = safe_int(item.get('daily_views', 0))
                item['total_sold'] = safe_int(item.get('total_sold', 0))
                item['total_farvorites'] = safe_int(item.get('total_farvorites', 0))
                data.append(item)
        return {
            "data": data,
            "total": total,
            "per_page": perPage,
            "current_page": int(page),
            "last_page": (total + perPage - 1) // perPage
        }
    elif tableName == 'shops':
        user = find(userId, 'users')
        queryFilter['seller_id'] = userId
        queryFilter['team_id'] = user['team_id']
        total = table.count_documents(queryFilter)
        items = table.find(queryFilter) \
            .sort([('created_at', -1)]) \
            .skip(skip) \
            .limit(perPage)
        for item in items:
            item['_id'] = str(item['_id'])
            item['seller'] = user['name']
            item['team'] = find(user['team_id'], 'teams')['name'] if 'name' in find(user['team_id'], 'teams') else None
            data.append(item)
    else:
        total = table.count_documents(queryFilter)
        items = table.find(queryFilter) \
            .sort([('created_at', -1)]) \
            .skip(skip) \
            .limit(perPage)
        for item in items:
            item['_id'] = str(item['_id'])
            team_id = item.get('team_id')
            if team_id and isinstance(team_id, str) and len(team_id) == 24:
                team = find(team_id, 'teams')
                item['team'] = team.get('name', '') if team else ''
            else:
                item['team'] = ''
            role_id = item.get('role_id')
            if role_id and isinstance(role_id, str) and len(role_id) == 24:
                role = find(role_id, 'roles')
                item['role'] = role.get('name', '') if role else ''
            else:
                item['role'] = ''
            data.append(item)
    if sort and sort.get('query') and sort.get('value') in ['high_to_low', 'low_to_high']:
        reverse = sort['value'] == 'high_to_low'
        sort_key = sort['query']
        data.sort(key=lambda x: x.get(sort_key, 0), reverse=reverse)
    return {
        "data": data,
        "total": total,
        "per_page": perPage,
        "current_page": int(page),
        "last_page": (total + perPage - 1) // perPage
    }

def getDataJson(fileName):
    root_dir = os.path.abspath(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__)))))
    json_path = os.path.join(root_dir, 'data', fileName)
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    return data

def pluck(tableName, query):
    tableAll = all(tableName)
    data = {}
    for item in tableAll:
        data[item['_id']] = item[query]
    return data

def truncate(tableName):
    table = exp_ecom_database[tableName]
    result = table.delete_many({})
    return result.deleted_count

BASE_DIR = os.path.abspath(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__)))))
STORAGE_DIR = os.path.abspath(BASE_DIR)

def export_listing_to_xlsm(template_id: str, shop_id: str, product_ids):
    TEMPLATE_FILE = os.path.join(BASE_DIR, 'data', 'template_amz_default/template_listing_amz.xlsm')
    template = find(template_id, 'template_listing')
    shop = find(shop_id, 'shops')
    if template is not None and shop is not None:
        seller_id = shop['seller_id']
        seller = find(seller_id, 'users')
        if seller is not None:
            products = []
            for product_id in product_ids:
                product = find(product_id, 'products')
                if product is not None:
                    if template['platform'] == 'amazon-drinkingcup':
                        item_sku = f"ecom-sku-amz-{product['_id']}-{uuid.uuid4()}"
                        newProduct = []
                        newProduct.append(template['product_type'])
                        newProduct.append(item_sku)
                        newProduct.append(template['brand_name'])
                        newProduct.append(template['update_delete'])
                        newProduct.append('')
                        newProduct.append(product['title'])
                        newProduct.append(product['description'])
                        newProduct.append(template['manufacturer'])
                        for _ in range(2):
                            newProduct.append('')
                        newProduct.append(template['product_id_type'])
                        newProduct.append(template['item_type_keyword'])
                        for _ in range(3):
                            newProduct.append('')
                        newProduct.append(template['care_instructions1'])
                        newProduct.append(template['care_instructions2'])
                        newProduct.append(template['standard_price'])
                        newProduct.append(template['quantity'])
                        for image in product['images']:
                            newProduct.append(image)
                        number_image_not_have = 9 - len(product['images'])
                        for _ in range(number_image_not_have):
                            newProduct.append('')
                        for _ in range(8):
                            newProduct.append('')
                        newProduct.append(template['bullet_point1'])
                        newProduct.append(template['bullet_point2'])
                        newProduct.append(template['bullet_point3'])
                        newProduct.append(template['bullet_point4'])
                        newProduct.append(template['bullet_point5'])
                        newProduct.append(template['generic_keywords'])
                        for _ in range(2):
                            newProduct.append('')
                        newProduct.append(template['included_components1'])
                        for _ in range(4):
                            newProduct.append('')
                        newProduct.append(template['color_name'])
                        newProduct.append(template['size_name'])
                        newProduct.append(template['material_type'])
                        newProduct.append(template['style_name'])
                        newProduct.append(template['theme'])
                        for _ in range(2):
                            newProduct.append('')
                        newProduct.append(template['special_features1'])
                        for _ in range(10):
                            newProduct.append('')
                        newProduct.append(template['occasion_type'])
                        for _ in range(28):
                            newProduct.append('')
                        newProduct.append(template['unit_count_type'])
                        newProduct.append(template['unit_count'])
                        newProduct.append(template['capacity_unit_of_measure'])
                        newProduct.append(template['capacity'])
                        for _ in range(5):
                            newProduct.append('')
                        newProduct.append(template['height_width_side_to_side'])
                        newProduct.append(template['height_width_side_to_side_unit_of_measure'])
                        newProduct.append(template['height_floor_top'])
                        newProduct.append(template['height_floor_top_unit_of_measure'])
                        for _ in range(21):
                            newProduct.append('')
                        for _ in range(9):
                            newProduct.append('')
                        newProduct.append(template['cpsia_cautionary_statement'])
                        newProduct.append(template['country_of_origin'])
                        for _ in range(109):
                            newProduct.append('')
                        newProduct.append(template['merchant_shipping_group_name'])
                        newProduct.append('')
                        newProduct.append(template['list_price'])
                        for _ in range(3):
                            newProduct.append('')
                        newProduct.append(template['condition_type'])
                        newProduct.append('')
                        newProduct.append(template['fulfillment_latency'])
                        newProduct.append('')
                        newProduct.append(template['product_tax_code'])
                        for _ in range(7):
                            newProduct.append('')
                        newProduct.append(template['number_of_items'])
                        for _ in range(24):
                            newProduct.append('')
                        products.append(newProduct)
                    else:
                        return f"product type in template is not support!"
                else:
                    return f"product id {product_id} is none!"
            filename = f"Template_{template['title_teamplate'].replace(' ', '_')}_{datetime.now().strftime('%Y%m%d_%H%M%S')}_{seller['name'].replace(' ', '_')}.xlsm"
            template_download_dir = '/tmp/template_download'
            try:
                if not os.path.exists(template_download_dir):
                    os.makedirs(template_download_dir, exist_ok=True)
                if not os.access(template_download_dir, os.W_OK):
                    raise PermissionError(f"No write permission for directory: {template_download_dir}. Current user: {os.getuid()}, Current group: {os.getgid()}")
            except Exception as e:
                raise Exception(f"Error setting up template directory: {str(e)}")
            new_file_path = os.path.join(template_download_dir, filename)
            shutil.copyfile(TEMPLATE_FILE, new_file_path)
            try:
                wb = load_workbook(new_file_path, keep_vba=True)
                ws = wb["Template"]
                start_row = 4
                for row_idx, row_data in enumerate(products):
                    for col_idx, value in enumerate(row_data):
                        ws.cell(row=start_row + row_idx, column=col_idx + 1).value = value
                wb.save(new_file_path)
            except Exception as e:
                if os.path.exists(new_file_path):
                    os.remove(new_file_path)
                raise Exception(f"Error processing Excel file: {str(e)}")
            final_destination = os.path.join(BASE_DIR, 'data', 'template_download', filename)
            os.makedirs(os.path.dirname(final_destination), exist_ok=True)
            shutil.copy2(new_file_path, final_destination)
            file_listing = {
                "template_id": template_id,
                "shop_id": shop_id,
                "seller_id": seller_id,
                "filename": filename
            }
            create_file_listing = create(file_listing, 'file_listings')
            return create_file_listing
        else:
            return f"seller id '{seller_id}' is not found!"
    else:
        return f"template id '{template_id}' and shop id '{shop_id}' is not found!"
    
def download_file_listing(filename):
    template_download_dir = '/tmp/template_download'
    return send_from_directory(template_download_dir, filename, as_attachment=True)
