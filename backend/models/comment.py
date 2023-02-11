from sqlmodel import Field, Relationship, SQLModel


class CommentBase(SQLModel):
    post_uid: str = Field(foreign_key='post.uid')
    body: str


class Comment(CommentBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    user_uid: str = Field(foreign_key='user.uid')
    post: 'Post' = Relationship(back_populates='comments')
    user: 'User' = Relationship(back_populates='comments')


class CommentRead(CommentBase):
    id: int
    user: 'User'


class CommentCreate(CommentBase):
    pass


#fmt: off
from models.post import Post
from models.user import User

Comment.update_forward_refs()
CommentRead.update_forward_refs()
