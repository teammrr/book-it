import axios from "axios";

export const getRooms = async () => {
  try {
    const res = await axios.get("/api/rooms");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getBookings = async () => {
  try {
    const res = await axios.get("/api/bookings");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
