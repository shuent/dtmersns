from sqlmodel import Session, select
from models.database import engine
from models.post import Post, PostCreate


class PostRepository:

    def get_all():
        with Session(engine) as session:
            return session.exec(select(Post)).all()

    def get(uid: str):
        with Session(engine) as session:
            return session.get(Post, uid)

    def create(post: PostCreate):
        with Session(engine) as session:
            d_post = Post.from_orm(post)
            session.add(d_post)
            session.commit()
            session.refresh(d_post)
            return d_post
