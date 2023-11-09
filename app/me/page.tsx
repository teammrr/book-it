"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Layout from "../components/layout";
import { redirect } from "next/navigation";

interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  _id?: string | null;
}

export default function MePage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      return { redirect: "/login" };
      // The user is not authenticated, handle it here.
    },
  });

  if (status === "loading") {
    return redirect("/api/auth/signin");
  }

  const user: User = session?.user || {};

  return (
    <Layout>
      <div className="flex items-center justify-center">
        <div className="max-w-xs mt-48">
          <div className="bg-white shadow-xl rounded-lg py-3">
            <div className="photo-wrapper p-2">
              <Image
                className="w-24 h-24 rounded-full mx-auto"
                width={128}
                height={128}
                src={user?.image ? user.image : "/img/logo-black.png"}
                alt="User Profile"
              />
            </div>
            <div className="p-2">
              <h3 className="text-center text-xl pl-4 pr-4 text-gray-900 font-medium leading-8 truncate">
                {user.name}
              </h3>
              <div className="text-center text-gray-400 text-xs font-semibold">
                <p>The Newton Sixth Form School</p>
              </div>
              <table className="text-xs my-3 mx-6">
                <tbody>
                  <tr>
                    <td className="px-2 py-2 text-gray-500 font-semibold">
                      Email
                    </td>
                    <td className="px-2 py-2">{user.email}</td>
                  </tr>
                </tbody>
              </table>

              <div className="text-center my-3">
                <a href="/feedback">
                  <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Feedback
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
