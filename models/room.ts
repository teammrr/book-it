import { Schema, model } from "mongoose";

interface Rooms {
  name: string;
  description: string;
  floor: string;
  capacity: number;
  picture: string;
}

const roomSchema = new Schema<Rooms>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  floor: { type: String, required: true },
  capacity: { type: Number, required: true },
  picture: { type: String, required: false },
});

export default model<Rooms>("rooms", roomSchema);
