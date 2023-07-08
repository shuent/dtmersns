'use client'

import { Comment } from '@/model'

export const Comments = ({ comments }: { comments: Comment[] }) => {
  return (
    <>
      {comments.map((comment) => (
        <div>
          <p>{comment.body}</p>
          <div>{comment.user.nickname}</div>
        </div>
      ))}
    </>
  )
}
