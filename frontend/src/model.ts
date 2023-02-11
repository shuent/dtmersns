export type PostCreate = Post

export type Post = {
  uid: string
  body: string
  audio_filename: string
  original_filename: string
  user_uid: string
  user?: User
  comments: []
  likes: []
}

export type User = {
  uid: string
  nickname: string
  body: string
  img_url: string
  twitter_id: string
  soundcloud_id: string
  posts?: Post[]
}

export type UserCreate = {
  nickname: string
}

export type UserUpdate = {
  nickname?: string
  body?: string
  img_url?: string
  twitter_id?: string
  soundcloud_id?: string
}
