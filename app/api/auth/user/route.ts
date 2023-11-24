import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user"; // Renamed to User
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const userData = await req.json(); // Renamed to userData
  await connectToDatabase();
  try {
    await User?.create(userData); // Use User.create instead
    return NextResponse.json(
      { message: "User Registered successfully" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
}
