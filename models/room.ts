import mongoose, { Schema, Model, Document } from "mongoose";

interface IRoom extends Document {
  name: string;
  description: string;
  floor: string;
  capacity: number;
  picture: string;
}

const roomSchema = new Schema<IRoom>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  floor: { type: String, required: true },
  capacity: { type: Number, required: true },
  picture: { type: String, required: false },
});

let Room: Model<IRoom> | null = null;

try {
  Room = mongoose.model<IRoom>("Room");
} catch (e) {
  Room = mongoose.model<IRoom>("Room", roomSchema);
}

export default Room;
