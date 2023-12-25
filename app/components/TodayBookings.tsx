"use client";
import BookingStatusHistory from "./BookingStatusHistory";
import { useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";
import axios from "axios";
import { useSession } from "next-auth/react";
import fetchBookings from "./FetchBookings";

function TodayBookings() {
  const { data: session } = useSession({
    required: true,
  });
  const [bookings, setBookings] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/bookings/${id}`);
      // Remove the deleted booking from the state
      setBookings(bookings.filter((booking: any) => booking._id !== id));
    } catch (err) {
      console.error("Error deleting booking", err);
    }
  };

  useEffect(() => {
    const fetchAndSortBookings = async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // set the time to 00:00:00
      const data = await fetchBookings();
      const now = new Date().getTime(); // get the current time
      const userBookings = data.filter(
        (booking: any) =>
          booking.name === session?.user?.name &&
          new Date(parseInt(booking.startTime) * 1000).setHours(0, 0, 0, 0) ===
            today.getTime() &&
          now <= parseInt(booking.endTime) * 1000 // check if the current time is before the end time
      );

      userBookings.sort(
        (a: any, b: any) => parseInt(b.startTime) - parseInt(a.startTime)
      );

      setBookings(userBookings);
      setIsLoading(false);
    };

    fetchAndSortBookings();
  }, [session]);

  useEffect(() => {
    setBookings(bookings);
  }, [bookings]);

  return (
    <>
      {isLoading ? ( // Render a loading spinner if isLoading is true
        <div className="flex pt-10 pb-8 justify-center items-center">
          {/* <BeatLoader color="#3676d6" /> */}
        </div>
      ) : bookings.length > 0 ? ( // Check if bookings array has any elements
        <>
          <h1 className="text-xl font-medium text-gray-800 mt-4 mx-4 lg:mx-10 ">
            Upcoming reservation
          </h1>
          <div className="mt-2 pt-2 pl-10 pr-10 justify-center align-middle flex flex-col gap-2">
            {bookings
              .sort((a: any, b: any) => b.startTime - a.startTime)
              .map((booking: any) => {
                return (
                  <div key={booking._id}>
                    <BookingStatusHistory
                      key={booking.name + booking.startTime + booking.endTime}
                      description={booking.description}
                      roomId={booking.roomId}
                      startTime={booking.startTime}
                      endTime={booking.endTime}
                      name={booking.name}
                      roomName={booking.roomName}
                      status={"booked"}
                    />
                    {/* <button onClick={() => handleDelete(booking._id)}>
                    Delete
                  </button> */}
                  </div>
                );
              })}
          </div>
        </>
      ) : null}
    </>
  );
}

export default TodayBookings;
