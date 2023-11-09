import { connectToDatabase } from "@/lib/mongodb";
import bookings from "@/models/bookings";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const booking = await req.json();
  await connectToDatabase();
  try {
    await bookings?.create({ booking });
    return NextResponse.json(
      { message: "Booking successfully" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ message: "Booking failed" }, { status: 500 });
  }
}

export async function GET() {
  await connectToDatabase();
  try {
    const booking = await bookings?.find({});
    return NextResponse.json(booking);
  } catch (err) {
    return NextResponse.json({ message: "Failed to fetch" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await connectToDatabase();
  try {
    const booking = await bookings?.findOneAndDelete({ id });
    return NextResponse.json(booking);
  } catch (err) {
    return NextResponse.json({ message: "Failed to delete" }, { status: 500 });
  }
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
