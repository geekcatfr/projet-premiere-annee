from datetime import timedelta
import sys
from typing import Optional
from fastapi import Depends, HTTPException, FastAPI
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from db import DatabaseConnection
from utils import write_in_log, load_config_file, set_config_values
from security import check_password, create_key_file, generate_user_token

app = FastAPI()

origins = [
    "http://localhost:3000"
]

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Token(BaseModel):
    token: str
    type: str


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
config = load_config_file()
db.connect()


def init_application():
    db.init_database()
    create_key_file()
    db.insert_user("admin", "admin", 1)
    write_in_log("Initialised the application.")


if (db.isConnected == False and config["setup"] == False):
    init_application()
    set_config_values("setup", False)


if (db.isConnected == False):
    write_in_log(
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
def add_formation(formation: Formation, token: str = Depends(oauth2_scheme)):
    print(formation.dates)
    if int(formation.teacher) > 0:
        db.insert_formation(formation)
        return {"added": True}
    else:
        return {"error": "invalid id passed"}


@app.post("/formations/edit")
def edit_formation(formation: Formation, formation_id: int, token: str = Depends(oauth2_scheme)):
    print(formation.dates)
    db.update_formation(formation, formation_id)
    return {"isEdited": True}


@app.post("/formation/update_note")
def update_note(formation: int, note: int):
    if note >= 0 and note <= 5:
        db.update_note(note)
        return {"isSaved": True}
    return {"detail": "value is not valid"}


@app.get("/formations/delete/{formation_id}")
def delete_formation(formation_id: int, token: str = Depends(oauth2_scheme)):
    db.delete_formation(formation_id)
    return {"detail": "The formation is successfully deleted."}


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
def add_teacher(teacher: Teacher, token: str = Depends(oauth2_scheme)):
    db.add_teacher(teacher)
    return {"detail": "the formation is added.", "name": f"{teacher.first_name} {teacher.last_name}"}


@app.get("/teachers/delete")
def delete_user(teacherId: int, token: str = Depends(oauth2_scheme)):
    if teacherId >= 0:
        db.get_teacher()
    pass


@app.get("/users")
def get_users():
    return db.get_user_list()


@app.post('/token', response_model=Token)
async def login_user(formData: OAuth2PasswordRequestForm = Depends()):
    username, password = db.get_user_password(formData.username)
    status = check_password(formData.password, password)
    print(password)
    if not status:
        raise HTTPException(
            status_code=400, detail="Incorrect name or password")
    token_expires = timedelta(minutes=30)
    token = generate_user_token(
        data={"sub": username}, expires_delta=token_expires)
    return {"token": token, "type": "bearer"}


@app.post('/users/add')
async def add_user(user: User, isAdmin: bool, token: str = Depends(oauth2_scheme)):
    db.insert_user(user.username, user.password, isAdmin)
    return {"isAdded": True}


@app.post('/users/delete')
def delete_user(user: User, token: str = Depends(oauth2_scheme)):
    pass
