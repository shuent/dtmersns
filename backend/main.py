from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
import firebase_admin
from firebase_admin import credentials

from routers import posts, users, others

from core.settings import Settings
from firebase_cred import cred
# app
settings = Settings()
app = FastAPI()


cert = credentials.Certificate(cred)
firebase_admin.initialize_app(cert)


origins = [
    settings.WEB_CLIENT_URL,
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(500)
async def internal_exception_handler(request: Request, exc: Exception):
    return JSONResponse(status_code=500, content=jsonable_encoder({"code": 500, "msg": "Internal Server Error"}))


app.include_router(users.router)
app.include_router(posts.router)
app.include_router(others.router)


@app.get('/')
def root():
    return {'app name': settings.APP_NAME}
