from sqlmodel import SQLModel, create_engine

from . import post

sqlite_url = f"sqlite:///dev.sqlite"
connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, echo=True, connect_args=connect_args)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)
