import { fetcher } from '@/fetcher'
import { Post } from '@/model'
import { getAudioUrl } from '@/storage'

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
          {post.body} - {post.original_filename} by {post.user_uid}
        </div>
        <audio
          preload="none"
          controls
          src={getAudioUrl(post.audio_filename)}
        ></audio>
      </div>
    )
  } catch (error) {
    return <div>{error.message}</div>
  }
}
