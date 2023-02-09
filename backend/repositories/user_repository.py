from sqlmodel import Session, select
from models.database import engine
from models.user import User, UserCreate, UserUpdate


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

    def update(uid: str, params: UserUpdate):
        with Session(engine) as session:
            d_user = session.get(User, uid)
            data = params.dict(exclude_unset=True)
            for k, v in data.items():
                setattr(d_user, k, v)
            session.add(d_user)
            session.commit()
            session.refresh(d_user)
            return d_user
