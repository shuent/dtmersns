
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi import FastAPI, Depends, HTTPException, Request, Response, status
from firebase_admin import auth


def verify_user(cred: HTTPAuthorizationCredentials = Depends(HTTPBearer(auto_error=True))):
    try:
        decoded_token = auth.verify_id_token(cred.credentials)
    except:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Invalid authentication credentials',
            headers={'WWW-Authenticate': 'Bearer'},
        )

    return decoded_token['uid']
