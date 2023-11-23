"use client";

import { useSession } from "next-auth/react";
import Layout from "../components/layout";
import { ReservationHistory } from "@/components/reservation-history";
// import ReservationHistory from "../components/ReservationHistory";

export default function History() {
  return (
    <Layout>
      <>
        <div>
          <ReservationHistory />
        </div>
      </>
    </Layout>
  );
}
