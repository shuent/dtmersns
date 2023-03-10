import { fetcher } from '@/fetcher'
import { User } from '@/model'

export const revalidate = 0

export default async function UserDetailPage({
  params,
}: {
  params: { uid: string }
}) {
  let data: User
  try {
    data = await fetcher('/users/' + params.uid)
  } catch (e) {
    return <>{e.message}</>
  }
  return (
    <div>
      <ul>
        <li>nickname: {data.nickname}</li>
        <li>uid: {data.uid}</li>
        <img src={data.img_url} width={30} alt={data.img_url} />
        <li>twitter: {data.twitter_id}</li>
        <li>soundcloud: {data.soundcloud_id}</li>
        <li>prof: {data.body}</li>
      </ul>
      <div>
        {data.posts.map((post) => (
          <div key={post.uid}>
            <h3>{post.original_filename}</h3>
            <div>{post.body}</div>
            <audio preload="none" controls src={post.audio_filename}></audio>
          </div>
        ))}
      </div>
    </div>
  )
}
