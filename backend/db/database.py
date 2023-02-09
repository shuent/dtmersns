from sqlmodel import SQLModel, Session, create_engine

from core.settings import Settings

# sqlite_url = f"sqlite:///dev.sqlite"

psql_url_local = Settings().DATABASE_URL
# connect_args = {"check_same_thread": False}
engine = create_engine(psql_url_local, echo=True)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session
