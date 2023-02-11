from sqlmodel import Session, select
from models.user import User
from models.comment import Comment
from sqlalchemy.orm import joinedload, subqueryload


class CommentRepository:

    def create(session: Session, item: Comment):
        d = Comment.from_orm(item)
        session.add(d)
        session.commit()
        session.refresh(d)
        return d
