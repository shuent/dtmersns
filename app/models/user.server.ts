import type { Password, Profile, User } from "@prisma/client";
import bcrypt from "bcryptjs";

import { prisma } from "~/db.server";

export type { User } from "@prisma/client";

export async function getUserById(id: User["id"]) {
  return prisma.user.findUnique({
    include: { profile: true },
    where: { id },
  });
}

export async function getUserByEmail(email: User["email"]) {
  return prisma.user.findUnique({
    include: { profile: true },
    where: { email },
  });
}
export async function getUserByNickname(nickname: User["nickname"]) {
  return prisma.user.findUnique({
    include: { profile: true },
    where: { nickname },
  });
}

export async function fetchUserData(userId: string) {
  try {
    const userData = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        posts: true,
        comments: {
          include: {
            post: true,
          },
        },
      },
    });

    return userData;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}

export async function createUser(email: User["email"], password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
      profile: {
        create: {
          bio: "hello",
        },
      },
    },
  });
}

export async function updateUser({
  userId,
  nickname,
}: {
  userId: User["id"];
  nickname: User["nickname"];
}) {
  return prisma.user.update({
    where: { id: userId },
    data: { nickname },
  });
}

export async function updateProfile({
  userId,
  profileData,
}: {
  userId: User["id"];
  profileData: Partial<Profile>;
}) {
  return prisma.profile.update({
    where: { userId },
    data: profileData,
  });
}

export async function deleteUserByEmail(email: User["email"]) {
  return prisma.user.delete({ where: { email } });
}

export async function verifyLogin(
  email: User["email"],
  password: Password["hash"]
) {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
    include: {
      password: true,
    },
  });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.compare(
    password,
    userWithPassword.password.hash
  );

  if (!isValid) {
    return null;
  }

  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}
