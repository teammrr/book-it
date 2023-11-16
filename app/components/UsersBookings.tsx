"use client";
import BookingStatus from "@/app/components/BookingStatus";
import { useState, useEffect, useCallback } from "react";
import { BeatLoader } from "react-spinners";
import axios from "axios";

function ListBookings({ params }: { params: { id: string } }) {
  const [bookings, setBookings] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getBooking = useCallback(async (id: string) => {
    try {
      const res = await axios.get(`/api/bookings/`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const bookings = res.data;
      if (bookings) {
        setMatchingBooking(bookings, id);
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, []);

  function setMatchingBooking(bookings: any[], id: string) {
    const matchingBookings = bookings.filter(
      (booking) => booking.roomId === id
    );
    console.log("specific bookings", matchingBookings);
    setBookings(matchingBookings);
  }

  useEffect(() => {
    getBooking(params.id);
    console.log("user booking room id a:", params.id);
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
