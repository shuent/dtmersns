import type { LoaderArgs } from "@remix-run/node";

import { Link, NavLink } from "@remix-run/react";

import type { V2_MetaFunction } from "@remix-run/node";

import { getPostListItems } from "~/models/post.server";

import { typedjson, useTypedLoaderData } from "remix-typedjson";

export const meta: V2_MetaFunction = () => [{ title: "Remix Posts" }];

export const loader = async ({ request }: LoaderArgs) => {
  const postListItems = await getPostListItems();
  return typedjson({ postListItems });
};

export default function Index() {
  const data = useTypedLoaderData<typeof loader>();
  return (
    <div className="">
      <main className="flex h-full justify-center bg-white">
        <div className="h-full w-80">
          <Link to="posts/new" className="block p-4 text-xl text-blue-500">
            + New post
          </Link>

          <hr />
          <PostList postListItems={data.postListItems} />
        </div>
        <div className="flex">
          <UserProf />
        </div>
      </main>
    </div>
  );
}

const UserProf: React.FC = () => {
  return <div className="p-4"></div>;
};

const PostList: React.FC<{
  postListItems: Awaited<ReturnType<typeof getPostListItems>>;
}> = ({ postListItems }) => (
  <>
    {postListItems.length === 0 ? (
      <p className="p-4">No posts yet</p>
    ) : (
      <ol>
        {postListItems.map((post) => (
          <li key={post.id}>
            <NavLink
              className={({ isActive }) =>
                `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`
              }
              to={`posts/${post.id}`}
            >
              📝 {post.body}
              <div>{post.kind}</div>
              <div> 🗣️ {post._count.comments}</div>
              <div>{post.createdAt.toLocaleString()}</div>
              <div>{post.user.nickname}さん</div>
            </NavLink>
          </li>
        ))}
      </ol>
    )}
  </>
);
