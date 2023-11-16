import mongoose, { Schema, Model, Document } from "mongoose";

interface IBooking extends Document {
  roomId: string;
  startTime: string;
  endTime: string;
  name: string;
  description: string;
}

const BookingSchema = new Schema<IBooking>({
  roomId: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
});

let Booking: Model<IBooking> | null = null;

try {
  Booking = mongoose.model<IBooking>("booking-tests");
} catch (e) {
  Booking = mongoose.model<IBooking>("booking-tests", BookingSchema);
}

export default Booking;
