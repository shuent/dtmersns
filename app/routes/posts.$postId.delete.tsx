import { deletePost, getPost } from "~/models/post.server";
import { requireUserId } from "~/session.server";
import invariant from "tiny-invariant";
import { json, redirect } from "@remix-run/node";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";

export const action = async ({ params, request }: ActionArgs) => {
  const userId = await requireUserId(request);
  invariant(params.postId, "postId not found");

  await deletePost({ id: params.postId, userId });

  return redirect("/");
};

export const loader = async () => redirect("/");
