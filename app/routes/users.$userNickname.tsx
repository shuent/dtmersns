import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Link,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { useTypedLoaderData, typedjson } from "remix-typedjson";
import invariant from "tiny-invariant";

import { getUserByNickname, fetchUserData } from "~/models/user.server";
import { useOptionalUser } from "~/utils";

export const loader = async ({ params, request }: LoaderArgs) => {
  invariant(params.userNickname, "user not found");

  const user_ = await getUserByNickname(params.userNickname);
  if (!user_) {
    throw new Response("Not Found", { status: 404 });
  }

  const user = await fetchUserData(user_.id);

  return typedjson({ user });
};

export default function UserDetailsPage() {
  const { user } = useTypedLoaderData<typeof loader>();
  const currentUser = useOptionalUser();

  if (!user?.profile) {
    throw new Error("User data not available");
  }

  const isMe = currentUser?.id === user.id;

  return (
    <div className="flex justify-center bg-gray-100">
      <div className="w-full max-w-3xl overflow-hidden rounded-lg bg-white shadow">
        {/* Profile Section */}
        <div className="border-b p-4">
          <div className="flex items-center">
            <Avatar />

            <div className="ml-4">
              <p className="text-gray-600">@{user.nickname}</p>
            </div>
          </div>
          <p className="mt-2 text-gray-800">{user.profile.bio}</p>
          {isMe && (
            <a
              href="/userEdit"
              className="mt-2 inline-block px-2 py-1 text-sm text-blue-500 hover:underline"
            >
              Edit Profile
            </a>
          )}
        </div>

        {/* Social Media Links */}
        <div className="border-b p-4">
          <ul className="flex space-x-4">
            {user.profile.twitterUrl && (
              <li>
                <a
                  href={user.profile.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Twitter
                </a>
              </li>
            )}
            {user.profile.instagramUrl && (
              <li>
                <a
                  href={user.profile.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 hover:underline"
                >
                  Instagram
                </a>
              </li>
            )}
            {user.profile.soundcloudUrl && (
              <li>
                <a
                  href={user.profile.soundcloudUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-500 hover:underline"
                >
                  SoundCloud
                </a>
              </li>
            )}
            {user.profile.spotifyUrl && (
              <li>
                <a
                  href={user.profile.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500 hover:underline"
                >
                  Spotify
                </a>
              </li>
            )}
            {user.profile.webUrl && (
              <li>
                <a
                  href={user.profile.webUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-500 hover:underline"
                >
                  Website
                </a>
              </li>
            )}
          </ul>
        </div>

        {/* Posts Section */}
        <div className="p-4">
          <h3 className="mb-4 text-lg font-semibold">Posts</h3>
          {user.posts.map((post) => (
            <div key={post.id} className="mb-4">
              <p>{post.body}</p>
              <a
                href={`/posts/${post.id}`}
                className="text-blue-500 hover:underline"
              >
                View Details
              </a>
            </div>
          ))}
        </div>

        {/* Activity Section */}
        <div className="p-4">
          <h3 className="mb-4 text-lg font-semibold">Activity</h3>
          {user.comments.map((comment) => (
            <div key={comment.id} className="mb-4">
              <h4 className="font-bold">Comment: {comment.body}</h4>
              <p>Related Post: {comment.post.body}</p>
              <a
                href={`/posts/${comment.post.id}`}
                className="text-blue-500 hover:underline"
              >
                View Post
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const Avatar = () => (
  <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-600">
    <svg
      className="absolute -left-1 h-12 w-12 text-gray-400"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
        clip-rule="evenodd"
      ></path>
    </svg>
  </div>
);

export function ErrorBoundary() {
  const error = useRouteError();

  if (error instanceof Error) {
    return <div>An unexpected error occurred: {error.message}</div>;
  }

  if (!isRouteErrorResponse(error)) {
    return <h1>Unknown Error</h1>;
  }

  if (error.status === 404) {
    return <div>Post not found</div>;
  }

  return <div>An unexpected error occurred: {error.statusText}</div>;
}
