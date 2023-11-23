"use client";

import { Card } from "flowbite-react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function ReservationHistory() {
  const { data: session } = useSession({
    required: true,
  });
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("/api/bookings").then((response) => {
      const data = response.data;
      const userBookings = data.filter(
        (booking: any) => booking.name === session?.user?.name
      );
      userBookings.sort(
        (a: any, b: any) =>
          new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
      );
      setBookings(userBookings);
    });
  }, [session]);
  return (
    <>
      <main className="flex-grow max-sm:p-2 pr-6 pl-6 pt-6">
        <h1 className="text-2xl max-sm:mt-6 font-medium mt-2 ">
          Reservation History
        </h1>
        <div className="lg:flex lg:flex-wrap pt-6 space-y-4">
          {bookings.map((booking: any) => (
            <Card key={booking.id} className="max-w-sm">
              <span className=" tracking-tight text-gray-900 dark:text-white flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                  />
                </svg>
                {new Date(booking.startTime * 1000).toLocaleDateString()}
              </span>
              <span className=" tracking-tight text-gray-900 dark:text-white flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                  />
                </svg>
                {new Date(booking.startTime * 1000).toLocaleDateString()}
              </span>
              <span className=" tracking-tight text-gray-900 dark:text-white flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                {new Date(booking.startTime * 1000).toLocaleDateString()}
              </span>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Description: {booking.description}
              </p>
            </Card>
          ))}
        </div>
      </main>
    </>
  );
}
