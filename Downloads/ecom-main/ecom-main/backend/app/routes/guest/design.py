from flask import Blueprint, send_from_directory
import os 

design_bp = Blueprint('design', __name__)

@design_bp.route('/uploads/<path:filename>')
def uploaded_file(filename):
    uploads_dir = os.path.join(os.getcwd(), 'uploads')
    return send_from_directory(uploads_dir, filename)