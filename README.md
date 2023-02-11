# DTMer SNS monorepo

- Backend: FastAPI, Python on fly.io
- Frontend: Next.js on Firebase Hosting
- other: Firebase Storage, Auth

## Links

- FE: https://dtmersns.web.app/
- BE: https://dtmersnsapi.fly.dev/docs

## To Start Develop

- create file: firebaseConfig on front, firebaseAdminKey.json on backend

## Deploy

### setup

- FE env
  - https://nextjs.org/docs/basic-features/environment-variables
  - https://zenn.dev/mochi/articles/33f452bb53f2d6aee956
  - .env.local for production, .env.development for dev
- BE env
  - https://fastapi.tiangolo.com/advanced/settings/#reading-a-env-file
  - .env for firebase sdk, psql settings

### Frontend

https://firebase.google.com/docs/hosting/nextjs?hl=ja

```
cd frontend
firebase deploy

```

### Backend

fly.io

```
cd backend
# deploy
flyctl deploy

# secret env set
cat .env | tr '\n' ' ' | xargs flyctl secrets set

```

#### migration

```
# create migration
alembic revision --autogenerate -m 'hoge'

# migrate
alembic upgrade head # set to fly.toml [release] when deploy.

# other
alembic downgrade -1
alembic history
alembic heads

```

### all local emulator

```
FIREBASE_AUTH_EMULATOR_HOST="localhost:9099" uvicorn main:app --reload
firebase emulators:start
```
