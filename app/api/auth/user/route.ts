import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request: {
  json: () =>
    | PromiseLike<{ name: string; email: string }>
    | { name: string; email: string };
}) {
  const { name, email } = await request.json();

  // Validate the user's input.
  if (!name || !email) {
    return NextResponse.json(
      { message: "Invalid user input" },
      { status: 400 }
    );
  }

  await connectToDatabase();

  // Check if the user's email address is already in use.
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json(
      { message: "Email address is already in use" },
      { status: 409 }
    );
  }

  // Create the new user.
  await User.create({ name, email });

  // Return a success response.
  return NextResponse.json(
    { message: "User created successfully" },
    { status: 200 }
  );
}
