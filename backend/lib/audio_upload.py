
from fastapi import UploadFile


class AudioUpload:
    def __init__(self, file: UploadFile) -> None:
        self.file = file

    def validate(self):
        return True

    def upload(self):
        storage = {}
        # url = storage.upload(self.file)
        return self.file.filename
