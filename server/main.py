from typing import Optional
from fastapi import FastAPI, Form
import json

from db import DatabaseConnection

app = FastAPI()
db = DatabaseConnection()

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

@app.get('/users/login/')
def login_user(username: str, password: str):
    db.get_user('user', username)
    return {"username": username}