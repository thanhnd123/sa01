from flask import Flask, request, jsonify, Blueprint, send_from_directory
from app.modules.teamexp.model import find, create, update, delete, all, paginate, getDataJson, pluck, truncate
import os
import random
from flask_jwt_extended import jwt_required, get_jwt_identity
from database.seeders.productTypeSeeder import productType, roles, teams, users
teamexp = Blueprint('api', __name__)
from flask_bcrypt import Bcrypt
import json
import time

bcrypt = Bcrypt()

@teamexp.route('/data/api/images_crawl_tool_spy/<filename>', methods = ["GET"])
def serve_image(filename):
    root_dir = os.path.abspath(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__)))))
    image_path = os.path.join(root_dir, 'data', 'teamexp', 'images_crawl_tool_spy')
    if not os.path.exists(os.path.join(image_path, filename)):
        return f"File {filename} not found", 404
    return send_from_directory(image_path, filename, as_attachment=False)

@teamexp.route('/api/get-token-hey-etsy', methods = ['GET'])
def getTokenHeyEtsy():
    return jsonify({
        "result": 'VByuM8QBSRoL2Uiy9Rvw8c4X0NcefTknG7cuDEkE'
    })

@teamexp.route('/api/product-ideals/create', methods = ["POST"])
def store():
    data = request.get_json()
    try:
        result = create(data, 'product_ideals')
    except Exception as exception:
        result = f"Error when create data in table product_ideals: {exception}"
    return jsonify({
        "response": result
    })

@teamexp.route('/api/product-ideals/list', methods = ["GET"])
def list():
    try:
        limit = request.args.get('limit', default=None)
        if limit is None:
            result = all('product_ideals')
            return jsonify({
                "result": result
            })
        else:
            query = None
            sort = None
            page = request.args.get('page', default=1)
            search = request.args.get('search', '').strip()
            sort = request.args.get('sort', '').strip()
            sortBy = request.args.get('sort-by', '').strip()
            userId = request.args.get('user_id')
            if search:
                query = {
                    "query": "title",
                    "value": search
                }
            if sort and sortBy:
                sort = {
                    "query": sort,
                    "value": sortBy
                }
            result = paginate('product_ideals', page=page, limit=limit, query=query, sort=sort, userId=userId)
            return jsonify(result)
    except Exception as exception:
        return jsonify({
            "error": f"Error when get data: {str(exception)}"
        }), 500

@teamexp.route('/api/product-ideals/delete', methods = ["GET"])
def destroy():
    id = request.args.get('id')
    try:
        result = delete(id, 'product_ideals')
    except Exception as exception:
        result = f"Error when delete {id} data in table product_ideals: {exception}"
    return jsonify({
        "response": result
    })
    
@teamexp.route('/api/product-ideals/add-to-favorite', methods = ["POST"])
def addToFavorite():
    data = request.get_json()
    try:
        result = create(data, 'product_ideals_ref_users')
    except Exception as exception:
        result = f"Error when add to favorite: {exception}"
    return jsonify({
        "response": result
    })
    
@teamexp.route('/api/product-ideals-ref-users/list', methods = ["GET"])
def listProductIdealsRefUsers():
    limit = request.args.get('limit', default=None)
    if limit is None:
        try:
            result = all('product_ideals_ref_users')
        except Exception as exception:
            result = f"Error when get all data in table product_ideals: {exception}"
        return jsonify({
            "response": result
        })
    else:
        query = None
        sort = None
        page = request.args.get('page', default=1)
        search = request.args.get('search', '').strip()
        sort = request.args.get('sort', '').strip()
        sortBy = request.args.get('sort-by', '').strip()
        userId = request.args.get('user_id', '').strip()
        try:
            if search:
                query = {
                    "query": "title",
                    "value": search
                }
            if sort and sortBy:
                sort = {
                    "query": sort,
                    "value": sortBy
                }
            result = paginate('product_ideals_ref_users', page=page, limit=limit, query=query, sort=sort, userId=userId)
            return jsonify(result)
        except Exception as exception:
            result = f"Error when get paginate data in table product_ideals_ref_users: {exception}"
            return jsonify({
                "response": result
            })
            
@teamexp.route('/api/product-ideals-ref-users/remove-favorite', methods = ["GET"])
def removeFavorite():
    id = request.args.get('_id')
    try:
        result = delete(id, 'product_ideals_ref_users')
        if result == f"Delete {id} in table product_ideals_ref_users success!":
            result = 'done'
    except Exception as exception:
        result = f"Error when remove favorite: {exception}"
    return jsonify({
        "response": result
    })
    
@teamexp.route('/api/product-ideals-ref-users/sync-to-design', methods = ["POST"])
def syncToDesign():
    data = request.get_json()
    try:
        productIdealIds = data['product_ideal_id']
        productType = data['product_type']
        sellerNote = data['seller_note']
        refId = data['seller_id']
        findData = find(refId, 'product_ideals_ref_users', 'user_id')
        if findData is None:
            dataRequest = {
                'type_request': 'add_to_favorite',
                'user_id': refId,
                'product_ideal_id': productIdealIds,
                "product_type": productType,
                "seller_note": sellerNote
            }
            findData = create(dataRequest, 'product_ideals_ref_users')
        setData = {
            "product_type": productType,
            "seller_note": sellerNote
        }
        findData['_id'] = str(findData['_id'])
        update('product_ideals_ref_users', setData, pushData=None, _id=findData['_id'])
        findData = find(refId, 'product_ideals_ref_users', 'user_id')
        result = "Sync to design success!"
    except Exception as exception:
        result = f"Error when sync to design: {exception}"
    return jsonify({
        "response": result
    })

# Products

        

#role
@teamexp.route('/api/roles/seed-roles', methods = ["GET"])
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
    
@teamexp.route('/api/roles/list', methods = ["GET"])
def roleList():
    allData = all('roles')
    return jsonify({
        "result": allData
    })

#team
# @teamexp.route('/api/teams/seed-teams', methods = ["GET"])
# def teamStore():
#     truncate('teams')
#     dataTeams = teams()
#     for _, name in dataTeams.items():
#         dataRecord = {
#             "name": name,
#             "function": "void"
#         }
#         create(dataRecord, 'teams')
#     allData = all('teams')
#     return jsonify({
#         "result": allData
#     })

@teamexp.route('/api/teams/list', methods = ["GET"])
# @jwt_required()
def listTeams():
    pluckCall = request.args.get('pluck', None)
    
    if pluckCall is not None:
        data = pluck('teams', 'name')
    else:
        data = all('teams')
    return jsonify({
        "result": data,
    })

#user
# @teamexp.route('/api/users/seed-users', methods = ["GET"])
# def seedUsers():
#     try:
#         truncate('users')
#         dataUsers = users()
#         usersList = dataUsers.get('users', [])
        
#         # Get all roles and teams
#         roles = all('roles')
#         teams = all('teams')
        
#         # Find Giran team id
#         giran_team = next((team for team in teams if team['name'] == 'Giran'), None)
#         if not giran_team:
#             raise Exception("Giran team not found")
            
#         for user in usersList:
#             # Find matching role by name
#             matching_role = next((role for role in roles if role['name'] == user['name']), None)
#             if not matching_role:
#                 raise Exception(f"Role not found for user {user['name']}")
                
#             user['password'] = bcrypt.generate_password_hash(user['password']).decode('utf-8')
#             user['token_user'] = bcrypt.generate_password_hash(f"{user['email']}{int(time.time())}").decode('utf-8')
#             user['role_id'] = matching_role['_id']
#             user['team_id'] = giran_team['_id']
#             create(user, 'users')
            
#         allData = all('users')
#         return jsonify({
#             "result": allData,
#             "message": "Users seeded successfully"
#         })
#     except Exception as exception:
#         result = f"Error when seeding users: {exception}"
#         return jsonify({
#             "response": result
#         })

@teamexp.route('/api/users/create', methods = ["POST"])
def userStore():
    try:
        # truncate('users')
        dataUser = request.get_json()
        dataRecord = {
            "name": dataUser['name'],
            "email": dataUser['email'],
            "password": bcrypt.generate_password_hash(dataUser['password']).decode('utf-8'),
            "role_id": dataUser['role_id'],
            "team_id": dataUser['team_id'],
            'token_admin': dataUser['token_admin'],
            "type_request": "create_user",
            "status": dataUser['status']
        }
        result = create(dataRecord, 'users')
        return jsonify({
            "result": result
        })
    except Exception as exception:
        result = f"Error when seed data in table users: {exception}"
        return jsonify({
            "result": result
        })
        
@teamexp.route('/api/users/update', methods = ["POST"])
def userUpdate():
    try:
        # truncate('users')
        dataUser = request.get_json()
        dataRecord = {
            "name": dataUser['name'],
            "email": dataUser['email'],
            "role_id": dataUser['role_id'],
            "team_id": dataUser['team_id'],
            'token_admin': dataUser['token_admin'],
            "status": dataUser['status'],
            # 'token_user': dataUser['token_user']
        }
        if dataUser['password'] != "":
            dataRecord['password'] = bcrypt.generate_password_hash(dataUser['password']).decode('utf-8')
        result = update('users', dataRecord, pushData=None, _id=dataUser['_id'])
        return jsonify({
            "result": result
        })
    except Exception as exception:
        result = f"Error when seed data in table users: {exception}"
        return jsonify({
            "result": result
        })
        
@teamexp.route('/api/users/show', methods = ["POST"])
def userShow():
    try:
        data = request.get_json()
        userToken = data['token_user'] if 'token_user' in data else None
        userId = data['_id'] if '_id' in data else None
        if userToken is not None:
            result = find(userToken, 'users', 'token_user')
        elif userId is not None:
            result = find(userId, 'users')
        else:
            return jsonify({
                "result": "Token or id is required"
            })
        if result is None:
            return jsonify({
                "result": "User not found"
            })
        else:
            result['role'] = find(result['role_id'], 'roles').get('name', '')
            result['team'] = find(result['team_id'], 'teams').get('name', '')
            return jsonify({
                "result": result
            })
    except Exception as exception:
        result = f"Error when get user: {exception}"
        return jsonify({
            "result": result
        })

# @teamexp.route('/api/users/create', methods = ["GET"])
# def userStore():
#     data = request.get_json()
#     data['type_request'] = 'create_user'
#     newUser = create(data, 'users')
#     return jsonify({
#         "result": newUser
#     })
    
@teamexp.route('/api/users/list', methods = ["GET"])
def userList():
    limit = request.args.get('limit', default=None)
    pluckCall = request.args.get('pluck', None)
    if limit is None:
        if pluckCall is None:
            data = all('users')
        else:
            data = pluck('users', 'name')
        return jsonify({
            "result": data
        })
    else:
        query = None
        sort = None
        page = request.args.get('page', default=1)
        search = request.args.get('search', '').strip()
        sort = request.args.get('sort', '').strip()
        sortBy = request.args.get('sort-by', '').strip()
        userId = request.args.get('user_id', '').strip()
        if search:
            query = {
                "query": "name",
                "value": search
            }
        if sort and sortBy:
            sort = {
                "query": sort,
                "value": sortBy
            }
        try:
            result = paginate('users', page=page, limit=limit, query=query, sort=sort, userId=userId)
            return jsonify(result)
        except Exception as exception:
            result = f"Error when get paginate data in table users: {exception}"
            return jsonify({
                "response": result
            }), 500
    
@teamexp.route('/api/designs/list', methods = ['GET'])
def listDesign():
    try:
        id = request.args.get('id')
        dataDesignsById = find(id, 'designs', 'product_ideal_id', 'all')
        result = dataDesignsById
    except Exception as exception:
        result = f"Error when get list design: {exception}"
    return jsonify({
        "result": result
    })    
    
@teamexp.route('/api/truncate/<tableName>', methods=["GET"])
def truncateTable(tableName):
    try:
        truncate(tableName)
        return jsonify({
            "result": all(tableName)
        })
    except Exception as exception:
        result = f"Error when truncate table {tableName}: {exception}"
        return jsonify({
            "result": result
        })
        
#shops
# @teamexp.route('/api/shops/list', methods = ['GET'])
# def showShop():
#     try:
#         limit = request.args.get('limit', None)
#         if limit is None:
#             shops = all('shops')
#             return jsonify({
#                 "result": shops
#             })
#         else:
#             query = None
#             page = request.args.get('page', 1)
#             search = request.args.get('search', None)
#             sort = request.args.get('sort', None)
#             sortBy = request.args.get('sort-by', None)
#             userId = request.args.get('user_id', None)
#             if search:
#                 query = {
#                     "query": "name",
#                     "value": search
#                 }
#             if sort and sortBy:
#                 sort = {
#                     "query": sort,
#                     "value": sortBy
#                 }
#             result = paginate('shops', page=page, limit=limit, query=query, sort=sort, userId=userId)
#             return jsonify(result)
#     except Exception as exception:
#         result = f"Error when get paginate data in table shops: {exception}"
#         return jsonify({
#             "response": result
#         })
        
# @teamexp.route('/api/shops/store', methods = ['POST'])
# def shopStore():
#     try:
#         data = request.get_json()
#         userId = data['user_id'] if 'user_id' in data else None
#         updateCall = data['update'] if 'update' in data else None
#         if userId is None:
#             return jsonify({
#                 "result": 'Not found user! Please login with account has role management before processing!'
#             })
#         if updateCall is not None:
#             data.pop('user_id')
#             data.pop('update')
#             dataUpdate = {
#                 'name': data['name'],
#                 'email': data['email'],
#                 'platform': data['platform'],
#                 'seller_id': data['seller_id'],
#                 'team_id': data['team_id']
#             }
#             processing = update('shops', dataUpdate, None, updateCall)
#             return jsonify({
#                 "result": processing
#             })
#         data.pop('user_id')
#         processing = create(data, 'shops')
#         return jsonify({
#             "result": processing
#         })
#     except Exception as exception:
#         result = f"Error when create data in table shops: {exception}"
#         return jsonify({
#             "result": result
#         })
    