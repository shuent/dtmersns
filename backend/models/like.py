from sqlmodel import Field, Relationship, SQLModel


class LikeBase(SQLModel):
    post_uid: str = Field(foreign_key='post.uid')
    user_uid: str = Field(foreign_key='user.uid')


class Like(LikeBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    post: 'Post' = Relationship(back_populates='likes')
    user: 'User' = Relationship(back_populates='likes')


class LikeCreate(LikeBase):
    pass


#fmt: off
from models.post import Post
from models.user import User

Like.update_forward_refs()
