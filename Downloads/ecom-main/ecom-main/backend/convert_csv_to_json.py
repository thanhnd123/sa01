import csv
import json

def convert_csv_to_json():
    # Đọc file CSV
    data = []
    with open('data/data.csv', 'r', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            data.append(row)
    
    # Ghi ra file JSON
    with open('data/data.json', 'w', encoding='utf-8') as jsonfile:
        json.dump(data, jsonfile, indent=2, ensure_ascii=False)
    
    print(f"Đã chuyển đổi {len(data)} dòng từ CSV sang JSON")

if __name__ == "__main__":
    convert_csv_to_json() 