from sqlmodel import Session, select
from models.user import User
from models.like import Like, LikeCreate
from sqlalchemy.orm import joinedload, subqueryload


class LikeRepository:

    def create(session: Session, item: Like):
        d = Like.from_orm(item)
        session.add(d)
        session.commit()
        session.refresh(d)
        return d
