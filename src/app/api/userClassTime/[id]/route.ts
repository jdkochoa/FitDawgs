import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import UserClassTime from "@/models/userClassTime";
import mongoose from "mongoose";

interface RouteParams {
  params: { id: string };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  await connectMongoDB();
  const userClassTime = await UserClassTime.findOne({ _id: id });
  return NextResponse.json({ userClassTime }, { status: 200 });
}

interface RouteParams {
  params: { id: string };
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const { userId: userId, classTimes: classTimes } = await request.json();
  await connectMongoDB();
  await UserClassTime.findByIdAndUpdate(id, { userId, classTimes });
  return NextResponse.json({ message: "User updated" }, { status: 200 });
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
  }

  await connectMongoDB();
  const deletedUser = await UserClassTime.findByIdAndDelete(id);

  if (!deletedUser) {
    return NextResponse.json({ message: "Item not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Item deleted" }, { status: 200 });
}
