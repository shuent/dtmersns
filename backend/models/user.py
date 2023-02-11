# from __future__ import annotations
from typing import List, ForwardRef, TYPE_CHECKING
from sqlmodel import Field, Relationship, SQLModel


class UserBase(SQLModel):
    uid: str
    nickname: str  # initialize with email before @ from client
    body: str | None
    img_url: str | None
    twitter_id: str | None
    soundcloud_id: str | None


class User(UserBase, table=True):
    uid: str = Field(primary_key=True)
    posts: List['Post'] = Relationship(back_populates='user')
    comments: List['Comment'] = Relationship(back_populates='user')
    likes: List['Like'] = Relationship(back_populates='user')


class UserCreate(UserBase):
    uid: str | None


class UserUpdate(UserBase):
    uid: str | None
    nickname: str | None


class UserRead(UserBase):
    pass


class UserReadDetail(UserRead):
    posts: List["Post"] = []
    likes: List['Like'] = []
    comments: List['Comment'] = []

#fmt: off
from models.post import Post
from models.comment import Comment
from models.like import Like

User.update_forward_refs()
UserReadDetail.update_forward_refs()
