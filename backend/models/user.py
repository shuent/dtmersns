from sqlmodel import Field, SQLModel


class UserBase(SQLModel):
    fire_uid: str
    nickname: str
    body: str
    img_url: str
    twitter_id: str
    soundcloud_id: str


class User(UserBase, table=True):
    id: int | None = Field(default=None, primary_key=True)


class UserCreate(UserBase):
    pass


class UserRead(UserBase):
    pass
