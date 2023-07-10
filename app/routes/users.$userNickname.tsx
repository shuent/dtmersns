import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Link,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import invariant from "tiny-invariant";

import { getUserByNickname } from "~/models/user.server";
import { useOptionalUser } from "~/utils";

export const loader = async ({ params, request }: LoaderArgs) => {
  invariant(params.userNickname, "user not found");

  const user = await getUserByNickname(params.userNickname);
  if (!user) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ user });
};

export default function UserDetailsPage() {
  const { user } = useLoaderData<typeof loader>();
  const currentUser = useOptionalUser();

  const isMe = currentUser?.id === user.id;

  return (
    <div>
      <p className="">{user.nickname}</p>
      {user.profile?.bio}
      {user.profile?.twitterUrl}
      {user.profile?.instagramUrl}
      {user.profile?.soundcloudUrl}
      {user.profile?.spotifyUrl}
      {user.profile?.webUrl}
      {isMe ? (
        <Link
          to={"/userEdit"}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Edit
        </Link>
      ) : null}
    </div>
  );
}

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
