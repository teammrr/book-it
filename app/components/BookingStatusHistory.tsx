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

  // {startTime.toDateString()}
  // {formattedStartTime} to {formattedEndTime}
  return (
    <>
      <h1>Hello</h1>
    </>
  );
}
