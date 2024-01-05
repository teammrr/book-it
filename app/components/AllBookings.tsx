import GetBookings from "./AvailableBookings";
import ListBookings from "./UsersBookings";

interface AllBookingsProps {
  params: {
    id: string;
    startUnix: string;
    endUnix: string;
  };
  bookings: any;
}

export default function AllBookings({ params, bookings }: AllBookingsProps) {
  return (
    <>
      <GetBookings params={params} bookings={bookings} />
      <ListBookings params={params} bookings={bookings} />
    </>
  );
}
