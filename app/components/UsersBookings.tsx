"use client";
import BookingStatus from "@/app/components/BookingStatus";
import { useState, useEffect, useCallback } from "react";
import { BeatLoader } from "react-spinners";
import fetchBookings from "./FetchBookings";

function ListBookings({
  params,
}: {
  params: { id: string; startUnix: any; endUnix: any };
}) {
  const [bookings, setBookings] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const setMatchingBooking = useCallback(
    (bookings: any[], id: string, startUnix: number, endUnix: number) => {
      const matchingBookings = bookings.filter(
        (booking) =>
          booking.roomId === id &&
          booking.startTime >= startUnix &&
          booking.endTime <= endUnix
      );
      setBookings(matchingBookings);
      setIsLoading(false);
    },
    []
  );

  useEffect(() => {
    let isMounted = true;

    const fetchBooking = async () => {
      const bookings = await fetchBookings();
      setIsLoading(true);
      if (bookings && isMounted) {
        const startUnix = params.startUnix;
        const endUnix = params.endUnix;
        setMatchingBooking(bookings, params.id, startUnix, endUnix);
        setIsLoading(false);
      }
    };

    fetchBooking();

    return () => {
      isMounted = false;
    };
  }, [params.id, params.startUnix, params.endUnix, setMatchingBooking]);

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
      )}
    </>
  );
}

export default ListBookings;
