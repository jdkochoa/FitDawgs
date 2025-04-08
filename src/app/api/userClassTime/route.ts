import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import UserClassTime from "@/models/userClassTime";

export async function POST(request: NextRequest) {
  const { userId, classTimes } = await request.json();
  await connectMongoDB();

  const updated = await UserClassTime.findOneAndUpdate(
    { userId },
    { classTimes },
    { upsert: true, new: true }
  );

  return NextResponse.json(
    { message: "User class times saved", data: updated },
    { status: 200 }
  );
}

export async function GET(request: NextRequest) {
  await connectMongoDB();
  const userClassTime = await UserClassTime.find();
  return NextResponse.json(userClassTime, { status: 200 });
}
