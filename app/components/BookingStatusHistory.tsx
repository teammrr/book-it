import StatusIndicator from "./StatusIndicator";
import BookedUser from "./BookedUser";

export default function BookingStatusHistory(Bookings: any) {
  const formattedDate = formatDate(Bookings.date);
  const roomName = Bookings.roomName;
  const description = Bookings.description;
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
    <div className="flex items-center space-x-2 pt-2 pb-2 pr-4 pl-4 rounded-lg shadow shadow-black/8">
      {" "}
      {/* Add your desired width and height here */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-md text-gray-900 truncate ">
          {roomName}
        </p>
        <div className=" flex justify-between align-center items-center">
          <p className="text-sm w-40 flex  align-center  text-gray-500">
            <span className=" align-center border border-transparent">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                />
              </svg>
            </span>
            {startTime.toDateString()}
          </p>
          <p className="text-sm flex w-22 align-center   text-gray-500">
            <span className=" align-center border border-transparent">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
            {formattedStartTime} to {formattedEndTime}
          </p>
        </div>
      </div>
      {/* <StatusIndicator status={Bookings.status} /> */}
    </div>
  );
}
