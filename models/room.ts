import { Schema, model } from "mongoose";

interface Room {
  id: number;
  picture: string;
  roomName: string;
  description: string;
  roomFloor: number;
  roomCapacity: number;
}

const roomSchema = new Schema<Room>({
  id: { type: Number, required: true },
  picture: { type: String, required: true },
  roomName: { type: String, required: true },
  description: { type: String, required: true },
  roomFloor: { type: Number, required: true },
  roomCapacity: { type: Number, required: true },
});

export default model<Room>("Room", roomSchema);
