import { connectToDatabase } from "@/lib/mongodb";
import room from "@/models/room";
import { NextApiRequest, NextApiResponse } from "next";

export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const updatedRoomInfo = req.body; // Use req.body instead of req.json()

  await connectToDatabase();

  try {
    const updatedRoom = await room.findByIdAndUpdate(id, updatedRoomInfo, {
      new: true,
    });
    return updatedRoom
      ? res.status(200).json(updatedRoom)
      : res.status(404).json({ message: "Room not found" });
  } catch (err) {
    return res.status(500).json({ message: "Update failed" });
  }
}
