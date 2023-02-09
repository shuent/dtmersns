from sqlmodel import Session, select
from models.database import engine
from models.user import User, UserCreate


class UserRepository:

    def get_all():
        with Session(engine) as session:
            return session.exec(select(User)).all()

    def get(uid: str):
        with Session(engine) as session:
            return session.get(User, uid)

    def create(user: UserCreate):
        with Session(engine) as session:
            d_user = User.from_orm(user)
            session.add(d_user)
            session.commit()
            session.refresh(d_user)
            return d_user
