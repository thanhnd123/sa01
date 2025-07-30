from flask import Blueprint, request, jsonify
from app.services.helpers import model_to_dict

designs_bp = Blueprint('designs', __name__)
from datetime import datetime
from database.connect_database import connect_database

@designs_bp.route('/actions', methods=['GET'])
def get_design_actions():
    data = request.args.to_dict()
    accept_node = ['PC_HMCROFT']
    if data['node'] not in accept_node:
        return jsonify({
            'message': 'Invalid node'
        }), 400
    
    db = connect_database()
    design_actions = list(db.design_actions.find({
        'status': 'pending',
        'worker': {'$in': [None, '']}
    }).limit(30))
    
    # Cập nhật worker cho các design actions đã lấy
    for action in design_actions:
        db.design_actions.update_one(
            {"_id": action["_id"]},
            {"$set": {"worker": data['node']}}
        )
    result = []
    # Convert _id and ideal_id to string
    for action in design_actions:
        result.append(model_to_dict(action))
    return jsonify({
        'message': 'Success',
        'data': result
    }), 200




@designs_bp.route("/actions/update-products", methods=["POST"])
def update_products_design_action():
     # data gửi từ CEP_PTS là: 1 list products
    # mỗi product có:
        #ideal_id: "681f07a4337f25b7b0996c92"
        #main_image: "https://expecomsystem.s3.amazonaws.com/ideals/products/2025-05-14/681f07a4337f25b7b0996c92/psd0681f07a4337f25b7b0996c92.jpg"
        #name: "Stitch Mug Wrap Sublimation Template, 11oz & 15oz Designs, Instant Download, Floral Stitch Cup, DIY Mug Design, Cartoon 11oz and 15oz Wrap"
        #png: "https://expecomsystem.s3.amazonaws.com/ideal/681f07a4337f25b7b0996c92/681f07a4337f25b7b0996c92_1747194617.png"
        #save_path: "C:/Program Files/Common Files/Adobe/CEP/extensions/CEP_PTS/data/mockups/Poster_1/designs/681f07a4337f25b7b0996c92.png"
        #mockup_name: "Poster_1"
        #banners: Array(6)
            #0: "https://expecomsystem.s3.amazonaws.com/ideals/products/2025-05-14/681f07a4337f25b7b0996c92/psd1681f07a4337f25b7b0996c92.jpg"
            #1: "https://expecomsystem.s3.amazonaws.com/ideals/products/2025-05-14/681f07a4337f25b7b0996c92/psd2681f07a4337f25b7b0996c92.jpg"
            #2: "https://expecomsystem.s3.amazonaws.com/ideals/products/2025-05-14/681f07a4337f25b7b0996c92/psd3681f07a4337f25b7b0996c92.jpg"
            #3: "https://expecomsystem.s3.amazonaws.com/ideals/products/2025-05-14/681f07a4337f25b7b0996c92/psd4681f07a4337f25b7b0996c92.jpg"
            # 4: "https://expecomsystem.s3.amazonaws.com/ideals/products/2025-05-14/681f07a4337f25b7b0996c92/psd5681f07a4337f25b7b0996c92.jpg"
            # 5: "https://expecomsystem.s3.amazonaws.com/ideals/products/2025-05-14/681f07a4337f25b7b0996c92/psd6681f07a4337f25b7b0996c92.jpg"
    # cần sử dụng đầu vào này để update lại design_actions
    try:
        data = request.get_json()
        db = connect_database()
        
        # Kiểm tra dữ liệu đầu vào
        if not data or not isinstance(data, list):
            return jsonify({
                "success": False,
                "error": "Dữ liệu đầu vào không hợp lệ"
            }), 400

        updated_designs = []
        
        for action in data:
            # Kiểm tra các trường bắt buộc
            required_fields = ['ideal_id', 'main_image', 'banners', 'product_type']
            if not all(field in action for field in required_fields):
                return jsonify({
                    "success": False,
                    "error": f"Thiếu trường bắt buộc trong dữ liệu sản phẩm: {product}"
                }), 400

            # Tìm design action cần cập nhật
            design_action = db.design_actions.find_one({"ideal_id": action['ideal_id'], "product_type": action['product_type']})
            if not design_action:
                continue

            # Cập nhật thông tin sản phẩm
            
            
            update_data = {
                'status': 'completed',
                "updated_at": datetime.utcnow(),
                "banners": action['banners'],
                "main_image": action['main_image'],
            }

            # Thực hiện cập nhật
            result = db.design_actions.update_one(
                {"_id": design_action["_id"]},
                {"$set": update_data}
            )

        return jsonify({
            "success": True,
            "message": f"Đã cập nhật {len(updated_designs)} design actions",
        }), 200

    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Lỗi khi cập nhật design actions: {str(e)}",
            "line": e.__traceback__.tb_lineno
        }), 500

