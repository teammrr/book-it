import { connectToDatabase } from "@/lib/mongodb";
import bookings from "@/models/bookings";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest) {
  const { roomId } = req.query;
  console.log("roomId:", roomId); // Add this line
  await connectToDatabase();
  try {
    const booking = roomId
      ? await bookings?.findOne({ roomId: Number(roomId) })
      : await bookings?.find({});
    console.log("booking:", booking); // Add this line
    return NextResponse.json(booking);
  } catch (err) {
    console.error("Error:", err); // Add this line
    return NextResponse.json(
      { message: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
