import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  const { name, email } = await req.json();
  await connectToDatabase();
  await User.create({ name, email });
  return NextResponse.json(
    { message: "User created successfully" },
    { status: 201 }
  );
}
