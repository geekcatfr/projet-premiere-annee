from typing import Optional
from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
import json

from db import DatabaseConnection
db = DatabaseConnection()

app = FastAPI()

origins = [
    "localhost:3000",
    "localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

@app.get('/users/login/')
def login_user(username: str, password: str):
    (user, passw) = db.get_user('user', username, password)
    if username == user and passw == password:
        return {"username": user}