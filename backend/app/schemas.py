from pydantic import BaseModel, EmailStr
from typing import Union

class UserBase(BaseModel):
    name: str
    email: EmailStr 

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Union[str, None] = None

class UserUpdate(BaseModel):
    name: str
    email: EmailStr