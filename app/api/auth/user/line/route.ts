import { connectToDatabase } from "@/lib/mongodb";
import lineUser from "@/models/lineUser";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  const { account } = await req.json();
  await connectToDatabase();
  await lineUser.insertMany({ account });
  return NextResponse.json(
    { message: "User created successfully" },
    { status: 201 }
  );
}
