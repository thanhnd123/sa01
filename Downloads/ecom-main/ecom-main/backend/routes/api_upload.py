from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import time
from app.services.aws_service import aws

api_upload = Blueprint('api_upload', __name__)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
MAX_FILE_SIZE = 20 * 1024 * 1024  # 20MB


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@api_upload.route('/api/upload/ideal-file', methods=['POST'])
def upload_ideal_file():
    if 'file' not in request.files:
        return jsonify({'success': False, 'message': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'success': False, 'message': 'No selected file'}), 400
    if not allowed_file(file.filename):
        return jsonify({'success': False, 'message': 'File type not allowed'}), 400
    file.seek(0, 2)
    file_length = file.tell()
    file.seek(0)
    if file_length > MAX_FILE_SIZE:
        return jsonify({'success': False, 'message': 'File too large (max 20MB)'}), 400
    # Tạo tên file lưu trên S3
    timestamp = int(time.time())
    filename = secure_filename(file.filename)
    s3_path = f'ideals/{timestamp}_{filename}'
    content_type = file.mimetype or 'application/octet-stream'
    try:
        url = aws.upload_file(file, filePath=s3_path, contentType=content_type)
        return jsonify({'success': True, 'url': url})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500 