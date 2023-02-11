from fastapi import APIRouter, Depends, HTTPException, Request
from sqlmodel import Session
from typing import List

from database import get_session
from repositories.user_repository import UserRepository
from lib.verify_fire_user import verify_user

from models.user import User, UserRead, UserCreate, UserUpdate, UserReadWithPosts
router = APIRouter(
    prefix='/users'
)


@router.get('/',  response_model=List[UserRead])
async def get_list(session: Session = Depends(get_session)):
    return UserRepository.get_all(session)


@router.get('/{uid}', response_model=UserReadWithPosts)
async def get(*, session: Session = Depends(get_session), uid: str):
    if user := UserRepository.get(session, uid):
        return user
    else:
        raise HTTPException(status_code=404, detail='User not found')


@router.post('/', response_model=UserRead)
async def create_user(*, session: Session = Depends(get_session), user_param: UserCreate, uid=Depends(verify_user)):
    user_param.uid = uid
    return UserRepository.create(session, user_param)


@router.patch('/', response_model=UserRead)
async def update_user(*, session: Session = Depends(get_session), user_params: UserUpdate, uid=Depends(verify_user)):
    if user := UserRepository.update(session, uid, user_params):
        return user
    else:
        raise HTTPException(status_code=404, detail='User not found')
