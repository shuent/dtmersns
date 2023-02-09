from fastapi import APIRouter, Depends, HTTPException, Request
from typing import List
from repositories.user_repository import UserRepository
from lib.verify_fire_user import verify_user

from models.user import User, UserRead, UserCreate, UserUpdate
router = APIRouter(
    prefix='/users'
)


@router.get('/', response_model=List[UserRead])
async def get_list():
    return UserRepository.get_all()


@router.get('/{uid}', response_model=UserRead)
async def get(uid: str):
    if user := UserRepository.get(uid):
        return user
    else:
        raise HTTPException(status_code=404, detail='User not found')


@router.post('/', response_model=UserRead)
async def create_user(user_param: UserCreate, uid=Depends(verify_user)):
    user_param.uid = uid
    return UserRepository.create(user_param)


@router.patch('/', response_model=UserRead)
async def update_user(user_params: UserUpdate, uid=Depends(verify_user)):
    if user := UserRepository.update(uid, user_params):
        return user
    else:
        raise HTTPException(status_code=404, detail='User not found')
