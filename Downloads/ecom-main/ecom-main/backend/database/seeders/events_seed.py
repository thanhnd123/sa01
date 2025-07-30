import requests
from datetime import datetime, timedelta
from database.connect_database import connect_database
from bson import ObjectId
import calendar

def get_holidays(country_code, year):
    """Lấy danh sách ngày lễ từ API"""
    url = f"https://date.nager.at/api/v3/PublicHolidays/{year}/{country_code}"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    return []

def get_special_holidays(year):
    """Tính toán các ngày lễ đặc biệt"""
    special_holidays = []
    
    # Mother's Day - Chủ nhật thứ 2 của tháng 5
    may_first = datetime(year, 5, 1)
    first_sunday = may_first + timedelta(days=(6 - may_first.weekday()))
    mothers_day = first_sunday + timedelta(days=7)
    special_holidays.append({
        'name': "Mother's Day",
        'date': mothers_day.strftime('%Y-%m-%d'),
        'type': 'Special'
    })
    
    # Father's Day - Chủ nhật thứ 3 của tháng 6
    june_first = datetime(year, 6, 1)
    first_sunday = june_first + timedelta(days=(6 - june_first.weekday()))
    fathers_day = first_sunday + timedelta(days=14)
    special_holidays.append({
        'name': "Father's Day",
        'date': fathers_day.strftime('%Y-%m-%d'),
        'type': 'Special'
    })
    
    # Christmas - 25/12
    special_holidays.append({
        'name': "Christmas Day",
        'date': f"{year}-12-25",
        'type': 'Special'
    })
    
    return special_holidays

def seed_holidays():
    """Seeder cho các ngày lễ"""
    try:
        mongo = connect_database()
        events = mongo['events']
        events.delete_many({})
        # Danh sách các quốc gia cần lấy ngày lễ
        countries = {
            'US': 'United States',
            # 'GB': 'United Kingdom',
            'AU': 'Australia'
        }
        
        # Lấy ngày lễ cho năm hiện tại và năm sau
        current_year = datetime.now().year
        years = [current_year, current_year + 1]
        
        # Thêm các ngày lễ đặc biệt
        for year in years:
            special_holidays = get_special_holidays(year)
            for holiday in special_holidays:
                existing_event = events.find_one({
                    'title': holiday['name'],
                    'start_time': datetime.fromisoformat(holiday['date']),
                    'status': {'$ne': 'deleted'}
                })
                
                if not existing_event:
                    event_data = {
                        'title': holiday['name'],
                        'description': f"{holiday['name']} - Special Holiday",
                        'start_time': datetime.fromisoformat(holiday['date']),
                        'end_time': datetime.fromisoformat(holiday['date']),
                        'status': 'active',
                        'created_at': datetime.utcnow(),
                        'updated_at': datetime.utcnow(),
                        'user_id': 'system',
                        'is_holiday': True,
                        'holiday_type': holiday['type']
                    }
                    
                    events.insert_one(event_data)
                    print(f"Added special holiday: {holiday['name']} on {holiday['date']}")
        
        # Thêm các ngày lễ từ API
        for country_code, country_name in countries.items():
            for year in years:
                holidays = get_holidays(country_code, year)
                
                for holiday in holidays:
                    existing_event = events.find_one({
                        'title': holiday['name'],
                        'start_time': datetime.fromisoformat(holiday['date']),
                        'status': {'$ne': 'deleted'}
                    })
                    
                    if not existing_event:
                        event_data = {
                            'title': holiday['name'],
                            'description': f"{holiday['name']} in {country_name}",
                            'start_time': datetime.fromisoformat(holiday['date']),
                            'end_time': datetime.fromisoformat(holiday['date']),
                            'status': 'active',
                            'created_at': datetime.utcnow(),
                            'updated_at': datetime.utcnow(),
                            'user_id': 'system',
                            'is_holiday': True,
                            'country': country_code,
                            'holiday_type': holiday.get('type', 'Public')
                        }
                        
                        events.insert_one(event_data)
                        print(f"Added holiday: {holiday['name']} for {country_name} on {holiday['date']}")
        
        print("Holiday seeding completed successfully!")
        
    except Exception as e:
        print(f"Error seeding holidays: {str(e)}")
