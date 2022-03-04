from typing import Optional

from fastapi import FastAPI
import json
import mysql.connector

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello", "world"}


@app.get("/formations")
def list_formations():
    return {"nom": ['Economie', 'Maths'], "desc": "ceci est une formation d\'eco"}


@app.get("/formations/{formation_id}")
def formation_content(formation_id: int):
    return {"id": formation_id}
