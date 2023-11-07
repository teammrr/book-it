import Image from "next/image";
import StatusIndicator from "./StatusIndicator";

interface Booking {
  time: string;
  name: string;
  status: number;
}

export default function BookingStatus(Bookings: Booking) {
  return (
    <div className="flex items-center space-x-3">
      <div className="flex-shrink-0">
        <Image
          height={32}
          width={32}
          className="w-8 h-8 rounded-full"
          src="/img/logo-black.png"
          alt="Neil image"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 truncate dark:text-white">
          {Bookings.time}
        </p>
        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
          Booked by: {Bookings.name}
        </p>
      </div>
      <StatusIndicator status={Bookings.status} />
    </div>
  );
}
