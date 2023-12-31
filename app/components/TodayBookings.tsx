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

  const isCurrentBooking = ({ startTime, endTime }: any) => {
    const now = Date.now() / 1000; // Convert current time to seconds
    return now >= startTime && now <= endTime;
  };

  return (
    <>
      {isLoading ? (
        <></>
      ) : bookings.length > 0 ? (
        <div className=" gap-2 justify">
          <h1 className="text-xl font-medium text-gray-800 mt-1 pl-4 lg:pl-10">
            Today&apos;s Upcoming Reservation
          </h1>
          <div className="pt-1 pl-4 lg:pl-10 flex flex-wrap gap-2">
            {bookings
              .sort((a: any, b: any) => a.startTime - b.startTime)
              .map((booking: any) => {
                const currentBooking = isCurrentBooking(booking);
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
                      status={currentBooking ? "green" : "facebook"}
                    />
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
