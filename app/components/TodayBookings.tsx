"use client";
import UpcomingRsrvModal from "./PropComponent/UpcomingRsrvModal";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import fetchBookings from "./FetchBookings";
import useSWR from "swr";

function TodayBookings() {
  const { data: session } = useSession({
    required: true,
  });
  // const [bookings, setBookings] = useState<any>([]);
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  const [openModalId, setOpenModalId] = useState<string | null>(null);

  const fetcher = async () => {
    const data = await fetchBookings();
    return data;
  };

  const { data, error, mutate } = useSWR("/api/bookings", fetcher);
  const isLoading = !data && !error;
  let bookings = [];
  if (data) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // set the time to 00:00:00
    const now = new Date().getTime(); // get the current time
    bookings = data.filter(
      (booking: any) =>
        booking.name === session?.user?.name &&
        new Date(parseInt(booking.startTime) * 1000).setHours(0, 0, 0, 0) ===
          today.getTime() &&
        now <= parseInt(booking.endTime) * 1000 // check if the current time is before the end time
    );

    bookings.sort(
      (a: any, b: any) => parseInt(b.startTime) - parseInt(a.startTime)
    );
  }

  const isCurrentBooking = ({ startTime, endTime }: any) => {
    const now = Date.now() / 1000; // Convert current time to seconds
    return now >= startTime && now <= endTime;
  };

  function handleOnClose() {
    mutate();
    setOpenModalId(null);
  }

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
                      resrvId={booking.resrvId}
                      isOpen={openModalId === booking.resrvId}
                      onOpen={() => setOpenModalId(booking.resrvId)}
                      onClose={handleOnClose}
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
