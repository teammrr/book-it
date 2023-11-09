"use client";
import Layout from "../../components/layout";
import { useSearchParams } from "next/navigation";
import BookingStatus from "@/app/components/BookingStatus";
import { useState, useEffect } from "react";
import Image from "next/image";

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
        booking.startTimeC = new Date(booking.startTime * 1000);
        booking.endTimeC = new Date(booking.endTime * 1000);
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
            <div role="status" className="text-center pt-64">
              <Image
                src="/Magnify.svg"
                alt="Loading..."
                width={190}
                height={190}
                className="mx-auto"
              />
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <div className="mt-4 justify-center align-middle flex flex-col gap-2">
              {bookings.map((booking: any) => {
                return (
                  <BookingStatus
                    key={booking.name}
                    roomId={booking.roomId}
                    startTime={booking.startTimeC}
                    endTime={booking.endTimeC}
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
