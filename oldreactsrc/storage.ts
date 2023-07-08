import { getApp } from 'firebase/app'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { app } from './setup'

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(app)

// Create a storage reference from our storage service

export const getAudioUrl = (filename) => {
  const bucketName = 'post_audio'
  return `https://firebasestorage.googleapis.com/v0/b/dtmersns.appspot.com/o/${bucketName}%2F${filename}?alt=media`
}

export const uploadAudio = async (file, filename, user_uid) => {
  const audioRef = ref(storage, 'post_audio/' + filename)
  const metadata = {
    contentType: 'audio/mp3',
    customMetadata: {
      authorUid: user_uid,
    },
  }
  const snapshot = await uploadBytes(audioRef, file, metadata)
  // const url = await getDownloadURL(snapshot.ref)
  return snapshot
}

export const uploadProfImg = async (file, filename, user_uid) => {
  const imgRef = ref(storage, 'prof_img/' + user_uid + '/' + filename)
  const metadata = {
    contentType: 'image/*',
    customMetadata: {
      userUid: user_uid,
    },
  }
  const snapshot = await uploadBytes(imgRef, file, metadata)
  return snapshot
}
