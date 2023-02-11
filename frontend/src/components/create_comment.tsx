'use client'

import { createCommentFetcher, createLikeFetcher } from '@/fetcher'
import { CommentCreate, LikeCreate } from '@/model'
import { useAuthContext } from '@/provider/auth_provider'

export const CreateComment = ({ postUid }: { postUid: string }) => {
  const { user } = useAuthContext()
  const handleSubmit = async (e) => {
    if (!user) return
    const token = await user.getIdToken()
    const body = e.target.body.value
    const params: CommentCreate = { post_uid: postUid, body }
    const res = await createCommentFetcher(token, params)
    console.log(res)
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <textarea name="body" cols={20} rows={10}></textarea>
        <input type="submit" value="send comment" />
      </form>
    </>
  )
}
