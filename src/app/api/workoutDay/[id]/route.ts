import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import WorkoutPlan from "@/models/workoutPlan";
import mongoose from "mongoose";

export async function DELETE(
  req: NextRequest,
  { params: { id }  }: { params: { id: string } }
) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
  }

  await connectMongoDB();

  try {
    const result = await WorkoutPlan.updateOne(
      { "exercises._id": id },
      { $pull: { exercises: { _id: id } } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ message: "Workout day not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Workout day deleted", result }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error deleting workout day", error: err }, { status: 500 });
  }
}