import { connectToDatabase } from "@/lib/mongodb";
import room from "@/models/room";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  } else {
    const RoomInfo = await req.json();
    try {
      await connectToDatabase();
      await room?.create(RoomInfo);
      return NextResponse.json(
        { message: "Room created successfully" },
        { status: 201 }
      );
    } catch (err) {
      return NextResponse.json(
        { message: "Room creation failed" },
        { status: 500 }
      );
    }
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  } else {
    try {
      await connectToDatabase();
      const rooms = await room?.find(); // Fetch all rooms
      return NextResponse.json(rooms, { status: 200 });
    } catch (err) {
      return NextResponse.json(
        { message: "Failed to fetch rooms" },
        { status: 500 }
      );
    }
  }
}

// export async function DELETE(req: NextRequest) {
//   const { id } = await req.json();
//   await connectToDatabase();
//   const rooms = await Room.findOneAndDelete({ id });
//   return NextResponse.json(rooms);
// }
