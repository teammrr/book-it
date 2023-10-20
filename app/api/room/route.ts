import { connectToDatabase } from "@/lib/mongodb";
import Room from "@/models/room";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { roomId, roomName, roomFloor, roomCapacity } = await req.json();
  await connectToDatabase();
  await Room.create({ roomId, roomName, roomFloor, roomCapacity });
  return NextResponse.json(
    { message: "Room created successfully" },
    { status: 201 }
  );
}

export async function GET() {
  await connectToDatabase();
  const rooms = await Room.find({});
  return NextResponse.json(rooms);
}
