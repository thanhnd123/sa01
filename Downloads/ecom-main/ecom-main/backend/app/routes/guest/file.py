from flask import Blueprint, send_file, jsonify
import os

file_bp = Blueprint('file', __name__)

@file_bp.route('/download-file/<filename>', methods=['GET'])
def download_file(filename):
    try:
        # Gọi hàm download_file_listing từ module teamexp
        # lấy file theo url đưa vào 
        template_download_dir = '/tmp/listing_files'
        return send_file(
            os.path.join(template_download_dir, filename),
            as_attachment=True,
            download_name=filename
        )
    except Exception as e:
        return jsonify({
            "success": False,
            "message": f"Lỗi khi tải file: {str(e)}"
        }), 500

@file_bp.route('/download-extension', methods=['GET'])
def download_extension():
    try:
        # Đường dẫn đến file extension
        extension_dir = os.path.join(os.getcwd(), 'uploads', 'extensions')
        extension_file = 'crawl_ideal_v3_1.zip'
        extension_path = os.path.join(extension_dir, extension_file)
        
        # Kiểm tra file có tồn tại không
        if not os.path.exists(extension_path):
            return jsonify({
                "success": False,
                "message": "File extension không tồn tại"
            }), 404
        
        # Trả về file để download với CORS headers
        response = send_file(
            extension_path,
            as_attachment=True,
            download_name=extension_file,
            mimetype='application/zip'
        )
        
        # Thêm CORS headers
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'GET, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        
        return response
    except Exception as e:
        return jsonify({
            "success": False,
            "message": f"Lỗi khi tải extension: {str(e)}"
        }), 500 