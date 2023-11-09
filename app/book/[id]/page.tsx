"use client";
import Layout from "../../components/layout";
import { useSearchParams } from "next/navigation";
import BookingStatus from "@/app/components/BookingStatus";
import { useState, useEffect } from "react";
import { PropagateLoader } from "react-spinners";

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
      setIsLoading(false);
      data.forEach((booking: any) => {
        console.log("Start time:", booking.startTime);
        console.log("End time:", booking.endTime);
        booking.startTimeC = new Date(booking.startTime * 1000);
        booking.endTimeC = new Date(booking.endTime * 1000);
        console.log("Converted start time:", booking.startTimeC);
        console.log("Converted end time:", booking.endTimeC);
      });
      setBookings(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getBooking(params.id);
  }, [params.id]);

  return (
    <>
      <main className="bg-gray-50 min-h-screen">
        <Layout>
          <div className="mt-5 mb-5">
            <h1 className="text-3xl font-semibold text-gray-800 mt-8 mx-auto lg:px-32 px-5">
              {name} Availability
            </h1>
          </div>
          {isLoading ? ( // Render a loading spinner if isLoading is true
            <div className="flex justify-center items-center min-h-screen">
              <PropagateLoader color="#3676d6" />
            </div>
          ) : (
            <div className="mt-4 justify-center align-middle flex flex-col gap-2">
              {bookings.map((booking: any) => {
                return (
                  <BookingStatus
                    key={booking.name}
                    roomId={booking.roomId}
                    startTime={booking.startTime}
                    endTime={booking.endTime}
                    name={booking.name}
                    status={booking.status}
                    description={booking.description}
                  />
                );
              })}
            </div>
          )}
        </Layout>
      </main>
    </>
  );
}

export default Booking;
