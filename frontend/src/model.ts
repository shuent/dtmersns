export type PostCreate = Post

export type Post = {
  uid: string
  body: string
  audio_filename: string
  original_filename: string
  user_uid: string
}

export type User = {
  uid: string
  nickname: string
  body: string
  img_url: string
  twitter_id: string
  soundcloud_id: string
}

export type UserCreate = {
  nickname: string
  body?: string
  img_url?: string
  twitter_id?: string
  soundcloud_id?: string
}
