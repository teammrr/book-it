import { connectToDatabase } from "@/lib/mongodb";
import Room from "@/models/room";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { id, picture, roomName, description, roomFloor, roomCapacity } =
    await req.json();
  await connectToDatabase();
  await Room.create({
    id,
    picture,
    roomName,
    description,
    roomFloor,
    roomCapacity,
  });
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

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await connectToDatabase();
  const rooms = await Room.deleteOne({});
  return NextResponse.json(rooms);
}

export async function PUT(req: NextRequest) {
  const { id, picture, roomName, description, roomFloor, roomCapacity } =
    await req.json();
  await connectToDatabase();
  const updatedRoom = await Room.findOneAndUpdate(
    { id },
    { picture, roomName, description, roomFloor, roomCapacity },
    { new: true }
  );
  return NextResponse.json(updatedRoom);
}
