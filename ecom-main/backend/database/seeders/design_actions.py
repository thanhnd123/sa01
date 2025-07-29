
sample_data = [
        {
            'ideal_id': '123',
            'ideal_banner': 'https://expecomsystem.s3.amazonaws.com/mockups/2025-05-07/day-moi-la-moi-nhat/c5784a5b-df8e-4793-b866-7b83af452aa8-30x30.png',
            'name': 'Day moi la moi nhat',
            'png': 'https://expecomsystem.s3.amazonaws.com/mockups/2025-05-07/day-moi-la-moi-nhat/c5784a5b-df8e-4793-b866-7b83af452aa8-30x30.png',
            'created_by': 0,
            'worker': '',
            'created_at': '2024-03-20T10:00:00Z',
            'actions': [
               #action
            ]
        }
    ]


from flask_bcrypt import Bcrypt
from datetime import datetime
from database.connect_database import connect_database
bcrypt = Bcrypt()

def seed_design_actions():
    db = connect_database()
    design_actions_collection = db['design_actions']
    
    # Check if users already exist
    # if design_actions_collection.count_documents({}) > 0:
    #     design_actions_collection.delete_many({})
        
    design_actions = sample_data
    
    try:
        result = design_actions_collection.insert_many(design_actions)
        print(f"Successfully seeded {len(result.inserted_ids)} design actions")
        return result.inserted_ids
    except Exception as e:
        print(f"Error seeding design actions: {str(e)}")
        return None