import unicodedata
import re
from bson.objectid import ObjectId
from bson import ObjectId
import json
from datetime import datetime

def to_slug(text: str) -> str:
    # Bước 1: chuẩn hóa Unicode, loại bỏ dấu
    text = unicodedata.normalize('NFKD', text)
    text = ''.join(c for c in text if not unicodedata.combining(c))

    # Bước 2: chuyển về chữ thường
    text = text.lower()

    # Bước 3: thay ký tự không phải chữ/số thành dấu -
    text = re.sub(r'[^a-z0-9]+', '-', text)

    # Bước 4: xóa dấu - thừa ở đầu/cuối
    text = text.strip('-')

    return text

def model_to_dict(model):
    if isinstance(model, dict):
        for key, value in model.items():
            if isinstance(value, ObjectId):
                model[key] = str(value)
            elif isinstance(value, dict):
                model[key] = model_to_dict(value)
            elif isinstance(value, list):
                model[key] = [model_to_dict(item) if isinstance(item, dict) else item for item in value]
            elif isinstance(value, datetime):
                model[key] = value.isoformat()
    return model

def model_to_json(model):
    return json.dumps(model_to_dict(model))
