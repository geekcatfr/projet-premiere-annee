from multiprocessing import connection
import mysql.connector
import json

def loadCredentials():
    with open('id.json') as f:
        json.dumps(f)
    pass

conn = connection.MySQLConnection()