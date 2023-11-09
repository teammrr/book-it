import { Schema, model } from "mongoose";

interface Booking {
  roomId: number;
  startTime: string;
  endTime: string;
  name: string;
  description: string;
  status: string;
}

const bookingSchema = new Schema<Booking>({
  roomId: { type: Number, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
});

export default model<Booking>("Booking-Test", bookingSchema);
