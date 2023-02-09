from fastapi import APIRouter, Depends, HTTPException, Request
from typing import List
from repositories.user_repository import UserRepository
from lib.verify_fire_user import verify_user

from models.user import User, UserRead, UserCreate
router = APIRouter(
    prefix='/users'
)


su = [
    {'uid': 'NaiAV25E4AeskZyZRpkhgUjgKvO2',
     'nickname': 'taro',
     'body': 'str',
     'img_url': 'str',
     'twitter_id': 'str',
     'soundcloud_id': 'str'},
    {'uid': 's1W0mFWr9WWmYRq8mgsXXcCOaYl2',
     'nickname': 'jiro',
     'body': 'str',
     'img_url': 'str',
     'twitter_id': 'str',
     'soundcloud_id': 'str'},

]


@router.get('/', response_model=List[UserRead])
async def get_list():
    return UserRepository.get_all()


@router.get('/{uid}', response_model=UserRead)
async def get(uid: str):
    if user := UserRepository.get(uid):
        return user
    else:
        raise HTTPException(status_code=404, detail='User not found')


@router.post('/')
async def create_user(user_param: UserCreate, uid=Depends(verify_user)):
    user_param.uid = uid
    return UserRepository.create(user_param)
