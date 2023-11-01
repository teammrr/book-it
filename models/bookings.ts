import { Schema, model } from "mongoose";

interface Booking {
  id: number;
  roomId: number;
  date: string;
  startTime: string;
  endTime: string;
}

const bookingSchema = new Schema<Booking>({
  id: { type: Number, required: true },
  roomId: { type: Number, required: true },
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
});

export default model<Booking>("Bookings", bookingSchema);
