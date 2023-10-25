"use client";

import { useSession } from "next-auth/react";
import Header from "../components/header";
import Footer from "../components/footer";
import Head from "next/head";
import { redirect } from "next/navigation";

// import { navigation, classNames } from "./page";

export default function History() {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      return { redirect: "/login" };
      // The user is not authenticated, handle it here.
    },
  });

  if (status === "loading") {
    return redirect("/api/auth/signin");
  }

  return (
    <main className="bg-gray-50 min-h-screen">
      <Header />
      <h1 className="text-3xl font-semibold text-gray-800 mt-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        Reservation History
      </h1>
    </main>
  );
}
