from sqlmodel import Session, select
from models.post import Post
from models.user import User, UserCreate, UserUpdate


class UserRepository:

    def get_all(session: Session):
        return session.exec(select(User)).all()

    def get(session: Session, uid: str):
        u = session.get(User, uid)
        # print(u.posts)
        # return session.get(User, uid)
        return u

    def create(session: Session, user: UserCreate):
        d_user = User.from_orm(user)
        session.add(d_user)
        session.commit()
        session.refresh(d_user)
        return d_user

    def update(session: Session, uid: str, params: UserUpdate):
        d_user = session.get(User, uid)
        data = params.dict(exclude_unset=True)
        for k, v in data.items():
            setattr(d_user, k, v)
        session.add(d_user)
        session.commit()
        session.refresh(d_user)
        return d_user
