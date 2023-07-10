import { Form, Link } from "@remix-run/react";
import { useOptionalUser } from "~/utils";

export const Menu = () => {
  const user = useOptionalUser();
  return (
    <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
      <h1 className="text-3xl font-bold">
        <Link to="/">DTMer SNS</Link>
      </h1>
      {user ? (
        <>
          <div className="grid-cols-2 sm:inline-grid sm:gap-5 ">
            <Link
              to={"/users/" + user.nickname}
              className="rounded bg-slate-600 px-4 py-2 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
            >
              mypage
            </Link>
            <Form action="/logout" method="post">
              <button
                type="submit"
                className="rounded bg-slate-600 px-4 py-2 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
              >
                Logout
              </button>
            </Form>
          </div>
        </>
      ) : (
        <div className="grid-cols-2 space-y-4 sm:inline-grid sm:gap-5 sm:space-y-0">
          <Link
            to="/join"
            className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
          >
            Sign up
          </Link>
          <Link
            to="/login"
            className="flex items-center justify-center rounded-md bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600"
          >
            Log In
          </Link>
        </div>
      )}
    </header>
  );
};
