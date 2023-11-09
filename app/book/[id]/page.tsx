"use client";
import Layout from "../../components/layout";
import { useSearchParams } from "next/navigation";
import BookingStatus from "@/app/components/BookingStatus";
import { useState, useEffect } from "react";
import { PropagateLoader } from "react-spinners";

function Booking({ params }: { params: { id: string; name: string } }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [bookings, setBookings] = useState<any>([]);
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  async function getBooking(id: string) {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      // const res = await fetch(`api/bookings/${id}`, { headers });
      const res = await fetch(`/api/bookings/`, { headers });
      const data = await res.json();
      // data.forEach((booking: any) => {
      //   console.log("Start time:", booking.startTime);
      //   console.log("End time:", booking.endTime);
      //   booking.startTimeC = new Date(booking.startTime * 1000);
      //   booking.endTimeC = new Date(booking.endTime * 1000);
      //   console.log("Start timeC:", booking.startTimeC);
      //   console.log("End timeC:", booking.endTimeC);
      // });
      setBookings(data);
      // console.log(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getBooking(params.id);
  }, [params.id]);

  // List of all possible times
  const allTimes = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
  ];

  // Get the start times of all bookings

  const bookedTimes = bookings.map((booking: any) => {
    const startTime = new Date(booking.startTime * 1000);
    return `${startTime.getHours().toString().padStart(2, "0")}:${startTime
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  });

  // Get the times that are not booked
  const availableTimes = allTimes.filter((time) => !bookedTimes.includes(time));

  const allTimeStamps = allTimes.map((time) => timeToTimestamp(time));

  // Convert booked times to timestamps
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

  function timeToTimestamp(time: string, addHour = false) {
    const [hours, minutes] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(hours + (addHour ? 1 : 0), minutes, 0, 0);
    return date.getTime() / 1000;
  }

  return (
    <>
      <main className="bg-gray-50">
        <Layout>
          <div className="mt-5 mb-5">
            <h1 className="text-3xl font-semibold text-gray-800 mt-8 mx-auto lg:px-32 px-5">
              {name} Availability
            </h1>
          </div>
          {isLoading ? ( // Render a loading spinner if isLoading is true
            <div className="flex justify-center items-center min-h-screen">
              <PropagateLoader color="#3676d6" />
            </div>
          ) : (
            <div className="mt-4 justify-center align-middle flex flex-col gap-2">
              {bookings.map((booking: any) => {
                return (
                  <BookingStatus
                    key={booking.name}
                    roomId={booking.roomId}
                    startTime={booking.startTime}
                    endTime={booking.endTime}
                    name={booking.name}
                    status={booking.status}
                    description={booking.description}
                  />
                );
              })}
              <div className=" justify-center align-middle flex flex-col gap-2">
                {availableTimeRanges.map((range, index) => {
                  return (
                    <BookingStatus
                      key={index}
                      roomId={params.id}
                      startTime={range[0]}
                      endTime={range[1]}
                      name={undefined}
                      status="Available"
                      description=""
                    />
                  );
                })}
              </div>
            </div>
          )}
        </Layout>
      </main>
    </>
  );
}

export default Booking;
