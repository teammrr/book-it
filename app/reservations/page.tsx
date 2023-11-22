"use client";

import { useSession } from "next-auth/react";
import Layout from "../components/layout";
import { redirect } from "next/navigation";
import { ReservationHistory } from "@/components/reservation-history";

// import { navigation, classNames } from "./page";

export default function MyReservations() {
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
    <Layout>
      <>
        <div>{/* <ReservationList /> */}</div>
      </>
    </Layout>
  );
}
