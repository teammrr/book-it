import axios from "axios";

export default async function CreateBooking(
  roomId: string,
  name: string,
  description: string,
  status: string
) {
  const startTime = Math.floor(Date.now() / 1000); // current time in Unix timestamp
  const endTime = startTime + 60 * 60; // for example, 1 hour later

  console.log(`Start: ${startTime},End: ${endTime}`);
  const bookingDetails = {
    roomId,
    startTime,
    endTime,
    name,
    description,
    status,
  };

  try {
    const response = await axios.post("api/bookings", bookingDetails);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
