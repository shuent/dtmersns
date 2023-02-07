from fastapi import APIRouter, Depends, Request, UploadFile, Form, File
from fastapi.responses import HTMLResponse
from typing import List

from models.post import Post, PostCreate, PostRead
from repositories.post_repository import PostRepository
from lib.audio_upload import AudioUpload
from lib.verify_user import verify_user

router = APIRouter(
    prefix='/posts'
)


@router.get('/', response_model=List[PostRead])
async def get_list():
    return PostRepository.get_all()


@router.get('/{post_id}', response_model=PostRead)
async def get_post(post_id: str):
    return PostRepository.get(post_id)


@router.post('/')
async def create_post(post: PostCreate, user_uid=Depends(verify_user)):

    return PostRepository.create(post)
