"use client";
import { useState, useEffect, useCallback } from "react";
import BookingStatus from "@/app/components/BookingStatus";

function ListBookings({
  params,
  bookings: initialBookings,
  onReady,
}: {
  params: { id: string; startUnix: any; endUnix: any };
  bookings: any[];
  onReady: () => void;
}) {
  const [bookings, setBookings] = useState<any>([]);

  const setMatchingBooking = useCallback(
    (bookings: any[], id: string, startUnix: number, endUnix: number) => {
      const matchingBookings = bookings.filter(
        (booking) =>
          booking.roomId === id &&
          booking.startTime >= startUnix &&
          booking.endTime <= endUnix
      );
      setBookings(matchingBookings);
      onReady();
    },
    [onReady]
  );

  useEffect(() => {
    const startUnix = params.startUnix;
    const endUnix = params.endUnix;
    setMatchingBooking(initialBookings, params.id, startUnix, endUnix);
  }, [
    params.id,
    params.startUnix,
    params.endUnix,
    setMatchingBooking,
    initialBookings,
  ]);

  return (
    <>
      <div className="mt-2 justify-center align-middle flex flex-col gap-2">
        {bookings
          .sort((a: any, b: any) => a.startTime - b.startTime)
          .map((booking: any) => {
            return (
              <BookingStatus
                key={
                  booking.name +
                  booking.startTime +
                  booking.endTime +
                  booking.roomName
                }
                description={booking.description}
                roomId={booking.roomId}
                startTime={booking.startTime}
                endTime={booking.endTime}
                name={booking.name}
                status={"booked"}
              />
            );
          })}
      </div>
    </>
  );
}

export default ListBookings;
