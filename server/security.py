from datetime import datetime, timedelta
import json
import secrets
from passlib.context import CryptContext
from jose import JWTError, jwt

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def generate_random_key():
    return secrets.token_hex(32)


def create_key_file():
    randomKey = generate_random_key()
    configData = {"SECRET_KEY": randomKey, "ALGORITHM": "HS256"}
    with open('private.json', "w") as f:
        json.dump(configData, f, indent=4)


def get_private_file():
    with open('private.json') as f:
        privateData = json.load(f)
        return privateData


def get_private_key():
    data = get_private_file()
    return data['SECRET_KEY']


def get_algorithm():
    data = get_private_file()
    return data['ALGORITHM']


def get_password_hash(password):
    return pwd_context.hash(password)


def check_password(plainPassword, hashedPassword):
    return pwd_context.verify(plainPassword, hashedPassword)


def generate_user_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=30)

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(
        to_encode, get_private_key(), algorithm=get_algorithm())
    return encoded_jwt
