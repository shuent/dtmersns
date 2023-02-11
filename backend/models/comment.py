from sqlmodel import Field, Relationship, SQLModel


class CommentBase(SQLModel):
    post_uid: str = Field(foreign_key='post.uid')
    user_uid: str = Field(foreign_key='user.uid')
    body: str


class Comment(CommentBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    post: 'Post' = Relationship(back_populates='comments')
    user: 'User' = Relationship(back_populates='comments')


class CommentCreate(CommentBase):
    pass


#fmt: off
from models.post import Post
from models.user import User

Comment.update_forward_refs()
