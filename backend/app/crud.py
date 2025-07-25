# backend/app/crud.py

from sqlalchemy.orm import Session
from . import models, schemas, auth

def get_user_by_email(db: Session, email: str):

    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate):

    hashed_password = auth.get_password_hash(user.password)

    db_user = models.User(
        email=user.email, 
        hashed_password=hashed_password,
        name=user.name
        )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return db_user

def get_users(db: Session, skip: int = 0, limit: int = 100):
    """Busca uma lista de todos os usuários."""
    return db.query(models.User).offset(skip).limit(limit).all()

def update_user(db: Session, user_id: int, name: str, email: str):
    """Atualiza o nome e/ou email de um usuário."""
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if db_user:
        db_user.name = name
        db_user.email = email
        db.commit()
        db.refresh(db_user)
    return db_user

def delete_user(db: Session, user_id: int):
    """Deleta um usuário pelo seu ID."""
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if db_user:
        db.delete(db_user)
        db.commit()
    return db_user