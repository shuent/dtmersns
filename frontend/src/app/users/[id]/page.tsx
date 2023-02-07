'use client'
import { useAuthContext } from '@/provider/auth_provider'
import useSWR from 'swr'
import { fetcher } from '@/fetcher'

export default function UserDetailPage({
  params,
}: {
  params: { uid: string }
}) {
  const { data, error, isLoading } = useSWR('/users/' + params.uid, fetcher)

  return (
    <>
      <div>info: {JSON.stringify(data)}</div>
    </>
  )
}
