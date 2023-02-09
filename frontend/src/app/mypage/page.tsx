'use client'
import { useAuthContext } from '@/provider/auth_provider'
import Link from 'next/link'

export default function MyPage() {
  const { user } = useAuthContext()

  if (!user) return <div>loading...</div>

  return (
    <div>
      <Link href={`/users/${user.uid}`}>My Profile page</Link>
      <br />
      <Link href={'/mypage/edit'}>Edit profile</Link>
    </div>
  )
}
