import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

async function fetchBookings() {
  try {
    const response = await axios.get("/api/bookings");
    const bookings = response.data;
    return bookings;
  } catch (err) {
    console.error("Something went wrong. Please try again later.");
  }
}

export default fetchBookings;
