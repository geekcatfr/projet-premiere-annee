from typing import Optional
from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import json

from db import DatabaseConnection
db = DatabaseConnection()

app = FastAPI()

origins = [
    "localhost:3000",
    "127.0.0.1:3000",
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
    return {"nom": ['Economie', 'Maths'], "desc": "ceci est une formation d\'eco"}

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
    req = db.get_user(user.username, user.password)
    if req is not None:
        return req
    else:
        return {"error": "incorrect user login or password."}
