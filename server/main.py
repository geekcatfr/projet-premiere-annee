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

class Formation(BaseModel):
    name: str
    description: str
    content: str


db.connect()
db.init_database()


@app.get("/")
def read_root():
    return {"Hello", "world"}


@app.get("/formations")
def list_formations():
    formation_name = db.get_formations()
    return {"formations": formation_name}


@app.get("/formations/{formation_id}")
def formation_content(formation_id: int):
    return {"id": formation_id}


@app.post("/formations/add")
def add_formation(formation: Formation):
    db.insert_row('formation', formation.name, formation.description, formation.content)
    return {True}


@app.post('/users/login/')
def login_user(user: User):
    req = db.check_user(user.username, user.password)
    #token = db.get_token()
    if req is not None:
        return {"token": "aaa"}
    else:
        return {"error": "incorrect user login or password."}
