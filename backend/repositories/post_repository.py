from sqlmodel import Session, select
from models.user import User
from models.post import Post, PostCreate
from sqlalchemy.orm import joinedload


class PostRepository:

    def get_all(session: Session):
        # solve n + 1
        return session.exec(select(Post).options(joinedload(Post.user))).all()

    def get(session: Session, uid: str):
        return session.get(Post, uid)

    def create(session: Session, post: PostCreate):
        d_post = Post.from_orm(post)
        session.add(d_post)
        session.commit()
        session.refresh(d_post)
        return d_post
