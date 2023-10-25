"use client";

import { useSession } from "next-auth/react";
import Header from "./components/header";
import Head from "next/head";
import BookingForm from "./components/BookingForm";
import RoomList from "./components/RoomsList";
import { redirect } from "next/navigation";

// import { navigation, classNames } from "./page";

export default function Home() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
    },
  });

  if (status === "loading") {
    return redirect("/api/auth/signin");
  }

  return (
    <main className="bg-gray-50 min-h-screen">
      <Header />
      <h1 className="text-2xl font-semibold text-gray-800 mt-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-6">
        Welcome back, {session?.user?.name}
      </h1>
      <div className="px-4 space-y-6 ">
        <BookingForm />
        <div className="lg:grid lg:grid-cols-3 lg:gap-4">
          <RoomList />
        </div>
      </div>
    </main>
  );
}
