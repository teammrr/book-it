"use client";

import { useSession } from "next-auth/react";
import Header from "./components/header";
import Footer from "./components/footer";
import Head from "next/head";
import BookingForm from "./components/BookingForm";

// import { navigation, classNames } from "./page";

export default function Home() {
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
      <h1 className="text-2xl font-semibold text-gray-800 mt-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-6">
        Welcome back, {session?.user?.name}
      </h1>
      <div className="px-4  ">
        <BookingForm />
      </div>
    </main>
  );
}
