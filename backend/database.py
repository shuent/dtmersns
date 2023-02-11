from sqlmodel import SQLModel, Session, create_engine

from core.settings import Settings

# sqlite_url = f"sqlite:///dev.sqlite"
psql_url = Settings().DATABASE_URL

engine = create_engine(psql_url, echo=True)


def get_session():
    with Session(engine) as session:
        yield session
