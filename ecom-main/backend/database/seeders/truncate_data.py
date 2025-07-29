from pymongo import MongoClient

def truncate_product_ideals():
    """
    Truncate the product_ideals table
    """
    client = MongoClient('mongodb://mongodb:27017/', serverSelectionTimeoutMS=5000)
    try:
        print(client.exp_ecom_db.product_ideals.count_documents({}))
        client.exp_ecom_db.product_ideals.delete_many({})
    except Exception as e:
        client.rollback()
        raise e
    finally:
        client.close()

truncate_product_ideals()