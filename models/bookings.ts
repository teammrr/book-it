import { Schema, model } from "mongoose";

interface Booking {
  roomId: number;
  date: string;
  startTime: string;
  endTime: string;
}

const bookingSchema = new Schema<Booking>({
  roomId: { type: Number, required: true },
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
});

export default model<Booking>("Bookings", bookingSchema);
