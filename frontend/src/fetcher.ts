import {
  CommentCreate,
  LikeCreate,
  Post,
  PostCreate,
  UserCreate,
  UserUpdate,
} from '@/model'

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASEURL
export const fetcher = async (path: string) => {
  const res = await fetch(apiBaseUrl + path)

  if (!res.ok) {
    const error = new Error('データ取得中にエラーが起きました。')

    throw error
  }

  return res.json()
}

export const mutateFetcher = async (
  path: string,
  method: string,
  token: string,
  params: any,
) => {
  const res = await fetch(apiBaseUrl + path, {
    method: method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })

  if (!res.ok) {
    const error = new Error('データ取得中にエラーが起きました。')

    throw error
  }

  return res.json()
}

export const createPostFetcher = async (params: PostCreate, token: string) =>
  mutateFetcher('/posts/', 'POST', token, params)

export const createUserFetcher = async (token: string, params: UserCreate) =>
  mutateFetcher('/users/', 'POST', token, params)

export const updateUserFetcher = async (token: string, params: UserUpdate) =>
  mutateFetcher('/users/', 'PATCH', token, params)

export const createLikeFetcher = (token: string, params: LikeCreate) =>
  mutateFetcher('/likes/', 'POST', token, params)

export const createCommentFetcher = (token: string, params: CommentCreate) =>
  mutateFetcher('/comments/', 'POST', token, params)
