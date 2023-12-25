import { connectToDatabase } from "@/lib/mongodb";
import bookings from "@/models/bookings";
import { NextRequest, NextResponse } from "next/server";
// import { getServerSession } from "next-auth/next";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  } else {
    const booking = await req.json();
    console.log("request:", booking);
    await connectToDatabase();
    try {
      await bookings?.create(booking);
      return NextResponse.json(
        { message: "Booking successfully" },
        { status: 201 }
      );
    } catch (err) {
      return NextResponse.json({ message: err }, { status: 500 });
    }
  }
}

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  } else {
    await connectToDatabase();
    try {
      const booking = await bookings?.find({});
      return NextResponse.json(booking);
    } catch (err) {
      return NextResponse.json({ message: "Failed to fetch" }, { status: 500 });
    }
  }
}

export async function DELETE(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  } else {
    const { id } = await req.json();
    await connectToDatabase();
    try {
      const booking = await bookings?.findOneAndDelete({ id });
      return NextResponse.json(booking);
    } catch (err) {
      return NextResponse.json(
        { message: "Failed to delete" },
        { status: 500 }
      );
    }
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
