// This route handles the deletion of a workout plan
// Use if you need a specific object containing userId
// and workoutId. The other get in the general does this
// well but in a different way where it looks through objids
// to find userid essentially and return workouts associated
//export async function GET()
import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import UserWorkoutPlan from "@/models/userWorkoutPlan";
import mongoose from "mongoose";

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
  }

  await connectMongoDB();

  const result = await UserWorkoutPlan.updateOne(
    { workoutPlans: id },
    { $pull: { workoutPlans: id } }
  );

  if (result.modifiedCount === 0) {
    return NextResponse.json({ message: "Workout plan not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Workout plan deleted" }, { status: 200 });
}