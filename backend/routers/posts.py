from fastapi import APIRouter, Depends, HTTPException, Request, UploadFile, Form, File
from fastapi.responses import HTMLResponse
from typing import List
from sqlmodel import Session

from models.database import get_session
from models.post import Post, PostCreate, PostRead
from repositories.post_repository import PostRepository
from lib.audio_upload import AudioUpload
from lib.verify_fire_user import verify_user

router = APIRouter(
    prefix='/posts'
)


@router.get('/', response_model=List[PostRead])
async def get_list(session: Session = Depends(get_session)):
    return PostRepository.get_all(session)


@router.get('/{post_id}', response_model=PostRead)
async def get_post(*, session: Session = Depends(get_session), post_id: str):
    if post := PostRepository.get(session, post_id):
        return post
    else:
        raise HTTPException(status_code=404, detail='Post not found')


@router.post('/')
async def create_post(*, session: Session = Depends(get_session), post: PostCreate, user_uid=Depends(verify_user), ):

    return PostRepository.create(session, post)
