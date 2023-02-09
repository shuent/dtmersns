import { useAuthContext } from '@/provider/auth_provider'
import useSWR from 'swr'
import { fetcher } from '@/fetcher'
import { User } from '@/model'

export default async function UserDetailPage({
  params,
}: {
  params: { uid: string }
}) {
  const data: User = await fetcher('/users/' + params.uid)

  return (
    <ul>
      <li>nickname: {data.nickname}</li>
      <li>uid: {data.uid}</li>
      <img src={data.img_url} width={30} alt={data.img_url} />
      <li>twitter: {data.twitter_id}</li>
      <li>soundcloud: {data.soundcloud_id}</li>
      <li>prof: {data.body}</li>
    </ul>
  )
}
