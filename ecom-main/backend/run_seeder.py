from database.seeders.userSeeder import users
from app.modules.teamexp.model import getDataJson
from database.connect_database import connect_database
from database.seeders.design_actions import seed_design_actions
from database.seeders.teams import seed_teams
from database.seeders.mockup_seeder import seed_mockups
from database.seeders.events_seed import seed_holidays
def run_seeder():
    # print("Starting teams seeder...")
    # result = seed_teams()
    # if result:
    #     print("Teams seeded successfully!")
    # else:
    #     print("Failed to seed teams!")

    # print("Starting user seeder...")
    # result = users()
    # if result:
    #     print("Users seeded successfully!")
    # else:
    #     print("Failed to seed users!") 
    #     print("Starting user seeder...")
    # p_types = getDataJson('product_types.json')
    # db = connect_database()
    # db.drop_collection('product_types')
    # for _, name in p_types.items(): 
    #     db.product_types.insert_one({
    #     "name": name
    #     })
    # print("Starting design actions seeder...")
    # result = seed_design_actions()
    # if result:
    #     print("Design actions seeded successfully!")
    # else:
    #     print("Failed to seed design actions!")

    # print("Starting mockup seeder...")
    # result = seed_mockups()
    # if result:
    #     print("Mockups seeded successfully!")
    # else:
    #     print("Failed to seed mockups!")
    print("Starting events seeder...")
    result = seed_holidays()
    if result:
        print("Events seeded successfully!")
    else:
        print("Failed to seed events!")

run_seeder()