import { Post, PostCreate, UserCreate, UserUpdate } from '@/model'

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASEURL
export const fetcher = async (path: string) => {
  const res = await fetch(apiBaseUrl + path)

  if (!res.ok) {
    const error = new Error('データ取得中にエラーが起きました。')

    throw error
  }

  return res.json()
}

export const createPostFetcher = async (post: PostCreate, token: string) => {
  const path = '/posts'
  const res = await fetch(apiBaseUrl + path, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  })

  if (!res.ok) {
    const error = new Error('データ取得中にエラーが起きました。')

    throw error
  }

  return res.json()
}

export const createUserFetcher = async (
  token: string,
  userParams: UserCreate,
) => {
  const path = '/users'
  const res = await fetch(apiBaseUrl + path, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userParams),
  })

  if (!res.ok) {
    const error = new Error('データ取得中にエラーが起きました。')

    throw error
  }

  return res.json()
}

export const updateUserFetcher = async (
  token: string,
  userParams: UserUpdate,
) => {
  const path = '/users'
  const res = await fetch(apiBaseUrl + path, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userParams),
  })

  if (!res.ok) {
    const error = new Error('データ取得中にエラーが起きました。')

    throw error
  }

  return res.json()
}
