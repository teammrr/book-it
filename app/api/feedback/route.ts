import { connectToDatabase } from "@/lib/mongodb";
import Feedback from "@/models/feedback";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  } else {
    const FeedbackInfo = await req.json();
    try {
      await connectToDatabase();
      await Feedback?.create(FeedbackInfo);
      return NextResponse.json(
        { message: "Feedback Sent successfully" },
        { status: 200 }
      );
    } catch (err) {
      return NextResponse.json(
        { message: "Failed to send feedback" },
        { status: 500 }
      );
    }
  }
}

// export async function GET(req: NextRequest, res: NextResponse) {
//   try {
//     await connectToDatabase();
//     const FeedbackData = await Feedback?.find(); // Fetch all rooms
//     return NextResponse.json(FeedbackData, { status: 200 });
//   } catch (err) {
//     return NextResponse.json(
//       { message: "Failed to fetch feedbacks" },
//       { status: 500 }
//     );
//   }
// }
