"use client";

import { useSession } from "next-auth/react";
import Header from "../components/header";

export default function MePage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
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

  return (
    <main className="bg-gray-50 min-h-screen">
      <Header />
      <div className="">
        <h1 className="text-3xl font-semibold text-gray-800 mt-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          Welcome, {session?.user?.name}
        </h1>
        <p className="mt-4 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-gray-600 text-lg">
          Email: {session?.user?.email}
        </p>
      </div>
    </main>
  );
}
