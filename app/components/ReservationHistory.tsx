import MyBookings from "@/app/components/MyBookings";
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
      <main className="max-sm:p-2 pr-6 pl-6 overflow-x-auto ">
        <div className="flex justify-between items-center mb-4"></div>
        <div>
          <MyBookings />
        </div>
      </main>
    </div>
  );
}
