import { Profile, User } from "@prisma/client";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import invariant from "tiny-invariant";

import { createPost } from "~/models/post.server";
import { getUserById, updateProfile, updateUser } from "~/models/user.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ params, request }: LoaderArgs) => {
  const userId = await requireUserId(request);

  const user = await getUserById(userId);
  if (!user) {
    throw new Response("Not Found", { status: 404 });
  }
  return typedjson({ user });
};
type FieldConfig = {
  name: keyof (Profile & Pick<User, "nickname">);
  required?: boolean;
  type?: "text" | "textarea";
  isUrl?: boolean;
};
const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
export const action = async ({ request }: ActionArgs) => {
  const userId = await requireUserId(request);

  const formData = await request.formData();

  const fieldConfigs: FieldConfig[] = [
    { name: "nickname", required: true },
    { name: "bio", required: true },
    { name: "twitterUrl", isUrl: true },
    { name: "instagramUrl", isUrl: true },
    { name: "soundcloudUrl", isUrl: true },
    { name: "spotifyUrl", isUrl: true },
    { name: "webUrl", isUrl: true },
  ];

  const errors: any = {};
  const updateValues: any = {};
  fieldConfigs.forEach(({ name, required, isUrl }) => {
    const value = formData.get(name);

    if (required && !value) {
      errors[name] = `Please enter ${name}.`;
    } else if (value && isUrl && !isValidUrl(value.toString())) {
      errors[name] = `Invalid URL format for ${name}.`;
    }
    updateValues[name] = value;
  });

  if (Object.keys(errors).length > 0) {
    return json({ errors }, { status: 400 });
  }

  // Update Info if no error
  const nickname = updateValues["nickname"];
  nickname && (await updateUser({ userId, nickname }));
  delete updateValues["nickname"];

  await updateProfile({ userId, profileData: updateValues });

  const user = await getUserById(userId);

  return redirect("/users/" + user?.nickname);
};

export default function userEditPage() {
  const { user } = useTypedLoaderData<typeof loader>();

  const actionData = useActionData<typeof action>();

  const fieldConfigs: FieldConfig[] = [
    { name: "nickname", required: true },
    { name: "bio", required: true, type: "textarea" },
    { name: "twitterUrl" },
    { name: "instagramUrl" },
    { name: "soundcloudUrl" },
    { name: "spotifyUrl" },
    { name: "webUrl" },
  ];
  const defaultValues: any = {
    nickname: user.nickname,
    ...user.profile,
  };
  const renderField = ({ name, type = "text" }: FieldConfig) => {
    const fieldProps = {
      id: name,
      name,
      defaultValue: defaultValues[name],
      "aria-invalid": actionData?.errors?.[name] ? true : undefined,
      "aria-errormessage": actionData?.errors?.[name]
        ? `${name}-error`
        : undefined,
      className:
        "appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline",
    };

    return (
      <div key={name}>
        <label htmlFor={name}>{name}:</label>
        {type === "textarea" ? (
          <textarea {...fieldProps} />
        ) : (
          <input type="text" {...fieldProps} />
        )}
        {actionData?.errors?.[name] && (
          <div className="pt-1 text-red-700" id={`${name}-error`}>
            {actionData.errors[name]}
          </div>
        )}
      </div>
    );
  };

  return (
    <Form
      method="post"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
      }}
    >
      {fieldConfigs.map(renderField)}

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
}
