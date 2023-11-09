import mongoose, { Schema, Model, Document } from "mongoose";

interface IBooking extends Document {
  roomId: number;
  startTime: string;
  endTime: string;
  name: string;
  description: string;
  status: string;
}

const BookingSchema = new Schema<IBooking>({
  roomId: { type: Number, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
});

let Booking: Model<IBooking> | null = null;

try {
  Booking = mongoose.model<IBooking>("booking-test");
} catch (e) {
  Booking = mongoose.model<IBooking>("booking-test", BookingSchema);
}

export default Booking;
