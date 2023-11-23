"use client";

import Layout from "../components/layout";
import { ReservationList } from "@/components/reservation-list";

export default function MyReservations() {
  return (
    <Layout>
      <>
        <div>
          <ReservationList />
        </div>
      </>
    </Layout>
  );
}
