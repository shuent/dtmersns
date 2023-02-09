from core.settings import Settings
setting = Settings()
cred = {
    "type": "service_account",
    "project_id": "dtmersns",
    "private_key_id": setting.PRIVATE_KEY_ID,
    "private_key": setting.PRIVATE_KEY,
    "client_email": setting.CLIENT_EMAIL,
    "client_id": "114871407183203055031",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": setting.CLIENT_X509_CERT_URL
}
