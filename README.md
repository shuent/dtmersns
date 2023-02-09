# DTMer SNS monorepo

- Backend: FastAPI, Python on GAE
- Frontend: Next.js on Firebase Hosting
- Infrastructure: Firebase Storage

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

# secret env set ?
cat .env | tr '\n' ' ' | xargs flyctl secrets set

```

fly.io env, see

- https://community.fly.io/t/read-secrets-from-env-file/1040
- https://fly.io/docs/reference/runtime-environment/
