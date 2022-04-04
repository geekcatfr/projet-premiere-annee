import secrets
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
        return False


def update_database() -> None:
    pass


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
                       "`password` varchar(512) NOT NULL "
                       ") ENGINE=InnoDB")

    tables['formations'] = ("CREATE TABLE `formations` ( "
                            "`formation_id` int(10) NOT NULL PRIMARY KEY AUTO_INCREMENT, "
                            "`name` TINYTEXT NOT NULL, "
                            "`description` TEXT, "
                            "`content` TEXT NOT NULL, "
                            "`teacher` TINYTEXT NOT NULL"
                            ") ENGINE=InnoDB")

    tables['pages'] = ("CREATE TABLE `pages` ( "
                       "`page_id` int(10) NOT NULL PRIMARY KEY AUTO_INCREMENT, "
                       "`title` TINYTEXT NOT NULL, "
                       "`description` TEXT, "
                       "`content` TEXT NOT NULL"
                       ") ENGINE=InnoDB")

    tables['tokens'] = ("CREATE TABLE `tokens` ( "
                        "`token_id` int(10) NOT NULL PRIMARY KEY AUTO_INCREMENT, "
                        "`token` varchar(20) NOT NULL, "
                        "`validity_date` DATETIME NOT NULL, "
                        "`user` int, "
                        "FOREIGN KEY (`user`) REFERENCES users(user_id) "
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
        self.isConnected = False

    def connect(self):
        try:
            self.conn = mysql.connector.MySQLConnection(**self.db_creds)
            self.conn.database = self.name
            self.isConnected = True
            return True
        except mysql.connector.Error as error:
            writeInLog(error)
            if error.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with your user name or password")
            elif error.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist")
            else:
                print(error)
                print("Database is not running, please check")
            return False

    def disconnect(self):
        try:
            self.conn.disconnect()
        except mysql.connector.Error as error:
            writeInLog(error)
            print(error)

    def init_database(self):
        self.connect()
        db_cursor = self.conn.cursor()
        try:
            db_cursor.execute(f"USE {self.name}")
            db_cursor = self.conn.cursor()
        except mysql.connector.Error as error:
            if error.errno == errorcode.ER_BAD_DB_ERROR:
                writeInLog(error)
                print(
                    f"[NOTE] Database {self.name} doesn't exist. Creating it...")
                create_database(self.name, db_cursor)
                init_rows(self.conn, self.name)
                self.conn.database = self.name
        self.disconnect()
        db_cursor.close()

    def insert_row(self, type, **data):
        self.connect()
        db_cursor = self.conn.cursor()
        add_user = ("INSERT INTO users "
                    "(username, password) "
                    "VALUES (\"{}\", \"{}\")")

        if type == 'user':
            add_user = add_user.format(data['username'], data['password'])
            db_cursor.execute(add_user)

        self.conn.commit()
        db_cursor.close()
        self.disconnect()
        pass

    def insert_formation(self, data):
        self.connect()
        db_cursor = self.conn.cursor()
        add_formation = ("INSERT INTO formations "
                         "(name, description, content, teacher) "
                         f"VALUES (\"{data.name}\", \"{data.description}\", \"{data.content}\", \"{data.teacher}\") ")
        db_cursor.execute(add_formation)
        self.conn.commit()
        db_cursor.close()
        self.disconnect()

    def delete_row(self) -> None:
        self.connect()
        delete_user = ("")
        self.disconnect()
        pass

    def check_user(self, username, password):
        self.connect()
        db_cursor = self.conn.cursor(buffered=True)
        select_user = (
            f"SELECT username, password FROM users WHERE username = \"{username}\"")

        db_cursor.execute(f"USE {self.name}")
        db_cursor.execute(select_user)

        for user, db_pass in db_cursor:
            if username == user and db_pass == password:
                return {"username": username, "password": password}
            else:
                return None
        db_cursor.close()
        self.disconnect()

    def get_user_infos(self, username):
        self.connect()
        db_cursor = self.conn.cursor()
        get_id_request = (
            f"SELECT user_id FROM users WHERE username = \"{username}\"")

        db_cursor.execute(get_id_request)

        for id in db_cursor:
            return {"id": id, "username": username}
        db_cursor.close()
        self.disconnect()

    def get_formations(self):
        self.connect()
        db_cursor = self.conn.cursor()
        get_formations_request = (
            f"SELECT formation_id, name, description, teacher FROM formations")
        formations_list = []

        db_cursor.execute(get_formations_request)

        for id, name, desc, teacher in db_cursor:
            formations_list.append(
                {"id": id, "title": name, "description": desc, "teacher": teacher})
        self.disconnect()
        return formations_list

    def get_formation(self, formation_id):
        self.connect()
        db_cursor = self.conn.cursor()
        get_formation_req = (
            f"SELECT formation_id, name, description from formations WHERE formation_id = {formation_id}")
        db_cursor.execute(get_formation_req)

        print(db_cursor)

        for id, name, desc in db_cursor:
            formation = {"id": id, "title": name, "description": desc}

        self.disconnect()
        return {}

    def get_token(self, user):
        self.connect()
        user_infos = self.get_user_infos(user)
        user_id = user_infos["id"]

        validity_time = 60  # time in minutes
        current_time = time.strftime("%y-%m-%d %H:%M:%S", time.localtime())
        token = secrets.token_hex(8)

        insert_token = ("INSERT INTO `tokens` "
                        "(token, validity_date, user) "
                        f"VALUES ('{token}', "
                        f"'{current_time}', {user_id})")
        db_cursor = self.conn.cursor()
        db_cursor.execute(f"USE {self.name}")
        db_cursor.execute(insert_token)
        self.disconnect()

        return {"token": token}
