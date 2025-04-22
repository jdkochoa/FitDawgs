import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import User from "@/Models/user";
import mongoose from "mongoose";

interface RouteParams {
  params: { id: string };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  await connectMongoDB();
  const user = await User.findOne({ _id: id });
  return NextResponse.json({ user }, { status: 200 });
}

interface RouteParams {
  params: { id: string };
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const {
    username: username,
    email: email,
    password: password,
    timestamps: timestamps,
  } = await request.json();
  await connectMongoDB();
  await User.findByIdAndUpdate(id, { username, email, password, timestamps });
  return NextResponse.json({ message: "User updated" }, { status: 200 });
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
  }

  await connectMongoDB();
  const deletedUser = await User.findByIdAndDelete(id);

  if (!deletedUser) {
    return NextResponse.json({ message: "Item not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Item deleted" }, { status: 200 });
}
