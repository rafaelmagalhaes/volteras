import os
import csv
import psycopg2
from psycopg2 import sql
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Access the values
db_name = os.getenv("DB_NAME")
db_port = os.getenv("DB_PORT")
db_pwd = os.getenv("DB_PWD")
db_user = os.getenv("DB_USER")
db_host = os.getenv("DB_HOST")

def load_csv_to_db(csv_file, table_name):
    conn = psycopg2.connect(
        dbname=db_name,
        user=db_user,
        password=db_pwd,
        host=db_host,
        port=db_port
    )
    cursor = conn.cursor()
    vehicle_id = os.path.splitext(os.path.basename(csv_file))[0]
    print(vehicle_id)
    with open(csv_file, 'r') as f:
        reader = csv.reader(f, delimiter=',', quotechar='"')
        header = next(reader)  #l
        for row in reader:
          row.insert(0, vehicle_id)
          query = sql.SQL("""
                        INSERT INTO vehicle_data (vehicle_id, timestamp, speed, odometer, soc, elevation, shift_state)
                        VALUES (%s, %s, %s, %s, %s, %s, %s)
          """)
          cursor.execute(query, row)


    conn.commit()  # Commit once after all rows are inserted
    cursor.close()
    conn.close()


# Directory containing CSV files
csv_directory = '/database/csv/'
table_name = 'vehicle_data'

# Process each CSV file in the directory
for csv_file in os.listdir(csv_directory):
    if csv_file.endswith('.csv'):
        full_path = os.path.join(csv_directory, csv_file)
        load_csv_to_db(full_path, table_name)
        print(f"Processed {csv_file}")
