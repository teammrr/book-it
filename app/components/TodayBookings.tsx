"use client";
import UpcomingRsrvModal from "./UpcomingRsrvModal";
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
  const [openModalId, setOpenModalId] = useState<string | null>(null);

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
        <></>
      ) : bookings.length > 0 ? ( // Check if bookings array has any elements
        <div className=" gap-2 justify">
          <h1 className="text-xl font-medium text-gray-800 mt-1 pl-4 lg:pl-10">
            Today&apos;s Upcoming Reservation
          </h1>
          <div className="pt-1 pl-4 lg:pl-10 flex flex-row gap-2">
            {bookings
              .sort((a: any, b: any) => b.startTime - a.startTime)
              .map((booking: any) => {
                return (
                  <div key={booking._id}>
                    <UpcomingRsrvModal
                      key={booking.name + booking.startTime + booking.endTime}
                      roomName={booking.roomName}
                      description={booking.description}
                      startTime={booking.startTime}
                      endTime={booking.endTime}
                      isOpen={openModalId === booking._id}
                      onOpen={() => setOpenModalId(booking._id)}
                      onClose={() => setOpenModalId(null)}
                    />
                    {/* <button onClick={() => handleDelete(booking._id)}>
                    Delete
                  </button> */}
                  </div>
                );
              })}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default TodayBookings;
