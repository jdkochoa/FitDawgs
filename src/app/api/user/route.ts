import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";

export async function POST(request: NextRequest) {
  const { username, email, password, timestamps } = await request.json();
  await connectMongoDB();
  await User.create({ username, email, password, timestamps });
  return NextResponse.json(
    { message: "User added successfully" },
    { status: 201 }
  );
}

export async function GET(request: NextRequest) {
  await connectMongoDB();
  const user = await User.find();
  return NextResponse.json(user, { status: 200 });
}
