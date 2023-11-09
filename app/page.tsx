"use client";

import { useSession } from "next-auth/react";
import RoomList from "./components/RoomsList";
import { redirect } from "next/navigation";
import Layout from "./components/layout";
import BookingModal from "./components/BookingModal";
import { useState } from "react";

// import { navigation, classNames } from "./page";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
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
      <Layout>
        <h1 className="text-3xl font-semibold text-gray-800 mt-8 mx-auto lg:px-32 px-5">
          Welcome back, {session?.user?.name}
        </h1>
        <div className="px-4 space-y-6 ">
          {/* <BookingForm /> */}
          <div className="">
            {/* <BookingModal
              showModal={showModal}
              setShowModal={setShowModal}
            ></BookingModal>
            {showModal && <BookingModal setShowModal={setShowModal} />} */}
            <RoomList />
          </div>
        </div>
      </Layout>
    </main>
  );
}
