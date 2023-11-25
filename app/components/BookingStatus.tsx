import StatusIndicator from "./StatusIndicator";
import BookedUser from "./BookedUser";

export default function BookingStatus(Bookings: any) {
  const formattedDate = formatDate(Bookings.date);
  const startTime = new Date(Bookings.startTime * 1000);
  const formattedStartTime = `${startTime
    .getHours()
    .toString()
    .padStart(2, "0")}:${startTime.getMinutes().toString().padStart(2, "0")}`;

  const endTime = new Date(Bookings.endTime * 1000);
  const formattedEndTime = `${endTime
    .getHours()
    .toString()
    .padStart(2, "0")}:${endTime.getMinutes().toString().padStart(2, "0")}`;

  function formatDate(unixTimestamp: number) {
    const date = new Date(unixTimestamp * 1000);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleString("en-US", options);
  }

  return (
    <div className="flex bg-[#E1E7EE] items-center space-x-2 pt-2 pb-2 pr-4 pl-4 rounded-lg shadow shadow-black/8">
      {" "}
      {/* Add your desired width and height here */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-md text-gray-900 truncate ">
          {formattedStartTime} to {formattedEndTime}
        </p>
        <p className="text-sm font-semibold text-gray-500 truncate">
          {Bookings.date}
        </p>
        <span>
          <BookedUser
            name={Bookings.name}
            description={Bookings.description || ""}
          />
        </span>
      </div>
      <StatusIndicator status={Bookings.status} />
    </div>
  );
}
