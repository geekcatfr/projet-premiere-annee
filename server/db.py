import secrets
import mysql.connector
from mysql.connector import errorcode

import json
import time
import hashlib


def loadCredentials(id_file: str):
    """id_file should be a string
    containing the name of the file with credentials in it. """
    with open(id_file) as f:
        token = json.load(f)
        content = token
        return content, {"user": token['user'], "password": token['password'], "host": token['host']}


def create_database(db_name: str, db_conn: str):
    try:
        db_conn.execute(f"CREATE DATABASE {db_name} CHARACTER SET 'utf8'")
        return True
    except mysql.connector.Error as error:
        print("Erreur en créant la base de données : {db_name}")
        return False


def update_database() -> None:
    tables = get_tables()

    pass


def toSHA(val: str):
    hashedValue = hashlib.sha256()
    hashedValue.update(val.encode())
    return hashedValue.hexdigest()


def writeInLog(error: str):
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


def get_tables():
    tables = {}
    tables['teachers'] = ("CREATE TABLE `teachers` ("
                          "teacher_id int(10) NOT NULL PRIMARY KEY AUTO_INCREMENT, "
                          "first_name varchar(64) NOT NULL, "
                          "last_name varchar(64) NOT NULL"
                          ") ENGINE=InnoDB")

    tables['users'] = ("CREATE TABLE `users` ( "
                       "`user_id` int(10) NOT NULL PRIMARY KEY AUTO_INCREMENT, "
                       "`username` varchar(512) NOT NULL, "
                       "`password` varchar(512) NOT NULL, "
                       "`is_admin` BOOLEAN NOT NULL"
                       ") ENGINE=InnoDB")

    tables['formations'] = ("CREATE TABLE `formations` ( "
                            "`formation_id` int(10) NOT NULL PRIMARY KEY AUTO_INCREMENT, "
                            "`name` TINYTEXT NOT NULL, "
                            "`description` TEXT, "
                            "`content` TEXT, "
                            "`teacher` int, "
                            "`grade` FLOAT(2), "
                            "`number_of_ratings` int, "
                            "FOREIGN KEY (teacher) REFERENCES teachers(teacher_id)"
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

    tables['dates'] = ("CREATE TABLE `dates` ( "
                       "`date_id` int NOT NULL PRIMARY KEY AUTO_INCREMENT, "
                       "`formationDate` DATE NOT NULL, "
                       "`formationDateEnd` DATE, "
                       "formationId int, "
                       "FOREIGN KEY (`formationId`) REFERENCES formations(formation_id)"
                       ") ENGINE=InnoDB")
    return tables


class DatabaseConnection():

    def __init__(self):
        self.config, self.db_creds = loadCredentials('db_id.json')
        self.name = self.config['database']
        self.isConnected = False

    def connect(self):
        try:
            conn = mysql.connector.MySQLConnection(**self.db_creds)
            conn.database = self.name
            self.isConnected = True
            return conn
        except mysql.connector.Error as error:
            writeInLog(error)
            if error.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with your user name or password")
            elif error.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist")
            else:
                print(error)
                print("Database is not running, please check")
            return mysql.connector.MySQLConnection(**self.db_creds)

    def init_database(self):
        conn = self.connect()
        with conn.cursor() as db_cursor:
            try:
                db_cursor.execute(f"USE {self.name}")
                db_cursor = conn.cursor()
            except mysql.connector.Error as error:
                if error.errno == errorcode.ER_BAD_DB_ERROR:
                    writeInLog(error)
                    print(
                        f"[NOTE] Database {self.name} doesn't exist. Creating it...")
                    create_database(self.name, db_cursor)
                    init_rows(conn, self.name)
                    conn.database = self.name
        conn.disconnect()

    def fetch_all(self):
        conn = self.connect()
        with conn.cursor() as cursor:
            cursor.fetchall()
        pass

    def export(self):
        pass

    def insert_formation(self, data):
        conn = self.connect()
        with conn.cursor() as db_cursor:
            add_formation = ("INSERT INTO formations "
                             "(name, description, content, teacher, grade, number_of_ratings) "
                             f"VALUES (\"{data.name}\", \"{data.description}\", \"{data.content}\", \"{data.teacher}\", 0, 0) ")
            db_cursor.execute(add_formation)

            conn.commit()

        conn.disconnect()

    def delete_formation(self, formation_id: int):
        deleteFormation = ("DELETE FROM `formations` "
                           f"where `formation_id` = {formation_id}")
        deleteHoursReq = (
            f"DELETE FROM `dates` WHERE `formationId` = {formation_id}")
        conn = self.connect()
        with conn.cursor() as db_cursor:
            db_cursor.execute(deleteFormation)
            conn.commit()

        conn.disconnect()

    def update_formation(self, new_formation, formation_id):
        edit_formation = ("UPDATE `formations` "
                          f"SET `name` = \"{new_formation.name}\", "
                          f"`description` = \"{new_formation.description}\", "
                          f"`content` = \"{new_formation.content}\", "
                          f"`teacher` = {new_formation.teacher} "
                          f"WHERE `formation_id` = {formation_id}")
        conn = self.connect()
        with conn.cursor() as db_cursor:
            db_cursor.execute(edit_formation)

            conn.commit()
            conn.disconnect()
            self.insertDate(new_formation.dates, formation_id)

    def check_user(self, username: str, password: str):
        select_user = (
            f"SELECT username, password FROM users WHERE username = \"{username}\"")
        conn = self.connect()
        with conn.cursor(buffered=True) as db_cursor:

            db_cursor.execute(f"USE {self.name}")
            db_cursor.execute(select_user)

            for user, db_pass in db_cursor:
                if username == user and db_pass == toSHA(password):
                    return True
            return False
        conn.disconnect()

    def get_user_list(self):
        get_id_request = (
            f"SELECT username, is_admin FROM users")
        users_list = []
        conn = self.connect()
        with conn.cursor(buffered=True) as cursor:
            cursor.execute(get_id_request)
            for username, isAdmin in cursor:
                users_list.append(
                    {"username": username, "admin": bool(isAdmin)})
        return users_list

    def insert_user(self, user: str, password: str, isAdmin: bool):
        conn = self.connect()
        if isAdmin >= 0 and isAdmin <= 1:
            with conn.cursor() as db_cursor:
                add_user = ("INSERT INTO users "
                            "(username, password, is_admin) "
                            f"VALUES (\"{user}\", \"{toSHA(password)}\", {isAdmin})")

                db_cursor.execute(add_user)
                conn.commit()

        conn.disconnect()

    def deleteUser(self, userId):
        deleteUserReq = ("DELETE FROM `users` "
                         f"where `user_id` = {userId}")
        conn = self.connect()
        with conn.cursor() as cursor:
            cursor.execute(deleteUserReq)
            conn.commit()
        conn.disconnect()

    def get_formations(self):
        get_formations_request = (
            f"SELECT formation_id, name, description, teacher, grade, number_of_ratings FROM formations")
        conn = self.connect()
        formations_list = []
        with conn.cursor(buffered=True) as db_cursor:
            db_cursor.execute(get_formations_request)
            for id, name, desc, teacher, rating, nbrRating in db_cursor:
                formations_list.append(
                    {"id": id, "title": name, "description": desc, "teacher": teacher, "rating": rating, "nbrPeopleRating": nbrRating})

        conn.disconnect()

        return formations_list

    def get_formation(self, formation_id):
        getFormationReq = (
            f"SELECT * from formations WHERE formation_id = {formation_id}")
        getDatesReq = f"SELECT formationDate from dates WHERE formationId = {formation_id}"
        conn = self.connect()
        with conn.cursor(buffered=True) as db_cursor:
            try:
                db_cursor.execute(getFormationReq)
                for id, name, desc, content, teacher, grade, nbrRating in db_cursor:
                    formation = {"id": id, "title": name, "description": desc,
                                 "content": content, "teacher": teacher, "rating": grade, "nbrPeopleRating": nbrRating}
                db_cursor.execute(getDatesReq)

                dates = []
                for date in db_cursor:
                    dates.append(date)
                formation['dates'] = dates
                conn.disconnect()
                return formation
            except UnboundLocalError:
                return {"error": "this formation does not exist"}

    def update_note(self, formation_id, new_note):
        conn = self.connect()
        getNotesReq = (
            f"SELECT grade, number_of_ratings FROM formations WHERE formation_id = {formation_id}")
        noteList = []
        with conn.cursor() as cursor:
            cursor.execute(getNotesReq)
            for grade, nbrRatings in cursor:
                noteList.append(grade)
                noteList.append(nbrRatings)
            noteList[1] += 1
            noteList[0] = (noteList[0] + new_note) / noteList[1]
        updateNoteReq = ("UPDATE `formations`"
                         f"SET `grade` = {noteList[0]}, "
                         f"`number_of_ratings` = {noteList[1]} "
                         f"WHERE formation_id = {formation_id}")
        with conn.cursor() as cursor:
            cursor.execute(updateNoteReq)
        conn.commit()
        conn.disconnect()

    def get_token(self, user):
        conn = self.connect()
        userInfos = self.get_user_infos(user)
        userId = userInfos["id"]

        validity_time = 60  # time in minutes
        current_time = time.strftime("%y-%m-%d %H:%M:%S", time.localtime())
        token = secrets.token_hex(8)

        insertTokenReq = ("INSERT INTO `tokens` "
                          "(token, validity_date, user) "
                          f"VALUES ('{token}', "
                          f"'{current_time}', {userId})")
        with conn.cursor() as db_cursor:
            db_cursor.execute(f"USE {self.name}")
            db_cursor.execute(insertTokenReq)
        conn.commit()
        conn.disconnect()
        return token

    def add_teacher(self, data):
        addTeacherReq = ("INSERT INTO teachers (first_name, last_name) "
                         f"VALUES (\"{data.first_name}\", \"{data.last_name}\")")
        conn = self.connect()
        with conn.cursor(buffered=True) as db_cursor:
            db_cursor.execute(f"USE {self.name}")
            db_cursor.execute(addTeacherReq)
        conn.commit()
        conn.disconnect()

    def get_teachers(self):
        teachers = []
        getTeacherReq = (
            f"SELECT teacher_id, first_name, last_name FROM teachers")
        conn = self.connect()
        with conn.cursor(buffered=True) as db_cursor:
            db_cursor.execute(getTeacherReq)

            for id, firstName, lastName in db_cursor:
                teachers.append(
                    {"id": id, "firstName": firstName, "lastName": lastName})

        conn.disconnect()
        return teachers

    def get_teacher(self, teacherId: int):
        get_teacher = f"SELECT teacher_id, first_name, last_name FROM teachers where teacher_id = {teacherId}"
        conn = self.connect()
        teacher = {}
        with conn.cursor() as cursor:
            cursor.execute(get_teacher)

            for id, firstName, lastName in cursor:
                teacher['id'] = id
                teacher['firstName'] = firstName
                teacher['lastName'] = lastName

        conn.commit()
        conn.disconnect()
        return teacher

    def delete_teacher(self, teacherId: int):
        delete_teacher = ("DELETE FROM `teachers` "
                          f"WHERE `teacher_id` = {teacherId}")
        getFormationsTeacher = f"SELECT formation_id FROM `formations` WHERE teacher = {teacherId}"
        deleteAllFormationsReq = (
            f"DELETE FROM `formations` WHERE `teacher` = {teacherId}")
        deleteHoursReq = ("DELETE FROM `dates` WHERE `formationId` = {}")
        conn = self.connect()
        with conn.cursor() as cursor:
            cursor.execute(getFormationsTeacher)
            for id in cursor:
                cursor.execute(deleteHoursReq.format(id))
                conn.commit()

        with conn.cursor() as cursor:
            cursor.execute(deleteAllFormationsReq)
            cursor.execute(delete_teacher)
        conn.commit()
        conn.disconnect()
        return {"isDeleted": True}

    def get_teacher_formations(self, teacherId: int):
        getFormationsTeacher = f"SELECT * FROM `formations` WHERE teacher = {teacherId}"
        formations = []
        conn = self.connect()
        with conn.cursor() as cursor:
            cursor.execute(getFormationsTeacher)
            for id, name, desc, content, teacher, grade, nbrRating in cursor:
                formation = {"id": id, "title": name, "description": desc, "content": content,
                             "teacher": teacher, "rating": grade, "nbrPeopleRating": nbrRating}
                formations.append(formation)
        conn.disconnect()
        return formations

    def insertDate(self, dateList: list, formationId: int):
        insertDateRequest = "INSERT INTO `dates` (formationDate, formationId) VALUES (\"{}\", {})"
        conn = self.connect()
        with conn.cursor() as cursor:
            for date in dateList:
                formattedDate = date.replace("T", " ")
                formattedDate += ":00"
                cursor.execute(insertDateRequest.format(
                    formattedDate, formationId))
                conn.commit()
        conn.disconnect()

    def deleteDate(self):
        pass

    def updateDate(self):
        pass

    def getDate(self, date):
        getDateReq = f"SELECT formationId FROM dates WHERE formationDate = \"{date}\""
        formationsId = []
        conn = self.connect()
        with conn.cursor() as cursor:
            cursor.execute(getDateReq)
            for formationId in cursor:
                formationsId.append(formationId)

        return {"date": date, "formations": formationsId}


def init_rows(db_conn, db_name):
    """Init a dict of tables,
    the key is the name of the table
    write the SQL request as a value, and write them in db_conn"""
    db_conn.database = db_name
    db_cursor = db_conn.cursor()
    tables = get_tables()

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
