from sqlmodel import Field, SQLModel


class UserBase(SQLModel):
    uid: str
    nickname: str  # initialize with email before @ from client
    body: str | None
    img_url: str | None
    twitter_id: str | None
    soundcloud_id: str | None


class User(UserBase, table=True):
    uid: str = Field(primary_key=True)


class UserCreate(UserBase):
    uid: str | None
    pass


class UserRead(UserBase):
    pass
