'use client'

import useSWR from 'swr'

import { fetcher } from '@/fetcher'
import Link from 'next/link'
import { getAudioUrl } from '@/storage'
import { Post } from '@/model'

export function PostList() {
  const { data, error, isLoading } = useSWR<Post[]>('/posts/', fetcher)

  if (isLoading) {
    return <div>loading...</div>
  }
  if (error) return <div>{error.message}</div>

  return (
    <ul>
      {data.map((post) => (
        <li key={post.uid}>
          <div>
            <Link href={`/posts/${post.uid}`}>{post.uid}</Link>: {post.body}
            {' by '}
            <Link href={`/users/${post.user_uid}`}>{post.user.nickname}</Link>
          </div>
          <audio
            preload="none"
            controls
            src={getAudioUrl(post.audio_filename)}
          ></audio>
          comment: {post.comments.length}, like: {post.likes.length}
        </li>
      ))}
    </ul>
  )
}
