"use client";
import { useSearchParams } from "next/navigation";
import BookingStatus from "@/app/components/BookingStatus";
import { useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";
import axios from "axios";

function ListBookings({ params }: { params: { id: string; name: string } }) {
  const [bookings, setBookings] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  async function getBooking(id: string) {
    try {
      const res = await axios.get(`/api/bookings/`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setBookings(res.data);
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
      {isLoading ? ( // Render a loading spinner if isLoading is true
        <div className="flex pt-10 pb-8 justify-center items-center">
          <BeatLoader color="#3676d6" />
        </div>
      ) : (
        <div className="mt-4 justify-center align-middle flex flex-col gap-2">
          {bookings.map((booking: any) => {
            return (
              <BookingStatus
                key={booking.name}
                description={booking.description}
                roomId={booking.roomId}
                startTime={booking.startTime}
                endTime={booking.endTime}
                name={booking.name}
                status={booking.status}
              />
            );
          })}
        </div>
      )}
    </>
  );
}

export default ListBookings;
