# (archive) DTMer SNS monorepo

- Backend: FastAPI, Python on fly.io
- Frontend: Next.js on Firebase Hosting
- other: Firebase Storage, Auth

## To Start Develop
- create file: firebaseConfig on front, firebaseAdminKey.json on backend

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

This Structure is archived and next version is made with remix.run
