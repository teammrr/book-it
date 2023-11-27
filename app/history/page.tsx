"use client";

import Layout from "../components/layout";
import { ReservationHistory } from "@/components/reservation-history";

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
