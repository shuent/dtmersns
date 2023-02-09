'use client'

import { useAuthContext } from '@/provider/auth_provider'
import { getAuth, User as FireUser } from 'firebase/auth'
import { User, UserUpdate } from '@/model'
import { filterObject } from '@/util'
import { updateUserFetcher } from '@/fetcher'

const updateUserProfile = async (params: UserUpdate, user: FireUser) => {
  // generate uuid

  // TODO: upload img
  // const snapshot = await upload(file, filename, user.uid)

  // get user token
  const token = await user.getIdToken()

  // create post on api
  const res = await updateUserFetcher(token, params)
  // console.log(params)
}

export default function EditUserPage() {
  const { user } = useAuthContext()

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!user) {
      console.log('cannot perform')
      return
    }

    let params: UserUpdate = {
      nickname: e.target.nickname.value,
      body: e.target.body.value,
      img_url: e.target.img_url.value,
      twitter_id: e.target.twitter_id.value,
      soundcloud_id: e.target.soundcloud_id.value,
    }

    // params = params.filter(!'')
    params = filterObject(params, (_, v) => v != '')

    updateUserProfile(params, user)
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="nickname" id="" placeholder="nickname" />
      <input type="text" name="twitter_id" id="" placeholder="twitter id" />
      <input
        type="text"
        name="soundcloud_id"
        id=""
        placeholder="soundcloud id"
      />
      img: <input type="file" name="img_url" accept="image/*" id="" />
      <textarea
        name="body"
        cols={30}
        rows={10}
        placeholder="your profile"
      ></textarea>
      <input type="submit" value="submit" />
    </form>
  )
}
