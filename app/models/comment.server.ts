import type { User, Post, Comment } from "@prisma/client";
import { prisma } from "~/db.server";

export function createComment({
  body,
  userId,
  postId,
}: Pick<Comment, "body"> & {
  userId: User["id"];
  postId: Post["id"];
}) {
  return prisma.comment.create({
    data: {
      body,
      post: {
        connect: {
          id: postId,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function deleteComment({
  id,
  userId,
}: Pick<Comment, "id"> & { userId: User["id"] }) {
  return prisma.comment.deleteMany({
    where: { id, userId },
  });
}
