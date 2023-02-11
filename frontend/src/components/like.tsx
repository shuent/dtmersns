'use client'
import { createLikeFetcher } from '@/fetcher'
import { LikeCreate } from '@/model'
import { useAuthContext } from '@/provider/auth_provider'
import { useState } from 'react'

export const Like = ({
  likesNum,
  postUid,
}: {
  likesNum: number
  postUid: string
}) => {
  const { user } = useAuthContext()
  const [likesNumState, setLikesNumState] = useState<number>(likesNum)

  const handleClick = async () => {
    if (!user) return
    const token = await user.getIdToken()
    const likeParams: LikeCreate = { post_uid: postUid }
    const res = await createLikeFetcher(token, likeParams)
    setLikesNumState(likesNum + 1)
    // todo: error handle
  }
  return (
    <>
      likes: {likesNumState} <button onClick={handleClick}>😍</button>
    </>
  )
}
