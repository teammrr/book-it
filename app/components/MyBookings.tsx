"use client";
import BookingStatusHistory from "./BookingStatusHistory";
import { useState, useEffect, useCallback } from "react";
import { BeatLoader } from "react-spinners";
import axios from "axios";
import { useSession } from "next-auth/react";

function MyBookings() {
  const { data: session } = useSession({
    required: true,
  });
  const [bookings, setBookings] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    axios.get("/api/bookings").then((response) => {
      const data = response.data;
      const userBookings = data.filter(
        (booking: any) => booking.name === session?.user?.name
      );
      userBookings.sort(
        (a: any, b: any) => Number(b.startTime) - Number(a.startTime)
      );
      setBookings(userBookings);
      setIsLoading(false);
    });
  }, [session]);

  useEffect(() => {
    setBookings(bookings);
  }, [bookings]);

  return (
    <>
      {isLoading ? ( // Render a loading spinner if isLoading is true
        <div className="flex pt-10 pb-8 justify-center items-center">
          <BeatLoader color="#3676d6" />
        </div>
      ) : (
        <div className="mt-2 justify-center align-middle flex flex-col gap-2">
          {bookings
            .sort((a: any, b: any) => b.startTime - a.startTime)
            .map((booking: any) => {
              return (
                <>
                  <BookingStatusHistory
                    key={booking.resrvId + booking.startTime + booking.endTime}
                    description={booking.description}
                    roomId={booking.roomId}
                    startTime={booking.startTime}
                    endTime={booking.endTime}
                    name={booking.name}
                    roomName={booking.roomName}
                    status={"booked"}
                  />
                </>
              );
            })}
        </div>
      )}
    </>
  );
}

export default MyBookings;
