from flask import Blueprint, request, jsonify
from flask_jwt_extended import get_jwt_identity
from database.connect_database import connect_database
from bson.objectid import ObjectId
from app.services.helpers import model_to_dict
from app.services.aws_service import aws
from datetime import datetime
import time
import io
from PIL import Image
import json

notes_bp = Blueprint('notes', __name__)

def convert_objectid_to_str(obj):
    """Convert ObjectId to string for JSON serialization"""
    if isinstance(obj, ObjectId):
        return str(obj)
    elif isinstance(obj, dict):
        return {k: convert_objectid_to_str(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [convert_objectid_to_str(item) for item in obj]
    return obj

@notes_bp.route('/notes', methods=['POST'])
def create_note():
    """Create a new note with optional image"""
    try:
        db = connect_database()
        userId = get_jwt_identity()
        user = db.users.find_one({"_id": ObjectId(userId)})
        
        # Get form data
        content = request.form.get('content', '').strip()
        ideal_id = request.form.get('ideal_id', '').strip()
        design_id = request.form.get('design_id', '').strip()
        note_type = request.form.get('note_type', 'comment')  # comment, task, bug, feature
        
        if not content:
            return jsonify({
                'success': False,
                'message': 'Note content is required'
            }), 400
        
        # Check if ideal_id or design_id is provided
        if not ideal_id and not design_id:
            return jsonify({
                'success': False,
                'message': 'Either ideal_id or design_id is required'
            }), 400
        
        # Validate ideal if ideal_id is provided
        if ideal_id:
            ideal = db['product_ideals'].find_one({
                '_id': ObjectId(ideal_id),
                'team_ids': {"$in": [str(user['team_id'])]}
            })
        
            if not ideal:
                return jsonify({
                    'success': False,
                    'message': 'Ideal not found'
                }), 404
        
        # Validate design if design_id is provided
        if design_id:
            design = db['designs'].find_one({
                '_id': ObjectId(design_id),
                'team_id': str(user['team_id'])
            })
            
            if not design:
                return jsonify({
                    'success': False,
                    'message': 'Design not found'
                }), 404
        
        # Process image if uploaded
        image_url = None
        if 'image' in request.files:
            image_file = request.files['image']
            if image_file and image_file.filename:
                # Generate unique filename
                timestamp = int(time.time())
                filename = f"note_{userId}_{timestamp}.jpg"
                
                # Process image (resize and convert to JPG)
                try:
                    img = Image.open(image_file.stream)
                    img = img.convert("RGB")
                    
                    # Resize image to max 800x600 while maintaining aspect ratio
                    img.thumbnail((800, 600), Image.LANCZOS)
                    
                    # Save to buffer
                    buffer = io.BytesIO()
                    img.save(buffer, format="JPEG", quality=85)
                    buffer.seek(0)
                    
                    # Create file-like object for AWS upload
                    class FileObj:
                        def __init__(self, data):
                            self.data = data
                            self.filename = filename
                            self._position = 0
                        
                        def read(self, size=None):
                            if size is None:
                                return self.data[self._position:]
                            else:
                                result = self.data[self._position:self._position + size]
                                self._position += size
                                return result
                        
                        def seek(self, position, whence=0):
                            if whence == 0:  # SEEK_SET
                                self._position = position
                            elif whence == 1:  # SEEK_CUR
                                self._position += position
                            elif whence == 2:  # SEEK_END
                                self._position = len(self.data) + position
                        
                        def tell(self):
                            return self._position
                        
                        def close(self):
                            pass
                    
                    image_file_obj = FileObj(buffer.getvalue())
                    
                    # Upload to AWS
                    if ideal_id:
                        s3_path = f'notes/{userId}/{ideal_id}/{filename}'
                    else:
                        s3_path = f'notes/{userId}/designs/{design_id}/{filename}'
                    
                    print(f"Uploading image to S3: {s3_path}")
                    image_url = aws.upload_file(image_file_obj, s3_path)
                    print(f"Image uploaded successfully: {image_url}")
                    
                except Exception as e:
                    print(f"Error processing image: {e}")
                    import traceback
                    traceback.print_exc()
                    return jsonify({
                        'success': False,
                        'message': f'Failed to process image: {str(e)}'
                    }), 500
        
        # Create note data
        note_data = {
            'content': content,
            'ideal_id': ideal_id,
            'design_id': design_id,
            'user_id': userId,
            'team_id': str(user['team_id']),
            'note_type': note_type,
            'image_url': image_url,
            'created_at': int(time.time()),
            'updated_at': int(time.time())
        }
        
        print(f"Creating note with data: {note_data}")
        
        try:
            result = db['notes'].insert_one(note_data)
            print(f"Note created with ID: {result.inserted_id}")
        except Exception as e:
            print(f"Error inserting note: {e}")
            import traceback
            traceback.print_exc()
            return jsonify({
                'success': False,
                'message': f'Failed to create note: {str(e)}'
            }), 500
        
        # Get the created note with user information
        pipeline = [
            {
                '$match': {'_id': result.inserted_id}
            },
            {
                '$lookup': {
                    'from': 'users',
                    'localField': 'user_id',
                    'foreignField': '_id',
                    'as': 'user'
                }
            },
            {
                '$unwind': {
                    'path': '$user',
                    'preserveNullAndEmptyArrays': True
                }
            },
            {
                '$project': {
                    'content': 1,
                    'ideal_id': 1,
                    'design_id': 1,
                    'user_id': 1,
                    'team_id': 1,
                    'note_type': 1,
                    'image_url': 1,
                    'created_at': 1,
                    'updated_at': 1,
                    'user': {
                        'username': '$user.username',
                        'email': '$user.email',
                        'avatar': '$user.avatar'
                    }
                }
            }
        ]
        
        try:
            created_note = list(db['notes'].aggregate(pipeline))[0]
            print(f"Retrieved created note: {created_note}")
        except Exception as e:
            print(f"Error retrieving created note: {e}")
            import traceback
            traceback.print_exc()
            # Fallback: return the note without user info
        created_note = db['notes'].find_one({'_id': result.inserted_id})
        created_note = convert_objectid_to_str(created_note)
        return jsonify({
            'success': True,
            'message': 'Note created successfully (without user info)',
            'data': created_note
        })
        
        # Convert ObjectId to string for JSON serialization
        created_note = convert_objectid_to_str(created_note)
        
        return jsonify({
            'success': True,
            'message': 'Note created successfully',
            'data': created_note
        })
        
    except Exception as exception:
        return jsonify({
            "error": f"Error when creating note: {str(exception)}"
        }), 500

@notes_bp.route('/notes/<string:ideal_id>', methods=['GET'])
def get_notes_by_ideal(ideal_id):
    """Get all notes for a specific ideal"""
    try:
        db = connect_database()
        userId = get_jwt_identity()
        user = db.users.find_one({"_id": ObjectId(userId)})
        
        # Check if ideal exists and belongs to user's team
        ideal = db['product_ideals'].find_one({
            '_id': ObjectId(ideal_id),
            'team_ids': {"$in": [str(user['team_id'])]}
        })
        
        if not ideal:
            return jsonify({
                'success': False,
                'message': 'Ideal not found'
            }), 404
        
        # Get notes for this ideal with user information
        pipeline = [
            {
                '$match': {
                    'ideal_id': ideal_id,  # Tìm kiếm theo string thay vì ObjectId
            'team_id': str(user['team_id'])
                }
            },
            {
                '$addFields': {
                    'user_id_obj': {'$toObjectId': '$user_id'}
                }
            },
            {
                '$lookup': {
                    'from': 'users',
                    'localField': 'user_id_obj',
                    'foreignField': '_id',
                    'as': 'user'
                }
            },
            {
                '$unwind': {
                    'path': '$user',
                    'preserveNullAndEmptyArrays': True
                }
            },
            {
                '$project': {
                    'content': 1,
                    'ideal_id': 1,
                    'design_id': 1,
                    'user_id': 1,
                    'team_id': 1,
                    'note_type': 1,
                    'image_url': 1,
                    'created_at': 1,
                    'updated_at': 1,
                    'user': {
                        'username': '$user.username',
                        'email': '$user.email',
                        'avatar': '$user.avatar'
                    }
                }
            },
            {
                '$sort': {'created_at': -1}
            }
        ]
        
        notes = list(db['notes'].aggregate(pipeline))
        
        # Convert ObjectId to string for JSON serialization
        notes = convert_objectid_to_str(notes)
        
        return jsonify({
            'success': True,
            'data': notes,
            'total': len(notes)
        })
        
    except Exception as exception:
        return jsonify({
            "error": f"Error when getting notes: {str(exception)}"
        }), 500

@notes_bp.route('/notes/design/<string:design_id>', methods=['GET'])
def get_notes_by_design(design_id):
    """Get all notes for a specific design"""
    try:
        print(f"=== GET NOTES BY DESIGN ===")
        print(f"Design ID: {design_id}")
        
        db = connect_database()
        userId = get_jwt_identity()
        print(f"User ID: {userId}")
        
        user = db.users.find_one({"_id": ObjectId(userId)})
        print(f"User: {user}")
        
        if not user:
            print("User not found")
            return jsonify({
                'success': False,
                'message': 'User not found'
            }), 404
        
        # Check if design exists and belongs to user's team
        design = db['designs'].find_one({
            '_id': ObjectId(design_id),
            'team_id': str(user['team_id'])
        })
        
        print(f"Design found: {design}")
        
        if not design:
            print("Design not found")
            return jsonify({
                'success': False,
                'message': 'Design not found'
            }), 404
        
        # Get notes for this design with user information
        pipeline = [
            {
                '$match': {
                    'design_id': design_id,  # Tìm kiếm theo string thay vì ObjectId
                    'team_id': str(user['team_id'])
                }
            },
            {
                '$addFields': {
                    'user_id_obj': {'$toObjectId': '$user_id'}
                }
            },
            {
                '$lookup': {
                    'from': 'users',
                    'localField': 'user_id_obj',
                    'foreignField': '_id',
                    'as': 'user'
                }
            },
            {
                '$unwind': {
                    'path': '$user',
                    'preserveNullAndEmptyArrays': True
                }
            },
            {
                '$project': {
                    'content': 1,
                    'ideal_id': 1,
                    'design_id': 1,
                    'user_id': 1,
                    'team_id': 1,
                    'note_type': 1,
                    'image_url': 1,
                    'created_at': 1,
                    'updated_at': 1,
                    'user': {
                        'username': '$user.username',
                        'email': '$user.email',
                        'avatar': '$user.avatar'
                    }
                }
            },
            {
                '$sort': {'created_at': -1}
            }
        ]
        
        print(f"Pipeline: {pipeline}")
        
        notes = list(db['notes'].aggregate(pipeline))
        print(f"Found {len(notes)} notes")
        print(f"Notes: {notes}")
        
        # Convert ObjectId to string for JSON serialization
        notes = convert_objectid_to_str(notes)
        
        return jsonify({
            'success': True,
            'data': notes,
            'total': len(notes)
        })
        
    except Exception as exception:
        print(f"Error in get_notes_by_design: {exception}")
        import traceback
        traceback.print_exc()
        return jsonify({
            "error": f"Error when getting notes: {str(exception)}"
        }), 500

@notes_bp.route('/notes/<string:note_id>', methods=['PUT'])
def update_note(note_id):
    """Update a note"""
    try:
        db = connect_database()
        userId = get_jwt_identity()
        user = db.users.find_one({"_id": ObjectId(userId)})
        
        # Check if note exists and belongs to user's team
        existing_note = db['notes'].find_one({
            '_id': ObjectId(note_id),
            'team_id': str(user['team_id'])
        })
        
        if not existing_note:
            return jsonify({
                'success': False,
                'message': 'Note not found'
            }), 404
        
        # Get updated data
        content = request.form.get('content', '').strip()
        note_type = request.form.get('note_type', existing_note.get('note_type', 'comment'))
        
        if not content:
            return jsonify({
                'success': False,
                'message': 'Note content is required'
            }), 400
        
        # Process new image if uploaded
        image_url = existing_note.get('image_url')
        if 'image' in request.files:
            image_file = request.files['image']
            if image_file and image_file.filename:
                # Generate unique filename
                timestamp = int(time.time())
                filename = f"note_{userId}_{timestamp}.jpg"
                
                # Process image
                try:
                    img = Image.open(image_file.stream)
                    img = img.convert("RGB")
                    img.thumbnail((800, 600), Image.LANCZOS)
                    
                    buffer = io.BytesIO()
                    img.save(buffer, format="JPEG", quality=85)
                    buffer.seek(0)
                    
                    # Create file-like object for AWS upload
                    class FileObj:
                        def __init__(self, data):
                            self.data = data
                            self.filename = filename
                            self._position = 0
                        
                        def read(self, size=None):
                            if size is None:
                                return self.data[self._position:]
                            else:
                                result = self.data[self._position:self._position + size]
                                self._position += size
                                return result
                        
                        def seek(self, position, whence=0):
                            if whence == 0:  # SEEK_SET
                                self._position = position
                            elif whence == 1:  # SEEK_CUR
                                self._position += position
                            elif whence == 2:  # SEEK_END
                                self._position = len(self.data) + position
                        
                        def tell(self):
                            return self._position
                        
                        def close(self):
                            pass
                    
                    image_file_obj = FileObj(buffer.getvalue())
                    
                    # Upload to AWS
                    if existing_note.get('ideal_id'):
                        s3_path = f'notes/{userId}/{existing_note["ideal_id"]}/{filename}'
                    else:
                        s3_path = f'notes/{userId}/designs/{existing_note["design_id"]}/{filename}'
                    image_url = aws.upload_file(image_file_obj, s3_path)
                    
                except Exception as e:
                    print(f"Error processing image: {e}")
                    return jsonify({
                        'success': False,
                        'message': 'Failed to process image'
                    }), 500
        
        # Update note
        update_data = {
            'content': content,
            'note_type': note_type,
            'image_url': image_url,
            'updated_at': int(time.time())
        }
        
        result = db['notes'].update_one(
            {'_id': ObjectId(note_id)},
            {'$set': update_data}
        )
        
        if result.modified_count > 0:
            # Get updated note with user information
            pipeline = [
                {
                    '$match': {'_id': ObjectId(note_id)}
                },
                {
                    '$lookup': {
                        'from': 'users',
                        'localField': 'user_id',
                        'foreignField': '_id',
                        'as': 'user'
                    }
                },
                {
                    '$unwind': {
                        'path': '$user',
                        'preserveNullAndEmptyArrays': True
                    }
                },
                {
                    '$project': {
                        'content': 1,
                        'ideal_id': 1,
                        'design_id': 1,
                        'user_id': 1,
                        'team_id': 1,
                        'note_type': 1,
                        'image_url': 1,
                        'created_at': 1,
                        'updated_at': 1,
                        'user': {
                            'username': '$user.username',
                            'email': '$user.email',
                            'avatar': '$user.avatar'
                        }
                    }
                }
            ]
            
            updated_note = list(db['notes'].aggregate(pipeline))[0]
            
            # Convert ObjectId to string for JSON serialization
            updated_note = convert_objectid_to_str(updated_note)
            
            return jsonify({
                'success': True,
                'message': 'Note updated successfully',
                'data': updated_note
            })
        else:
            return jsonify({
                'success': False,
                'message': 'Failed to update note'
            }), 500
        
    except Exception as exception:
        return jsonify({
            "error": f"Error when updating note: {str(exception)}"
        }), 500

@notes_bp.route('/notes/<string:note_id>', methods=['DELETE'])
def delete_note(note_id):
    """Delete a note"""
    try:
        db = connect_database()
        userId = get_jwt_identity()
        user = db.users.find_one({"_id": ObjectId(userId)})
        
        # Check if note exists and belongs to user's team
        existing_note = db['notes'].find_one({
            '_id': ObjectId(note_id),
            'team_id': str(user['team_id'])
        })
        
        if not existing_note:
            return jsonify({
                'success': False,
                'message': 'Note not found'
            }), 404
        
        # Delete note
        result = db['notes'].delete_one({'_id': ObjectId(note_id)})
        
        if result.deleted_count > 0:
            return jsonify({
                'success': True,
                'message': 'Note deleted successfully'
            })
        else:
            return jsonify({
                'success': False,
                'message': 'Failed to delete note'
            }), 500
        
    except Exception as exception:
        return jsonify({
            "error": f"Error when deleting note: {str(exception)}"
        }), 500

@notes_bp.route('/notes/<string:note_id>/image', methods=['DELETE'])
def delete_note_image(note_id):
    """Delete image from a note"""
    try:
        db = connect_database()
        userId = get_jwt_identity()
        user = db.users.find_one({"_id": ObjectId(userId)})
        
        # Check if note exists and belongs to user's team
        existing_note = db['notes'].find_one({
            '_id': ObjectId(note_id),
            'team_id': str(user['team_id'])
        })
        
        if not existing_note:
            return jsonify({
                'success': False,
                'message': 'Note not found'
            }), 404
        
        # Update note to remove image
        result = db['notes'].update_one(
            {'_id': ObjectId(note_id)},
            {
                '$set': {
                    'image_url': None,
                    'updated_at': int(time.time())
                }
            }
        )
        
        if result.modified_count > 0:
            return jsonify({
                'success': True,
                'message': 'Note image removed successfully'
            })
        else:
            return jsonify({
                'success': False,
                'message': 'Failed to remove note image'
            }), 500
        
    except Exception as exception:
        return jsonify({
            "error": f"Error when removing note image: {str(exception)}"
        }), 500 