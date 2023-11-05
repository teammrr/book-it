import { connectToDatabase } from "@/lib/mongodb";
import bookings from "@/models/bookings";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const room = await req.json();
  await connectToDatabase();
  await bookings.create({room});
  return NextResponse.json(
    { message: "Booking successfully" },
    { status: 201 }
  );
}

export async function GET() {
  await connectToDatabase();
  const booking = await bookings.find({});
  return NextResponse.json(booking);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await connectToDatabase();
  const booking = await bookings.findOneAndDelete({ id });
  return NextResponse.json(booking);
}

// export async function PUT(req: NextRequest) {
//   const room = await req.json();
//   await connectToDatabase();
//   const updatedRoom = await bookings.findOneAndUpdate(
//     { id },
//     { roomId, date, startTime, endTime },
//     { new: true }
//   );
//   return NextResponse.json(updatedRoom);
// }
