'use client'
import { useAuthContext } from '@/provider/auth_provider'
import useSWR from 'swr'
import { fetcher } from '@/fetcher'
import { User } from '@/model'

export default function UserDetailPage({
  params,
}: {
  params: { uid: string }
}) {
  const { data, error, isLoading } = useSWR<User>(
    '/users/' + params.uid,
    fetcher,
  )

  if (isLoading) {
    return <div>loading...</div>
  }

  if (error) return <div>{error.message}</div>

  return (
    <ul>
      <li>nickname: {data.nickname}</li>
      <li>uid: {data.uid}</li>
      <img src={data.img_url} alt="" />
      <li>twitter: {data.twitter_id}</li>
      <li>soundcloud: {data.soundcloud_id}</li>
      <li>prof: {data.body}</li>
    </ul>
  )
}
