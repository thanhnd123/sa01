from database.connect_database import connect_database

def seed_teams():
    db = connect_database()
    teams_collection = db['teams']
    if teams_collection.count_documents({}) > 0:
        print("Teams already seeded")
        return
    teams = [
        {
            "name": "Giran",
        },
        {
            "name": "Vi Tu",
        },
        {
            "name": "Tung",
        },
        {
            "name": "Hoang Dung"
        }
    ];

    try:
        result = teams_collection.insert_many(teams)
        print(f"Successfully seeded {len(result.inserted_ids)} teams")
        return result.inserted_ids
    except Exception as e:
        print(f"Error seeding teams: {str(e)}")
        return None
