from sqlmodel import Field, Relationship, SQLModel
from sqlalchemy import UniqueConstraint


class LikeBase(SQLModel):
    post_uid: str = Field(foreign_key='post.uid')


class Like(LikeBase, table=True):
    __table_args__ = (UniqueConstraint('post_uid', 'user_uid'),)

    id: int | None = Field(default=None, primary_key=True)
    user_uid: str = Field(foreign_key='user.uid')
    post: 'Post' = Relationship(back_populates='likes')
    user: 'User' = Relationship(back_populates='likes')


class LikeCreate(LikeBase):
    pass


#fmt: off
from models.post import Post
from models.user import User

Like.update_forward_refs()
