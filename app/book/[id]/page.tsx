"use client";
import Layout from "../../components/layout";
import { useSearchParams } from "next/navigation";
import ConfirmBookingModal from "@/app/components/ConfirmBookingModal";
import { useState, useEffect } from "react";
import { PropagateLoader } from "react-spinners";
import GetBookings from "@/app/components/GetBookings";
import SelectStartTime from "@/app/components/SelectStartTime";
import SelectEndTime from "@/app/components/SelectEndTime";

function Booking({ params }: { params: { id: string; name: string } }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [bookings, setBookings] = useState<any>([]);
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  async function getBooking(id: string) {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      // const res = await fetch(`api/bookings/${id}`, { headers });
      const res = await fetch(`/api/bookings/`, { headers });
      const data = await res.json();
      setBookings(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getBooking(params.id);
  }, [params.id]);

  return (
    <>
      <main className="bg-gray-50">
        <Layout>
          <div className="mt-5 mb-5">
            <h1 className="text-3xl font-semibold text-gray-800 mt-8 mx-auto lg:px-32 px-4">
              Reserve {name}
            </h1>
            <div className="mt-4 pl-4 rounded-lg shadow shadow-black/10 ml-2 mr-2 pt-3 pb-4 ">
              <div className="flex justify-between pr-6">
                <span>Start Time</span>
                <span>End Time</span>
              </div>
              <div className="flex pb-4 pr-4 gap-4">
                <SelectStartTime />
                <span className=" align-middle flex items-center">👉</span>
                <SelectEndTime />
              </div>
              <div className="flex flex-row-reverse pr-4 pt-2">
                <ConfirmBookingModal />
              </div>
            </div>
          </div>
          {isLoading ? ( // Render a loading spinner if isLoading is true
            <div className="flex justify-center items-center min-h-screen">
              <PropagateLoader color="#3676d6" />
            </div>
          ) : (
            <div className="mt-4 justify-center align-middle flex flex-col gap-2">
              <GetBookings params={{ id: "1", name: "Team" }} />
            </div>
          )}
        </Layout>
      </main>
    </>
  );
}

export default Booking;
