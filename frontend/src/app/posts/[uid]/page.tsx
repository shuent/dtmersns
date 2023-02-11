import { Comments } from '@/components/comments'
import { CreateComment } from '@/components/create_comment'
import { Like } from '@/components/like'
import { fetcher } from '@/fetcher'
import { Post } from '@/model'
import { getAudioUrl } from '@/storage'
import Link from 'next/link'

export const revalidate = 0

export default async function PostDetail({
  params,
}: {
  params: { uid: string }
}) {
  try {
    const post: Post = await fetcher('/posts/' + params.uid)
    return (
      <div>
        <div>
          {post.body} - {post.original_filename} by{' '}
          <Link href={`/users/${post.user_uid}`}>{post.user.nickname}</Link>
        </div>
        <audio
          preload="none"
          controls
          src={getAudioUrl(post.audio_filename)}
        ></audio>
        comment num: {post.comments.length},
        <Like likesNum={post.likes.length} postUid={post.uid} />
        <Comments comments={post.comments} />
        <CreateComment postUid={post.uid} />
      </div>
    )
  } catch (error) {
    return <div>{JSON.stringify(error)}</div>
  }
}
