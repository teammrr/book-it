"use client";

import { useSession } from "next-auth/react";
import Header from "./components/header";
import Head from "next/head";
import BookingForm from "./components/BookingForm";
import RoomList from "./components/RoomsList";

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
      <div className="px-4 space-y-6 ">
        <BookingForm />
        <div className="lg:grid lg:grid-cols-3 lg:gap-4">
          <RoomList
            picture="/img/room-sample.jpg"
            title="Multipurpose Room 1"
            description="Some quick example text to build on the card title and make up the
            bulk of the card's content."
            floor="9"
            seats="8"
          />
          <RoomList
            picture="/img/room-sample-small.jpg"
            title="Multipurpose Room 2"
            description="Some quick example text to build on the card title and make up the
            bulk of the card's content."
            floor="9A"
            seats="8"
          />
          <RoomList
            picture="/img/room-sample.jpg"
            title="Large Room 1"
            description="Some quick example text to build on the card title and make up the
            bulk of the card's content."
            floor="9"
            seats="11"
          />
          <RoomList
            picture="/img/room-sample-small.jpg"
            title="Small Room 1"
            description="Some quick example text to build on the card title and make up the
            bulk of the card's content."
            floor="9"
            seats="3"
          />
        </div>
      </div>
    </main>
  );
}
