'use client'

import { createPostFetcher } from '@/fetcher'
import { Post, PostCreate } from '@/model'
import { useAuthContext } from '@/provider/auth_provider'
import { upload } from '@/storage'
import { uuidv4 } from '@firebase/util'
import { getAuth, User } from 'firebase/auth'

const createPostWithFile = async (user: User, body: string, file: File) => {
  // generate uuid
  const uuid = uuidv4()

  const filename = uuid + '__' + file.name
  // TODO: uncomment this to upload storage
  const snapshot = await upload(file, filename, user.uid)

  // struct post
  const post: PostCreate = {
    body: body,
    uid: uuid,
    audio_filename: filename,
    original_filename: file.name,
    user_uid: user.uid,
  }

  // get user token
  const token = await user.getIdToken(false)

  // create post on api
  const res = await createPostFetcher(post, token)
  console.log(res)
}

export default function CreatePostPage() {
  const { user } = useAuthContext()

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const file = e.target.song.files[0]
    const body = e.target.body.value

    if (!(user && file && body)) {
      console.log('cannot perform')
      return
    }
    createPostWithFile(user, body, file)
  }
  return (
    <form onSubmit={handleSubmit}>
      <textarea name="body" placeholder="write sth" />
      mp3 upload: <input type="file" name="song" accept="audio/mp3" />
      <input type="submit" value="submit" />
    </form>
  )
}
