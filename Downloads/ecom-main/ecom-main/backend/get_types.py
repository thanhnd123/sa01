import requests
import json

def get_product_types():
    url = "https://profulfill.io/wp-admin/admin-ajax.php"
    
    params = {
        "key": "RTGF895885rtf564HGFDS890RNY8374",
        "email": "thienduongvangem.ntt@gmail.com",
        "action": "pf_api",
        "api": "pf_get_type"
    }
    
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()  # Raise an exception for bad status codes
        
        # Get the JSON response
        data = response.json()
        
        # Save to a JSON file with proper formatting
        with open('data/product_types.json', 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
            
        print("Data has been successfully saved to data/product_types.json")
        return data
    except requests.exceptions.RequestException as e:
        print(f"Error making request: {e}")
        return None
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
        return None

if __name__ == "__main__":
    get_product_types() 