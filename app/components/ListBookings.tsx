"use client";
import { useSearchParams } from "next/navigation";
import BookingStatus from "@/app/components/BookingStatus";
import { useState, useEffect } from "react";

function ListBookings({ params }: { params: { id: string; name: string } }) {
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
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getBooking(params.id);
  }, [params.id]);

  return (
    <>
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
    </>
  );
}

export default ListBookings;
