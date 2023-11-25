import MyBookings from "@/app/components/MyBookings";
import TodayBookings from "@/app/components/TodayBookings";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

export function ReservationHistory() {
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
    <div className="flex lg:mx-4">
      <main className="max-sm:p-2 pr-6 pl-6 pt-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-medium text-gray-800 mt-8 mx-4 lg:mx-10 ">
              {" "}
              My reservations
            </h1>
            <div className="rounded-lg shadow shadow-black/10 lg:mx-10 mx-2 pb-4 ">
              <div className="flex ">
                <TodayBookings />
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-lg shadow shadow-black/10 lg:mx-10 mx-2 pb-4 ">
          <h1 className="text-2xl font-medium text-gray-800 pt-2 mx-4 ">
            {" "}
            History
          </h1>
          <div className="flex ">
            <MyBookings />
          </div>
        </div>
      </main>
    </div>
  );
}
