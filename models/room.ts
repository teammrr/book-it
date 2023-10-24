import { Schema, model } from "mongoose";

interface Room {
  id: number;
  picture: string;
  roomName: string;
  description: string;
  roomFloor: string;
  roomCapacity: number;
}

const roomSchema = new Schema<Room>({
  id: { type: Number, required: true },
  picture: { type: String, required: false },
  roomName: { type: String, required: true },
  description: { type: String, required: true },
  roomFloor: { type: String, required: true },
  roomCapacity: { type: Number, required: true },
});

export default model<Room>("Rooms", roomSchema);
