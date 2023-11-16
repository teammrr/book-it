import mongoose, { Schema, Model, Document } from "mongoose";

interface IRoom extends Document {
  name: string;
  description: string;
  floor: string;
  capacity: number;
  picture: string;
  id: string;
}

const roomSchema = new Schema<IRoom>({
  name: { type: String, required: true },
  description: { type: String, required: false },
  floor: { type: String, required: true },
  capacity: { type: Number, required: true },
  id: { type: String, required: true },
});

let Room: Model<IRoom> | null = null;

try {
  Room = mongoose.model<IRoom>("Room");
} catch (e) {
  Room = mongoose.model<IRoom>("Room", roomSchema);
}

export default Room;
