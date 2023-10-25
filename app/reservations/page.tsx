"use client";

import { useSession } from "next-auth/react";
import Header from "../components/header";
import Layout from "../components/layout";
import { redirect } from "next/navigation";

// import { navigation, classNames } from "./page";

export default function MyReservations() {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
    },
  });

  if (status === "loading") {
    return redirect("/api/auth/signin");
  }

  return (
    <Layout>
      <h1 className="text-3xl font-semibold text-gray-800 mt-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        My Reservations
      </h1>
    </Layout>
  );
}
