'use client'
import { useAuthContext } from '@/provider/auth_provider'
import useSWR from 'swr'

import { fetcher } from '@/fetcher'

export default function MyPage() {
  const { user } = useAuthContext()
  const { data, error, isLoading } = useSWR(
    user ? '/users/' + user.uid : null,
    fetcher,
  )

  return (
    <>
      <div>info: {JSON.stringify(data)}</div>
    </>
  )
}
