'use client'

import { useAuthContext } from '@/provider/auth_provider'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { createUserFetcher } from '@/fetcher'
import { UserCreate } from '@/model'

export default function SignInPage() {
  const { user } = useAuthContext()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value

    try {
      const cred = await createUserWithEmailAndPassword(
        getAuth(),
        email,
        password,
      )
      // construct user info for db
      const token = await cred.user.getIdToken(false)
      const initialName = cred.user.email.split('@')[0]
      const userParams: UserCreate = { nickname: initialName }

      createUserFetcher(token, userParams)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        Name:
        <input type="email" name="email" />
        pw:
        <input type="password" name="password" />
        <input type="submit" value="Create" />
      </form>
      <p>user: {user?.email}</p>
    </div>
  )
}
