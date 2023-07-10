import { Comment, User } from "@prisma/client";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  Link,
  isRouteErrorResponse,
  useActionData,
  useNavigation,
  useRouteError,
} from "@remix-run/react";
import { useEffect, useRef } from "react";
import { typedjson, useTypedLoaderData } from "remix-typedjson";

import invariant from "tiny-invariant";
import { createComment } from "~/models/comment.server";

import { getPost } from "~/models/post.server";
import { requireUserId } from "~/session.server";
import { useOptionalUser } from "~/utils";

export const loader = async ({ params, request }: LoaderArgs) => {
  invariant(params.postId, "postId not found");

  const post = await getPost({ id: params.postId });
  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }
  return typedjson({ post });
};

export const action = async ({ params, request }: ActionArgs) => {
  invariant(params.postId, "postId not found");
  const userId = await requireUserId(request);
  const postId = params.postId;
  const formData = await request.formData();
  const body = formData.get("body");
  if (typeof body !== "string" || body.length < 4) {
    return json({ errors: { body: "too short" } }, { status: 400 });
  }

  await createComment({ body, userId, postId });

  return redirect("/posts/" + params.postId);
};

export default function PostDetailsPage() {
  const user = useOptionalUser();
  const data = useTypedLoaderData<typeof loader>();
  const isMyPost = user?.id === data.post.userId;

  return (
    <div className="mx-auto flex max-w-screen-md gap-x-4">
      <div className="main grow">
        <p className="py-6">{data.post.body}</p>
        <div> 🗣️ {data.post._count.comments}</div>
        <>{isMyPost ? <DeletePost /> : null}</>
        <CommentForm />
        <CommentList comments={data.post.comments} />
      </div>
      <div className="side basis-60">
        <UserProf user={data.post.user} />
      </div>
    </div>
  );
}

const CommentList = ({ comments }: { comments: Comment[] }) => {
  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>
          <div>{comment.body}</div>
          <div>{comment.createdAt.toDateString()}</div>
          <div>{comment.user.nickname}</div>
        </li>
      ))}
    </ul>
  );
};

const DeletePost: React.FC = () => (
  <Form action={"delete"} method="post">
    <button
      type="submit"
      className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
    >
      Delete
    </button>
  </Form>
);

const CommentForm: React.FC = () => {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (navigation.state == "submitting") {
      formRef.current?.reset();
    }
  }, [navigation.state]);

  return (
    <Form ref={formRef} method="post">
      <textarea
        ref={bodyRef}
        name="body"
        rows={2}
        className="w-full flex-1 rounded-md border-2 border-blue-500 px-3 py-2 text-lg leading-6"
        aria-invalid={actionData?.errors?.body ? true : undefined}
        aria-errormessage={actionData?.errors?.body ? "body-error" : undefined}
      />
      {actionData?.errors?.body ? (
        <div className="pt-1 text-red-700" id="body-error">
          {actionData.errors.body}
        </div>
      ) : null}
      <div className="text-right">
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Save
        </button>
      </div>
    </Form>
  );
};

const UserProf = ({ user }: { user: User }) => {
  return (
    <div>
      <div>
        <Link to={"/users/" + user.nickname}>{user.nickname}</Link>
      </div>
      <p>prof here</p>
    </div>
  );
};

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
