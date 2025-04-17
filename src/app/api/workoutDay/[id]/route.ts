import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import WorkoutPlan from "@/models/workoutPlan";
import mongoose from "mongoose";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
  }

  await connectMongoDB();

  const result = await WorkoutPlan.updateOne(
    { "exercises._id": id },
    { $pull: { exercises: { _id: id } } }
  );

  if (result.modifiedCount === 0) {
    return NextResponse.json({ message: "Workout day not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Workout day deleted" }, { status: 200 });
}

export async function PUT(request: NextRequest, context : { params: { id: string } }) {
  const { id } = await context.params;
  const { day } = await request.json();
  await connectMongoDB();

  const result = await WorkoutPlan.updateOne(
    { "exercises._id": id },
    { $set: { "exercises.$.day": day } },
  );

  return NextResponse.json({ message: "User updated" }, { status: 200 });
}

export async function POST(request: NextRequest, { params }: { params: { id: string }}) {

}