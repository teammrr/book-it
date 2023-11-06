import { Request, Response } from "express";
import room from "@/models/room";
import cors from "cors";

export async function getRooms(req: Request, res: Response) {
  try {
    const rooms = await room?.find();
    res.json(rooms);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

// Add the cors middleware
export const corsMiddleware = cors();
