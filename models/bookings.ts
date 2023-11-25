import mongoose, { Schema, Model, Document } from "mongoose";

interface IBooking extends Document {
  resrvId: string;
  roomId: string;
  roomName: string;
  startTime: string;
  endTime: string;
  name: string;
  description: string;
}

const BookingSchema = new Schema<IBooking>(
  {
    resrvId: { type: String, required: true },
    roomId: { type: String, required: true },
    roomName: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

let Booking: Model<IBooking> | null = null;

try {
  Booking = mongoose.model<IBooking>("reservations");
} catch (e) {
  Booking = mongoose.model<IBooking>("reservations", BookingSchema);
}

export default Booking;
