"use client";

import Layout from "../components/layout";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function AdminPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {},
  });

  if (status === "loading") {
    return redirect("/api/auth/signin");
  }
  return (
    <main className="bg-gray-50 min-h-screen">
      <Layout>
        <h1 className="text-2xl font-semibold text-gray-800 mt-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-6 ">
          Welcome to admin page {session?.user?.name}
        </h1>{" "}
      </Layout>
    </main>
  );
}
