import useSWR from "swr";
import * as api from "../services/api";

export const useFetch = () => {
  return {
    rooms: useSWR("/api/rooms", api.getRooms),
    bookings: useSWR("/api/bookings", api.getBookings),
  };
};
