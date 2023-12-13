"use client";

import Layout from "../components/layout";
import { ReservationHistory } from "@/components/reservation-history";

export default function History() {
  return (
    <Layout>
      <>
        <div>
          <h1 className="text-2xl font-semibold text-[#040506] mt-6 mx-4 lg:mx-10 ">
            Reservation History
          </h1>
          <ReservationHistory />
        </div>
      </>
    </Layout>
  );
}
