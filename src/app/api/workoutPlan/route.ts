import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import WorkoutPlan from "@/models/workoutPlan";

export async function POST(request: NextRequest) {
  await connectMongoDB();

  try {
    const planData = await request.json();
    const newPlan = await WorkoutPlan.create(planData);

    return NextResponse.json(
      {
        status: "success",
        message: "Workout plan saved to database",
        _id: newPlan._id,
        data: newPlan,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving workout plan:", error);
    return NextResponse.json(
      { status: "error", message: "Server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectMongoDB();

  try {
    const plans = await WorkoutPlan.find().sort({ createdAt: -1 });
    return NextResponse.json(plans);
  } catch (error) {
    console.error("Error fetching plans:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to fetch plans" },
      { status: 500 }
    );
  }
}
