import { connectToDatabase } from "@/lib/mongodb";
import bookings from "@/models/bookings";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  } else {
    const booking = await req.json();
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
    const { name, resrvId } = await req.json(); // can make an update to the model to include name to check if the user is the one who booked it.
    await connectToDatabase();
    try {
      await bookings?.findOneAndDelete({ resrvId });
      return NextResponse.json(
        { message: "Canceled successfully" },
        { status: 200 }
      );
    } catch (err) {
      return NextResponse.json(
        { message: "Failed to delete" },
        { status: 500 }
      );
    }
  }
}

export async function PATCH(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  } else {
    const booking = await req.json();
    await connectToDatabase();
    try {
      await bookings?.findOneAndUpdate(
        { resrvId: booking.resrvId },
        { $set: { description: booking.description } }
      );
      return NextResponse.json(
        { message: "Updated successfully" },
        { status: 200 }
      );
    } catch (err) {
      return NextResponse.json(
        { message: "Failed to update" },
        { status: 500 }
      );
    }
  }
}
