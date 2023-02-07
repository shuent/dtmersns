import { Post, PostCreate } from '@/model'

const apiBaseUrl = 'http://localhost:8000'
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
