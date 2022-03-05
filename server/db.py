import mysql.connector
import json

def loadCredentials(id_file):
    with open(id_file) as f:
        token = json.load(f)
        return token

config = loadCredentials('db_id.json')

try:
    conn = mysql.connector.MySQLConnection(**config)
except mysql.connector.Error as error:
    if error.errno == errorcode.ER_ACCESS_DENIED_ERROR:
        print("Something is wrong with your user name or password")
    elif error.errno == errorcode.ER_BAD_DB_ERROR:
        print("Database does not exist")
    else:
        print(error)