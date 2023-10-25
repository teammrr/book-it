"use client";

import { useSession } from "next-auth/react";
import Header from "../components/header";
import Image from "next/image";

interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  sub?: string; // Add the userId property to the User interface
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
    return (
      <main className="bg-gray-50 min-h-screen">
        <Header />
        <h1 className="text-3xl font-semibold text-gray-800 mt-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          Please login to view this page
        </h1>
      </main>
    );
  }

  const user: User = session?.user || {};
  console.group(user);

  return (
    <main className="bg-gray-50 min-h-screen">
      <Header />
      <div className="flex flex-col justify-center items-center mt-52">
        <Image
          width={100}
          height={100}
          src={user?.image ? user.image : "/img/logo-black.png"}
          alt="User Profile"
          className="rounded-full"
        />
        <h1 className="text-2xl text-center font-semibold text-gray-800 mt-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          Hello I&apos;m, {user?.name}
        </h1>
        <p className="mt-4 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-gray-600 text-lg">
          Email: {user?.email}
        </p>
      </div>
    </main>
  );
}
