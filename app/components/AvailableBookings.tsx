"use client";
import { useState, useEffect, useCallback } from "react";
import BookingStatus from "@/app/components/BookingStatus";

function GetBookings({
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
      const matchingBookings = bookings.filter((booking) => {
        return (
          booking.roomId === id &&
          booking.startTime >= startUnix &&
          booking.endTime <= endUnix &&
          booking.startTime !== booking.endTime
        );
      });
      matchingBookings.forEach((booking) => {
        if (booking.endTime < booking.startTime) {
          console.error("Invalid booking:", booking);
        }
      });
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

  useEffect(() => {
    setBookings(bookings);
  }, [bookings]);

  // List of all possible times
  const allTimes = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];

  // Convert booked times to timestamps
  function timeToTimestamp(time: string, addHour = false) {
    const [hours, minutes] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(hours + (addHour ? 1 : 0), minutes, 0, 0);
    return date.getTime() / 1000;
  }

  const bookedTimeStamps = bookings.map(
    (booking: { startTime: any; endTime: any }) => ({
      start: booking.startTime,
      end: booking.endTime,
    })
  );

  // Sort booked times
  bookedTimeStamps.sort(
    (a: { start: number }, b: { start: number }) => a.start - b.start
  );

  // Initialize an array to hold the available time ranges
  let availableTimeRanges = [];

  // Get the start of the first available time range
  let startOfRange = timeToTimestamp(allTimes[0]);

  // Iterate over booked times
  for (let i = 0; i < bookedTimeStamps.length; i++) {
    // Add the current range to the array
    availableTimeRanges.push([startOfRange, bookedTimeStamps[i].start]);

    // Update the start of the range
    startOfRange = bookedTimeStamps[i].end;
  }

  // Add the last range to the array
  availableTimeRanges.push([
    startOfRange,
    timeToTimestamp(allTimes[allTimes.length - 1], true),
  ]);

  return (
    <>
      <div className="mt-4 justify-center align-middle flex flex-col gap-2">
        {availableTimeRanges
          .filter((range) => Number(range[0]) !== Number(range[1]))
          .map((range, index) => {
            return (
              <BookingStatus
                key={`${range[0]}-${range[1]}-${index}`}
                roomId={params.id}
                startTime={range[0]}
                endTime={range[1]}
                name={undefined}
              />
            );
          })}
      </div>
    </>
  );
}

export default GetBookings;
