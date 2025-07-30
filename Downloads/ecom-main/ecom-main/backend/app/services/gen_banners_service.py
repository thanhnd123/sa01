import random

def get_random_mockups_by_event(db, product_type_id, events, banner_count):
    """
    Lấy ngẫu nhiên mockup theo event cho 1 product_type_id.

    Args:
        db: kết nối database MongoDB.
        product_type_id (str): id của product type.
        events (list): danh sách event cần lọc (chuỗi).
        banner_count (int): số lượng mockup cần lấy.

    Returns:
        list: danh sách mockup đã lọc và chọn ngẫu nhiên.
    """
    # 1. Lấy tất cả mockups thuộc product_type_id
    all_mockups = list(db['mockups'].find({"product_type": product_type_id, 'status': 'active'}))

    # 2. Lọc mockups có ít nhất 1 event nằm trong events truyền vào
    filtered_mockups = [
        m for m in all_mockups
        if 'events' in m and any(event in m['events'] for event in events)
    ]

    # Nếu không có mockup nào thỏa mãn event, fallback về tất cả mockup của product_type
    if not filtered_mockups:
        filtered_mockups = all_mockups

    random.shuffle(filtered_mockups)
    # 3. Lấy ngẫu nhiên banner_count mockup (nếu số lượng ít hơn thì lấy hết)
    if len(filtered_mockups) <= banner_count:
        return filtered_mockups
    else:
        return random.sample(filtered_mockups, banner_count)
