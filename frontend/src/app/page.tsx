import { CreatePost } from '@/components/create_post'
import { PostList } from './post_list'

export default async function Page() {
  return (
    <>
      <h1>Hello,音楽クリエイターたち </h1>
      <CreatePost />
      <PostList />
    </>
  )
}
