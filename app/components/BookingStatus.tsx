import Image from "next/image";
import StatusIndicator from "./StatusIndicator";

interface Booking {
  time: string;
  name: string;
  status: string;
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
      <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
        <span className="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
        Available
      </span>
    </div>
  );
}
