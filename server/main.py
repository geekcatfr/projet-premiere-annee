import sys
from typing import Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import json

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
    return {"Hello", "world"}


@app.get("/formations")
def list_formations():
    formation_name = db.get_formations()
    return {"formations": formation_name}


@app.get("/formations/{formation_id}")
def formation_content(formation_id: int):
    return db.get_formation(formation_id)


@app.post("/formations/add")
def add_formation(formation: Formation):
    db.insert_formation(formation)
    print(formation.content)
    return {True}


@app.post("/formations/edit")
def edit_formation(formation: Formation, formation_id: int):
    db.update_formation(formation, formation_id)
    return {"isEdited": True}


@app.get("/formations/delete/{formation_id}")
def delete_formation(formation_id: int):
    db.delete_row(formation_id)

    return {"isDeleted": True}

@app.get("/teachers")
def get_teachers():
    return db.get_teachers()


@app.post('/users/login/')
def login_user(user: User):
    req = db.check_user(user.username, user.password)
    #token = db.get_token(user.username)
    if req is not None:
        return {"token": "aaa"}
    else:
        return {"error": "incorrect user login or password."}
