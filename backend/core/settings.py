from pydantic import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str
    PRIVATE_KEY: str
    PRIVATE_KEY_ID: str
    CLIENT_EMAIL: str
    CLIENT_X509_CERT_URL: str
    WEB_CLIENT_URL: str
    DATABASE_URL: str

    class Config:
        env_file = ".env"
