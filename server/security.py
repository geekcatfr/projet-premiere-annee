from datetime import datetime, timedelta
import json
import secrets
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def generateRandomKey():
    return secrets.token_hex(32)


def createKeyConfigFile():
    randomKey = generateRandomKey()
    configData = {"SECRET_KEY": randomKey, "ALGORITHM": "HS256"}
    with open('private.json') as f:
        json.dump(configData, f)


def getPrivateFile():
    with open('private.json') as f:
        privateData = json.load(f)
        return privateData


def getPasswordHash(password):
    return pwd_context.hash(password)


def checkPassword(plainPassword, hashedPassword):
    return pwd_context.verify(plainPassword, hashedPassword)


def generateUserToken(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=30)

    to_encode.update({"exp": expire})
    # encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    pass
