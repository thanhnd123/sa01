import pandas as pd
import sqlite3
import os
from pathlib import Path

# Get the path to data.csv relative to this script
script_dir = Path(__file__).parent
data_path = script_dir.parent / 'data/data.csv'

# Connect to SQLite database
db_path = script_dir.parent / 'instance/ecommerce.db'
conn = sqlite3.connect(db_path)

try:

    # Drop keywords table if it exists
    cursor = conn.cursor()
    cursor.execute("DROP TABLE IF EXISTS keywords")
    conn.commit()
    
    # Read CSV file
    df = pd.read_csv(data_path)
    
    # Import to keywords table
    df.to_sql('keywords', conn, if_exists='append', index=False)
    
    print(f"Successfully imported {len(df)} rows to keywords table")

except Exception as e:
    print(f"Error importing data: {str(e)}")

finally:
    # Close connection
    conn.close()
