from fastapi import APIRouter
from typing import List

from models.user import User, UserRead, UserCreate
router = APIRouter(
    prefix='/users'
)


su = [
    {'fire_uid': 'NaiAV25E4AeskZyZRpkhgUjgKvO2',
     'nickname': 'taro',
     'body': 'str',
     'img_url': 'str',
     'twitter_id': 'str',
     'soundcloud_id': 'str'},
    {'fire_uid': 's1W0mFWr9WWmYRq8mgsXXcCOaYl2',
     'nickname': 'jiro',
     'body': 'str',
     'img_url': 'str',
     'twitter_id': 'str',
     'soundcloud_id': 'str'},

]


@router.get('/', response_model=List[UserRead])
async def get_list():
    return su


@router.get('/{uid}', response_model=UserRead)
async def get(uid: str):
    return su[0]
