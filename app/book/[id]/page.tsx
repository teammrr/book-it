"use client";
import Layout from "../../components/layout";
import { useSearchParams } from "next/navigation";
import BookingStatus from "@/app/components/BookingStatus";
// import Datepicker from "flowbite-datepicker/Datepicker";

async function getBooking(id: string) {
  const headers = {
    "Content-Type": "application/json",
  };
  const res = await fetch(`api/bookings/${id}`, { headers });
  const data = await res.json();
  return data;
}

export default function Booking({
  params,
}: {
  params: { id: string; name: string };
}) {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  return (
    <>
      <main className="bg-gray-50 min-h-screen">
        <Layout>
          <h1 className="text-3xl font-semibold text-gray-800 mt-8 mx-auto lg:px-32 px-5">
            {name} Availability
          </h1>
          <div className="mt-5 mb-5"></div>
          <div className="mt-4 justify-center align-middle flex flex-col gap-2">
            <BookingStatus time={"12:00-13:00"} status={0} />
            <BookingStatus time={"13:00-14:00"} status={0} />
            <BookingStatus
              name={"Kantaphon Thangthong"}
              time={"14:00-13:00"}
              status={1}
            />
            <BookingStatus
              name={"Navee Napraporn"}
              time={"15:00-17:00"}
              status={1}
            />
            <BookingStatus
              name={"Mondpakorn Pattharathiranond"}
              time={"18:00-19:00"}
              status={1}
            />
          </div>
        </Layout>
      </main>
    </>
  );
}
