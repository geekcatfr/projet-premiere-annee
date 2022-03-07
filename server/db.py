import mysql.connector
from mysql.connector import errorcode

import json
import time

def loadCredentials(id_file):
    """id_file should be a string 
    containing the name of the file with credentials in it. """
    with open(id_file) as f:
        token = json.load(f)
        content = token
        return content, {"user": token['user'], "password": token['password'], "host": token['host']}

def create_database(db_name, db_conn):
    try:
        db_conn.execute(f"CREATE DATABASE {db_name} CHARACTER SET 'utf8'")
        return True
    except mysql.connector.Error as error:
        print("Erreur en créant la base de données : {db_name}")
        return None

def writeInLog(error):
    """Takes an error in str format as argument, writes in db.log the error with formatted time."""
    log_file = "db.log"
    error = str(error)
    current_time = time.strftime("%H:%M:%S", time.localtime())
    try:
        with open(log_file, 'a') as logfile:
            logfile.write(f"{current_time} \"{error}\"\n")
    except FileNotFoundError:
        print(f"[NOTE] File {log_file} doesn't exist. Creating it...")
        open(log_file, 'x').close()

def init_rows(db_conn, db_name):
    """Init a dict of tables, 
    the key is the name of the table
    write the SQL request as a value, and write them in db_conn"""
    db_conn.database = db_name
    db_cursor = db_conn.cursor()
    tables = {}

    tables['users'] = ("CREATE TABLE `users` ( "
        "`user_id` int(10) NOT NULL PRIMARY KEY AUTO_INCREMENT, "
        "`username` varchar(32) NOT NULL, "
        "`password` varchar(256) NOT NULL "
        ") ENGINE=InnoDB")

    tables['formations'] = ("CREATE TABLE `formations` ( "
    "`formation_id` int(10) NOT NULL PRIMARY KEY AUTO_INCREMENT, "
    "`name` varchar(100) NOT NULL"
    ") ENGINE=InnoDB")


    for table, request in tables.items():
        try:
            print(f"Creating {table}...")
            db_cursor.execute(request)
        except mysql.connector.Error as error:
            if error == errorcode.ER_TABLE_EXISTS_ERROR:
                print(f"{table} exists.")
                writeInLog(f"{table} already exists. {error}")
            else:
                print(error)
                writeInLog(error)



class DatabaseConnection():

    def __init__(self):
        self.config, self.db_creds = loadCredentials('db_id.json')
        self.name = self.config['database']
        

    def connect(self):
        try:
            self.conn = mysql.connector.MySQLConnection(**self.db_creds)
            return True
        except mysql.connector.Error as error:
            writeInLog(error)
            if error.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with your user name or password")
            elif error.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist")
            else:
                print(error)
            return False
  

    def init_database(self):
        db_cursor = self.conn.cursor()
        try:
            db_cursor.execute(f"USE {self.name}")
            db_cursor = self.conn.cursor()
        except mysql.connector.Error as error:
            if error.errno == errorcode.ER_BAD_DB_ERROR:
                writeInLog(error)
                print(f"[NOTE] Database {self.name} doesn't exist. Creating it...")
                create_database(self.name, db_cursor)
                init_rows(self.conn, self.name)
                self.conn.database = self.name

    def insert_row(self, type, **data):
        add_user = ("INSERT INTO users "
        "(username, password)"
        "VALUES (%s %s)")

    def delete_row(self) -> None:
        pass

    def get_row(self, row) -> None:
        pass

db = DatabaseConnection()
db.connect()

db.init_database()
db.insert_row('user', {'username': 'chat', 'password': 'chat'})


