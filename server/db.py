import mysql.connector
from mysql.connector import errorcode

import json
import time

def loadCredentials(id_file):
    with open(id_file) as f:
        token = json.load(f)
        return token

def create_database(db_name, db_conn):
    try:
        db_conn.execute(f"CREATE DATABASE {db_name} CHARACTER SET 'utf8'")
        return True
    except mysql.connector.Error as error:
        print("Erreur en créant la base de données : {db_name}")
        return None

def connect_database(config):
    try:
        conn = mysql.connector.MySQLConnection(**config)
        return conn
    except mysql.connector.Error as error:
        writeError(error)
        if error.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your user name or password")
        elif error.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(error)

def writeError(error):
    log_file = "db.log"
    error = str(error)
    current_time = time.strftime("%H:%M:%S", time.localtime())
    try:
        with open(log_file, 'a') as logfile:
            logfile.write(f"{current_time} \"{error}\"\n")
    except FileNotFoundError:
        print(f"[NOTE] File {log_file} doesn't exist. Creating it...")
        open(log_file, 'x').close()



config = loadCredentials('db_id.json')
print(config)
db_conn = connect_database(config)
db_cursor = db_conn.cursor()

db_name = "fcpro_db"

try:
    db_cursor.execute(f"USE {db_name}")
except mysql.connector.Error as error:
    if error.errno == errorcode.ER_BAD_DB_ERROR:
        writeError(error)
        print(f"[NOTE] Database {db_name} doesn't exist. Creating it...")
        create_database(db_name, db_cursor)
        db_conn.database = db_name


