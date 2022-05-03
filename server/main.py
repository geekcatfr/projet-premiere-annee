from ast import For
import sys
from typing import Optional
from fastapi import FastAPI, Form
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


db = DatabaseConnection()
db.connect()
db.init_database()

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


@app.post("/formations/add")
def add_formation(formation: Formation):
    if int(formation.teacher) > 0:
        db.insert_formation(formation)
        return {"added": True}
    else: 
        return {"error": "invalid id passed"}


@app.post("/formations/edit")
def edit_formation(formation: Formation, formation_id: int):
    db.update_formation(formation, formation_id)
    return {"isEdited": True}


@app.post("/formation/update_note")
def update_note(formation: int, note: int):
    if note >= 0 and note <= 5:
        db.update_note(note)
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

@app.get("/teachers/{teacherId}")
def get_teacher(teacherId: int):
    return db.get_teacher(teacherId)


@app.post("/teachers/add")
def add_teacher(teacher: Teacher):
    db.add_teacher(teacher)
    return {"isAdded": True, "name": f"{teacher.first_name} {teacher.last_name}"}


@app.post("/teachers/delete")
def delete_user(teacher: Teacher):
    pass


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


@app.post('/users/delete')
def delete_user(user: User):
    pass
