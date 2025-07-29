import requests

def get_amazon_suggestions(keyword):
    url = f"https://completion.amazon.com/search/complete?search-alias=aps&q={keyword}&client=amazon-search-ui&mkt=1"
    response = requests.get(url)
    if response.status_code == 200:
        suggestions = response.json()[1]  # Lấy danh sách từ khóa gợi ý
        return suggestions
    return []

# Ví dụ kiểm tra từ khóa "wireless headphones"
keywords = get_amazon_suggestions("iphone 15")
print(keywords)
