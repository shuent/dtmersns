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
      <li>twitter: {data.twitter_id}</li>
    </ul>
  )
}
