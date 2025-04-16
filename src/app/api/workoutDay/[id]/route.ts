import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import WorkoutPlan from "@/models/workoutPlan";

export default async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  
  await connectMongoDB();

  try {
    const result = await WorkoutPlan.updateOne(
        { "exercises.exercises._id": params.id },
        { $pull: { "exercises.$[].exercises": { _id: params.id } } }
    );

    return NextResponse.json({ message: "Workout deleted", result }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error deleting workout", error: err }, { status: 500 });
  }
}