from typing import List
from sqlmodel import Field, Relationship, SQLModel


class PostBase(SQLModel):
    uid: str
    body: str
    audio_filename: str
    original_filename: str
    user_uid: str


class Post(PostBase, table=True):
    uid: str = Field(primary_key=True)
    user_uid: str = Field(foreign_key='user.uid')
    user: 'User' = Relationship(back_populates='posts')
    comments: List['Comment'] = Relationship(back_populates='post')
    likes: List['Like'] = Relationship(back_populates='post')


class PostCreate(PostBase):
    pass


class PostRead(PostBase):
    user: 'User'
    likes: List['Like'] = []
    comments: List['CommentRead'] = []

# fmt: off
from models.user import User
from models.comment import Comment, CommentRead
from models.like import Like

Post.update_forward_refs()
PostRead.update_forward_refs()

