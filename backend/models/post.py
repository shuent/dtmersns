from sqlmodel import Field, SQLModel


class PostBase(SQLModel):
    uid: str
    body: str
    audio_filename: str
    original_filename: str
    user_uid: str


class Post(PostBase, table=True):
    uid: str = Field(primary_key=True)


class PostCreate(PostBase):
    pass


class PostRead(PostBase):
    pass
