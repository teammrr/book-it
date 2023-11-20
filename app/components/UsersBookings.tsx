"use client";
import BookingStatus from "@/app/components/BookingStatus";
import { useState, useEffect, useCallback } from "react";
import { BeatLoader } from "react-spinners";
import axios from "axios";

function ListBookings({
  params,
}: {
  params: { id: string; startUnix: any; endUnix: any };
}) {
  const [bookings, setBookings] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getBooking = useCallback(
    async (id: string) => {
      console.log("getBooking", id);
      try {
        const res = await axios.get(`/api/bookings/`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const bookings = res.data;
        if (bookings) {
          const startUnix = params.startUnix;
          const endUnix = params.endUnix;
          setMatchingBooking(bookings, id, startUnix, endUnix);
        }
      } catch (err) {
        console.log(err);
      }
    },
    [params.startUnix, params.endUnix]
  );

  function setMatchingBooking(
    bookings: any[],
    id: string,
    startUnix: number,
    endUnix: number
  ) {
    const matchingBookings = bookings.filter(
      (booking) =>
        booking.roomId === id &&
        booking.startTime >= startUnix &&
        booking.endTime <= endUnix
    );
    matchingBookings.forEach((booking) => {
      if (booking.endTime < booking.startTime) {
        console.log("Invalid booking:", booking);
      }
    });
    // console.log("matching bookings avail", matchingBookings);
    setBookings(matchingBookings);
    setIsLoading(false);
  }

  useEffect(() => {
    getBooking(params.id);
    console.log("user booking :", params.id);
  }, [params.id, getBooking]);

  useEffect(() => {
    console.log("user bookings updated", bookings);
  }, [bookings]);

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
