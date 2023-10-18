import mongoose, { Schema, models } from "mongoose";

const roomSchema = new Schema({
  roomId: {
    type: String,
    required: true,
  },
  roomName: {
    type: String,
    required: true,
  },
  roomFloor: {
    type: String,
    required: true,
  },
  roomCapacity: {
    type: String,
    required: true,
  },
});

const Room = models.room || mongoose.model("Room", roomSchema);

export default Room;
