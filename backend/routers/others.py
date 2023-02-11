from fastapi import APIRouter, Depends, HTTPException, Request, UploadFile, Form, File

from sqlmodel import Session
from repositories.comment_repository import CommentRepository
from repositories.like_repository import LikeRepository

from database import get_session
from models.like import Like, LikeCreate
from models.comment import Comment, CommentCreate
from lib.verify_fire_user import verify_user

router = APIRouter()


@router.post('/likes/')
async def create_like(*, session: Session = Depends(get_session), like: LikeCreate, user_uid=Depends(verify_user), ):
    return LikeRepository.create(session, Like(user_uid=user_uid, **like.dict()))


@router.post('/comments/')
async def create_comment(*, session: Session = Depends(get_session), comment: CommentCreate, user_uid=Depends(verify_user), ):
    return CommentRepository.create(session, Comment(user_uid=user_uid, **comment.dict()))
