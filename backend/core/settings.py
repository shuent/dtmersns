from pydantic import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str

    class Config:
        env_file = ".env"
