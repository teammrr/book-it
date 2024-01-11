"use client";
import useSWR from "swr";
import fetchBookings from "./FetchBookings";
import { BeatLoader } from "react-spinners";
import { useSession } from "next-auth/react";
import BookingStatusHistory from "./BookingHistory";

function MyBookings() {
  const { data: session } = useSession({
    required: true,
  });
  const {
    data: allReservations,
    error,
    mutate,
  } = useSWR("/api/bookings", fetchBookings);

  // Filter the reservations to only include those that match the session name
  const reservations = allReservations?.filter(
    (booking: any) => booking.name === session?.user?.name
  );

  const mutateData = () => {
    mutate();
  };

  if (error) {
    console.log(error);
    return null; // Return null instead of console.log
  }

  if (!reservations) {
    return (
      <div className="flex w-screen pt-10 pb-8 justify-center items-center">
        <BeatLoader color="#3676d6" />
      </div>
    );
  }

  return (
    <>
      <div className="justify-center overflow-x-auto align-middle flex flex-col gap-2">
        {reservations
          .sort((a: any, b: any) => b.startTime - a.startTime)
          .map((reservation: any) => {
            return (
              <BookingStatusHistory
                key={reservation.resrvId}
                reservation={reservation}
                mutateData={mutateData}
              />
            );
          })}
      </div>
    </>
  );
}

export default MyBookings;
