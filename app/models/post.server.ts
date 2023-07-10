import type { User, Post } from "@prisma/client";

import { prisma } from "~/db.server";

export function getPost({ id }: Pick<Post, "id">) {
  return prisma.post.findUnique({
    include: {
      user: true,
      comments: {
        include: {
          user: true,
        },
      },
      _count: {
        select: { comments: true },
      },
    },
    where: { id },
  });
}

export function getPostListItems() {
  return prisma.post.findMany({
    include: {
      user: true,
      _count: {
        select: { comments: true },
      },
    },
    orderBy: { updatedAt: "desc" },
  });
}
type PostKind = "song" | "hire" | "skill";
export function createPost({
  body,
  kind,
  userId,
}: Pick<Post, "body"> & {
  kind: PostKind;
  userId: User["id"];
}) {
  return prisma.post.create({
    data: {
      body,
      kind,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function deletePost({
  id,
  userId,
}: Pick<Post, "id"> & { userId: User["id"] }) {
  return prisma.post.deleteMany({
    where: { id, userId },
  });
}
