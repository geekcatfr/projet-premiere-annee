from typing import Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import json

from db import DatabaseConnection
db = DatabaseConnection()

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


db.connect()
db.init_database()


@app.get("/")
def read_root():
    return {"Hello", "world"}


@app.get("/formations")
def list_formations():
    return {"name": ['Economie', 'Maths'], "description": ["ceci est une formation d'eco", "ceci est une formation de maths"]}


@app.get("/formations/{formation_id}")
def formation_content(formation_id: int):
    return {"id": formation_id}


@app.get("/formations/add")
def add_formation(formation_title: str, formation_name: str):
    formation = {'name': formation_title, 'description': formation_name}
    db.insert_row('formation', **formation)
    return {True}


@app.post('/users/login/')
def login_user(user: User):
    req = db.check_user(user.username, user.password)
    token = db.get_token()
    if req is not None:
        return token
    else:
        return {"error": "incorrect user login or password."}
