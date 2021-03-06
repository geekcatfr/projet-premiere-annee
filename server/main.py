import sys
from typing import Optional
from fastapi import FastAPI, Form
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from db import DatabaseConnection, writeInLog

app = FastAPI()

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class User(BaseModel):
    username: str
    password: str


class Teacher(BaseModel):
    first_name: str
    last_name: str


class Formation(BaseModel):
    name: str
    description: Optional[str] = None
    content: Optional[str] = None
    teacher: Optional[str] = None
    dates: Optional[list] = None


db = DatabaseConnection()
db.connect()
db.init_database()
db.insert_user('chat', 'chat', True)

if (db.isConnected == False):
    writeInLog(
        "MySQL server is either not running or wrong credentials have been entered in the db_id.json file.")
    sys.exit("Database connexion error.")


@app.get("/")
def read_root():
    return {"message": "the API is correctly working."}


@app.get("/formations")
def list_formations():
    formation_name = db.get_formations()
    return {"formations": formation_name}


@app.get("/formations/{formation_id}")
def formation_content(formation_id: int):
    return db.get_formation(formation_id)


@app.post("/formations/date")
def searchByDate(formationDate: str):
    return db.getDate(formationDate)


@app.post("/formations/add")
def add_formation(formation: Formation):
    print(formation.dates)
    if int(formation.teacher) > 0:
        db.insert_formation(formation)
        return {"added": True}
    else:
        return {"error": "invalid id passed"}


@app.post("/formations/edit")
def edit_formation(formation: Formation, formation_id: int):
    print(formation.dates)
    db.update_formation(formation, formation_id)
    return {"isEdited": True}


@app.get("/formations/edit/note")
def update_note(formationId: int, note: int):
    if note >= 0 and note <= 5:
        db.update_note(formationId, note)
        return {"isSaved": True}
    else:
        return {"error": "value is not valid"}


@app.get("/formations/delete/{formation_id}")
def delete_formation(formation_id: int):
    db.delete_formation(formation_id)
    return {"isDeleted": True}


@app.get("/teachers")
def get_teachers():
    return db.get_teachers()


@app.get("/teachers/{teacherId}/formations")
def get_teacher_formation(teacherId: int):
    return db.get_teacher_formations(teacherId)


@app.get("/teachers/{teacherId}")
def get_teacher(teacherId: int):
    return db.get_teacher(teacherId)


@app.post("/teachers/add")
def add_teacher(teacher: Teacher):
    db.add_teacher(teacher)
    return {"isAdded": True, "name": f"{teacher.first_name} {teacher.last_name}"}


@app.get("/teachers/delete/{teacherId}")
def delete_user(teacherId: int):
    db.delete_teacher(teacherId)
    return {"isDeleted": True, "mich": teacherId}


@app.get("/users")
def get_users():
    return db.get_user_list()


@app.post('/users/login/')
def login_user(user: User):
    req = db.check_user(user.username, user.password)
    #token = db.get_token(user.username)
    if req:
        return {"token": "aaa"}
    else:
        return {"error": "incorrect user login or password."}


@app.post('/users/add')
async def add_user(user: User, isAdmin: bool):
    db.insert_user(user.username, user.password, isAdmin)
    return {"isAdded": True}


@app.get('/users/delete')
def delete_user(userId: int):
    db.deleteUser(userId)
    return {"isDeleted": True}
