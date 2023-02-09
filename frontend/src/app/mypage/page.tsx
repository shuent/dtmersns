'use client'
import { useAuthContext } from '@/provider/auth_provider'
import useSWR from 'swr'

import { fetcher } from '@/fetcher'
import { User } from '@/model'
import Link from 'next/link'

export default function MyPage() {
  const { user } = useAuthContext()
  const { data, error, isLoading } = useSWR<User>(
    user ? '/users/' + user.uid : null,
    fetcher,
  )

  return (
    <div>
      <Link href={`/users/${user.uid}`}>My Profile page</Link>
      <br />
      <Link href={'/mypage/edit'}>Edit profile</Link>
    </div>
  )
}
