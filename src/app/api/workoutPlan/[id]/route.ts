import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import WorkoutPlan from "@/models/workoutPlan";

export async function GET(_: Request, context: { params: { id: string } }) {
  // This needs to wait for the params to be available from API POSTing
  // to the DB
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json(
      { status: "error", message: "Workout plan ID is required" },
      { status: 400 }
    );
  }

  await connectMongoDB();

  try {
    const workoutPlan = await WorkoutPlan.findById(id);
    if (!workoutPlan) {
      return NextResponse.json(
        { status: "error", message: "Workout plan not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(workoutPlan);
  } catch (error) {
    console.error("Error fetching workout plan by ID:", error);
    return NextResponse.json(
      { status: "error", message: "Server error" },
      { status: 500 }
    );
  }
}
