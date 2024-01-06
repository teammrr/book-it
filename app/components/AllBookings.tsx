import GetBookings from "./AvailableBookings";
import ListBookings from "./UsersBookings";
import { useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";

interface AllBookingsProps {
  params: {
    id: string;
    startUnix: string;
    endUnix: string;
  };
  bookings: [];
}

export default function AllBookings({ params, bookings }: AllBookingsProps) {
  const [ready, setReady] = useState<boolean>(false);
  const [getBookingsReady, setGetBookingsReady] = useState<boolean>(false);
  const [listBookingsReady, setListBookingsReady] = useState<boolean>(false);

  useEffect(() => {
    if (getBookingsReady && listBookingsReady) {
      setReady(true);
    }
  }, [getBookingsReady, listBookingsReady]);

  return (
    <>
      <div
        className="flex justify-center pt-10"
        style={{ display: ready ? "none" : "flex" }}
      >
        <BeatLoader color={"#123abc"} />
      </div>
      <div style={{ display: ready ? "block" : "none" }}>
        <GetBookings
          params={params}
          bookings={bookings}
          onReady={() => setGetBookingsReady(true)}
        />
        <ListBookings
          params={params}
          bookings={bookings}
          onReady={() => setListBookingsReady(true)}
        />
      </div>
    </>
  );
}
