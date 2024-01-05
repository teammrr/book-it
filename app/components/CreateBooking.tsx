import axios from "axios";

export default async function CreateBooking(
  roomId: string,
  name: string,
  description: string,
  status: string
) {
  const startTime = Math.floor(Date.now() / 1000); // current time in Unix timestamp
  const endTime = startTime + 60 * 60; // for example, 1 hour later

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
  } catch (error) {
    console.error(error);
  }
}
