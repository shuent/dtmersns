'use client'
import { useAuthContext } from '@/provider/auth_provider'
import { getAuth, signOut } from 'firebase/auth'
import Link from 'next/link'

export function NavBar() {
  const { user } = useAuthContext()

  const handleLogout = async () => {
    await signOut(getAuth())
  }
  return (
    <div>
      <Link href="/">top</Link>{' '}
      {user ? (
        <>
          <button onClick={handleLogout}>Log out</button>{' '}
          <Link href="/mypage">My Page</Link>{' '}
        </>
      ) : (
        <>
          <Link href="/sign_up">sign up</Link>{' '}
          <Link href="/sign_in">sign in</Link>
        </>
      )}
      <div>user: {user ? user.email : 'not login'} </div>
    </div>
  )
}
