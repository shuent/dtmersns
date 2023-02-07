'use client'

import { useAuthContext } from '@/provider/auth_provider'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

export default function SignInPage() {
  const { user } = useAuthContext()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value

    try {
      await signInWithEmailAndPassword(getAuth(), email, password)
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
        <input type="submit" value="Sign in" />
      </form>

      <p>user: {user?.email}</p>
    </div>
  )
}
